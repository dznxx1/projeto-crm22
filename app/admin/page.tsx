"use client";
import { useEffect, useState } from "react";

const PLAN_COLORS: Record<string, string> = { FREE: "#6B7280", START: "#3B82F6", PRO: "#10B981", MAX: "#8B5CF6" };

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [editing, setEditing] = useState<{id:string,plan:string}|null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => { fetch("/api/admin/users").then(r => r.json()).then(setUsers); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const filtered = users.filter(u =>
    (filter === "ALL" || u.plan === filter) &&
    (u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = async () => {
    if (!editing) return;
    const r = await fetch(`/api/admin/users/${editing.id}/plan`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: editing.plan })
    });
    if (r.ok) {
      setUsers(u => u.map(x => x.id === editing.id ? { ...x, plan: editing.plan } : x));
      showToast("✅ Plano atualizado com sucesso!");
    } else { showToast("❌ Erro ao atualizar plano"); }
    setEditing(null);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0A0D14", padding: "80px 24px 40px" }}>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#1C2333", border: "1px solid #374151", borderRadius: 12, padding: "14px 20px", zIndex: 999, fontSize: 14, fontWeight: 600, color: "#F9FAFB", boxShadow: "0 10px 30px rgba(0,0,0,.5)" }}>
          {toast}
        </div>
      )}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Painel Admin</h1>
        <p style={{ color: "#9CA3AF", marginBottom: 28 }}>{users.length} usuários cadastrados</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou email..."
            style={{ flex: 1, minWidth: 200, padding: "10px 16px", background: "#1C2333", border: "1px solid #1F2937", borderRadius: 10, color: "#F9FAFB", fontSize: 14, outline: "none" }} />
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ padding: "10px 16px", background: "#1C2333", border: "1px solid #1F2937", borderRadius: 10, color: "#F9FAFB", fontSize: 14, cursor: "pointer" }}>
            <option value="ALL">Todos os planos</option>
            {["FREE","START","PRO","MAX"].map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div style={{ background: "#1C2333", borderRadius: 16, border: "1px solid #1F2937", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 600 }}>
            <thead>
              <tr style={{ background: "#111827" }}>
                {["Nome","Email","Plano","Criado em","Ação"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600, color: "#9CA3AF", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} style={{ borderTop: "1px solid #1F2937", background: i%2===0 ? "transparent" : "rgba(255,255,255,.01)" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{u.email}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: `${PLAN_COLORS[u.plan]}20`, color: PLAN_COLORS[u.plan], border: `1px solid ${PLAN_COLORS[u.plan]}40`, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>
                      {u.plan}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#6B7280" }}>{new Date(u.createdAt).toLocaleDateString("pt-BR")}</td>
                  <td style={{ padding: "14px 16px" }}>
                    {editing?.id === u.id ? (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <select value={editing.plan} onChange={e => setEditing(ed => ed ? {...ed, plan: e.target.value} : null)}
                          style={{ padding: "6px 10px", background: "#111827", border: "1px solid #374151", borderRadius: 8, color: "#F9FAFB", fontSize: 13, cursor: "pointer" }}>
                          {["FREE","START","PRO","MAX"].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <button onClick={handleSave} style={{ background: "#10B981", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Salvar</button>
                        <button onClick={() => setEditing(null)} style={{ background: "#374151", color: "#9CA3AF", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer" }}>✕</button>
                      </div>
                    ) : (
                      <button onClick={() => setEditing({id: u.id, plan: u.plan})}
                        style={{ background: "transparent", border: "1px solid #374151", borderRadius: 8, padding: "7px 14px", color: "#9CA3AF", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                        Alterar plano
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#6B7280" }}>Nenhum usuário encontrado</div>}
        </div>
      </div>
    </main>
  );
}
