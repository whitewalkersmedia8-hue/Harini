import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Lock, RefreshCw, Search, ShieldAlert } from 'lucide-react';
import { fetchRSVPList, RSVPData } from '../utils/rsvpStorage';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

function formatDate(ts: string) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleString();
}

export function RSVPAdminPage() {
  const [pass, setPass] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<RSVPData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');

  // Light "speed bump" — not real security (static sites can't truly hide secrets)
  const ADMIN_PASS = (import.meta as any).env?.VITE_RSVP_ADMIN_PASS || '1234';

  useEffect(() => {
    // Allow auto-unlock via localStorage
    const saved = localStorage.getItem('rsvp_admin_unlocked');
    if (saved === 'true') {
      const savedPass = localStorage.getItem('rsvp_admin_pass') || '';
      if (savedPass) {
        setPass(savedPass);
        setUnlocked(true);
      }
    }
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(r =>
      (r.guestName || '').toLowerCase().includes(needle) ||
      (r.attending || '').toLowerCase().includes(needle) ||
      (r.dietary || '').toLowerCase().includes(needle) ||
      (r.message || '').toLowerCase().includes(needle)
    );
  }, [rows, q]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRSVPList(pass);
      setRows(data);
    } catch (e: any) {
      setError(e?.message || 'Failed to load RSVPs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (unlocked) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  const onUnlock = () => {
    if (pass.trim() === ADMIN_PASS) {
      setUnlocked(true);
      localStorage.setItem('rsvp_admin_unlocked', 'true');
      localStorage.setItem('rsvp_admin_pass', pass.trim());
    } else {
      setError('Incorrect passcode.');
    }
  };

  const exportCsv = () => {
    const headers = ['Timestamp', 'Guest Name', 'Attending', 'Guests', 'Dietary', 'Message'];
    const escape = (v: any) => {
      const s = String(v ?? '');
      if (s.includes(',') || s.includes('\n') || s.includes('"')) return '"' + s.replaceAll('"', '""') + '"';
      return s;
    };
    const lines = [
      headers.join(','),
      ...rows.map(r => [r.timestamp, r.guestName, r.attending, r.guests, r.dietary, r.message].map(escape).join(','))
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp_export.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full px-4 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl"
      >
        <div className="rounded-3xl bg-white/55 backdrop-blur-md border border-white/70 shadow-xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">RSVP Details</h2>
              <p className="text-gray-600 mt-1">Open this link anytime to view your RSVP list.</p>
            </div>
            <a
              href="#/"
              className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
              title="Back to invitation"
            >
              Back
            </a>
          </div>

          {!unlocked ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 rounded-2xl bg-white/60 border border-white/80 p-5"
            >
              <div className="flex items-center gap-2 text-gray-800">
                <Lock className="w-5 h-5" />
                <h3 className="font-medium">Admin Passcode</h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                This is a simple passcode to stop guests opening this page by accident (not strong security).
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="Enter passcode"
                  type="password"
                  className="flex-1 rounded-xl px-4 py-3 bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-black/10"
                />
                <button
                  onClick={onUnlock}
                  className="rounded-xl px-5 py-3 bg-black text-white font-medium hover:opacity-90 active:scale-[0.98] transition"
                >
                  Unlock
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 flex gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-700 mt-0.5" />
                <p className="text-sm text-amber-800">
                  Tip: You can set your own passcode using <span className="font-mono">VITE_RSVP_ADMIN_PASS</span> in Netlify Environment variables.
                </p>
              </div>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </motion.div>
          ) : (
            <>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search name, dietary, message..."
                    className="w-full rounded-xl pl-10 pr-4 py-3 bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={load}
                    className="rounded-xl px-4 py-3 bg-white/70 border border-white/80 hover:bg-white/80 active:scale-[0.98] transition flex items-center gap-2"
                    title="Refresh"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                  <button
                    onClick={exportCsv}
                    className="rounded-xl px-4 py-3 bg-black text-white hover:opacity-90 active:scale-[0.98] transition flex items-center gap-2"
                    title="Export CSV"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <motion.div variants={container} initial="hidden" animate="show" className="mt-6 space-y-3">
                {loading ? (
                  <motion.div variants={item} className="rounded-2xl bg-white/60 border border-white/80 p-5">
                    <p className="text-gray-600">Loading RSVPs…</p>
                  </motion.div>
                ) : filtered.length === 0 ? (
                  <motion.div variants={item} className="rounded-2xl bg-white/60 border border-white/80 p-5">
                    <div className="flex items-center gap-2 text-gray-800">
                      <Eye className="w-5 h-5" />
                      <p className="font-medium">No RSVPs found</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      No RSVP submissions yet — or your Supabase settings (URL/Key or RPC functions) are not configured.
                    </p>
                  </motion.div>
                ) : (
                  filtered.map((r, idx) => (
                    <motion.div key={idx} variants={item} className="rounded-2xl bg-white/60 border border-white/80 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="text-lg font-medium text-gray-900">{r.guestName}</p>
                          <p className="text-sm text-gray-600">{formatDate(r.timestamp)}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="px-3 py-1 rounded-full bg-white/70 border border-white/80">
                            {r.attending}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white/70 border border-white/80">
                            Guests: {r.guests}
                          </span>
                          {r.dietary && (
                            <span className="px-3 py-1 rounded-full bg-white/70 border border-white/80">
                              {r.dietary}
                            </span>
                          )}
                        </div>
                      </div>

                      {r.message && (
                        <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-wrap">{r.message}</p>
                      )}
                    </motion.div>
                  ))
                )}
              </motion.div>

              <p className="mt-6 text-xs text-gray-500">
                Admin link: <span className="font-mono">#/rsvp-details</span>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
