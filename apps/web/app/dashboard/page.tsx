'use client';

export default function Dashboard() {
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : {};

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <h2>
        Welcome {user.firstName} {user.lastName}
      </h2>

      <p>Email: {user.email}</p>

      <p>Role: {user.role}</p>
    </main>
  );
}