import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DuelRequest {
  id: string;
  sender_id: string;
  receiver_cf_handle: string;
  status: 'pending' | 'accepted' | 'declined';
  match_type: 'friend' | 'bot';
  problems?: any[];
  created_at: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, userId, receiverCfHandle, duelId, problems, botDifficulty } = await req.json();

    if (!action || !userId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required parameters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    switch (action) {
      case 'send_duel_request': {
        if (!receiverCfHandle) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing receiver CF handle' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Validate receiver exists
        const { data: receiverData, error: receiverError } = await supabaseClient.functions.invoke('validate-codeforces-user', {
          body: { handle: receiverCfHandle }
        });

        if (receiverError || !receiverData?.success) {
          return new Response(
            JSON.stringify({ success: false, error: 'Receiver not found' }),
            { 
              status: 404, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Generate problems for the duel
        const problemsData = await supabaseClient.functions.invoke('random-cp-questions');
        const duelProblems = problemsData.data ? [
          {
            title: problemsData.data.codeforces.title,
            difficulty: problemsData.data.codeforces.difficulty,
            url: problemsData.data.codeforces.url,
            platform: "Codeforces"
          },
          {
            title: problemsData.data.gfg.title,
            difficulty: problemsData.data.gfg.difficulty,
            url: problemsData.data.gfg.url,
            platform: "GeeksforGeeks"
          }
        ] : [];

        // Create duel request
        const { data: duelRequest, error: duelError } = await supabaseClient
          .from('duel_requests')
          .insert({
            sender_id: userId,
            receiver_cf_handle: receiverCfHandle,
            problems: duelProblems,
            match_type: 'friend'
          })
          .select()
          .single();

        if (duelError) {
          console.error('Error creating duel request:', duelError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to create duel request' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        console.log(`Duel request sent from ${userId} to ${receiverCfHandle}`);
        return new Response(
          JSON.stringify({ success: true, duelRequest }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      case 'accept_duel_request': {
        if (!duelId) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing duel ID' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const { data: updatedDuel, error: updateError } = await supabaseClient
          .from('duel_requests')
          .update({ status: 'accepted' })
          .eq('id', duelId)
          .select()
          .single();

        if (updateError) {
          console.error('Error accepting duel:', updateError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to accept duel' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        console.log(`Duel ${duelId} accepted`);
        return new Response(
          JSON.stringify({ success: true, duel: updatedDuel }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      case 'decline_duel_request': {
        if (!duelId) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing duel ID' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const { error: updateError } = await supabaseClient
          .from('duel_requests')
          .update({ status: 'declined' })
          .eq('id', duelId);

        if (updateError) {
          console.error('Error declining duel:', updateError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to decline duel' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        console.log(`Duel ${duelId} declined`);
        return new Response(
          JSON.stringify({ success: true }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      case 'create_bot_match': {
        if (!botDifficulty) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing bot difficulty' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Generate problems for bot match
        const problemsData = await supabaseClient.functions.invoke('random-cp-questions');
        const botProblems = problemsData.data ? [
          {
            title: problemsData.data.codeforces.title,
            difficulty: problemsData.data.codeforces.difficulty,
            url: problemsData.data.codeforces.url,
            platform: "Codeforces"
          },
          {
            title: problemsData.data.gfg.title,
            difficulty: problemsData.data.gfg.difficulty,
            url: problemsData.data.gfg.url,
            platform: "GeeksforGeeks"
          }
        ] : [];

        const { data: botMatch, error: botError } = await supabaseClient
          .from('bot_matches')
          .insert({
            player_id: userId,
            problems: botProblems,
            bot_difficulty: botDifficulty
          })
          .select()
          .single();

        if (botError) {
          console.error('Error creating bot match:', botError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to create bot match' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        console.log(`Bot match created for user ${userId} with difficulty ${botDifficulty}`);
        return new Response(
          JSON.stringify({ success: true, botMatch }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      case 'get_duel_requests': {
        // Get duel requests for the user
        const { data: duelRequests, error: duelError } = await supabaseClient
          .from('duel_requests')
          .select('*')
          .or(`sender_id.eq.${userId},receiver_cf_handle.eq.${await getUserCfHandle(supabaseClient, userId)}`)
          .order('created_at', { ascending: false });

        if (duelError) {
          console.error('Error fetching duel requests:', duelError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to fetch duel requests' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        return new Response(
          JSON.stringify({ success: true, duelRequests }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid action' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

  } catch (error) {
    console.error('Error in duel-management function:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function getUserCfHandle(supabaseClient: any, userId: string): Promise<string> {
  try {
    const { data: user } = await supabaseClient.auth.admin.getUserById(userId);
    return user?.user?.user_metadata?.codeforces_handle || '';
  } catch (error) {
    console.error('Error getting user CF handle:', error);
    return '';
  }
}