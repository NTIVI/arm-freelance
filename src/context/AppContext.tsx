import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'client' | 'freelancer';
  firstName?: string;
  lastName?: string;
  title?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  rating?: number;
  price?: string;
  github?: string;
  category?: string;
  experienceYears?: number;
  ip?: string;
  country?: string;
  verified?: boolean;
  online?: boolean;
  completedJobsCount?: number;
  postedJobsCount?: number;
  ratingCount?: number;
  ratingSum?: number;
}

interface Job {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  type: 'fixed' | 'hourly';
  category: string;
  clientId: string;
  clientName: string;
  createdAt: string;
  proposalsCount: number;
  status: 'open' | 'in-progress' | 'completed' | 'closed';
  selectedFreelancerId?: string;
}

interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancerName: string;
  bid: string;
  coverLetter: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface AppContextType {
  user: User | null;
  jobs: Job[];
  proposals: Proposal[];
  specialists: User[];
  users: User[];
  login: (user: User) => void;
  logout: () => void;
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'proposalsCount' | 'status'>) => void;
  applyToJob: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => void;
  updateProfile: (data: Partial<User>) => void;
  hireSpecialist: (jobId: string, freelancerId: string) => void;
  completeJob: (jobId: string, freelancerId: string, rating: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const specialists = users.filter(u => u.role === 'freelancer');

  const refreshData = async () => {
    try {
      const [uRes, jRes, pRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/jobs'),
        fetch('/api/proposals')
      ]);
      const [u, j, p] = await Promise.all([uRes.json(), jRes.json(), pRes.json()]);
      setUsers(u);
      setJobs(j);
      setProposals(p);
    } catch (e) {
      console.error('Error fetching data from API:', e);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000); // Poll every 5s for cross-browser sync
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('af_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (userData: User) => {
    const userWithDefaults = {
      ...userData,
      online: true,
      verified: userData.verified ?? false,
      completedJobsCount: userData.completedJobsCount ?? 0,
      appliedJobsCount: (userData as any).appliedJobsCount ?? 0,
      postedJobsCount: userData.postedJobsCount ?? 0
    };
    setUser(userWithDefaults);
    localStorage.setItem('af_user', JSON.stringify(userWithDefaults));
    
    setUsers(prev => {
      const exists = prev.find(u => u.id === userData.id);
      if (exists) return prev.map(u => u.id === userData.id ? { ...u, ...userWithDefaults } : u);
      return [...prev, userWithDefaults];
    });

    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userWithDefaults)
      });
    } catch (e) { console.error(e) }
  };

  const logout = async () => {
    if (user) {
      try {
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ online: false })
        });
      } catch (e) { console.error(e) }
    }
    setUser(null);
    localStorage.removeItem('af_user');
    refreshData();
  };

  const addJob = async (jobData: Omit<Job, 'id' | 'createdAt' | 'proposalsCount' | 'status'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      proposalsCount: 0,
      status: 'open'
    };
    setJobs([newJob, ...jobs]);

    if (user) {
      const updatedUser = { ...user, postedJobsCount: (user.postedJobsCount || 0) + 1 };
      updateProfile(updatedUser);
    }

    try {
      await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      refreshData();
    } catch (e) { console.error(e) }
  };

  const applyToJob = async (proposalData: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setProposals([newProposal, ...proposals]);

    setJobs(jobs.map(j => 
      j.id === proposalData.jobId ? { ...j, proposalsCount: j.proposalsCount + 1 } : j
    ));

    try {
      await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProposal)
      });
      refreshData();
    } catch (e) { console.error(e) }
  };

  const hireSpecialist = async (jobId: string, freelancerId: string) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: 'in-progress' as const, selectedFreelancerId: freelancerId } : j));
    setProposals(proposals.map(p => p.jobId === jobId ? { ...p, status: p.freelancerId === freelancerId ? 'accepted' as const : 'rejected' as const } : p));

    try {
      await Promise.all([
        fetch(`/api/jobs/${jobId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'in-progress', selectedFreelancerId: freelancerId })
        }),
        fetch(`/api/proposals/${proposals.find(p => p.jobId === jobId && p.freelancerId === freelancerId)?.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'accepted' })
        })
      ]);
      refreshData();
    } catch (e) { console.error(e) }
  };

  const completeJob = async (jobId: string, freelancerId: string, rating: number) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: 'completed' as const } : j));
    
    if (user) {
      updateProfile({ completedJobsCount: (user.completedJobsCount || 0) + 1 });
    }

    try {
      await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' })
      });
      refreshData();
    } catch (e) { console.error(e) }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('af_user', JSON.stringify(updatedUser));

    try {
      await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      refreshData();
    } catch (e) { console.error(e) }
  };

  return (
    <AppContext.Provider value={{ 
      user, jobs, proposals, specialists, users,
      login, logout, addJob, applyToJob, updateProfile, hireSpecialist, completeJob
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
