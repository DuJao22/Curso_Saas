import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle2, Lock, Menu, LayoutDashboard, Award, X, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { useProgressStore } from './store/progressStore';
import { courses, modules } from './data/modules';
import { cn } from './lib/utils';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import LeadNotifications from './components/LeadNotifications';

type ViewMode = 'module' | 'dashboard' | 'certificate';

export default function App() {
  const { currentModuleId, currentCourseId, setCurrentModule, setCurrentCourse, isUnlocked, getOverallProgress, completedModules } = useProgressStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');

  const currentCourse = courses.find(c => c.id === currentCourseId) || courses[0];
  const courseModules = currentCourse.modules;
  
  const allCompleted = modules.length > 0 && completedModules.length === modules.length;

  return (
    <div className="flex flex-col h-[100dvh] w-full relative z-0">
      {/* Mesh Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none z-[-1]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none z-[-1]" />
      
      {/* Header */}
      <header className="h-16 shrink-0 border-b border-white/10 backdrop-blur-md bg-transparent flex items-center justify-between px-4 sm:px-8 z-20">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 -ml-2 rounded-md hover:bg-white/10 text-gray-300 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('dashboard')}>
            <img src="https://i.postimg.cc/kgmY092W/image-removebg-preview-(20).png" alt="Logo" className="h-[40px] sm:h-12 object-contain" />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <span className="text-xs font-medium text-gray-400">Geral</span>
            <div className="w-24 sm:w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${getOverallProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs font-bold ml-1">{getOverallProgress()}%</span>
          </div>

          <button
            onClick={() => setViewMode('dashboard')}
            className={cn("p-2 rounded-md transition-colors", viewMode === 'dashboard' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white')}
            title="Dashboard"
          >
            <LayoutDashboard size={18} />
          </button>

          <button
            onClick={() => {
              if (allCompleted) setViewMode('certificate');
            }}
            className={cn(
              "p-2 rounded-md transition-colors", 
              allCompleted 
                ? (viewMode === 'certificate' ? 'bg-indigo-500/20 text-indigo-400' : 'text-indigo-500 hover:bg-white/5')
                : 'text-gray-500 opacity-50 cursor-not-allowed'
            )}
            title="Certificado"
          >
            <Award size={18} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
        
        {/* Sidebar Overlay (Mobile) */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside 
          className={cn(
            "absolute md:relative z-30 w-72 md:w-80 h-full bg-[#0a0a0c]/80 md:bg-black/20 backdrop-blur-md border-r border-white/10 flex flex-col transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
            viewMode !== 'module' && "md:hidden" // Hide sidebar in dashboard/certificate on desktop if desired, or keep it. Let's hide it for cleaner dashboard.
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <button 
              onClick={() => setViewMode('dashboard')}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={14} /> VOLTAR AO DASHBOARD
            </button>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 hover:bg-white/10 rounded-md text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            <div className="mb-6">
                <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">CURSO ATUAL</h3>
                <h4 className="text-sm font-bold text-white line-clamp-1">{currentCourse.title}</h4>
            </div>

            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Conteúdo</h3>
            <div className="flex flex-col gap-3">
              {courseModules.map((mod, index) => {
                const unlocked = isUnlocked(mod.id);
                const isCompleted = completedModules.includes(mod.id);
                const isCurrent = currentModuleId === mod.id && viewMode === 'module';

                return (
                 <button
                   key={mod.id}
                   disabled={!unlocked}
                   onClick={() => {
                     setCurrentModule(mod.id);
                     setViewMode('module');
                     setSidebarOpen(false);
                   }}
                   className={cn(
                     "group flex items-start gap-3 p-3 text-left transition-all duration-200 border rounded-xl",
                     !unlocked 
                      ? "opacity-40 grayscale cursor-not-allowed border-transparent" 
                      : isCurrent 
                        ? "bg-white/5 border-white/10 ring-1 ring-indigo-500/50" 
                        : isCompleted
                          ? "bg-green-500/10 border-green-500/20"
                          : "bg-transparent border-transparent hover:bg-white/5",
                   )}
                 >
                   <div className="mt-0.5 shrink-0 transition-transform group-hover:scale-105">
                     {isCompleted ? (
                       <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20 text-black">
                         <CheckCircle2 size={16} strokeWidth={3} />
                       </div>
                     ) : unlocked ? (
                       <div className={cn(
                         "w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-colors", 
                         isCurrent ? "bg-indigo-600 shadow-indigo-500/20 text-white" : "bg-white/10 text-gray-400 group-hover:text-white group-hover:bg-indigo-600/50"
                       )}>
                         <BookOpen size={16} />
                       </div>
                     ) : (
                       <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                         <Lock size={16} />
                       </div>
                     )}
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className={cn(
                       "text-[10px] font-bold transition-colors truncate",
                       isCurrent ? "text-indigo-400" : isCompleted ? "text-green-400" : "text-gray-400 group-hover:text-gray-300"
                     )}>
                       MÓDULO {String(index + 1).padStart(2, '0')}
                     </p>
                     <p className={cn(
                       "text-xs font-semibold mt-0.5 line-clamp-2 transition-colors",
                       isCurrent || isCompleted ? "text-white" : "text-gray-300 group-hover:text-white"
                     )}>
                       {mod.title.split(': ').pop()}
                     </p>
                   </div>
                 </button>
                )
              })}
            </div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main id="main-content-scroll" className="flex-1 bg-white/[0.02] overflow-y-auto w-full relative flex flex-col">
          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              {viewMode === 'module' && (
                 <ModuleView key={currentModuleId} moduleId={currentModuleId} onCompleteAll={() => setViewMode('certificate')} />
              )}
              {viewMode === 'dashboard' && (
                <Dashboard 
                  key="dashboard" 
                  onGoToModule={(modId, courseId) => { 
                    setCurrentCourse(courseId);
                    setCurrentModule(modId); 
                    setViewMode('module'); 
                  }} 
                />
              )}
              {viewMode === 'certificate' && (
                <Certificate key="certificate" />
              )}
            </AnimatePresence>
          </div>
          
          {/* Footer / Status Bar - Credits */}
          <footer className="bg-black/60 backdrop-blur-md border-t border-white/10 px-4 py-4 sm:px-8 sm:h-auto flex flex-col sm:flex-row items-center justify-between z-20 shrink-0 gap-3 sm:gap-0 mt-auto relative">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left text-xs">
              <span className="text-gray-400">Desenvolvido por</span>
              <a href="https://instagram.com/dscompany1_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:bg-white/5 py-1 px-2 rounded-md transition-colors text-white font-bold tracking-tight">
                 DS Company <span className="text-indigo-400 font-mono font-medium text-[10px] mt-0.5">@dscompany1_</span>
              </a>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Sistema Online</span>
               </div>
               <div className="h-4 w-[1px] bg-white/10" />
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">v2.0.0</span>
            </div>
          </footer>
        </main>
      </div>

      <LeadNotifications />
    </div>
  );
}
