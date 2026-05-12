import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { courses, Course, Module } from '../data/modules';

export interface ProgressState {
  completedSteps: Record<string, boolean>;
  completedModules: string[];
  currentModuleId: string;
  currentCourseId: string;
  darkMode: boolean;
  markStepComplete: (moduleId: string, stepIndex: number) => void;
  markModuleComplete: (moduleId: string) => void;
  setCurrentModule: (moduleId: string) => void;
  setCurrentCourse: (courseId: string) => void;
  toggleDarkMode: () => void;
  resetProgress: () => void;
  isUnlocked: (moduleId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  getOverallProgress: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedSteps: {},
      completedModules: [],
      currentModuleId: courses[0].modules[0].id,
      currentCourseId: courses[0].id,
      darkMode: true,
      
      markStepComplete: (moduleId, stepIndex) =>
        set((state) => {
          const newCompletedSteps = {
            ...state.completedSteps,
            [`${moduleId}-${stepIndex}`]: true,
          };
          
          // Find the module in all courses
          let moduleObj: Module | undefined;
          for (const course of courses) {
            moduleObj = course.modules.find(m => m.id === moduleId);
            if (moduleObj) break;
          }

          if (moduleObj) {
            const allStepsCompleted = moduleObj.steps.every((_, idx) => newCompletedSteps[`${moduleId}-${idx}`]);
            if (allStepsCompleted && !state.completedModules.includes(moduleId)) {
              return {
                completedSteps: newCompletedSteps,
                completedModules: [...state.completedModules, moduleId],
              };
            }
          }
          
          return { completedSteps: newCompletedSteps };
        }),
        
      markModuleComplete: (moduleId) =>
        set((state) => ({
          completedModules: state.completedModules.includes(moduleId)
            ? state.completedModules
            : [...state.completedModules, moduleId],
        })),
        
      setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),
      setCurrentCourse: (courseId) => set({ currentCourseId: courseId }),
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      resetProgress: () =>
        set({ 
          completedSteps: {}, 
          completedModules: [], 
          currentModuleId: courses[0].modules[0].id,
          currentCourseId: courses[0].id 
        }),
        
      isUnlocked: (moduleId) => {
        const state = get();
        // Find which course this module belongs to
        let targetCourse: Course | undefined;
        let modIndex = -1;
        
        for (const course of courses) {
          modIndex = course.modules.findIndex(m => m.id === moduleId);
          if (modIndex !== -1) {
            targetCourse = course;
            break;
          }
        }

        if (!targetCourse) return false;

        // First module of any course is always unlocked (or maybe only the first course?)
        // Let's say first module of any course is unlocked for now.
        if (modIndex === 0) return true;
        
        // Check if previous module in the same course is completed
        const prevModId = targetCourse.modules[modIndex - 1].id;
        return state.completedModules.includes(prevModId);
      },

      getCourseProgress: (courseId) => {
        const state = get();
        const course = courses.find(c => c.id === courseId);
        if (!course) return 0;

        const totalSteps = course.modules.reduce((acc, m) => acc + m.steps.length, 0);
        const courseModuleIds = course.modules.map(m => m.id);
        const completedStepsCount = Object.keys(state.completedSteps).filter(key => {
          const modId = key.split('-').slice(0, -1).join('-');
          return courseModuleIds.includes(modId);
        }).length;

        if (totalSteps === 0) return 0;
        return Math.round((completedStepsCount / totalSteps) * 100);
      },

      getOverallProgress: () => {
        const state = get();
        const allModules = courses.flatMap(c => c.modules);
        const totalSteps = allModules.reduce((acc, m) => acc + m.steps.length, 0);
        const completedStepsCount = Object.keys(state.completedSteps).length;
        if (totalSteps === 0) return 0;
        return Math.round((completedStepsCount / totalSteps) * 100);
      }
    }),
    {
      name: 'platform-progress-storage',
    }
  )
);
