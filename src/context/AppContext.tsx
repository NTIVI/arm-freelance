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

interface Specialist extends User {
  id: string;
  fullName: string;
  title: string;
  skills: string[];
  rating: number;
  price: string;
  avatar: string;
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
  specialists: Specialist[];
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
  const [specialists] = useState<Specialist[]>([
    { id: 's1', fullName: 'Armen Sargsyan', title: 'Senior React Developer', skills: ['React', 'TypeScript', 'Node.js'], rating: 5.0, price: '45/hr', avatar: 'AS', role: 'freelancer', email: 'armen@af.am' },
    { id: 's2', fullName: 'Ani Martirosyan', title: 'Senior UI/UX Designer', skills: ['Figma', 'UI/UX', 'Mobile Design'], rating: 4.9, price: '40/hr', avatar: 'AM', role: 'freelancer', email: 'ani@af.am' },
    { id: 's3', fullName: 'Karen Hovhannisyan', title: 'DevOps Engineer', skills: ['Docker', 'AWS', 'K8s'], rating: 5.0, price: '60/hr', avatar: 'KH', role: 'freelancer', email: 'karen@af.am' },
    { id: 's4', fullName: 'Lilit Karapetyan', title: 'Backend Lead', skills: ['Python', 'Go', 'PostgreSQL'], rating: 4.8, price: '55/hr', avatar: 'LK', role: 'freelancer', email: 'lilit@af.am' },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('af_user');
    const savedJobs = localStorage.getItem('af_jobs');
    const savedProposals = localStorage.getItem('af_proposals');
    const savedUsers = localStorage.getItem('af_users');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedProposals) setProposals(JSON.parse(savedProposals));
    if (savedUsers) setUsers(JSON.parse(savedUsers));

    if (!savedJobs) {
      const initialJobs: Job[] = [
        { id: '1', title: 'React Expert Needed for Fintech App', description: 'We are building a large scale fintech application and need a React specialist.', budget: '5000', type: 'fixed', category: 'Web Development', clientId: 'c1', clientName: 'Armen Tech', createdAt: new Date().toISOString(), proposalsCount: 1, status: 'open' },
        { id: '2', title: 'Mobile UI/UX Designer', description: 'Design a modern delivery app interface for the local market.', budget: '40/hr', type: 'hourly', category: 'Design', clientId: 'c2', clientName: 'FastExpress', createdAt: new Date().toISOString(), proposalsCount: 0, status: 'open' },
      ];
      setJobs(initialJobs);
      localStorage.setItem('af_jobs', JSON.stringify(initialJobs));
    }
  }, []);

  const login = (userData: User) => {
    const userWithDefaults = {
      ...userData,
      online: true,
      verified: userData.verified ?? false,
      completedJobsCount: userData.completedJobsCount ?? 0,
      appliedJobsCount: userData.appliedJobsCount ?? 0,
      postedJobsCount: userData.postedJobsCount ?? 0
    };
    setUser(userWithDefaults);
    localStorage.setItem('af_user', JSON.stringify(userWithDefaults));
    
    // Sync to global users list
    setUsers(prev => {
      const exists = prev.find(u => u.id === userData.id);
      let newUsers;
      if (exists) {
        newUsers = prev.map(u => u.id === userData.id ? { ...u, ...userWithDefaults } : u);
      } else {
        newUsers = [...prev, userWithDefaults];
      }
      localStorage.setItem('af_users', JSON.stringify(newUsers));
      return newUsers;
    });
  };

  const logout = () => {
    if (user) {
      setUsers(prev => {
        const newUsers = prev.map(u => u.id === user.id ? { ...u, online: false } : u);
        localStorage.setItem('af_users', JSON.stringify(newUsers));
        return newUsers;
      });
    }
    setUser(null);
    localStorage.removeItem('af_user');
  };

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'proposalsCount' | 'status'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      proposalsCount: 0,
      status: 'open'
    };
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('af_jobs', JSON.stringify(updatedJobs));

    if (user) {
      const updatedUser = { ...user, postedJobsCount: (user.postedJobsCount || 0) + 1 };
      updateProfile(updatedUser);
    }
  };

  const applyToJob = (proposalData: Omit<Proposal, 'id' | 'createdAt' | 'status'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const updatedProposals = [newProposal, ...proposals];
    setProposals(updatedProposals);
    localStorage.setItem('af_proposals', JSON.stringify(updatedProposals));

    const updatedJobs = jobs.map(j => 
      j.id === proposalData.jobId ? { ...j, proposalsCount: j.proposalsCount + 1 } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem('af_jobs', JSON.stringify(updatedJobs));

    if (user) {
      const updatedUser = { ...user, appliedJobsCount: (user.appliedJobsCount || 0) + 1 };
      updateProfile(updatedUser);
    }
  };

  const hireSpecialist = (jobId: string, freelancerId: string) => {
    const updatedJobs = jobs.map(j => 
      j.id === jobId ? { ...j, status: 'in-progress' as const, selectedFreelancerId: freelancerId } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem('af_jobs', JSON.stringify(updatedJobs));

    const updatedProposals = proposals.map(p => 
      p.jobId === jobId ? { ...p, status: p.freelancerId === freelancerId ? 'accepted' as const : 'rejected' as const } : p
    );
    setProposals(updatedProposals);
    localStorage.setItem('af_proposals', JSON.stringify(updatedProposals));
  };

  const completeJob = (jobId: string, freelancerId: string, rating: number) => {
    const updatedJobs = jobs.map(j => 
      j.id === jobId ? { ...j, status: 'completed' as const } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem('af_jobs', JSON.stringify(updatedJobs));

    setUsers(prev => {
      const newUsers = prev.map(u => {
        if (u.id === freelancerId) {
          const newCount = (u.ratingCount || 0) + 1;
          const newSum = (u.ratingSum || 0) + rating;
          return { 
            ...u, 
            ratingCount: newCount, 
            ratingSum: newSum, 
            rating: parseFloat((newSum / newCount).toFixed(1)),
            completedJobsCount: (u.completedJobsCount || 0) + 1 
          };
        }
        if (user && u.id === user.id) {
          return { ...u, completedJobsCount: (u.completedJobsCount || 0) + 1 };
        }
        return u;
      });
      localStorage.setItem('af_users', JSON.stringify(newUsers));
      return newUsers;
    });

    if (user) {
      const updatedUser = { ...user, completedJobsCount: (user.completedJobsCount || 0) + 1 };
      updateProfile(updatedUser);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('af_user', JSON.stringify(updatedUser));
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      jobs, 
      proposals, 
      specialists, 
      users,
      login, 
      logout, 
      addJob, 
      applyToJob, 
      updateProfile,
      hireSpecialist,
      completeJob
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
