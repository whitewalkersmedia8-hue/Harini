import { createClient } from '@supabase/supabase-js';

export interface RSVPData {
  guestName: string;
  attending: string;
  guests: number;
  dietary: string;
  message: string;
  timestamp: string;
}

// Supabase public credentials (safe to expose as "anon" key).
// Set these in Netlify (or your local .env):
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[RSVP] Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/** Save a new RSVP to Supabase */
export async function submitRSVP(data: Omit<RSVPData, 'timestamp'> & { timestamp?: string }) {
  const payload = {
    guest_name: data.guestName?.trim() || '',
    attending: data.attending || '',
    guests: Number(data.guests || 1),
    dietary: data.dietary || '',
    message: data.message || '',
    created_at: data.timestamp || new Date().toISOString()
  };

  const { error } = await supabase.from('rsvps').insert(payload);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Admin: get all RSVPs via a secure RPC that checks the admin passcode.
 * You must create the `list_rsvps(passcode text)` function in Supabase.
 */
export async function fetchRSVPList(passcode?: string): Promise<RSVPData[]> {
  const { data, error } = await supabase.rpc('list_rsvps', { passcode: passcode || '' });
  if (error) {
    // eslint-disable-next-line no-console
    console.warn('[RSVP] list_rsvps error:', error.message);
    return [];
  }

  const rows = (data || []) as any[];
  return rows.map((r) => ({
    guestName: r.guest_name ?? '',
    attending: r.attending ?? '',
    guests: Number(r.guests ?? 1),
    dietary: r.dietary ?? '',
    message: r.message ?? '',
    timestamp: r.created_at ?? new Date().toISOString()
  }));
}

/**
 * Admin: clear all RSVPs via secure RPC.
 * You must create the `clear_rsvps(passcode text)` function in Supabase.
 */
export async function clearRSVPList(passcode?: string) {
  const { error } = await supabase.rpc('clear_rsvps', { passcode: passcode || '' });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
