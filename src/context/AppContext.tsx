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
}

interface AppContextType {
  user: User | null;
  jobs: Job[];
  login: (user: User) => void;
  logout: () => void;
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'proposalsCount'>) => void;
  applyToJob: (jobId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load state from localStorage
    const savedUser = localStorage.getItem('af_user');
    const savedJobs = localStorage.getItem('af_jobs');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      // Mock Initial Jobs
      const initialJobs: Job[] = [
        { id: '1', title: 'React Expert Needed for Fintech App', description: 'We are building a large scale fintech application and need a React specialist.', budget: '5000', type: 'fixed', category: 'Web Development', clientId: 'c1', clientName: 'Armen Tech', createdAt: new Date().toISOString(), proposalsCount: 12 },
        { id: '2', title: 'Mobile UI/UX Designer', description: 'Design a modern delivery app interface for the local market.', budget: '40/hr', type: 'hourly', category: 'Design', clientId: 'c2', clientName: 'FastExpress', createdAt: new Date().toISOString(), proposalsCount: 8 },
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

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'proposalsCount'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      proposalsCount: 0
    };
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('af_jobs', JSON.stringify(updatedJobs));
  };

  const applyToJob = (jobId: string) => {
    const updatedJobs = jobs.map(j => 
      j.id === jobId ? { ...j, proposalsCount: j.proposalsCount + 1 } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem('af_jobs', JSON.stringify(updatedJobs));
  };

  return (
    <AppContext.Provider value={{ user, jobs, login, logout, addJob, applyToJob }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
