'use client';

export default function ActionButton({
  text,
  color,
  onClick,
}: {
  text: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '8px 14px',
        marginRight: 10,
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 14,
      }}
    >
      {text}
    </button>
  );
}