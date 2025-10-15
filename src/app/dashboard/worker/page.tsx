"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAuthState } from '@/lib/auth';
import { Booking } from '@/lib/mockData';
import { Calendar, MapPin, Clock, User, Phone, Mail, DollarSign, CheckCircle, XCircle } from 'lucide-react';

export default function WorkerDashboard() {
  const [authState, setAuthState] = useState(getAuthState());
  const [jobRequests, setJobRequests] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuthState();
    if (!auth.isAuthenticated || auth.user?.role !== 'worker') {
      router.push('/login');
      return;
    }
    setAuthState(auth);

    // Load mock job requests
    const mockJobs: Booking[] = [
      {
        id: '1',
        userId: '1',
        workerId: auth.user!.id,
        serviceId: '1',
        date: '2025-01-20',
        time: '10:00 AM',
        status: 'pending',
        amount: 1500,
        address: '123 Main St, Mumbai',
        paymentMethod: 'cod',
        notes: 'Kitchen sink repair needed'
      },
      {
        id: '2',
        userId: '2',
        workerId: auth.user!.id,
        serviceId: '2',
        date: '2025-01-22',
        time: '2:00 PM',
        status: 'confirmed',
        amount: 2000,
        address: '456 Park Ave, Delhi',
        paymentMethod: 'cod',
        notes: 'Ceiling fan installation'
      },
      {
        id: '3',
        userId: '3',
        workerId: auth.user!.id,
        serviceId: '1',
        date: '2025-01-15',
        time: '11:00 AM',
        status: 'completed',
        amount: 1800,
        address: '789 Oak Rd, Bangalore',
        paymentMethod: 'cod',
        notes: 'Bathroom pipe leak'
      },
      {
        id: '4',
        userId: '4',
        workerId: auth.user!.id,
        serviceId: '1',
        date: '2025-01-12',
        time: '3:00 PM',
        status: 'completed',
        amount: 1200,
        address: '321 Elm St, Pune',
        paymentMethod: 'cod'
      },
    ];
    setJobRequests(mockJobs);
  }, [router]);

  if (!authState.user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleAcceptJob = (jobId: string) => {
    setJobRequests(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, status: 'confirmed' as const } : job
      )
    );
  };

  const handleRejectJob = (jobId: string) => {
    setJobRequests(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, status: 'cancelled' as const } : job
      )
    );
  };

  const totalEarnings = jobRequests
    .filter(job => job.status === 'completed')
    .reduce((sum, job) => sum + job.amount, 0);

  const completedJobs = jobRequests.filter(job => job.status === 'completed').length;
  const pendingRequests = jobRequests.filter(job => job.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Worker Dashboard</h1>
              <p className="text-muted-foreground">Manage your job requests and earnings</p>
            </div>

            {/* Profile Card */}
            <Card className="p-6 mb-8 glass">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {authState.user.avatar ? (
                    <img src={authState.user.avatar} alt={authState.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">{authState.user.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span>{authState.user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span>{authState.user.phone}</span>
                    </div>
                    {authState.user.address && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <span>{authState.user.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Earnings</p>
                    <p className="text-3xl font-bold mt-2">₹{totalEarnings}</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-500 opacity-50" />
                </div>
              </Card>
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Completed Jobs</p>
                    <p className="text-3xl font-bold mt-2">{completedJobs}</p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-blue-500 opacity-50" />
                </div>
              </Card>
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Pending Requests</p>
                    <p className="text-3xl font-bold mt-2">{pendingRequests}</p>
                  </div>
                  <Clock className="w-12 h-12 text-yellow-500 opacity-50" />
                </div>
              </Card>
            </div>

            {/* Job Requests */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Job Requests</h2>

              <div className="space-y-4">
                {jobRequests.map((job) => (
                  <Card key={job.id} className="p-6 glass">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold">Job #{job.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                            {job.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{job.amount}</p>
                          <p className="text-xs text-muted-foreground">Cash on Delivery</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{job.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{job.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{job.address}</span>
                        </div>
                      </div>

                      {job.notes && (
                        <p className="text-sm text-muted-foreground italic">
                          Customer Note: {job.notes}
                        </p>
                      )}

                      {job.status === 'pending' && (
                        <div className="flex space-x-3 pt-2">
                          <Button 
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleAcceptJob(job.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept Job
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleRejectJob(job.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}

                      {job.status === 'confirmed' && (
                        <Button className="w-full gradient-orange-blue text-white">
                          Mark as Completed
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}