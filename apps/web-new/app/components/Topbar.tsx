'use client';

import { useEffect, useState } from 'react';

export default function Topbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () =>
      window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        padding: isMobile ? '18px 20px 18px 70px' : '18px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 15,
        boxShadow: '0 2px 10px rgba(0,0,0,.08)',
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: '#1e293b',
            fontSize: isMobile ? 20 : 28,
          }}
        >
          School Management System
        </h2>

        <small
          style={{
            color: '#64748b',
            fontSize: isMobile ? 12 : 14,
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