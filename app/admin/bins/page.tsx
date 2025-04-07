'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Filter } from 'lucide-react';
import { BinsList } from '@/components/bins/bins-list';
import { AddBinDialog } from '@/components/bins/add-bin-dialog';

export default function AdminBinsPage() {
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
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Waste Bin Management</h1>
            <p className="text-muted-foreground">Manage and monitor all waste bins in the system</p>
          </div>
          <AddBinDialog />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input placeholder="Search bins..." />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Waste Bins</CardTitle>
            <CardDescription>Overview of all waste bins and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <BinsList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 