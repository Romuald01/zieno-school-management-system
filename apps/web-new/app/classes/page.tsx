'use client';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function ClassesPage() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <main style={{ flex: 1 }}>
        <Topbar />

        <div style={{ padding: 30 }}>
          <h1>Classes</h1>

          <p>Classes module coming soon.</p>
        </div>
      </main>
    </div>
  );
}