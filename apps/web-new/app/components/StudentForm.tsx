'use client';



import { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentForm({
  student,
  onSuccess,
}: {
  student?: any;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    
    admissionNo: '',
    firstName: '',
    lastName: '',
    gender: '',
    parentName: '',
    parentPhone: '',
  });

  useEffect(() => {
  if (student) {
    setForm({
      admissionNo: student.admissionNo,
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
    });
  }
}, [student]);

async function saveStudent() {
  try {
    if (student) {
      await axios.put(
        `https://zieno-api.onrender.com/students/${student.id}`,
        form
      );
    } else {
      await axios.post(
        'https://zieno-api.onrender.com/students',
        form
      );
    }

    setForm({
      admissionNo: '',
      firstName: '',
      lastName: '',
      gender: '',
      parentName: '',
      parentPhone: '',
    });

    onSuccess();
  } catch (error) {
    console.error(error);
    alert('Failed to save student.');
  }
}

  return (
 <div
  style={{
    background: '#fff',
    padding: 25,
    borderRadius: 12,
    boxShadow: '0 5px 20px rgba(0,0,0,.08)',
    marginBottom: 30,
  }}
>
      <h2
        style={{
          marginBottom: 20,
          color: '#1e293b',
        }}
      >
        {student ? 'Edit Student' : 'Add Student'}
    </h2>

      <input
  placeholder="Admission No"
  value={form.admissionNo}
  onChange={(e) =>
    setForm({
      ...form,
      admissionNo: e.target.value,
    })
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

      <br />
      <br />

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

      <br />
      <br />

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

      <br />
      <br />

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

      <br />
      <br />

      <input
        placeholder="Parent Name"
        value={form.parentName}
        onChange={(e) =>
          setForm({ ...form, parentName: e.target.value })
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

      <br />
      <br />

      <input
        placeholder="Parent Phone"
        value={form.parentPhone}
        onChange={(e) =>
          setForm({ ...form, parentPhone: e.target.value })
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

      <br />
      <br />
<button
  onClick={saveStudent}
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
  {student ? 'Update Student' : 'Save Student'}
</button>
    </div>
  );
}