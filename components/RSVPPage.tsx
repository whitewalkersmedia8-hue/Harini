import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Loader2 } from 'lucide-react';
import { submitRSVP } from '../utils/rsvpStorage';
export function RSVPPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    guestName: '',
    attending: 'yes',
    guests: 1,
    dietary: '',
    message: ''
  });
  // Countdown Logic (Days, Hours, Mins only)
  useEffect(() => {
    const targetDate = new Date('2026-01-22T09:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(difference / (1000 * 60 * 60) % 24),
          minutes: Math.floor(difference / 1000 / 60 % 60)
        });
      }
    }, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const res = await submitRSVP({
      ...formData,
      timestamp: new Date().toISOString()
    });
    if ((res as any)?.ok) {
      setIsSubmitted(true);
    } else {
      setError('Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  };
  return <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8 pt-safe pb-safe">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Countdown & Info */}
        <div className="space-y-10 text-center md:text-left">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="font-serif text-3xl text-gray-900 mb-3">
              We can't wait to see you,
            </h2>
            <p className="font-serif text-4xl sm:text-5xl text-gray-900 italic mb-6 leading-tight break-words">
              {formData.guestName || 'Guest'}
            </p>
            <p className="font-sans text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
              We are so excited to celebrate our special day with our favorite
              people. Please let us know if you can make it!
            </p>
          </motion.div>

          {/* Enhanced Countdown Timer */}
          <motion.div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-20" />

            <div className="flex items-center justify-center md:justify-start gap-3 mb-8 text-gray-500 text-sm uppercase tracking-[0.2em]">
              <Clock className="w-4 h-4" />
              <span>Countdown</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center divide-x divide-gray-100">
              {[{
              label: 'Days',
              value: timeLeft.days
            }, {
              label: 'Hours',
              value: timeLeft.hours
            }, {
              label: 'Minutes',
              value: timeLeft.minutes
            }].map(item => <div key={item.label} className="flex flex-col items-center px-2">
                  <span className="font-serif text-4xl md:text-5xl text-gray-900 font-medium mb-2">
                    {item.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-sans">
                    {item.label}
                  </span>
                </div>)}
            </div>
          </motion.div>
        </div>

        {/* Right Column: RSVP Form */}
        <div className="card p-6 sm:p-8 rounded-2xl relative z-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? <motion.form key="form" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0,
            y: -20
          }} onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-3xl text-gray-900 mb-8">RSVP</h3>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Your name
                  </label>
                  <input
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all"
                    placeholder="Type your full name"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Will you be attending?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['yes', 'no'].map(option => <label key={option} className="cursor-pointer group relative">
                        <input type="radio" name="attending" value={option} checked={formData.attending === option} onChange={e => setFormData({
                    ...formData,
                    attending: e.target.value
                  })} className="sr-only peer" />
                        <div className="py-4 px-2 text-center rounded-xl border border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:text-white transition-all duration-300 hover:border-gray-400">
                          <span className="font-serif text-lg">
                            {option === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline'}
                          </span>
                        </div>
                      </label>)}
                  </div>
                </div>

                <AnimatePresence>
                  {formData.attending === 'yes' && <motion.div initial={{
                opacity: 0,
                height: 0
              }} animate={{
                opacity: 1,
                height: 'auto'
              }} exit={{
                opacity: 0,
                height: 0
              }} className="space-y-6 overflow-hidden">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                          Number of Guests
                        </label>
                        <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/60 border border-white/70 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: Math.max(1, (formData.guests || 1) - 1) })}
                        className="w-10 h-10 rounded-full bg-white/70 border border-white/80 hover:bg-white/90 active:scale-95 transition flex items-center justify-center"
                        aria-label="Decrease guests"
                      >
                        −
                      </button>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">Guests</p>
                        <p className="text-2xl font-serif text-gray-900">{formData.guests || 1}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: Math.min(10, (formData.guests || 1) + 1) })}
                        className="w-10 h-10 rounded-full bg-white/70 border border-white/80 hover:bg-white/90 active:scale-95 transition flex items-center justify-center"
                        aria-label="Increase guests"
                      >
                        +
                      </button>
                    </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                          Dietary Requirements
                        </label>
                        <textarea rows={2} value={formData.dietary} onChange={e => setFormData({
                    ...formData,
                    dietary: e.target.value
                  })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none" placeholder="Any allergies or restrictions?" />
                      </div>
                    </motion.div>}
                </AnimatePresence>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Message for the Couple
                  </label>
                  <textarea rows={3} value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none" placeholder="Leave a note..." />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full py-4 bg-gray-900 text-white rounded-xl font-sans font-medium uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </> : 'Send RSVP'}
                </motion.button>
              </motion.form> : <motion.div key="success" initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50/50">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl text-gray-900">
                  Thank You!
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your RSVP has been sent successfully.
                  <br />
                  We look forward to celebrating with you!
                </p>
              </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </div>;
}