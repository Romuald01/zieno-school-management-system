'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ClassForm({
  classItem,
  onSuccess,
}: {
  classItem?: any;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: classItem?.name || '',
    arm: classItem?.arm || '',
    level: classItem?.level || '',
  });

  async function submit() {
    try {
      if (classItem) {
        await axios.put(
          `https://zieno-api.onrender.com/classes/${classItem.id}`,
          form
        );
      } else {
        await axios.post(
          'https://zieno-api.onrender.com/classes',
          form
        );
      }

      setForm({
        name: '',
        arm: '',
        level: '',
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Unable to save class');
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
        {classItem ? 'Edit Class' : 'Add Class'}
      </h2>

      <input
        placeholder="Class Name (e.g. JSS1)"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        style={inputStyle}
      />

      <input
        placeholder="Arm (A, B, Science...)"
        value={form.arm}
        onChange={(e) =>
          setForm({ ...form, arm: e.target.value })
        }
        style={inputStyle}
      />

      <input
        placeholder="Level (Junior/Senior)"
        value={form.level}
        onChange={(e) =>
          setForm({ ...form, level: e.target.value })
        }
        style={inputStyle}
      />

      <button
        onClick={submit}
        style={buttonStyle}
      >
        {classItem ? 'Update Class' : 'Save Class'}
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