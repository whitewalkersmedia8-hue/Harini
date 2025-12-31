import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvitationPage } from '../components/InvitationPage';
import { RSVPPage } from '../components/RSVPPage';
import { RSVPAdminPage } from '../components/RSVPAdminPage';
import { FloralSplash } from '../components/FloralSplash';
import { FloatingPetals } from '../components/FloatingPetals';
export function WeddingInvitation() {
  const [showSplash, setShowSplash] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const [page, setPage] = useState(0);
  React.useEffect(() => {
    const update = () => {
      setAdminMode(window.location.hash === '#/rsvp-details');
    };
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return <div className="min-h-screen w-full bg-[#FFFEF7] overflow-x-hidden flex flex-col relative">
      {/* Background Effects */}
      <FloatingPetals />

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && <FloralSplash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center w-full relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          {adminMode && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <RSVPAdminPage />
            </motion.div>
          )}


          {!adminMode && !showSplash && page === 0 && <motion.div key="page0" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0,
          x: -100
        }} transition={{
          duration: 0.8
        }} className="w-full">
              <InvitationPage onNext={() => setPage(1)} />
            </motion.div>}

                    {!adminMode && !showSplash && page === 1 && <motion.div key="page1" initial={{
          opacity: 0,
          x: 100
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -100
        }} transition={{
          duration: 0.8
        }} className="w-full px-4 py-12 flex items-center justify-center">
              <RSVPPage />
            </motion.div>}
        </AnimatePresence>
      </main>

      {/* Navigation Dots */}
      {!showSplash && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1
    }} className="fixed bottom-[calc(env(safe-area-inset-bottom)+2rem)] left-1/2 -translate-x-1/2 flex gap-3 z-50">
          {[0, 1, 2].map(i => <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${page === i ? 'bg-gray-900 w-4' : 'bg-gray-300'}`} />)}
        </motion.div>}
    </div>;
}