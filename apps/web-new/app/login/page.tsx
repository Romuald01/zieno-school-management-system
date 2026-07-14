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
      setError(
        err.response?.data?.message ||
        'Invalid email or password'
      );
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
        background: '#eef2f7',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 420,
          background: '#fff',
          padding: 40,
          borderRadius: 12,
          boxShadow: '0 10px 25px rgba(0,0,0,.1)',
        }}
      >
        <h1>Zieno School Management</h1>

        <p
          style={{
            marginBottom: 20,
            color: '#666',
          }}
        >
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:'100%',
            padding:12,
            marginBottom:15,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:'100%',
            padding:12,
            marginBottom:20,
          }}
        />

        {error && (
          <p
            style={{
              color:'red',
              marginBottom:15,
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width:'100%',
            padding:14,
            cursor:'pointer',
            background:'#2563eb',
            color:'#fff',
            border:'none',
            borderRadius:8,
          }}
        >
          {loading ? 'Signing In...' : 'Login'}
        </button>
      </form>
    </main>
  );
}