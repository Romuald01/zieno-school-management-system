type StatCardProps = {
  title: string;
  value: string;
  icon: string;
  color?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color = "#2563eb",
}: StatCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        padding: "22px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 120,
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: "#666",
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          {title}
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: 34,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {value}
        </h1>
      </div>

      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 28,
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
    </div>
  );
}