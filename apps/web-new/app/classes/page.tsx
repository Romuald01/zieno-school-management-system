'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ClassForm from '../components/ClassForm';
import ActionButton from '../components/ActionButton';

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);

  async function loadClasses() {
    try {
      const response = await axios.get(
        `http://localhost:3001/classes?search=${search}`,
      );

      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteClass(id: string) {
    const confirmDelete = confirm('Delete this class?');

    if (!confirmDelete) return;

    await axios.delete(`http://localhost:3001/classes/${id}`);

    loadClasses();
  }

  useEffect(() => {
    loadClasses();
  }, [search]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <main style={{ flex: 1 }}>
        <Topbar />

        <div style={{ padding: 30 }}>
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
                🏫 Classes
              </h1>

              <p
                style={{
                  color: '#64748b',
                  marginTop: 8,
                }}
              >
                Manage all school classes
              </p>
            </div>

            <button
              onClick={() => {
                setEditingClass(null);
                setShowForm(!showForm);
              }}
              style={{
                background: '#ea580c',
                color: '#fff',
                border: 'none',
                padding: '14px 22px',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 15,
              }}
            >
              {showForm ? 'Close Form' : '+ Add Class'}
            </button>
          </div>

          <input
            placeholder="🔍 Search class..."
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
              <ClassForm
                classItem={editingClass}
                onSuccess={() => {
                  loadClasses();
                  setShowForm(false);
                  setEditingClass(null);
                }}
              />
            </div>
          )}
          <div
            style={{
              background: '#fff',
              padding: 25,
              borderRadius: 12,
              boxShadow: '0 5px 20px rgba(0,0,0,.08)',
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
                  <th
                    style={{
                      padding: 18,
                      textAlign: 'left',
                      borderBottom: '2px solid #e5e7eb',
                    }}
                  >
                    Class
                  </th>

                  <th
                    style={{
                      padding: 18,
                      textAlign: 'left',
                      borderBottom: '2px solid #e5e7eb',
                    }}
                  >
                    Arm
                  </th>

                  <th
                    style={{
                      padding: 18,
                      textAlign: 'left',
                      borderBottom: '2px solid #e5e7eb',
                    }}
                  >
                    Level
                  </th>

                  <th
                    style={{
                      padding: 18,
                      textAlign: 'left',
                      borderBottom: '2px solid #e5e7eb',
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classItem) => (
                  <tr key={classItem.id}>
                    <td
                      style={{
                        padding: 18,
                        borderBottom: '1px solid #f1f5f9',
                        fontWeight: 600,
                        color: '#ea580c',
                      }}
                    >
                      {' '}
                      {classItem.name}
                    </td>

                    <td
                      style={{
                        padding: 18,
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
                      {classItem.arm}
                    </td>

                    <td
                      style={{
                        padding: 18,
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
                      {classItem.level}
                    </td>

                    <td
                      style={{
                        padding: 18,
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
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
                            setEditingClass(classItem);
                            setShowForm(true);
                          }}
                        />

                        <ActionButton
                          text="Delete"
                          color="#dc2626"
                          onClick={() => deleteClass(classItem.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}

                {classes.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: 30,
                        textAlign: 'center',
                        color: '#777',
                      }}
                    >
                      No classes found.
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
