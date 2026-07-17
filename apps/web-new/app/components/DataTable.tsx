export default function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        overflowX: 'auto',
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 8px 25px rgba(0,0,0,.08)',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr
            style={{
              background: '#f8fafc',
            }}
          >
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  textAlign: 'left',
                  padding: '18px',
                  fontSize: 14,
                  color: '#475569',
                  borderBottom: '1px solid #e2e8f0',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}