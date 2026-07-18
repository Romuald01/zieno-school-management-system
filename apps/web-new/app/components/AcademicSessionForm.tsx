'use client';

import { useState } from 'react';
import axios from 'axios';

export default function AcademicSessionForm({
  session,
  onSuccess,
}: {
  session?: any;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: session?.name || '',
    isCurrent: session?.isCurrent || false,
  });

  async function submit() {
    try {
      if (session) {
        await axios.put(
          `https://zieno-api.onrender.com/academic-sessions/${session.id}`,
          form
        );
      } else {
        await axios.post(
          'https://zieno-api.onrender.com/academic-sessions',
          form
        );
      }

      onSuccess();

      setForm({
        name: '',
        isCurrent: false,
      });
    } catch (err) {
      console.error(err);
      alert('Unable to save session');
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
        {session ? 'Edit Session' : 'Add Session'}
      </h2>

      <input
        placeholder="2026/2027"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
        style={inputStyle}
      />

      <label>
        <input
          type="checkbox"
          checked={form.isCurrent}
          onChange={(e) =>
            setForm({
              ...form,
              isCurrent: e.target.checked,
            })
          }
        />

        {' '}Current Session
      </label>

      <br />
      <br />

      <button
        onClick={submit}
        style={buttonStyle}
      >
        {session ? 'Update Session' : 'Save Session'}
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