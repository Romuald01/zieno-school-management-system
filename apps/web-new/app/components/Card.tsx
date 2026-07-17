export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        padding: 25,
        boxShadow: '0 8px 25px rgba(0,0,0,.08)',
        marginBottom: 25,
      }}
    >
      {children}
    </div>
  );
}