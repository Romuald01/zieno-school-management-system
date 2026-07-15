'use client';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function TeachersPage() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <main style={{ flex: 1 }}>
        <Topbar />

        <div style={{ padding: 30 }}>
          <h1>Teachers</h1>

          <p>Teachers module coming soon.</p>
        </div>
      </main>
    </div>
  );
}