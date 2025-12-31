import React from 'react';
import { motion } from 'framer-motion';
import { FloralArt } from './FloralArt';
import { ChevronDown, Calendar, MapPin, Clock } from 'lucide-react';
interface InvitationPageProps {
  onNext: () => void;
}
export function InvitationPage({
  onNext
}: InvitationPageProps) {
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };
  return <div className="relative min-h-screen w-full bg-[#FFFEF7] overflow-hidden pb-safe">
      {/* Background Floral Art - Fixed */}
      <div className="fixed top-0 left-0 w-full h-[45vh] pointer-events-none opacity-10 z-0">
        <FloralArt className="w-full h-full" />
      </div>

      {/* Main Content Container - Optimized for mobile readability */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 pt-safe md:pt-24 flex flex-col items-center text-center">
        {/* Names Section - High Hierarchy */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={sectionVariants} className="space-y-8 mb-16 w-full">
          <div className="space-y-2">
            <h1 className="font-serif text-[clamp(3.25rem,11vw,4.75rem)] text-gray-900 leading-none tracking-tight">
              Harini
            </h1>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-500 font-medium">
              Daughter of Mr. & Mrs. Peliarachchi
            </p>
          </div>

          <div className="font-script text-5xl text-gray-300 py-2">&</div>

          <div className="space-y-2">
            <h1 className="font-serif text-[clamp(3.25rem,11vw,4.75rem)] text-gray-900 leading-none tracking-tight">
              Asiri
            </h1>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-500 font-medium">
              Son of Mr. & Mrs. Karunarathna
            </p>
          </div>
        </motion.div>

        {/* Invitation Text - Better breathing room */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={sectionVariants} className="mb-16 space-y-6 max-w-xs mx-auto">
          <p className="font-serif text-xl text-gray-500 italic">
            Together with their families
          </p>
          <p className="font-serif text-2xl text-gray-800 leading-relaxed">
            Request the honour of your presence as we celebrate our wedding
          </p>
        </motion.div>

        {/* Date Card - Cleaner Layout */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={sectionVariants} className="w-full mb-12">
          <div className="glass-card rounded-3xl p-7 sm:p-8 flex flex-col items-center space-y-4">
            <Calendar className="w-6 h-6 text-gray-400" />
            <div className="text-center space-y-1">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-gray-500 font-semibold">
                Thursday
              </p>
              <div className="font-serif text-5xl text-gray-900 py-3 border-y border-gray-200 w-full px-8 my-2">
                Jan 22
              </div>
              <p className="font-sans text-sm tracking-[0.2em] text-gray-600">
                2026
              </p>
            </div>
          </div>
        </motion.div>

        {/* Details Grid - Optimized for Mobile */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={sectionVariants} className="w-full grid grid-cols-1 gap-6 mb-20">
          {/* Time */}
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center space-y-2">
            <Clock className="w-5 h-5 text-gray-400 mb-1" />
            <p className="font-serif text-3xl text-gray-900">9:00 AM</p>
            <p className="font-sans text-xs text-gray-500 uppercase tracking-wider">
              Poruwa Ceremony at 9:34 AM
            </p>
          </div>

          {/* Location */}
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center space-y-2">
            <MapPin className="w-5 h-5 text-gray-400 mb-1" />
            <p className="font-serif text-2xl text-gray-900 leading-tight">
              Monarch Imperial
            </p>
            <p className="font-sans text-xs text-gray-500 uppercase tracking-wider">
              The Main Ballroom
            </p>
          </div>
        </motion.div>

        {/* Footer Quote */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={sectionVariants} className="mb-12">
          <p className="font-script text-4xl text-gray-400 leading-relaxed">
            Join us as we begin our forever!
          </p>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div initial={{
      y: 100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 1,
      duration: 0.8
    }} className="fixed bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] left-0 w-full px-4 sm:px-6 z-50 flex justify-center">
        <button onClick={onNext} className="group relative overflow-hidden rounded-full bg-gray-900 px-10 py-5 text-white shadow-xl transition-all active:scale-95 w-full max-w-xs hover:shadow-2xl">
          <span className="relative z-10 flex items-center justify-center gap-3 font-sans text-sm font-bold tracking-[0.2em] uppercase">
            RSVP Now
            <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gray-800 transition-transform duration-300 ease-out" />
        </button>
      </motion.div>
    </div>;
}