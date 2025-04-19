import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect } from 'react';
import { Session } from 'next-auth';

// Extend the Session type to include custom properties
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: 'admin' | 'user';
    }
  }
}

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user';
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is not authenticated, redirect to login
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    // If role is required and user doesn't have it, redirect to dashboard
    if (status === 'authenticated' && requiredRole && session?.user?.role !== requiredRole) {
      router.push('/dashboard');
    }
  }, [session, status, router, requiredRole]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If authenticated and has required role (or no role required), show children
  if (status === 'authenticated' && (!requiredRole || session?.user?.role === requiredRole)) {
    return <>{children}</>;
  }

  // Default case - don't render anything while redirecting
  return null;
}

// Create a context for admin status
const AdminContext = createContext<boolean>(false);

export const useAdmin = () => useContext(AdminContext);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  return (
    <AdminContext.Provider value={isAdmin}>
      {children}
    </AdminContext.Provider>
  );
}
