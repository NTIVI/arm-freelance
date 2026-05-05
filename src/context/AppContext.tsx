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
  rateAMD?: number;
  rateUSD?: number;
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
    try {
      const saved = localStorage.getItem('af_user');
      if (!saved || saved === 'undefined') return null;
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return null;
    }
  });

  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Project[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const fetchData = async () => {
    try {
      // Use cache: 'no-store' and a timestamp to ensure fresh data from the server
      const t = Date.now();
      const [usersRes, jobsRes, proposalsRes] = await Promise.all([
        fetch(`/api/users?t=${t}`, { cache: 'no-store' }),
        fetch(`/api/jobs?t=${t}`, { cache: 'no-store' }),
        fetch(`/api/proposals?t=${t}`, { cache: 'no-store' })
      ]);
      
      if (!usersRes.ok || !jobsRes.ok || !proposalsRes.ok) {
        throw new Error('Server response not OK');
      }

      const usersData = await usersRes.json();
      const jobsData = await jobsRes.json();
      const proposalsData = await proposalsRes.json();
      
      setUsers(usersData);
      setJobs(jobsData);
      setProposals(proposalsData);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Polling every 5s for better sync
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('af_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('af_user');
    }
  }, [user]);

  const login = async (userData: User) => {
    setUser(userData);
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      fetchData();
    } catch (err) {
      console.error('Error syncing user', err);
    }
  };

  const logout = () => setUser(null);

  const addJob = async (job: Partial<Project>) => {
    const newJob: Project = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'open',
      createdAt: new Date().toISOString(),
      proposalsCount: 0,
      ...job
    } as Project;

    // Optimistic UI update
    setJobs(prev => [newJob, ...prev]);

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      
      if (!res.ok) throw new Error('Failed to save job to server');
      
      // Force refresh data after a small delay to ensure DB persistence
      setTimeout(fetchData, 500);
    } catch (err) {
      console.error('Error adding job', err);
      // Rollback optimistic update if failed
      fetchData();
    }
  };

  const applyToJob = async (proposal: Partial<Proposal>) => {
    const newProposal: Proposal = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...proposal
    } as Proposal;

    setProposals(prev => [...prev, newProposal]);

    try {
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProposal,
          bid: newProposal.bidAmount?.toString()
        })
      });
      
      if (!res.ok) throw new Error('Failed to save proposal');
      
      setTimeout(fetchData, 500);
    } catch (err) {
      console.error('Error applying to job', err);
      fetchData();
    }
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
