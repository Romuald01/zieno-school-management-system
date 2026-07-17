'use client';

export default function Button({
  children,
  color = '#2563eb',
  onClick,
}: {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: '#fff',
        border: 'none',
        padding: '12px 22px',
        borderRadius: 10,
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 15,
        transition: '.25s',
        boxShadow: '0 5px 15px rgba(0,0,0,.12)',
      }}
    >
      {children}
    </button>
  );
}