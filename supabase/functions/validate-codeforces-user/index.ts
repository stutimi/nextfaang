import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CodeforcesUser {
  handle: string;
  rating: number;
  rank: string;
  country: string;
  maxRank?: string;
  maxRating?: number;
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

    const { handle } = await req.json();

    if (!handle || typeof handle !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid handle provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check cache first
    const { data: cachedUser } = await supabaseClient
      .from('codeforces_users')
      .select('*')
      .eq('handle', handle.toLowerCase())
      .single();

    if (cachedUser) {
      const cacheAge = new Date().getTime() - new Date(cachedUser.last_updated).getTime();
      const oneHour = 60 * 60 * 1000;
      
      if (cacheAge < oneHour) {
        console.log(`Using cached data for ${handle}`);
        return new Response(
          JSON.stringify({
            success: true,
            user: {
              handle: cachedUser.handle,
              rating: cachedUser.rating || 0,
              rank: cachedUser.rank || 'unrated',
              country: cachedUser.country || '',
              maxRank: cachedUser.max_rank,
              maxRating: cachedUser.max_rating
            }
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Fetch from Codeforces API
    console.log(`Fetching user data for ${handle} from Codeforces API`);
    const cfResponse = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    
    if (!cfResponse.ok) {
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch from Codeforces API' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const cfData = await cfResponse.json();

    if (cfData.status !== 'OK' || !cfData.result || cfData.result.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'User not found on Codeforces' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const user = cfData.result[0];
    const userData: CodeforcesUser = {
      handle: user.handle,
      rating: user.rating || 0,
      rank: user.rank || 'unrated',
      country: user.country || '',
      maxRank: user.maxRank,
      maxRating: user.maxRating
    };

    // Store/update in database
    const { error: upsertError } = await supabaseClient
      .from('codeforces_users')
      .upsert({
        handle: userData.handle.toLowerCase(),
        rating: userData.rating,
        rank: userData.rank,
        country: userData.country,
        max_rank: userData.maxRank,
        max_rating: userData.maxRating,
        last_updated: new Date().toISOString()
      });

    if (upsertError) {
      console.error('Error storing user data:', upsertError);
    }

    console.log(`Successfully validated and stored data for ${handle}`);
    return new Response(
      JSON.stringify({ success: true, user: userData }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in validate-codeforces-user function:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});