'use client';

export default function Topbar() {
  return (
    <div
      style={{
        background: '#fff',
        padding: '18px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,.08)',
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: '#1e293b',
          }}
        >
          School Management System
        </h2>

        <small
          style={{
            color: '#64748b',
          }}
        >
          Manage your school with ease
        </small>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 15,
        }}
      >
        <div
          style={{
            width: 45,
            height: 45,
            borderRadius: '50%',
            background: '#2563eb',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          A
        </div>
      </div>
    </div>
  );
}