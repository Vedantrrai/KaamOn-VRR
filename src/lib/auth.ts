import { User, UserRole } from './mockData';

const AUTH_KEY = 'kaamon_auth';
const USERS_KEY = 'kaamon_users';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Initialize mock users
const initializeUsers = () => {
  if (typeof window === 'undefined') return;
  
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'user@test.com',
        role: 'user',
        phone: '+91 9876543210',
        address: '123 Main St, Mumbai',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop'
      },
      {
        id: '2',
        name: 'Rajesh Kumar',
        email: 'worker@test.com',
        role: 'worker',
        phone: '+91 9876543211',
        address: '456 Worker St, Delhi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
      },
      {
        id: '3',
        name: 'Admin User',
        email: 'admin@test.com',
        role: 'admin',
        phone: '+91 9876543212',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  }
};

export const getAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null };
  }
  
  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) {
    return { isAuthenticated: false, user: null };
  }
  
  return JSON.parse(auth);
};

export const login = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
  initializeUsers();
  
  const usersData = localStorage.getItem(USERS_KEY);
  if (!usersData) {
    return { success: false, error: 'No users found' };
  }
  
  const users: User[] = JSON.parse(usersData);
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  // Mock password check (any password works)
  const authState: AuthState = {
    isAuthenticated: true,
    user
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  return { success: true, user };
};

export const signup = (name: string, email: string, password: string, role: UserRole, phone: string): { success: boolean; user?: User; error?: string } => {
  initializeUsers();
  
  const usersData = localStorage.getItem(USERS_KEY);
  const users: User[] = usersData ? JSON.parse(usersData) : [];
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already exists' };
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    role,
    phone,
    avatar: `https://images.unsplash.com/photo-${Date.now() % 10}?w=300&h=300&fit=crop`
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  const authState: AuthState = {
    isAuthenticated: true,
    user: newUser
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  return { success: true, user: newUser };
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};