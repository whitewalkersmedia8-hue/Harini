import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';

interface NamesPageProps {
  onNext: (name: string) => void;
}

export function NamesPage({ onNext }: NamesPageProps) {
  const [name, setName] = useState('');

  return (
    <div className="w-full px-4 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl"
      >
        <div className="rounded-3xl bg-white/55 backdrop-blur-md border border-white/70 shadow-xl p-6 sm:p-8 relative overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/50 blur-2xl"
            animate={{ y: [0, 10, 0], x: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/40 blur-2xl"
            animate={{ y: [0, -10, 0], x: [0, 8, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative">
            <div className="flex items-center justify-center gap-2 text-gray-800">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-serif text-3xl sm:text-4xl text-center">Welcome</h2>
            </div>
            <p className="text-center text-gray-600 mt-3 leading-relaxed">
              Please enter your name to continue to the invitation.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-6"
            >
              <label className="text-sm text-gray-600">Your Name</label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl bg-white/60 border border-white/70 px-4 py-3">
                <User className="w-5 h-5 text-gray-500" />
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Type your name..."
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNext(name.trim() || 'Guest')}
              className="mt-6 w-full rounded-2xl px-6 py-4 bg-black text-white font-medium tracking-widest hover:opacity-90 transition"
            >
              Continue
            </motion.button>

            <p className="mt-5 text-xs text-gray-500 text-center">
              Admin: <a className="underline underline-offset-4 hover:text-gray-800" href="#/rsvp-details">#/rsvp-details</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
