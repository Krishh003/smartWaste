'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import { UsersList } from '@/components/users/users-list';
import { AddUserDialog } from '@/components/users/add-user-dialog';

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  const handleUserAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

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
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage system users and their roles</p>
          </div>
          <AddUserDialog onUserAdded={handleUserAdded} />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input placeholder="Search users..." />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
            <CardDescription>View and manage all users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <UsersList key={refreshKey} onRefresh={handleUserAdded} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 