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
        `http://localhost:3001/students/${student.id}`,
        form
      );
    } else {
      await axios.post(
        'http://localhost:3001/students',
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
        marginBottom: 30,
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 8,
      }}
    >
      <h3>Add Student</h3>

      <input
        placeholder="Admission No"
        value={form.admissionNo}
        onChange={(e) =>
          setForm({ ...form, admissionNo: e.target.value })
        }
      />

      <br />
      <br />

      <input
        placeholder="First Name"
        value={form.firstName}
        onChange={(e) =>
          setForm({ ...form, firstName: e.target.value })
        }
      />

      <br />
      <br />

      <input
        placeholder="Last Name"
        value={form.lastName}
        onChange={(e) =>
          setForm({ ...form, lastName: e.target.value })
        }
      />

      <br />
      <br />

      <input
        placeholder="Gender"
        value={form.gender}
        onChange={(e) =>
          setForm({ ...form, gender: e.target.value })
        }
      />

      <br />
      <br />

      <input
        placeholder="Parent Name"
        value={form.parentName}
        onChange={(e) =>
          setForm({ ...form, parentName: e.target.value })
        }
      />

      <br />
      <br />

      <input
        placeholder="Parent Phone"
        value={form.parentPhone}
        onChange={(e) =>
          setForm({ ...form, parentPhone: e.target.value })
        }
      />

      <br />
      <br />

    <button onClick={saveStudent}>
  {student ? 'Update Student' : 'Save Student'}
</button>
    </div>
  );
}