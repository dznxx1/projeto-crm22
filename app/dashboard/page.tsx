import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PLANS } from "@/lib/plans";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");
  const user = session.user as any;
  const plan = PLANS[user.plan as keyof typeof PLANS];
  const metrics = [
    { label: "Leads ativos", value: "47", color: "#3B82F6" },
    { label: "Oportunidades", value: "23", color: "#10B981" },
    { label: "Tarefas pendentes", value: "8", color: "#F59E0B" },
    { label: "Meta do mês", value: "69%", color: "#8B5CF6" },
  ];
  return (
    <main style={{ minHeight: "100vh", background: "#0A0D14", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, fontFamily: "var(--font-heading)" }}>
          Olá, {user.name?.split(" ")[0]} 👋
        </h1>
        <p style={{ color: "#9CA3AF", marginBottom: 40 }}>
          Plano ativo: <strong style={{ color: "#10B981" }}>{plan?.name}</strong>
          {" · "}{plan?.limits.users} usuário(s) · {plan?.limits.leads.toLocaleString("pt-BR")} leads
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: "#1C2333", borderRadius: 16, padding: 24, border: "1px solid #1F2937" }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: m.color, marginBottom: 6 }}>{m.value}</div>
              <div style={{ fontSize: 14, color: "#9CA3AF" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
