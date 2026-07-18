'use client';

import { useState } from 'react';
import axios from 'axios';

export default function SubjectForm({
  subject,
  onSuccess,
}: {
  subject?: any;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: subject?.name || '',
    code: subject?.code || '',
    teacherName: subject?.teacherName || '',
    className: subject?.className || '',
  });

  async function submit() {
    try {
      if (subject) {
        await axios.put(
          `https://zieno-api.onrender.com/subjects/${subject.id}`,
          form
        );
      } else {
        await axios.post(
          'https://zieno-api.onrender.com/subjects',
          form
        );
      }

      setForm({
        name: '',
        code: '',
        teacherName: '',
        className: '',
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Unable to save subject');
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
      <h2>
        {subject ? 'Edit Subject' : 'Add Subject'}
      </h2>

      <input
        placeholder="Subject Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        style={inputStyle}
      />

      <input
        placeholder="Subject Code"
        value={form.code}
        onChange={(e) =>
          setForm({ ...form, code: e.target.value })
        }
        style={inputStyle}
      />

      <input
        placeholder="Teacher Name"
        value={form.teacherName}
        onChange={(e) =>
          setForm({
            ...form,
            teacherName: e.target.value,
          })
        }
        style={inputStyle}
      />

      <input
        placeholder="Class Name"
        value={form.className}
        onChange={(e) =>
          setForm({
            ...form,
            className: e.target.value,
          })
        }
        style={inputStyle}
      />

      <button
        onClick={submit}
        style={buttonStyle}
      >
        {subject ? 'Update Subject' : 'Save Subject'}
      </button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: 15,
  borderRadius: 8,
  border: '1px solid #ccc',
  boxSizing: 'border-box' as const,
};

const buttonStyle = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 'bold',
};