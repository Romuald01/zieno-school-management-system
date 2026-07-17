'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Students', href: '/students', icon: '👨‍🎓' },
    { name: 'Teachers', href: '/teachers', icon: '👩‍🏫' },
    { name: 'Classes', href: '/classes', icon: '🏫' },
    { name: 'Subjects', href: '/subjects', icon: '📚' },
  ];

  return (
    <div
      style={{
        width: 250,
        minHeight: '100vh',
        background: '#0f172a',
        color: 'white',
        padding: 25,
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 18px',
            marginBottom: 10,
            textDecoration: 'none',
            color: pathname === menu.href ? '#fff' : '#cbd5e1',
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
  );
}