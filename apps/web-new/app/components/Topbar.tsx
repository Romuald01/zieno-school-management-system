'use client';

import { useEffect, useState } from 'react';

export default function Topbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      style={{
        background: 'white',
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,.1)',
      }}
    >
      <h2>Dashboard</h2>

      <div>
        <b>{user?.firstName}</b>

        <br />

        {user?.role}
      </div>
    </div>
  );
}