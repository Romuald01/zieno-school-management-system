'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside
      style={{
        width:250,
        background:'#1e3a8a',
        color:'white',
        padding:25,
        minHeight:'100vh'
      }}
    >
      <h2>Zieno SMS</h2>

      <hr />

      <p><Link href="/dashboard">Dashboard</Link></p>

      <p><Link href="/students">Students</Link></p>

      <p><Link href="/teachers">Teachers</Link></p>

      <p><Link href="/classes">Classes</Link></p>



      <p><Link href="#">Subjects</Link></p>

      <p><Link href="#">Attendance</Link></p>

      <p><Link href="#">Exams</Link></p>

      <p><Link href="#">Results</Link></p>

      <p><Link href="#">Finance</Link></p>
    </aside>
  );
}