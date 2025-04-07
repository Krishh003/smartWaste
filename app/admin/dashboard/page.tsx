'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="text-muted-foreground">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {session?.user?.name}! As an admin, you have access to manage users and waste bins.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div 
            onClick={() => router.push('/admin/users')}
            className="bg-card text-card-foreground shadow rounded-lg border border-border cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-foreground">User Management</h3>
              <p className="text-sm text-muted-foreground">
                Add, edit, or remove users from the system.
              </p>
            </div>
          </div>
          <div 
            onClick={() => router.push('/admin/bins')}
            className="bg-card text-card-foreground shadow rounded-lg border border-border cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-foreground">Waste Bin Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage waste bin locations and configurations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 