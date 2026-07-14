'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.push('/login');
      return;
    }

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f5f7fb',
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
        }}
      >
        <Topbar />

        <div
          style={{
            padding: 30,
          }}
        >
          <h2
            style={{
              marginBottom: 25,
            }}
          >
            Welcome back,
            {' '}
            {user?.firstName}
            👋
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit,minmax(220px,1fr))',
              gap: 20,
            }}
          >
            <StatCard title="Students" value="245" />
            <StatCard title="Teachers" value="25" />
            <StatCard title="Parents" value="220" />
            <StatCard title="Classes" value="12" />
          </div>
        </div>
      </div>
    </div>
  );
}