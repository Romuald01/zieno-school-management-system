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
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const [today, setToday] = useState('');
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

    setToday(new Date().toLocaleDateString('en-GB'));
    async function loadDashboardCounts() {
      try {
        const [students, teachers, classes, subjects] = await Promise.all([
          axios.get('https://zieno-api.onrender.com/students'),
          axios.get('https://zieno-api.onrender.com/teachers'),
          axios.get('https://zieno-api.onrender.com/classes'),
          axios.get('https://zieno-api.onrender.com/subjects'),
        ]);

        setStudentCount(students.data.length);
        setTeacherCount(teachers.data.length);
        setClassCount(classes.data.length);
        setSubjectCount(subjects.data.length);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboardCounts();
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

      <div style={{ flex: 1 }}>
        <Topbar />

        <div style={{ padding: 30 }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
              background: '#fff',
              padding: 25,
              borderRadius: 15,
              boxShadow: '0 5px 15px rgba(0,0,0,.06)',
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 34,
                  color: '#0f172a',
                }}
              >
                Welcome back, {user?.firstName || 'Admin'} 👋
              </h1>

              <p
                style={{
                  color: '#64748b',
                  marginTop: 10,
                }}
              >
                School Management Dashboard
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h3 style={{ margin: 0 }}>
                📅 {new Date().toLocaleDateString()}
              </h3>

              <p style={{ color: '#64748b' }}>Have a productive day.</p>
            </div>
          </div>

          {/* Statistics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
              gap: 20,
              marginBottom: 30,
            }}
          >
            <StatCard
              title="Students"
              value={studentCount.toString()}
              icon="👨‍🎓"
              color="#2563eb"
            />

            <StatCard
              title="Teachers"
              value={teacherCount.toString()}
              icon="👩‍🏫"
              color="#16a34a"
            />

            <StatCard
              title="Classes"
              value={classCount.toString()}
              icon="🏫"
              color="#ea580c"
            />

            <StatCard
              title="Subjects"
              value={subjectCount.toString()}
              icon="📚"
              color="#9333ea"
            />
          </div>

          {/* Quick Actions */}
          <div
            style={{
              background: '#fff',
              padding: 25,
              borderRadius: 15,
              boxShadow: '0 8px 25px rgba(0,0,0,.08)',
              marginBottom: 30,
            }}
          >
            <div
              style={{
                marginTop: 35,
                background: '#fff',
                borderRadius: 16,
                padding: 25,
                boxShadow: '0 5px 15px rgba(0,0,0,.08)',
              }}
            >
              <h2
                style={{
                  marginBottom: 20,
                }}
              >
                Quick Actions
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
                  gap: 15,
                }}
              >
                <button
                  onClick={() => router.push('/students')}
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    padding: '15px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                    transition: '.3s',
                  }}
                >
                  👨‍🎓 Add Student
                </button>
                <button
                  onClick={() => router.push('/teachers')}
                  style={{
                    background: '#16a34a',
                    color: '#fff',
                    border: 'none',
                    padding: '15px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  👩‍🏫 Add Teacher
                </button>

                <button
                  onClick={() => router.push('/classes')}
                  style={{
                    background: '#ea580c',
                    color: '#fff',
                    border: 'none',
                    padding: '15px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  🏫 Create Class
                </button>

                <button
                  style={{
                    background: '#9333ea',
                    color: '#fff',
                    border: 'none',
                    padding: '15px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  📅 Record Attendance
                </button>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: 20,
                marginTop: 25,
              }}
            >
              <div
                style={{
                  background: '#fff',
                  padding: 20,
                  borderRadius: 15,
                  boxShadow: '0 5px 15px rgba(0,0,0,.08)',
                }}
              >
                <h3>Total Users</h3>

                <h1>{studentCount + teacherCount}</h1>
              </div>

              <div
                style={{
                  background: '#fff',
                  padding: 20,
                  borderRadius: 15,
                  boxShadow: '0 5px 15px rgba(0,0,0,.08)',
                }}
              >
                <h3>Current Session</h3>

                <h2>2025 / 2026</h2>
              </div>
              <div
                style={{
                  background: '#fff',
                  padding: 20,
                  borderRadius: 15,
                  boxShadow: '0 5px 15px rgba(0,0,0,.08)',
                }}
              >
                <h3>System Status</h3>

                <h2
                  style={{
                    color: '#16a34a',
                  }}
                >
                  ● Online
                </h2>
              </div>
            </div>

            <h2>Today's Summary</h2>

            <p>🎓 Total Students: {studentCount}</p>
            <p>👩‍🏫 Total Teachers: {teacherCount}</p>
            <p>🏫 Total Classes: {classCount}</p>
            <p>📚 Total Subjects: {subjectCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
