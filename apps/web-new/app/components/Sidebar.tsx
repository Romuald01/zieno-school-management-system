'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
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

  const menus = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Students', href: '/students', icon: '👨‍🎓' },
    { name: 'Teachers', href: '/teachers', icon: '👩‍🏫' },
    { name: 'Classes', href: '/classes', icon: '🏫' },
    { name: 'Subjects', href: '/subjects', icon: '📚' },
  ];

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setOpen(!open)}
          style={{
            position: 'fixed',
            top: 15,
            left: 15,
            zIndex: 1001,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 20,
            cursor: 'pointer',
          }}
        >
          ☰
        </button>
      )}

      <div
        style={{
          width: 250,
          minHeight: '100vh',
          background: '#0f172a',
          color: '#fff',
          padding: 25,
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: isMobile
            ? open
              ? 0
              : -280
            : 0,
          transition: '.3s',
          zIndex: 1000,
        }}
      >
        <h2
          style={{
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          🎓 Zieno SMS
        </h2>

        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 18px',
              marginBottom: 10,
              textDecoration: 'none',
              color:
                pathname === menu.href
                  ? '#fff'
                  : '#cbd5e1',
              background:
                pathname === menu.href
                  ? '#2563eb'
                  : 'transparent',
              borderRadius: 10,
              transition: '.3s',
              fontWeight: 600,
            }}
          >
            <span>{menu.icon}</span>

            <span>{menu.name}</span>
          </Link>
        ))}
      </div>

      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.35)',
            zIndex: 999,
          }}
        />
      )}
    </>
  );
}