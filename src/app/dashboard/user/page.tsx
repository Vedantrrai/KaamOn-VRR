"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAuthState } from '@/lib/auth';
import { Booking } from '@/lib/mockData';
import { Calendar, MapPin, Clock, User, Phone, Mail, CreditCard } from 'lucide-react';

export default function UserDashboard() {
  const [authState, setAuthState] = useState(getAuthState());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuthState();
    if (!auth.isAuthenticated || auth.user?.role !== 'user') {
      router.push('/login');
      return;
    }
    setAuthState(auth);

    // Load mock bookings
    const mockBookings: Booking[] = [
      {
        id: '1',
        userId: auth.user!.id,
        workerId: '1',
        serviceId: '1',
        date: '2025-01-20',
        time: '10:00 AM',
        status: 'confirmed',
        amount: 1500,
        address: '123 Main St, Mumbai',
        paymentMethod: 'cod',
        notes: 'Kitchen sink repair'
      },
      {
        id: '2',
        userId: auth.user!.id,
        workerId: '2',
        serviceId: '2',
        date: '2025-01-18',
        time: '2:00 PM',
        status: 'completed',
        amount: 2000,
        address: '123 Main St, Mumbai',
        paymentMethod: 'cod',
        notes: 'Fan installation'
      },
      {
        id: '3',
        userId: auth.user!.id,
        workerId: '5',
        serviceId: '5',
        date: '2025-01-25',
        time: '9:00 AM',
        status: 'pending',
        amount: 1200,
        address: '123 Main St, Mumbai',
        paymentMethod: 'cod',
        notes: 'Deep cleaning'
      },
    ];
    setBookings(mockBookings);
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
              <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {authState.user.name}!</p>
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
                    <p className="text-muted-foreground text-sm">Total Bookings</p>
                    <p className="text-3xl font-bold mt-2">{bookings.length}</p>
                  </div>
                  <Calendar className="w-12 h-12 text-primary opacity-50" />
                </div>
              </Card>
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Completed</p>
                    <p className="text-3xl font-bold mt-2">{bookings.filter(b => b.status === 'completed').length}</p>
                  </div>
                  <Clock className="w-12 h-12 text-green-500 opacity-50" />
                </div>
              </Card>
              <Card className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Spent</p>
                    <p className="text-3xl font-bold mt-2">₹{bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.amount, 0)}</p>
                  </div>
                  <CreditCard className="w-12 h-12 text-blue-500 opacity-50" />
                </div>
              </Card>
            </div>

            {/* Bookings List */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Bookings</h2>
                <Button 
                  className="gradient-orange-blue text-white"
                  onClick={() => router.push('/services')}
                >
                  Book New Service
                </Button>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="p-6 glass">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold">Booking #{booking.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.address}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <CreditCard className="w-4 h-4" />
                            <span>Cash on Delivery - ₹{booking.amount}</span>
                          </div>
                        </div>
                        {booking.notes && (
                          <p className="mt-3 text-sm text-muted-foreground italic">Note: {booking.notes}</p>
                        )}
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
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