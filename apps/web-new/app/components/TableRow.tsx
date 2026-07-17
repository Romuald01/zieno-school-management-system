export default function TableRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <tr
      style={{
        borderBottom: '1px solid #eee',
      }}
    >
      {children}
    </tr>
  );
}