import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, userId, cfHandle, roomCode, problems, roomId, difficulty, timer } = await req.json();

    if (!action || !userId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    switch (action) {
      case 'send_request': {
        if (!cfHandle || !problems) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing cfHandle or problems' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await supabaseClient
          .from('duel_requests')
          .insert({
            sender_id: userId,
            receiver_cf_handle: cfHandle,
            problems,
            match_type: 'friend',
            status: 'pending'
          });

        if (error) {
          console.error('Error sending duel request:', error);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to send duel request' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Duel request sent' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'accept': {
        if (!cfHandle) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing cfHandle' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data: request, error: fetchError } = await supabaseClient
          .from('duel_requests')
          .select('*')
          .eq('receiver_cf_handle', cfHandle)
          .eq('status', 'pending')
          .eq('match_type', 'friend')
          .single();

        if (fetchError || !request) {
          return new Response(
            JSON.stringify({ success: false, error: 'No pending duel request found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        await supabaseClient
          .from('duel_requests')
          .update({ status: 'accepted' })
          .eq('id', request.id);

        const newRoomCode = generateRoomCode();
        const { data: room, error: roomError } = await supabaseClient
          .from('rooms')
          .insert({
            room_code: newRoomCode,
            creator_id: request.sender_id,
            opponent_id: userId,
            creator_cf_handle: request.receiver_cf_handle,
            opponent_cf_handle: cfHandle,
            problems: request.problems,
            status: 'active'
          })
          .select()
          .single();

        if (roomError) {
          console.error('Room creation failed:', roomError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to create room' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        await supabaseClient.from('room_participants').insert([
          { room_id: room.id, user_id: request.sender_id, cf_handle: request.receiver_cf_handle },
          { room_id: room.id, user_id: userId, cf_handle: cfHandle }
        ]);

        return new Response(
          JSON.stringify({ success: true, room }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'start_bot_match': {
        if (!problems || !difficulty) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing problems or difficulty' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const matchTimer = timer ?? 600; // Default to 600 seconds (10 minutes) if not provided

        const { data: match, error } = await supabaseClient
          .from('bot_matches')
          .insert({
            player_id: userId,
            problems,
            bot_difficulty: difficulty,
            status: 'ongoing',
            end_time: new Date(Date.now() + matchTimer * 1000).toISOString()
          })
          .select()
          .single();

        if (error) {
          console.error('Bot match creation failed:', error);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to start bot match' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true, match }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
