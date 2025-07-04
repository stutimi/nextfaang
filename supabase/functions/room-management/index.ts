import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
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

    const { action, userId, cfHandle, roomCode, problems, roomId } = await req.json();

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
      case 'create': {
        if (!cfHandle || !problems) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing cfHandle or problems' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const newRoomCode = generateRoomCode();

        const { data: room, error: roomError } = await supabaseClient
          .from('rooms')
          .insert({
            room_code: newRoomCode,
            creator_id: userId,
            creator_cf_handle: cfHandle,
            problems: problems,
            status: 'waiting'
          })
          .select()
          .single();

        if (roomError) {
          console.error('Error creating room:', roomError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to create room' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Add creator as participant
        const { error: participantError } = await supabaseClient
          .from('room_participants')
          .insert({
            room_id: room.id,
            user_id: userId,
            cf_handle: cfHandle
          });

        if (participantError) {
          console.error('Error adding participant:', participantError);
        }

        console.log(`Room created: ${newRoomCode} by ${cfHandle}`);
        return new Response(
          JSON.stringify({ success: true, room }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      case 'join': {
        if (!roomCode || !cfHandle) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing roomCode or cfHandle' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Find room by code
        const { data: room, error: roomError } = await supabaseClient
          .from('rooms')
          .select('*')
          .eq('room_code', roomCode.toUpperCase())
          .eq('status', 'waiting')
          .single();

        if (roomError || !room) {
          return new Response(
            JSON.stringify({ success: false, message: 'Room not found or not available' }),
            { 
              status: 404, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        if (room.creator_id === userId) {
          return new Response(
            JSON.stringify({ success: false, message: 'Cannot join your own room' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Update room with opponent
        const { data: updatedRoom, error: updateError } = await supabaseClient
          .from('rooms')
          .update({
            opponent_id: userId,
            opponent_cf_handle: cfHandle,
            status: 'active'
          })
          .eq('id', room.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating room:', updateError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to join room' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Add opponent as participant
        const { error: participantError } = await supabaseClient
          .from('room_participants')
          .insert({
            room_id: room.id,
            user_id: userId,
            cf_handle: cfHandle
          });

        if (participantError) {
          console.error('Error adding participant:', participantError);
        }

        console.log(`User ${cfHandle} joined room ${roomCode}`);
        return new Response(
          JSON.stringify({ success: true, room: updatedRoom }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      case 'start': {
        if (!roomId) {
          return new Response(
            JSON.stringify({ success: false, error: 'Missing roomId' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const { error: updateError } = await supabaseClient
          .from('rooms')
          .update({
            start_time: new Date().toISOString(),
            status: 'active'
          })
          .eq('id', roomId);

        if (updateError) {
          console.error('Error starting room:', updateError);
          return new Response(
            JSON.stringify({ success: false, error: 'Failed to start room' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        console.log(`Room ${roomId} started`);
        return new Response(
          JSON.stringify({ success: true }),
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
    console.error('Error in room-management function:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});