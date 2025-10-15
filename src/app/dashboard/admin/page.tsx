"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAuthState } from '@/lib/auth';
import { Booking, workers } from '@/lib/mockData';
import { Users, Briefcase, Calendar, DollarSign, TrendingUp, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {
  const [authState, setAuthState] = useState(getAuthState());
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuthState();
    if (!auth.isAuthenticated || auth.user?.role !== 'admin') {
      router.push('/login');
      return;
    }
    setAuthState(auth);

    // Load mock data
    const mockBookings: Booking[] = [
      {
        id: '1',
        userId: '1',
        workerId: '1',
        serviceId: '1',
        date: '2025-01-20',
        time: '10:00 AM',
        status: 'confirmed',
        amount: 1500,
        address: '123 Main St, Mumbai',
        paymentMethod: 'cod',
      },
      {
        id: '2',
        userId: '2',
        workerId: '2',
        serviceId: '2',
        date: '2025-01-22',
        time: '2:00 PM',
        status: 'confirmed',
        amount: 2000,
        address: '456 Park Ave, Delhi',
        paymentMethod: 'cod',
      },
      {
        id: '3',
        userId: '3',
        workerId: '3',
        serviceId: '3',
        date: '2025-01-15',
        time: '11:00 AM',
        status: 'completed',
        amount: 1800,
        address: '789 Oak Rd, Bangalore',
        paymentMethod: 'cod',
      },
      {
        id: '4',
        userId: '1',
        workerId: '4',
        serviceId: '4',
        date: '2025-01-18',
        time: '3:00 PM',
        status: 'completed',
        amount: 1200,
        address: '321 Elm St, Pune',
        paymentMethod: 'cod',
      },
      {
        id: '5',
        userId: '2',
        workerId: '5',
        serviceId: '5',
        date: '2025-01-25',
        time: '9:00 AM',
        status: 'pending',
        amount: 1300,
        address: '555 Pine St, Chennai',
        paymentMethod: 'cod',
      },
    ];
    setAllBookings(mockBookings);
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

  const totalRevenue = allBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.amount, 0);

  const totalUsers = 45; // Mock data
  const totalWorkers = workers.length;
  const totalBookings = allBookings.length;

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
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Platform overview and management</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold mt-2">₹{totalRevenue}</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-500 opacity-50" />
                </div>
              </Card>
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Users</p>
                    <p className="text-3xl font-bold mt-2">{totalUsers}</p>
                  </div>
                  <Users className="w-12 h-12 text-blue-500 opacity-50" />
                </div>
              </Card>
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Workers</p>
                    <p className="text-3xl font-bold mt-2">{totalWorkers}</p>
                  </div>
                  <Briefcase className="w-12 h-12 text-purple-500 opacity-50" />
                </div>
              </Card>
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Bookings</p>
                    <p className="text-3xl font-bold mt-2">{totalBookings}</p>
                  </div>
                  <Calendar className="w-12 h-12 text-orange-500 opacity-50" />
                </div>
              </Card>
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="bookings">All Bookings</TabsTrigger>
                <TabsTrigger value="workers">Workers</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
                {allBookings.map((booking) => (
                  <Card key={booking.id} className="p-6 glass">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold">Booking #{booking.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Date: </span>
                            <span className="font-semibold">{booking.date}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time: </span>
                            <span className="font-semibold">{booking.time}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Amount: </span>
                            <span className="font-semibold text-green-600">₹{booking.amount}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="workers" className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">All Workers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workers.map((worker) => (
                    <Card key={worker.id} className="p-6 glass">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={worker.avatar} 
                          alt={worker.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{worker.name}</h3>
                          <p className="text-sm text-muted-foreground">{worker.service}</p>
                          <div className="flex items-center mt-2 space-x-4 text-sm">
                            <span className="text-yellow-500">★ {worker.rating}</span>
                            <span className="text-muted-foreground">{worker.completedJobs} jobs</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              worker.availability === 'Available' 
                                ? 'bg-green-500/20 text-green-700 dark:text-green-400' 
                                : 'bg-gray-500/20 text-gray-700 dark:text-gray-400'
                            }`}>
                              {worker.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Platform Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 glass">
                    <div className="flex items-center space-x-3 mb-4">
                      <TrendingUp className="w-8 h-8 text-green-500" />
                      <h3 className="text-xl font-semibold">Booking Status</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completed</span>
                        <span className="font-semibold">{allBookings.filter(b => b.status === 'completed').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Confirmed</span>
                        <span className="font-semibold">{allBookings.filter(b => b.status === 'confirmed').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pending</span>
                        <span className="font-semibold">{allBookings.filter(b => b.status === 'pending').length}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 glass">
                    <div className="flex items-center space-x-3 mb-4">
                      <DollarSign className="w-8 h-8 text-blue-500" />
                      <h3 className="text-xl font-semibold">Revenue Breakdown</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Revenue</span>
                        <span className="font-semibold text-green-600">₹{totalRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg per Booking</span>
                        <span className="font-semibold">₹{Math.round(totalRevenue / allBookings.filter(b => b.status === 'completed').length)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pending Revenue</span>
                        <span className="font-semibold">₹{allBookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').reduce((sum, b) => sum + b.amount, 0)}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}