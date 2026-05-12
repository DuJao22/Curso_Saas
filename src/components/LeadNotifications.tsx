import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Award } from 'lucide-react';

const names = ['Ana S.', 'Carlos M.', 'João P.', 'Mariana L.', 'Pedro H.', 'Julia C.', 'Rafael T.', 'Beatriz F.', 'Lucas R.', 'Fernanda D.'];
const actions = [
  { text: 'acabou de garantir o Certificado!', icon: Award, color: 'text-orange-400', bg: 'bg-orange-400/20' },
  { text: 'adquiriu o Pack de Conhecimento!', icon: Sparkles, color: 'text-indigo-400', bg: 'bg-indigo-400/20' }
];

export default function LeadNotifications() {
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    let timeoutId: number;

    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      setNotification({
        id: Date.now(),
        name: randomName,
        action: randomAction
      });

      // Hide after 5 seconds, then show another after 3 to 5 seconds
      timeoutId = window.setTimeout(() => {
        setNotification(null);
        timeoutId = window.setTimeout(showNotification, Math.random() * 2000 + 3000);
      }, 5000);
    };

    // Initial timeout for the first notification
    timeoutId = window.setTimeout(showNotification, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-8 sm:right-8 z-[9999] flex flex-col items-center sm:items-end gap-2 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.a
            key={notification.id}
            href="https://seusite-ai-lp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/10 p-3 sm:p-4 rounded-2xl shadow-2xl shadow-black/80 flex items-center gap-3 sm:gap-4 cursor-pointer transition-all hover:scale-105 w-full max-w-sm sm:w-[350px] mx-auto sm:mx-0"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 ${notification.action.bg} ${notification.action.color}`}>
              <notification.action.icon size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white leading-tight truncate">
                {notification.name}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-300 leading-snug mt-0.5">
                {notification.action.text}
              </p>
            </div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-indigo-500 rounded-full animate-pulse mr-1 shrink-0"></div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
