'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SubjectForm from '../components/SubjectForm';
import ActionButton from '../components/ActionButton';
import TableContainer from '../components/TableContainer';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);

  async function loadSubjects() {
    const res = await axios.get(
      `https://zieno-api.onrender.com/subjects?search=${search}`
    );

    setSubjects(res.data);
  }

  async function deleteSubject(id: string) {
    if (!confirm('Delete this subject?')) return;

    await axios.delete(`https://zieno-api.onrender.com/subjects/${id}`);

    loadSubjects();
  }

  useEffect(() => {
    loadSubjects();
  }, [search]);

  const thStyle: React.CSSProperties = {
    padding: '18px',
    textAlign: 'left',
    fontWeight: 700,
    color: '#475569',
    borderBottom: '2px solid #e5e7eb',
  };

  const tdStyle: React.CSSProperties = {
    padding: '18px',
    color: '#1e293b',
    borderBottom: '1px solid #f1f5f9',
  };

  return (
    <div
      style={{
        display: 'flex',
        background: '#f5f7fb',
        minHeight: '100vh',
      }}
    >
      <Sidebar />

  <main
  style={{
    flex: 1,
    overflowX: 'hidden',
  }}
>
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
                  fontSize: 32,
                  color: '#0f172a',
                }}
              >
                📚 Subjects
              </h1>

              <p
                style={{
                  color: '#64748b',
                  marginTop: 8,
                }}
              >
                Manage all school subjects
              </p>
            </div>

            <button
              onClick={() => {
                setEditingSubject(null);
                setShowForm(!showForm);
              }}
              style={{
                background: '#9333ea',
                color: '#fff',
                border: 'none',
                padding: '14px 22px',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 15,
              }}
            >
              {showForm ? 'Close Form' : '+ Add Subject'}
            </button>
          </div>

          {/* Search */}
          <input
            placeholder="🔍 Search Subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: 15,
              borderRadius: 10,
              border: '1px solid #ddd',
              marginBottom: 25,
              fontSize: 15,
            }}
          />

          {/* Form */}
          {showForm && (
            <div
              style={{
                background: '#fff',
                padding: 25,
                borderRadius: 15,
                boxShadow: '0 5px 15px rgba(0,0,0,.08)',
                marginBottom: 30,
              }}
            >
              <SubjectForm
                subject={editingSubject}
                onSuccess={() => {
                  loadSubjects();
                  setShowForm(false);
                  setEditingSubject(null);
                }}
              />
            </div>
          )}

          {/* Table */}
          <div
            style={{
              background: '#fff',
              borderRadius: 15,
              padding: 20,
              boxShadow: '0 8px 20px rgba(0,0,0,.08)',
              overflowX: 'auto',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#f8fafc',
                  }}
                >
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Code</th>
                  <th style={thStyle}>Teacher</th>
                  <th style={thStyle}>Class</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td
                      style={{
                        ...tdStyle,
                        fontWeight: 600,
                        color: '#2563eb',
                      }}
                    >
                      {subject.name}
                    </td>

                    <td style={tdStyle}>{subject.code}</td>

                    <td style={tdStyle}>{subject.teacherName}</td>

                    <td style={tdStyle}>{subject.className}</td>

                    <td style={tdStyle}>
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                        }}
                      >
                        <ActionButton
                          text="Edit"
                          color="#2563eb"
                          onClick={() => {
                            setEditingSubject(subject);
                            setShowForm(true);
                          }}
                        />

                        <ActionButton
                          text="Delete"
                          color="#dc2626"
                          onClick={() => deleteSubject(subject.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}

                {subjects.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: 40,
                        textAlign: 'center',
                        color: '#94a3b8',
                      }}
                    >
                      No subjects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}