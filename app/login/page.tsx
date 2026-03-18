"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    if (mode === "login") {
      const r = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
      if (r?.ok) router.push("/dashboard");
      else setError("Email ou senha incorretos");
    } else {
      if (form.password !== form.confirm) { setError("Senhas não coincidem"); setLoading(false); return; }
      const r = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, password: form.password }) });
      if (r.ok) { setMode("login"); setError(""); }
      else { const d = await r.json(); setError(d.error || "Erro ao criar conta"); }
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0D14", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#1C2333", borderRadius: 24, border: "1px solid #1F2937", padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>FlowCRM</h1>
          <div style={{ display: "flex", background: "#111827", borderRadius: 12, padding: 4 }}>
            {[["login","Entrar"],["register","Criar conta"]].map(([v, t]) => (
              <button key={v} onClick={() => setMode(v as any)}
                style={{ flex: 1, padding: 10, borderRadius: 10, border: "none", background: mode === v ? "#3B82F6" : "transparent", color: mode === v ? "#fff" : "#9CA3AF", fontWeight: 600, cursor: "pointer", fontSize: 14, transition: "all .2s" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome completo"
              style={{ padding: "14px 16px", background: "#111827", border: "1px solid #1F2937", borderRadius: 10, color: "#F9FAFB", fontSize: 15, outline: "none" }} />
          )}
          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email"
            style={{ padding: "14px 16px", background: "#111827", border: "1px solid #1F2937", borderRadius: 10, color: "#F9FAFB", fontSize: 15, outline: "none" }} />
          <input required type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Senha"
            style={{ padding: "14px 16px", background: "#111827", border: "1px solid #1F2937", borderRadius: 10, color: "#F9FAFB", fontSize: 15, outline: "none" }} />
          {mode === "register" && (
            <input required type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Confirmar senha"
              style={{ padding: "14px 16px", background: "#111827", border: "1px solid #1F2937", borderRadius: 10, color: "#F9FAFB", fontSize: 15, outline: "none" }} />
          )}
          {error && <p style={{ color: "#EF4444", fontSize: 13 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ padding: 15, background: "linear-gradient(135deg,#10B981,#059669)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", opacity: loading ? .7 : 1 }}>
            {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta grátis"}
          </button>
        </form>
      </div>
    </div>
  );
}
