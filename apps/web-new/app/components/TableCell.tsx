export default function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td
      style={{
        padding: '18px',
        fontSize: 15,
        color: '#334155',
      }}
    >
      {children}
    </td>
  );
}