'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 async function handleLogin(e: React.FormEvent) {
  e.preventDefault();
alert("Login button clicked");
  setLoading(true);
  setError('');

  try {
    const response = await axios.post(
      'http://localhost:3001/auth/login',
      {
        email,
        password,
      },
    );

    console.log('SUCCESS:', response.data);

    localStorage.setItem(
      'accessToken',
      response.data.accessToken,
    );

    localStorage.setItem(
      'user',
      JSON.stringify(response.data.user),
    );

    router.push('/dashboard');
  } catch (err: any) {
    console.error('LOGIN ERROR:', err);
    console.error('SERVER RESPONSE:', err.response?.data);

    setError(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
}

  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f7fb',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 400,
          background: 'white',
          padding: 40,
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,.08)',
        }}
      >
        <h1 style={{ marginBottom: 10, color: 'red' }}>
     TEST LOGIN PAGE
        </h1>

        <p style={{ color: '#666', marginBottom: 25 }}>
          Sign in to continue
        </p>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: 12,
            marginBottom: 15,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: 12,
            marginBottom: 20,
          }}
        />

        {error && (
          <p style={{ color: 'red', marginBottom: 15 }}>
            {error}
          </p>
        )}

       <button
  type="button"
  onClick={() => alert("Button Works")}
  style={{
    width: '100%',
    padding: 14,
    cursor: 'pointer',
  }}
>
  Test Button
</button>
      </form>
    </main>
  );
}