import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronLeft, ChevronRight, Play, CheckCircle2, Award, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

import { useProgressStore } from '../store/progressStore';
import { modules } from '../data/modules';
import { cn } from '../lib/utils';
import React from 'react';

interface ModuleViewProps {
  key?: React.Key;
  moduleId: string;
  onCompleteAll: () => void;
}

export default function ModuleView({ moduleId, onCompleteAll }: ModuleViewProps) {
  const { completedSteps, markStepComplete, markModuleComplete, isUnlocked, setCurrentModule, completedModules } = useProgressStore();
  
  const moduleIndex = modules.findIndex(m => m.id === moduleId);
  const currentModule = modules[moduleIndex];
  
  // Find first uncompleted step to open it automatically
  const defaultStepIndex = currentModule.steps.findIndex((_, idx) => !completedSteps[`${moduleId}-${idx}`]);
  const [activeStepIndex, setActiveStepIndex] = useState(defaultStepIndex === -1 ? 0 : defaultStepIndex);

  // Scroll to top on module change
  useEffect(() => {
    document.getElementById('main-content-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
    const idx = currentModule.steps.findIndex((_, id) => !completedSteps[`${moduleId}-${id}`]);
    setActiveStepIndex(idx === -1 ? 0 : idx);
  }, [moduleId, currentModule.steps, completedSteps]);

  const handleStepComplete = (stepIndex: number) => {
    markStepComplete(moduleId, stepIndex);
    
    // Check if this was the last step
    const isLastStep = stepIndex === currentModule.steps.length - 1;
    
    // Check if all steps are now complete
    const allWillBeCompleted = currentModule.steps.every((_, idx) => idx === stepIndex ? true : completedSteps[`${moduleId}-${idx}`]);

    if (allWillBeCompleted) {
      markModuleComplete(moduleId);
      triggerConfetti();
    }

    if (!isLastStep) {
      setActiveStepIndex(stepIndex + 1);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#7c3aed', '#a78bfa']
    });
  };

  const goToNextModule = () => {
    if (moduleIndex < modules.length - 1) {
      setCurrentModule(modules[moduleIndex + 1].id);
    } else {
      onCompleteAll();
    }
  };

  const goToPrevModule = () => {
    if (moduleIndex > 0) {
      setCurrentModule(modules[moduleIndex - 1].id);
    }
  };

  const isModuleFullyCompleted = completedModules.includes(moduleId);
  const nextUnlocked = isModuleFullyCompleted;

  return (
    <motion.div 
      className="max-w-5xl mx-auto p-4 sm:p-8 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-white">
          {currentModule.title}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
          {currentModule.description}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {currentModule.steps.map((step, index) => {
          const isCompleted = completedSteps[`${moduleId}-${index}`];
          const isActive = activeStepIndex === index;
          // Step is unlocked if it's the first step, or if the previous step is completed
          const isUnlocked = index === 0 || completedSteps[`${moduleId}-${index - 1}`];

          return (
            <motion.div 
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "rounded-3xl border transition-all duration-300 overflow-hidden",
                isActive 
                  ? "border-white/10 bg-white/[0.03] shadow-lg shadow-black/20" 
                  : "border-white/[0.05] bg-white/[0.01]",
                !isUnlocked && "opacity-40 grayscale cursor-not-allowed"
              )}
            >
              <button
                disabled={!isUnlocked}
                onClick={() => setActiveStepIndex(index)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-all",
                    isCompleted 
                      ? "bg-green-500 text-black shadow-lg shadow-green-500/20" 
                      : isActive 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                        : "border border-white/30 text-gray-500 group-hover:bg-white/5"
                  )}>
                    {isCompleted ? <Check size={16} strokeWidth={3} /> : <span className="text-sm font-semibold">{index + 1}</span>}
                  </div>
                  <div>
                    <h3 className={cn("font-medium", isActive || isCompleted ? "text-white" : "text-gray-400 group-hover:text-gray-300", "flex items-center gap-2")}>
                      {step.title}
                      {!isUnlocked && <Lock size={14} className="text-gray-500" />}
                    </h3>
                  </div>
                </div>
                {step.duration && (
                  <span className="hidden sm:flex text-xs font-medium text-gray-500 bg-black/40 border border-white/10 px-2 py-1 rounded-md">
                    {step.duration}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isActive && isUnlocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 sm:pl-16 pt-0 border-t border-white/5">
                      
                      <div className="prose prose-sm prose-invert max-w-none text-gray-300">
                        {step.content.map((p, i) => (
                          <p key={i} className={p.startsWith('•') ? 'ml-4 my-2 flex items-start text-sm' : 'mb-4 leading-relaxed'}>
                            {p.startsWith('•') ? (
                               <>
                                <span className="text-indigo-400 mr-2 mt-0.5 shrink-0"><CheckCircle2 size={14} /></span>
                                <span>{p.replace('• ', '')}</span>
                               </>
                            ) : p.startsWith('**') ? (
                              <strong className="text-white">{p.replace(/\*\*/g, '')}</strong>
                            ) : p}
                          </p>
                        ))}
                        
                        {step.code && (
                          <div className="my-6 rounded-xl overflow-hidden bg-black/60 border border-white/10 shadow-inner">
                            <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{step.language || 'code'}</span>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(step.code!);
                                  // Could add a toast here
                                }}
                                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                              >
                                COPIAR
                              </button>
                            </div>
                            <pre className="p-4 text-xs font-mono text-indigo-100 overflow-x-auto">
                              <code>{step.code}</code>
                            </pre>
                          </div>
                        )}

                        {step.link && (
                          <div className="my-6">
                            <a 
                              href={step.link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-sm font-bold hover:bg-indigo-600/30 transition-all group/link"
                            >
                              {step.link.text}
                              <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={(e) => {
                             e.stopPropagation();
                             handleStepComplete(index);
                          }}
                          className={cn(
                            "flex justify-center items-center gap-2 w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-xl",
                            isCompleted 
                              ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                              : "bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-500 hover:-translate-y-0.5"
                          )}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 size={16} /> Concluído
                            </>
                          ) : (
                            'Marcar como concluído'
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Module Navigation */}
      <div className="mt-12 mb-8 pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
          onClick={goToPrevModule}
          disabled={moduleIndex === 0}
          className="flex justify-center items-center gap-2 w-full sm:w-auto px-6 sm:px-4 py-3 sm:py-2 rounded-2xl sm:rounded-lg text-sm sm:text-base font-medium text-gray-400 hover:text-white bg-white/5 sm:bg-transparent hover:bg-white/10 sm:hover:bg-transparent border border-white/10 sm:border-transparent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
          Módulo Anterior
        </button>

        <button
          onClick={goToNextModule}
          disabled={!nextUnlocked}
          className={cn(
            "flex justify-center items-center gap-2 w-full sm:w-auto px-6 py-4 sm:py-3 rounded-2xl text-[15px] sm:text-sm font-bold transition-all shadow-xl",
            nextUnlocked
              ? isModuleFullyCompleted && moduleIndex === modules.length - 1
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-orange-500/20"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              : "bg-black/20 text-gray-600 border border-white/5 cursor-not-allowed"
          )}
        >
           {isModuleFullyCompleted && moduleIndex === modules.length - 1 ? (
             <>Pegar Certificado <Award size={16} /></>
           ) : (
             <>Próximo Módulo <ChevronRight size={16} /></>
           )}
        </button>
      </div>
    </motion.div>
  );
}
