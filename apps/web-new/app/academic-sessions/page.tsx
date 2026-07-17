'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AcademicSessionForm from '../components/AcademicSessionForm';

export default function AcademicSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);

  async function loadSessions() {
    try {
      const res = await axios.get(
        `http://localhost:3001/academic-sessions?search=${search}`
      );

      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteSession(id: string) {
    if (!confirm('Delete this session?')) return;

    await axios.delete(
      `http://localhost:3001/academic-sessions/${id}`
    );

    loadSessions();
  }

  useEffect(() => {
    loadSessions();
  }, [search]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <main style={{ flex: 1 }}>
        <Topbar />

        <div style={{ padding: 30 }}>
          <h1>Academic Sessions</h1>

          <button
            onClick={() => {
              setEditingSession(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? 'Close Form' : '+ Add Session'}
          </button>

          <br />
          <br />

          <input
            placeholder="Search session..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <br />
          <br />

          {showForm && (
            <AcademicSessionForm
              session={editingSession}
              onSuccess={() => {
                loadSessions();
                setShowForm(false);
                setEditingSession(null);
              }}
            />
          )}

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: 20,
            }}
          >
            <thead>
              <tr>
                <th>Session</th>
                <th>Current</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td>{session.name}</td>

                  <td>
                    {session.isCurrent ? 'Yes' : 'No'}
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        setEditingSession(session);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteSession(session.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}