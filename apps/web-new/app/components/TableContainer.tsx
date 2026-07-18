'use client';

import { ReactNode } from 'react';

export default function TableContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 15,
        padding: 20,
        boxShadow: '0 8px 20px rgba(0,0,0,.08)',
        overflowX: 'auto',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}