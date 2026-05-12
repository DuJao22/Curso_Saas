import { motion } from 'motion/react';
import { Award, BookOpen, Clock, Lock, PlayCircle, Trophy, RefreshCcw, CheckCircle2, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';
import { courses } from '../data/modules';
import { cn } from '../lib/utils';
import React from 'react';

interface DashboardProps {
  key?: React.Key;
  onGoToModule: (moduleId: string, courseId: string) => void;
}

export default function Dashboard({ onGoToModule }: DashboardProps) {
  const { completedModules, completedSteps, getOverallProgress, resetProgress, isUnlocked, getCourseProgress, setCurrentCourse } = useProgressStore();
  const progress = getOverallProgress();

  return (
    <motion.div 
      className="max-w-6xl mx-auto p-4 sm:p-8 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Seu Aprendizado</h1>
          <p className="text-gray-400 max-w-2xl">Explore nossos cursos e acompanhe sua evolução.</p>
        </div>
        <button 
          onClick={resetProgress}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors border border-white/10"
        >
          <RefreshCcw size={14} /> Resetar Todo o Progresso
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/10 shadow-lg shadow-black/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Status Geral</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{progress}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/10 shadow-lg shadow-black/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Cursos</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">{courses.length}</span>
              <span className="text-gray-500 mb-1">Disponíveis</span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/10 shadow-lg shadow-black/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 border border-green-500/30">
            <Award size={24} />
          </div>
          <div>
             <p className="text-sm font-medium text-gray-400 mb-1">Certificados</p>
            <div className="flex items-end gap-2">
              <span className={cn("text-lg font-bold", progress === 100 ? "text-green-400" : "text-gray-500")}>
                {progress === 100 ? 'Disponíveis' : 'Em andamento'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {courses.map((course) => {
          const courseProgress = getCourseProgress(course.id);
          
          return (
            <div key={course.id} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={course.image} alt={course.title} className="w-12 h-12 object-contain hidden sm:block" />
                    <div>
                        <h2 className="text-2xl font-bold text-white">{course.title}</h2>
                        <p className="text-sm text-gray-400">{course.subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-indigo-400">{courseProgress}%</span>
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full bg-indigo-500" style={{ width: `${courseProgress}%` }} />
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {course.modules.map((mod, i) => {
                  const unlocked = isUnlocked(mod.id);
                  const isCompleted = completedModules.includes(mod.id);
                  const stepCount = mod.steps.length;
                  const completedStepCount = mod.steps.filter((_, idx) => completedSteps[`${mod.id}-${idx}`]).length;
                  const modProgress = Math.round((completedStepCount / stepCount) * 100);

                  return (
                    <motion.div
                      key={mod.id}
                      whileHover={unlocked ? { y: -2, scale: 1.01 } : {}}
                      className={cn(
                        "bg-white/[0.02] rounded-2xl p-5 border transition-all flex flex-col justify-between h-full group",
                        unlocked 
                          ? "border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.04] shadow-lg shadow-black/10" 
                          : "border-white/[0.05] opacity-50 grayscale cursor-not-allowed"
                      )}
                      onClick={() => unlocked && onGoToModule(mod.id, course.id)}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Módulo {i + 1}</span>
                            {isCompleted && <CheckCircle2 size={12} className="text-green-500" />}
                          </div>
                          <h3 className="text-base font-bold text-white flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                            {mod.title.split(': ').pop()}
                            {!unlocked && <Lock size={14} className="text-gray-500" />}
                          </h3>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-2">{mod.description}</p>
                        </div>
                        
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12",
                            isCompleted ? "bg-green-500/10 text-green-500" : unlocked ? "bg-indigo-500/10 text-indigo-400" : "bg-white/5 text-gray-600"
                        )}>
                            {isCompleted ? <CheckCircle2 size={20} /> : unlocked ? <PlayCircle size={20} /> : <Lock size={20} />}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] font-medium text-gray-500">
                        <div className="flex items-center gap-1"><Clock size={12} /> {stepCount} Aulas</div>
                        <div className="flex items-center gap-2 flex-1">
                          <div className="h-1 bg-white/10 rounded-full flex-1 overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all", isCompleted ? "bg-green-500" : "bg-indigo-500")} style={{ width: `${modProgress}%` }} />
                          </div>
                          <span>{modProgress}%</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
