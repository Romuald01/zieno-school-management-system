'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TeacherForm from '../components/TeacherForm';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);

  async function loadTeachers() {
    try {
      const response = await axios.get(
        `https://zieno-api.onrender.com/teachers?search=${search}`,
      );

      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTeacher(id: string) {
    const confirmDelete = confirm('Delete this teacher?');

    if (!confirmDelete) return;

    await axios.delete(`https://zieno-api.onrender.com/teachers/${id}`);

    loadTeachers();
  }

  useEffect(() => {
    loadTeachers();
  }, [search]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <main style={{ flex: 1 }}>
        <Topbar />
        <div style={{ padding: 30 }}>
          <h1
            style={{
              marginBottom: 5,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Teachers
          </h1>

          <p
            style={{
              color: '#777',
              marginBottom: 25,
            }}
          >
            Manage all registered teachers
          </p>

          <button
            onClick={() => {
              setEditingTeacher(null);
              setShowForm(!showForm);
            }}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '12px 22px',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              marginBottom: 25,
            }}
          >
            {showForm ? 'Close Form' : '+ Add Teacher'}
          </button>

          <br />
          <br />
          <input
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 8,
              border: '1px solid #ddd',
              marginBottom: 25,
              fontSize: 15,
            }}
          />

          <br />
          <br />
          {showForm && (
            <div
              style={{
                background: '#fff',
                padding: 25,
                borderRadius: 12,
                boxShadow: '0 5px 20px rgba(0,0,0,.08)',
                marginBottom: 30,
              }}
            >
              <TeacherForm
                teacher={editingTeacher}
                onSuccess={() => {
                  loadTeachers();
                  setShowForm(false);
                  setEditingTeacher(null);
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
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: 15,
                      borderBottom: '2px solid #eee',
                    }}
                  >
                    Staff ID
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: 15,
                      borderBottom: '2px solid #eee',
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: 15,
                      borderBottom: '2px solid #eee',
                    }}
                  >
                    Subject
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: 15,
                      borderBottom: '2px solid #eee',
                    }}
                  >
                    Phone
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: 15,
                      borderBottom: '2px solid #eee',
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: 15,
                      borderBottom: '2px solid #eee',
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td
                      style={{
                        padding: 15,
                        borderBottom: '1px solid #f1f1f1',
                      }}
                    >
                      {teacher.staffId}
                    </td>

                    <td
                      style={{
                        padding: 15,
                        borderBottom: '1px solid #f1f1f1',
                      }}
                    >
                      {teacher.firstName} {teacher.lastName}
                    </td>

                    <td
                      style={{
                        padding: 15,
                        borderBottom: '1px solid #f1f1f1',
                      }}
                    >
                      {teacher.subject}
                    </td>

                    <td
                      style={{
                        padding: 15,
                        borderBottom: '1px solid #f1f1f1',
                      }}
                    >
                      {teacher.phone}
                    </td>

                    <td
                      style={{
                        padding: 15,
                        borderBottom: '1px solid #f1f1f1',
                      }}
                    >
                      {teacher.email}
                    </td>

<td
  style={{
    padding: 15,
    borderBottom: '1px solid #f1f1f1',
    display: 'flex',
    gap: 10,
  }}
>
  <button
    onClick={() => {
      setEditingTeacher(teacher);
      setShowForm(true);
    }}
    style={{
      background: '#2563eb',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 600,
    }}
  >
    ✏ Edit
  </button>

  <button
    onClick={() => deleteTeacher(teacher.id)}
    style={{
      background: '#dc2626',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 600,
    }}
  >
    🗑 Delete
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
