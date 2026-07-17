'use client';

import { useState } from 'react';
import axios from 'axios';

export default function TeacherForm({
  teacher,
  onSuccess,
}: {
  teacher?: any;
  onSuccess: () => void;
}) {
const [form, setForm] = useState({
  staffId: teacher?.staffId || '',
  firstName: teacher?.firstName || '',
  lastName: teacher?.lastName || '',
  gender: teacher?.gender || '',
  phone: teacher?.phone || '',
  email: teacher?.email || '',
  subject: teacher?.subject || '',
});

  async function submit() {
  try {
    if (teacher) {
      await axios.put(
        `http://localhost:3001/teachers/${teacher.id}`,
        form
      );
    } else {
      await axios.post(
        'http://localhost:3001/teachers',
        form
      );
    }

      setForm({
        staffId: '',
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        email: '',
        subject: '',
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Unable to save teacher');
    }
  }

  return (
  <div
  style={{
    background: '#fff',
    padding: 25,
    borderRadius: 12,
    boxShadow: '0 5px 20px rgba(0,0,0,.08)',
    marginBottom: 20,
  }}
>
<h2
  style={{
    marginBottom: 20,
    color: '#1e293b',
  }}
>
  {teacher ? 'Edit Teacher' : 'Add Teacher'}
</h2>

      <input
        placeholder="Staff ID"
        value={form.staffId}
        onChange={(e) =>
          setForm({ ...form, staffId: e.target.value })
        }
        style={{
  width: '100%',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  marginBottom: 15,
  fontSize: 15,
  boxSizing: 'border-box',
}}
      />
      <br /><br />

      <input
        placeholder="First Name"
        value={form.firstName}
        onChange={(e) =>
          setForm({ ...form, firstName: e.target.value })
        }
        style={{
  width: '100%',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  marginBottom: 15,
  fontSize: 15,
  boxSizing: 'border-box',
}}
      />
      <br /><br />

      <input
        placeholder="Last Name"
        value={form.lastName}
        onChange={(e) =>
          setForm({ ...form, lastName: e.target.value })
        }
        style={{
  width: '100%',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  marginBottom: 15,
  fontSize: 15,
  boxSizing: 'border-box',
}}
      />
      <br /><br />

      <input
        placeholder="Gender"
        value={form.gender}
        onChange={(e) =>
          setForm({ ...form, gender: e.target.value })
        }
        style={{
  width: '100%',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  marginBottom: 15,
  fontSize: 15,
  boxSizing: 'border-box',
}}
      />
      <br /><br />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
        style={{
  width: '100%',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  marginBottom: 15,
  fontSize: 15,
  boxSizing: 'border-box',
}}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        style={{
  width: '100%',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  marginBottom: 15,
  fontSize: 15,
  boxSizing: 'border-box',
}}
      />
      <br /><br />

      <input
        placeholder="Subject"
        value={form.subject}
        onChange={(e) =>
          setForm({ ...form, subject: e.target.value })
        }
        style={{
  width: '100%',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  marginBottom: 15,
  fontSize: 15,
  boxSizing: 'border-box',
}}
      />
      <br /><br />
<button
  onClick={submit}
  style={{
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 15,
  }}
>
  {teacher ? 'Update Teacher' : 'Save Teacher'}
</button>
    </div>
  );
}