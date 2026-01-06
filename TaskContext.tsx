import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Issue, Owner } from './types';
import { ISSUES_MATRIX, OWNERS } from './constants';

interface TaskContextType {
  tasks: Issue[];
  addTask: (task: Issue) => void;
  updateTask: (task: Issue) => void;
  // Modal Control
  isModalOpen: boolean;
  prefilledTask: Partial<Issue> | null;
  openTaskModal: (prefill?: Partial<Issue>) => void;
  closeTaskModal: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with the mock data from constants
  const [tasks, setTasks] = useState<Issue[]>(ISSUES_MATRIX);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledTask, setPrefilledTask] = useState<Partial<Issue> | null>(null);

  const addTask = (newTask: Issue) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (updatedTask: Issue) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const openTaskModal = (prefill?: Partial<Issue>) => {
    setPrefilledTask(prefill || null);
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
    setPrefilledTask(null);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      isModalOpen, 
      prefilledTask, 
      openTaskModal, 
      closeTaskModal 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};