import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'client' | 'freelancer';
  title?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  rating?: number;
  price?: string;
  github?: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  budget: string;
  type: 'fixed' | 'hourly';
  category: string;
  clientId: string;
  clientName: string;
  createdAt: string;
  proposalsCount: number;
  status: 'open' | 'closed';
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
}

interface AppContextType {
  user: User | null;
  jobs: Job[];
  proposals: Proposal[];
  specialists: Specialist[];
  login: (user: User) => void;
  logout: () => void;
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'proposalsCount' | 'status'>) => void;
  applyToJob: (proposal: Omit<Proposal, 'id' | 'createdAt'>) => void;
  updateProfile: (data: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
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
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedProposals) setProposals(JSON.parse(savedProposals));

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
    setUser(userData);
    localStorage.setItem('af_user', JSON.stringify(userData));
  };

  const logout = () => {
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
  };

  const applyToJob = (proposalData: Omit<Proposal, 'id' | 'createdAt'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    const updatedProposals = [newProposal, ...proposals];
    setProposals(updatedProposals);
    localStorage.setItem('af_proposals', JSON.stringify(updatedProposals));

    const updatedJobs = jobs.map(j => 
      j.id === proposalData.jobId ? { ...j, proposalsCount: j.proposalsCount + 1 } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem('af_jobs', JSON.stringify(updatedJobs));
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('af_user', JSON.stringify(updatedUser));
  };

  return (
    <AppContext.Provider value={{ user, jobs, proposals, specialists, login, logout, addJob, applyToJob, updateProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
