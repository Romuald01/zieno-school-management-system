'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [studentCount, setStudentCount] = useState(0);
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

  async function loadStudentCount() {
    try {
      const response = await axios.get(
        'http://localhost:3001/students'
      );

      setStudentCount(response.data.length);
    } catch (error) {
      console.error(error);
    }
  }

  loadStudentCount();
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
  <div
  style={{
    marginBottom: 30,
  }}
>
  <h1
    style={{
      fontSize: 34,
      fontWeight: 'bold',
      marginBottom: 8,
    }}
  >
    Dashboard
  </h1>

  <p
    style={{
      color: '#666',
      fontSize: 16,
    }}
  >
  Welcome back, {user?.firstName || 'Admin'} 👋
  </p>
</div>

  <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
    gap: 20,
  }}
>
 <StatCard
  title="Students"
  value={studentCount.toString()}
  color="#2563eb"
/>

  <StatCard
    title="Teachers"
    value="18"
    color="#16a34a"
  />

  <StatCard
    title="Classes"
    value="10"
    color="#ea580c"
  />

  <StatCard
    title="Revenue"
    value="₦2.8M"
    color="#9333ea"
  />
</div>

<div
  style={{
    background: "white",
    padding: 25,
    borderRadius: 10,
    marginTop: 30,
    boxShadow: "0 3px 10px rgba(0,0,0,.08)",
  }}
>
  <h2>Quick Actions</h2>

  <div
    style={{
      display: "flex",
      gap: 15,
      marginTop: 20,
      flexWrap:'wrap',
    }}
  >
<button
  style={{
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  }}
>
  Add Student
</button>

    <button
      style={{
        background: '#16a34a',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Add Teacher
    </button>

    <button
      style={{
        background: '#ea580c',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Create Class
    </button>

    <button
      style={{
        background: '#9333ea',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Record Attendance
    </button>
  </div>
</div>
<div
  style={{
    background: 'white',
    padding: 25,
    borderRadius: 10,
    marginTop: 30,
    boxShadow: '0 3px 10px rgba(0,0,0,.08)',
  }}
>
  <h2>Recent Activities</h2>

  <ul
    style={{
      listStyle: 'none',
      padding: 0,
      marginTop: 20,
    }}
  >
    <li style={{ padding: '10px 0' }}>
      ✅ John Doe added as a student
    </li>

    <li style={{ padding: '10px 0' }}>
      📚 Mathematics class created
    </li>

    <li style={{ padding: '10px 0' }}>
      📅 Attendance recorded
    </li>

    <li style={{ padding: '10px 0' }}>
      👨‍🏫 New teacher account created
    </li>
  </ul>
</div>
        </div>
      </div>
    </div>
  );
}