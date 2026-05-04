import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'freelancer' | 'client' | 'admin' | 'agency';

export interface User {
  id: string;
  email: string;
  nickname: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  category?: string;
  experienceYears?: number;
  balance: number;
  credits: number;
  ipAddress?: string;
  registeredAt: string;
  verified: boolean;
  rating: number;
  online: boolean;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  budget: number;
  type: 'fixed' | 'hourly';
  category: string;
  deadline: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  proposalsCount: number;
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancerName: string;
  coverLetter: string;
  bidAmount: number;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface AppContextType {
  user: User | null;
  users: User[];
  jobs: Project[];
  proposals: Proposal[];
  login: (userData: User) => void;
  logout: () => void;
  addJob: (job: Partial<Project>) => void;
  applyToJob: (proposal: Partial<Proposal>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('af_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Project[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('af_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('af_user');
    }
  }, [user]);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const addJob = (job: Partial<Project>) => {
    const newJob: Project = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'open',
      createdAt: new Date().toISOString(),
      proposalsCount: 0,
      ...job
    } as Project;
    setJobs(prev => [newJob, ...prev]);
  };

  const applyToJob = (proposal: Partial<Proposal>) => {
    const newProposal: Proposal = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...proposal
    } as Proposal;
    setProposals(prev => [...prev, newProposal]);
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      users, 
      jobs, 
      proposals, 
      login, 
      logout, 
      addJob, 
      applyToJob 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
