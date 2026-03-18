"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Zap, ChevronDown, ChevronUp, Check, X, Star, Menu, ArrowRight,
  Users, Target, BarChart3, Bell, Settings, Globe, Mail, MessageCircle,
  Calendar, FileText, Layers, Shield, TrendingUp, Award, Clock,
  Briefcase, Home, Building2, Headphones, Copy, CheckCircle2, XCircle,
  PlayCircle, GitMerge, Filter, PieChart, Database, Cpu, Smartphone,
  LayoutDashboard, UserCheck, RefreshCw, Repeat, Lightbulb, Rocket
} from "lucide-react";

const PIX_PAYLOAD = "00020126580014br.gov.bcb.pix013688db2773-f09a-4119-8aef-5e35e7928fdf5204000053039865802BR5923DIEGO FERNANDES ALMEIDA6009Sao Paulo62290525REC69BA04B016F7175892606563042A97";
const WA_LINK = "https://wa.me/5516991996264";

const PLANS = {
  FREE: { name: "Free", price: 0, color: "#6B7280", gradient: "from-gray-500 to-gray-600", features: ["1 usuário","Até 100 leads","Pipeline básico","Cadastro de clientes","Tarefas básicas","Dashboard básico","Central de ajuda"], limits: { users: 1, leads: 100 } },
  START: { name: "Start", price: 39.90, color: "#3B82F6", gradient: "from-blue-500 to-blue-600", features: ["Até 2 usuários","Até 500 leads","Pipeline completo","Tarefas e lembretes","Filtros e busca","Exportação simples","Suporte por chat"], limits: { users: 2, leads: 500 } },
  PRO: { name: "Pro", price: 89.90, popular: true, color: "#10B981", gradient: "from-emerald-500 to-teal-600", features: ["Até 5 usuários","Até 3.000 leads","Automações","Follow-up automático","Relatórios avançados","Metas e desempenho","Campos personalizados","Integrações principais","Suporte prioritário"], limits: { users: 5, leads: 3000 } },
  MAX: { name: "Max", price: 169.90, color: "#8B5CF6", gradient: "from-violet-500 to-purple-600", features: ["Até 15 usuários","Até 15.000 leads","Múltiplos funis","Permissões avançadas","Relatórios estratégicos","Dashboards gerenciais","Onboarding guiado","Integrações premium","Suporte máxima prioridade"], limits: { users: 15, leads: 15000 } }
};

const ORDER_BUMPS = {
  START: { to: "PRO", diff: 50.00, benefits: ["Automações completas", "Relatórios avançados", "5 usuários simultâneos"] },
  PRO: { to: "MAX", diff: 80.00, benefits: ["Múltiplos funis", "Dashboards gerenciais", "Onboarding guiado"] }
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Bricolage+Grotesque:wght@400;600;700;800&display=swap');
  :root {
    --bg-base: #0A0D14; --bg-surface: #111827; --bg-card: #1C2333;
    --accent-blue: #3B82F6; --accent-green: #10B981; --accent-purple: #8B5CF6;
    --text-primary: #F9FAFB; --text-secondary: #9CA3AF; --text-muted: #6B7280;
    --border: #1F2937; --border-hover: #374151;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { background: var(--bg-base); font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text-primary); overflow-x: hidden; }
  h1, h2, h3 { font-family: 'Bricolage Grotesque', sans-serif; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(2.2);opacity:0} }
  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes countUp { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes bounce-in { 0%{transform:scale(0)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
  @keyframes modalIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
  @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
  .float { animation: float 4s ease-in-out infinite; }
  .pulse-ring::after { content:''; position:absolute; inset:0; border-radius:50%; border:2px solid #10B981; animation:pulse-ring 2s ease-out infinite; }
  .section-reveal { opacity:0; transform:translateY(30px); transition:all .7s cubic-bezier(.16,1,.3,1); }
  .section-reveal.visible { opacity:1; transform:translateY(0); }
  .card-hover { transition: all .25s ease; cursor:default; }
  .card-hover:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,.4); }
  .btn-primary { transition: all .2s ease; }
  .btn-primary:hover { transform:scale(1.03); filter:brightness(1.1); }
  .btn-primary:active { transform:scale(0.97); }
  .gradient-text { background: linear-gradient(135deg, #3B82F6, #10B981); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .mesh-bg { background: radial-gradient(ellipse at 20% 50%, rgba(59,130,246,.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,.06) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(139,92,246,.05) 0%, transparent 60%); }
  .glow-green { box-shadow: 0 0 30px rgba(16,185,129,.25), 0 0 60px rgba(16,185,129,.1); }
  .modal-overlay { animation: fadeIn .2s ease; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .modal-content { animation: modalIn .3s cubic-bezier(.16,1,.3,1); }
  .drawer { animation: slideIn .3s cubic-bezier(.16,1,.3,1); }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: var(--bg-base); } ::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
  input, textarea { caret-color: var(--accent-blue); }
  ::selection { background: rgba(59,130,246,.3); }
`;

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function RevealSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`section-reveal ${visible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Badge({ children, color = "#3B82F6" }) {
  return (
    <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, letterSpacing: ".5px", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function PlanBadge({ plan }) {
  const c = { FREE: "#6B7280", START: "#3B82F6", PRO: "#10B981", MAX: "#8B5CF6" };
  return <Badge color={c[plan]}>{PLANS[plan].name}</Badge>;
}

function Button({ children, variant = "primary", size = "md", onClick, style: s, disabled }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 10, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all .2s ease", border: "none", opacity: disabled ? .6 : 1 };
  const sizes = { sm: { padding: "8px 16px", fontSize: 13 }, md: { padding: "12px 24px", fontSize: 14 }, lg: { padding: "16px 32px", fontSize: 16 } };
  const variants = {
    primary: { background: "linear-gradient(135deg, #10B981, #059669)", color: "#fff", boxShadow: "0 4px 15px rgba(16,185,129,.3)" },
    blue: { background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "#fff", boxShadow: "0 4px 15px rgba(59,130,246,.3)" },
    outline: { background: "transparent", color: "#F9FAFB", border: "1px solid #374151" },
    ghost: { background: "transparent", color: "#9CA3AF" },
    danger: { background: "linear-gradient(135deg, #EF4444, #DC2626)", color: "#fff" }
  };
  return (
    <button className="btn-primary" onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...s }}>
      {children}
    </button>
  );
}

function Header({ onPlanClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const navLinks = ["Início", "Produto", "Funcionalidades", "Planos", "Quem Somos", "Serviços", "Atendimento"];
  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all .3s ease", backdropFilter: scrolled ? "blur(20px)" : "none", background: scrolled ? "rgba(10,13,20,.85)" : "transparent", borderBottom: scrolled ? "1px solid rgba(31,41,55,.8)" : "1px solid transparent" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3B82F6, #10B981)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GitMerge size={18} color="#fff" />
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: "-0.5px" }}>FlowCRM</span>
          </div>
          <nav style={{ display: "flex", gap: 4, position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="hidden-mobile">
            {navLinks.map(l => (
              <a key={l} href="#" style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 500, padding: "8px 12px", borderRadius: 8, textDecoration: "none", transition: "all .2s", display: "block" }}
                onMouseEnter={e => { e.target.style.color = "#F9FAFB"; e.target.style.background = "rgba(255,255,255,.05)"; }}
                onMouseLeave={e => { e.target.style.color = "#9CA3AF"; e.target.style.background = "transparent"; }}>
                {l}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Button variant="outline" size="sm">Entrar</Button>
            <Button variant="primary" size="sm" onClick={() => onPlanClick("FREE")}>Teste Grátis</Button>
            <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", padding: 4, display: "none" }} className="mobile-menu-btn">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="modal-overlay" style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }} onClick={() => setMobileOpen(false)}>
          <div className="drawer" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 280, background: "#111827", borderLeft: "1px solid #1F2937", padding: 24 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>FlowCRM</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer" }}><X size={20} /></button>
            </div>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ display: "block", color: "#9CA3AF", fontSize: 15, padding: "12px 0", borderBottom: "1px solid #1F2937", textDecoration: "none" }}>{l}</a>
            ))}
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <Button variant="outline">Entrar</Button>
              <Button variant="primary">Teste Grátis</Button>
            </div>
          </div>
        </div>
      )}
      <style>{`@media(max-width:768px){.hidden-mobile{display:none!important}.mobile-menu-btn{display:flex!important}}`}</style>
    </>
  );
}

function Hero({ onPlanClick }) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  useEffect(() => {
    const animate = (setter, target, duration) => {
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        setter(Math.floor(current));
        if (current >= target) clearInterval(timer);
      }, duration / steps);
    };
    setTimeout(() => { animate(setCount1, 2400, 1500); animate(setCount2, 98, 1200); animate(setCount3, 180000, 2000); }, 500);
  }, []);

  return (
    <section className="mesh-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <RevealSection>
          <div style={{ marginBottom: 16 }}>
            <Badge color="#3B82F6">CRM inteligente para equipes de vendas</Badge>
          </div>
          <h1 style={{ fontSize: "clamp(36px,4vw,58px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px" }}>
            Organize seus leads,{" "}
            <span className="gradient-text">acompanhe cada oportunidade</span>{" "}
            e transforme seu comercial em uma operação previsível.
          </h1>
          <p style={{ fontSize: 18, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 32 }}>
            Um CRM completo para captar, registrar, acompanhar e converter oportunidades com mais controle, produtividade e visão estratégica.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <Button variant="primary" size="lg" onClick={() => onPlanClick("FREE")}>
              Começar Grátis <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg">
              <PlayCircle size={18} /> Ver Demonstração
            </Button>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Sem cartão de crédito", "Implantação rápida", "Suporte especializado"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#9CA3AF" }}>
                <Check size={14} color="#10B981" /> {t}
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="float" style={{ position: "relative" }}>
            <div style={{ background: "#1C2333", borderRadius: 20, border: "1px solid #1F2937", padding: 24, boxShadow: "0 40px 80px rgba(0,0,0,.5)", overflow: "hidden" }}>
              <div style={{ background: "rgba(59,130,246,.05)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600 }}>Pipeline de Vendas</span>
                  <Badge color="#10B981">Ao vivo</Badge>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                  {[{label:"Novos", count:47, color:"#3B82F6"}, {label:"Contato", count:23, color:"#F59E0B"}, {label:"Proposta", count:15, color:"#8B5CF6"}, {label:"Fechado", count:12, color:"#10B981"}].map(s => (
                    <div key={s.label} style={{ background: "#111827", borderRadius: 8, padding: "10px 8px", textAlign: "center", border: `1px solid ${s.color}20` }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.count}</div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: "#6B7280" }}>
                  <span>Meta mensal</span><span style={{ color: "#10B981" }}>R$ 124.500 / R$ 180.000</span>
                </div>
                <div style={{ height: 8, background: "#111827", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "69%", height: "100%", background: "linear-gradient(90deg, #10B981, #059669)", borderRadius: 4, transition: "width 1.5s ease" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[{name:"Empresa Alpha Ltda", val:"R$ 24.000", stage:"Proposta", p:85},{name:"Construtora Beta", val:"R$ 18.500", stage:"Contato", p:45},{name:"Tech Soluções S/A", val:"R$ 55.000", stage:"Negociação", p:70}].map(l => (
                  <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 12, background: "#111827", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #3B82F6, #10B981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                      {l.name[0]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.name}</div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>{l.stage}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>{l.val}</div>
                      <div style={{ fontSize: 10, color: "#6B7280" }}>{l.p}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", top: -16, right: -16, background: "#1C2333", borderRadius: 12, border: "1px solid #1F2937", padding: "12px 16px", boxShadow: "0 10px 30px rgba(0,0,0,.4)" }}>
              <div style={{ fontSize: 11, color: "#6B7280" }}>Conversão</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#10B981" }}>+34%</div>
            </div>
            <div style={{ position: "absolute", bottom: -16, left: -16, background: "#1C2333", borderRadius: 12, border: "1px solid #1F2937", padding: "12px 16px", boxShadow: "0 10px 30px rgba(0,0,0,.4)" }}>
              <div style={{ fontSize: 11, color: "#6B7280" }}>Leads hoje</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#3B82F6" }}>+127</div>
            </div>
          </div>
        </RevealSection>
      </div>

      <style>{`@media(max-width:768px){section>div[style*="grid-template-columns"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function SocialProof() {
  const [ref, visible] = useInView();
  const logos = ["Construtora Nova Era", "Tech Solutions", "Grupo Imobiliário Plus", "Vendas Diretas Co.", "ConsultGroup BR", "Alpha Comercial", "Beta Serviços", "Omega Vendas"];
  return (
    <section style={{ padding: "48px 0", borderTop: "1px solid #1F2937", borderBottom: "1px solid #1F2937", background: "#111827", overflow: "hidden" }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto 32px", padding: "0 24px", display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
        {[{n: 2400, label: "empresas confiam", suffix: "+"},{n: 98, label: "satisfação", suffix: "%"},{n: 180, label: "leads gerenciados", suffix: "K+"}].map(({n, label, suffix}) => (
          <div key={label} style={{ textAlign: "center", animation: visible ? "countUp .6s ease" : "none" }}>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: "'Bricolage Grotesque',sans-serif", background: "linear-gradient(135deg,#3B82F6,#10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {suffix.startsWith("+") ? "+" : ""}{n.toLocaleString("pt-BR")}{suffix.endsWith("%") ? "%" : suffix.endsWith("+") ? "" : ""}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280" }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", gap: 40, width: "max-content", animation: "marquee 25s linear infinite" }}>
          {[...logos, ...logos].map((l, i) => (
            <div key={i} style={{ background: "#1C2333", borderRadius: 10, padding: "10px 20px", border: "1px solid #1F2937", whiteSpace: "nowrap", fontSize: 13, color: "#6B7280", fontWeight: 600 }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dores({ onPlanClick }) {
  const dores = [
    { icon: <Database size={24} />, title: "Leads espalhados", desc: "Informações em WhatsApp, planilhas, e-mail e caderno ao mesmo tempo." },
    { icon: <Bell size={24} />, title: "Follow-up esquecido", desc: "Oportunidades perdidas porque ninguém lembrou de retornar o cliente." },
    { icon: <FileText size={24} />, title: "Planilhas bagunçadas", desc: "Sem padrão, sem histórico, sem rastreabilidade de nenhum processo." },
    { icon: <Users size={24} />, title: "Equipe sem padrão", desc: "Cada vendedor trabalha de um jeito, impossível medir ou comparar." },
    { icon: <Filter size={24} />, title: "Sem visão do funil", desc: "Você não sabe onde cada oportunidade está ou o que está travando." },
    { icon: <BarChart3 size={24} />, title: "Sem dados para cobrar", desc: "Reuniões de resultado sem indicadores reais de desempenho comercial." }
  ];
  return (
    <section style={{ padding: "96px 24px", maxWidth: 1280, margin: "0 auto" }}>
      <RevealSection>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Badge color="#EF4444">Reconhece algum desses cenários?</Badge>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, marginTop: 16, marginBottom: 16, letterSpacing: "-0.5px" }}>
            Seu comercial está sangrando em <span style={{ color: "#EF4444" }}>silêncio</span>
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
            Todos esses problemas têm uma raiz comum: falta de processo. E processo se constrói com a ferramenta certa.
          </p>
        </div>
      </RevealSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 20 }}>
        {dores.map((d, i) => (
          <RevealSection key={d.title} delay={i * 80}>
            <div className="card-hover" style={{ background: "#1C2333", borderRadius: 16, padding: 24, border: "1px solid #1F2937" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(239,68,68,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#EF4444", marginBottom: 16 }}>
                {d.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{d.title}</h3>
              <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.6 }}>{d.desc}</p>
            </div>
          </RevealSection>
        ))}
      </div>
      <RevealSection delay={300}>
        <div style={{ textAlign: "center", marginTop: 48, padding: "32px", background: "linear-gradient(135deg, rgba(59,130,246,.1), rgba(16,185,129,.05))", borderRadius: 16, border: "1px solid rgba(59,130,246,.2)" }}>
          <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
            Seu comercial não precisa funcionar no improviso.
          </p>
          <Button variant="primary" size="lg" onClick={() => onPlanClick("PRO")}>
            Quero organizar agora <ArrowRight size={18} />
          </Button>
        </div>
      </RevealSection>
    </section>
  );
}

function Transformacao() {
  const befores = ["Leads perdidos no WhatsApp", "Follow-up no boca a boca", "Planilhas desatualizadas", "Sem visão do funil", "Reuniões sem dados", "Equipe perdida"];
  const afters = ["Pipeline centralizado e visual", "Lembretes e automações", "CRM atualizado em tempo real", "Funil com métricas claras", "Dashboards estratégicos", "Equipe alinhada e produtiva"];
  return (
    <section style={{ padding: "80px 24px", background: "#111827" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
              A <span className="gradient-text">transformação</span> que seu comercial merece
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center" }}>
          <RevealSection>
            <div style={{ background: "#1C2333", borderRadius: 16, padding: 28, border: "1px solid rgba(239,68,68,.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <XCircle size={24} color="#EF4444" />
                <span style={{ fontWeight: 700, fontSize: 18, color: "#EF4444" }}>ANTES</span>
              </div>
              {befores.map(b => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #1F2937" }}>
                  <X size={14} color="#EF4444" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#9CA3AF" }}>{b}</span>
                </div>
              ))}
            </div>
          </RevealSection>
          <RevealSection delay={150}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #10B981)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(59,130,246,.3)" }}>
                <ArrowRight size={24} color="#fff" />
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={300}>
            <div style={{ background: "#1C2333", borderRadius: 16, padding: 28, border: "1px solid rgba(16,185,129,.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <CheckCircle2 size={24} color="#10B981" />
                <span style={{ fontWeight: 700, fontSize: 18, color: "#10B981" }}>DEPOIS</span>
              </div>
              {afters.map(a => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #1F2937" }}>
                  <Check size={14} color="#10B981" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#F9FAFB" }}>{a}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
      <style>{`@media(max-width:768px){section>div>div[style*="grid-template-columns: 1fr auto 1fr"]{grid-template-columns:1fr!important}div[style*="display:flex;flex-direction:column;align-items:center"]{transform:rotate(90deg)}}`}</style>
    </section>
  );
}

function Funcionalidades() {
  const features = [
    { icon: <Users size={22}/>, name: "Gestão de Leads", desc: "Capture e organize todos os seus leads em um só lugar" },
    { icon: <LayoutDashboard size={22}/>, name: "Pipeline Visual", desc: "Visualize o funil de vendas com arrastar e soltar" },
    { icon: <UserCheck size={22}/>, name: "Cadastro de Clientes", desc: "Ficha completa com histórico de todas as interações" },
    { icon: <Clock size={22}/>, name: "Histórico Completo", desc: "Registro detalhado de cada contato e negociação" },
    { icon: <Bell size={22}/>, name: "Tarefas e Follow-up", desc: "Crie lembretes e nunca perca uma oportunidade" },
    { icon: <Zap size={22}/>, name: "Automações", desc: "Automatize tarefas repetitivas e ganhe tempo" },
    { icon: <BarChart3 size={22}/>, name: "Relatórios", desc: "Visualize métricas e KPIs do seu comercial" },
    { icon: <Users size={22}/>, name: "Gestão de Equipe", desc: "Acompanhe a performance de cada vendedor" },
    { icon: <Settings size={22}/>, name: "Campos Personalizados", desc: "Adapte o CRM ao seu processo de vendas" },
    { icon: <Filter size={22}/>, name: "Filtros e Segmentação", desc: "Encontre os leads certos no momento certo" },
    { icon: <MessageCircle size={22}/>, name: "Integração WhatsApp", desc: "Registre conversas direto no CRM" },
    { icon: <Mail size={22}/>, name: "Integração E-mail", desc: "Conecte sua caixa de entrada ao pipeline" },
    { icon: <Layers size={22}/>, name: "Funis Personalizados", desc: "Crie múltiplos pipelines para cada produto" },
    { icon: <Bell size={22}/>, name: "Lembretes e Notificações", desc: "Alertas inteligentes para não perder prazos" },
    { icon: <PieChart size={22}/>, name: "Dashboard Gerencial", desc: "Visão executiva do seu comercial em tempo real" }
  ];
  const colors = ["#3B82F6","#10B981","#8B5CF6","#F59E0B","#EF4444"];
  return (
    <section style={{ padding: "96px 24px", maxWidth: 1280, margin: "0 auto" }}>
      <RevealSection>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Badge color="#8B5CF6">Funcionalidades</Badge>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, marginTop: 16, marginBottom: 12, letterSpacing: "-0.5px" }}>
            Tudo que você precisa para <span className="gradient-text">vender mais</span>
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>15 funcionalidades poderosas integradas numa plataforma intuitiva</p>
        </div>
      </RevealSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 16 }}>
        {features.map((f, i) => (
          <RevealSection key={f.name} delay={Math.floor(i/3) * 80}>
            <div className="card-hover" style={{ background: "#1C2333", borderRadius: 14, padding: 20, border: "1px solid #1F2937" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${colors[i%5]}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors[i%5], marginBottom: 12 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.name}</h3>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function ComoFunciona() {
  const steps = [
    { n: "01", icon: <Rocket size={28}/>, title: "Cadastre-se", desc: "Crie sua conta em menos de 2 minutos, sem cartão de crédito." },
    { n: "02", icon: <Settings size={28}/>, title: "Configure seu pipeline", desc: "Monte seu funil de vendas personalizado para o seu negócio." },
    { n: "03", icon: <Users size={28}/>, title: "Importe seus leads", desc: "Traga seus contatos de planilhas ou integrações com um clique." },
    { n: "04", icon: <Zap size={28}/>, title: "Ative automações", desc: "Configure lembretes e follow-ups automáticos inteligentes." },
    { n: "05", icon: <TrendingUp size={28}/>, title: "Acompanhe resultados", desc: "Veja dashboards com métricas em tempo real e tome decisões." }
  ];
  return (
    <section style={{ padding: "80px 24px", background: "#111827" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Badge color="#F59E0B">Simples de usar</Badge>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, marginTop: 16, letterSpacing: "-0.5px" }}>
              Como o <span className="gradient-text">FlowCRM</span> funciona
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 24, position: "relative" }}>
          {steps.map((s, i) => (
            <RevealSection key={s.n} delay={i * 100}>
              <div style={{ textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F620, #10B98120)", border: "1px solid #3B82F640", marginBottom: 16 }}>
                  <div style={{ color: "#3B82F6" }}>{s.icon}</div>
                  <div style={{ position: "absolute", top: -8, right: -8, width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#10B981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{s.n}</div>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Segmentos() {
  const segs = [
    { icon: <Briefcase size={28}/>, title: "Prestadores de Serviço", desc: "Organize propostas, contratos e follow-ups de clientes com agilidade." },
    { icon: <Home size={28}/>, title: "Imobiliárias", desc: "Gerencie leads, visitas e funil de vendas de imóveis em um só lugar." },
    { icon: <Lightbulb size={28}/>, title: "Consultorias", desc: "Controle o pipeline de projetos e acompanhe cada fase da negociação." },
    { icon: <Target size={28}/>, title: "Times de Vendas", desc: "Métricas individuais e coletivas para times comerciais de alta performance." },
    { icon: <Building2 size={28}/>, title: "Pequenas Empresas", desc: "Soluções simples e poderosas para empresas que estão crescendo." },
    { icon: <Globe size={28}/>, title: "B2B em Crescimento", desc: "Escale seu processo comercial sem perder a qualidade no atendimento." }
  ];
  return (
    <section style={{ padding: "80px 24px", maxWidth: 1280, margin: "0 auto" }}>
      <RevealSection>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Badge color="#10B981">Para quem serve</Badge>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, marginTop: 16, marginBottom: 12, letterSpacing: "-0.5px" }}>
            Feito para <span className="gradient-text">empresas reais</span>
          </h2>
        </div>
      </RevealSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 20 }}>
        {segs.map((s, i) => (
          <RevealSection key={s.title} delay={i * 80}>
            <div className="card-hover" style={{ background: "#1C2333", borderRadius: 16, padding: 28, border: "1px solid #1F2937", display: "flex", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(16,185,129,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981", flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function Comparativo() {
  const rows = [
    "Histórico completo", "Automações", "Relatórios em tempo real",
    "Multiusuário", "Integração com WhatsApp", "Follow-up automático",
    "Suporte dedicado", "Funis personalizados", "Metas e indicadores"
  ];
  return (
    <section style={{ padding: "80px 24px", background: "#111827" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Badge color="#EF4444">Planilha vs CRM</Badge>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 800, marginTop: 16, letterSpacing: "-0.5px" }}>
              Por que planilhas <span style={{ color: "#EF4444" }}>não bastam</span>
            </h2>
          </div>
        </RevealSection>
        <RevealSection delay={150}>
          <div style={{ background: "#1C2333", borderRadius: 16, border: "1px solid #1F2937", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "16px 24px", background: "#111827", borderBottom: "1px solid #1F2937" }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Recurso</span>
              <span style={{ textAlign: "center", fontSize: 14, color: "#6B7280", fontWeight: 600 }}>📊 Planilha</span>
              <span style={{ textAlign: "center", fontSize: 14, color: "#10B981", fontWeight: 700 }}>⚡ FlowCRM</span>
            </div>
            {rows.map((r, i) => (
              <div key={r} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "14px 24px", borderBottom: i < rows.length - 1 ? "1px solid #1F2937" : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.01)" }}>
                <span style={{ fontSize: 14, color: "#9CA3AF" }}>{r}</span>
                <div style={{ textAlign: "center" }}><X size={16} color="#EF4444" style={{ margin: "0 auto" }} /></div>
                <div style={{ textAlign: "center" }}><Check size={16} color="#10B981" style={{ margin: "0 auto" }} /></div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function Planos({ onPlanClick }) {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="planos" style={{ padding: "96px 24px", maxWidth: 1280, margin: "0 auto" }}>
      <RevealSection>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Badge color="#10B981">Preços transparentes</Badge>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, marginTop: 16, marginBottom: 12, letterSpacing: "-0.5px" }}>
            Escolha o plano <span className="gradient-text">ideal para você</span>
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 17, marginBottom: 24 }}>Sem taxas ocultas, sem surpresas. Cancele quando quiser.</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#1C2333", borderRadius: 12, padding: "8px 16px", border: "1px solid #1F2937" }}>
            <span style={{ fontSize: 14, color: annual ? "#6B7280" : "#F9FAFB", fontWeight: 600 }}>Mensal</span>
            <button onClick={() => setAnnual(!annual)} style={{ width: 44, height: 24, borderRadius: 12, background: annual ? "#10B981" : "#374151", border: "none", cursor: "pointer", position: "relative", transition: "background .2s" }}>
              <div style={{ position: "absolute", top: 3, left: annual ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
            </button>
            <span style={{ fontSize: 14, color: annual ? "#F9FAFB" : "#6B7280", fontWeight: 600 }}>Anual</span>
            {annual && <Badge color="#10B981">-20%</Badge>}
          </div>
        </div>
      </RevealSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 20 }}>
        {Object.entries(PLANS).map(([key, plan], i) => (
          <RevealSection key={key} delay={i * 80}>
            <div className={`card-hover ${plan.popular ? "glow-green" : ""}`}
              style={{ background: "#1C2333", borderRadius: 20, padding: 28, border: plan.popular ? "2px solid #10B981" : "1px solid #1F2937", position: "relative", height: "100%" }}>
              {plan.popular && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#10B981,#059669)", borderRadius: 20, padding: "4px 16px", fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                  ⭐ Mais Popular
                </div>
              )}
              <div style={{ marginBottom: 20 }}>
                <PlanBadge plan={key} />
                <div style={{ marginTop: 16 }}>
                  {plan.price === 0 ? (
                    <span style={{ fontSize: 40, fontWeight: 800, fontFamily: "'Bricolage Grotesque',sans-serif" }}>Grátis</span>
                  ) : (
                    <>
                      <span style={{ fontSize: 14, color: "#9CA3AF", verticalAlign: "super", lineHeight: 1 }}>R$</span>
                      <span style={{ fontSize: 44, fontWeight: 800, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                        {(annual ? plan.price * 0.8 : plan.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                      <span style={{ fontSize: 14, color: "#9CA3AF" }}>/mês</span>
                    </>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{plan.limits.users} usuário{plan.limits.users > 1 ? "s" : ""} • {plan.limits.leads.toLocaleString("pt-BR")} leads</p>
              </div>
              <div style={{ marginBottom: 24 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid rgba(31,41,55,.7)", fontSize: 13, color: "#D1D5DB" }}>
                    <Check size={13} color="#10B981" style={{ flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <Button variant={plan.popular ? "primary" : key === "FREE" ? "ghost" : "blue"} onClick={() => onPlanClick(key)} style={{ width: "100%", justifyContent: "center" }}>
                {key === "FREE" ? "Começar Grátis" : "Assinar agora"}
              </Button>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function Depoimentos() {
  const depos = [
    { name: "Marcos Oliveira", role: "Diretor Comercial", company: "Alpha Soluções", text: "Desde que implantamos o FlowCRM, nossa taxa de conversão aumentou 47%. O acompanhamento do pipeline ficou muito mais claro para toda a equipe.", rating: 5 },
    { name: "Fernanda Lima", role: "Gerente de Vendas", company: "TechGroup BR", text: "Finalmente consigo ver em tempo real o que cada vendedor está fazendo. Os relatórios do FlowCRM transformaram nossas reuniões de resultado.", rating: 5 },
    { name: "Ricardo Santos", role: "CEO", company: "Imobiliária Premium", text: "O suporte é impecável e a plataforma é intuitiva. Em uma semana já estávamos operando e em um mês já vimos resultados concretos.", rating: 5 }
  ];
  return (
    <section style={{ padding: "80px 24px", background: "#111827" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Badge color="#F59E0B">Depoimentos reais</Badge>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, marginTop: 16, letterSpacing: "-0.5px" }}>
              O que nossos clientes dizem
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {depos.map((d, i) => (
            <RevealSection key={d.name} delay={i * 100}>
              <div className="card-hover" style={{ background: "#1C2333", borderRadius: 16, padding: 28, border: "1px solid #1F2937" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array(d.rating).fill(0).map((_, j) => <Star key={j} size={16} color="#F59E0B" fill="#F59E0B" />)}
                </div>
                <p style={{ fontSize: 15, color: "#D1D5DB", lineHeight: 1.7, marginBottom: 20 }}>"{d.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #10B981)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>
                    {d.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>{d.role} • {d.company}</div>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Preciso de cartão de crédito para começar?", a: "Não! O plano Free é totalmente gratuito e não exige cartão de crédito. Você pode criar sua conta agora mesmo e começar a usar imediatamente." },
    { q: "Como funciona o pagamento via PIX?", a: "Ao escolher seu plano, exibimos um QR Code e o código PIX para copiar e colar. Após o pagamento, envie o comprovante via WhatsApp e ativamos seu plano em minutos." },
    { q: "Posso mudar de plano a qualquer momento?", a: "Sim! Você pode fazer upgrade ou downgrade do seu plano quando quiser. Valores são calculados proporcionalmente ao tempo restante." },
    { q: "Meus dados ficam seguros no FlowCRM?", a: "Absolutamente. Usamos criptografia de ponta a ponta, backups diários automáticos e servidores com certificação de segurança. Seus dados são 100% seus." },
    { q: "O FlowCRM funciona no celular?", a: "Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em smartphones e tablets, sem necessidade de app adicional." },
    { q: "Quantos usuários posso ter no plano?", a: "Depende do plano: Free (1), Start (2), Pro (5) e Max (15). Precisa de mais? Fale conosco para uma proposta personalizada." },
    { q: "Há integração com WhatsApp?", a: "Sim! Você pode registrar conversas do WhatsApp diretamente no CRM, criar lembretes de retorno e enviar mensagens pré-configuradas." },
    { q: "Como funciona o suporte?", a: "Todos os planos têm acesso à central de ajuda. Start inclui suporte por chat, Pro tem suporte prioritário e Max conta com máxima prioridade." },
    { q: "Posso importar minha lista de clientes?", a: "Sim! Aceite planilhas Excel e CSV para importação. Nossa equipe pode auxiliar na migração sem perda de dados." },
    { q: "Existe contrato de fidelidade?", a: "Não! Nossos planos são mensais e você pode cancelar quando quiser, sem multas ou burocracias." }
  ];
  return (
    <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <RevealSection>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Badge color="#3B82F6">Dúvidas frequentes</Badge>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, marginTop: 16, letterSpacing: "-0.5px" }}>
            Perguntas <span className="gradient-text">frequentes</span>
          </h2>
        </div>
      </RevealSection>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.map((f, i) => (
          <RevealSection key={f.q} delay={i * 50}>
            <div style={{ background: "#1C2333", borderRadius: 12, border: "1px solid #1F2937", overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "none", border: "none", color: "#F9FAFB", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 15, textAlign: "left", gap: 12 }}>
                {f.q}
                {open === i ? <ChevronUp size={18} color="#9CA3AF" style={{ flexShrink: 0 }} /> : <ChevronDown size={18} color="#9CA3AF" style={{ flexShrink: 0 }} />}
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 18px", fontSize: 14, color: "#9CA3AF", lineHeight: 1.7, borderTop: "1px solid #1F2937", paddingTop: 14 }}>
                  {f.a}
                </div>
              )}
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function CTAFinal({ onPlanClick }) {
  return (
    <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #0F172A, #0A0D14)" }}>
      <RevealSection>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", background: "#1C2333", borderRadius: 24, padding: "60px 40px", border: "1px solid rgba(59,130,246,.2)", boxShadow: "0 0 60px rgba(59,130,246,.1)" }}>
          <div style={{ marginBottom: 16 }}>
            <Badge color="#10B981">Comece hoje mesmo</Badge>
          </div>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 16 }}>
            Pronto para organizar sua <span className="gradient-text">operação comercial?</span>
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 17, marginBottom: 36, lineHeight: 1.6 }}>
            Mais de 2.400 empresas já usam o FlowCRM para vender mais com mais controle. Sua vez.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" onClick={() => onPlanClick("FREE")}>
              Começar Grátis <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open(WA_LINK)}>
              <MessageCircle size={18} /> Agendar Demonstração
            </Button>
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: "#6B7280" }}>✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ Setup em minutos &nbsp;·&nbsp; ✓ Cancele quando quiser</p>
        </div>
      </RevealSection>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Produto", links: ["Funcionalidades", "Planos", "Changelog", "Roadmap", "API"] },
    { title: "Empresa", links: ["Quem Somos", "Blog", "Carreiras", "Parceiros", "Imprensa"] },
    { title: "Suporte", links: ["Central de Ajuda", "Atendimento", "Status", "Política de Privacidade", "Termos de Uso"] }
  ];
  return (
    <footer style={{ background: "#0A0D14", borderTop: "1px solid #1F2937", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3,1fr)", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3B82F6, #10B981)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <GitMerge size={18} color="#fff" />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Bricolage Grotesque',sans-serif" }}>FlowCRM</span>
            </div>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, marginBottom: 20, maxWidth: 280 }}>
              O CRM completo para organizar leads, acompanhar oportunidades e transformar seu comercial.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["Instagram", "LinkedIn", "YouTube"].map(s => (
                <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: "#1C2333", border: "1px solid #1F2937", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#9CA3AF", textDecoration: "none", fontWeight: 600 }}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          {cols.map(c => (
            <div key={c.title}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#F9FAFB" }}>{c.title}</h4>
              {c.links.map(l => (
                <a key={l} href="#" style={{ display: "block", fontSize: 13, color: "#6B7280", marginBottom: 10, textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#9CA3AF"}
                  onMouseLeave={e => e.target.style.color = "#6B7280"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1F2937", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#6B7280" }}>© 2025 FlowCRM. Todos os direitos reservados.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#" style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}>Privacidade</a>
            <a href="#" style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}>Termos</a>
            <a href="#" style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}>Cookies</a>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){footer>div>div[style*="grid-template-columns"]{grid-template-columns:1fr 1fr!important}}`}</style>
    </footer>
  );
}

function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 2000); }, []);
  if (!show) return null;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, animation: "slideUp .5s ease" }}>
      {hover && (
        <div style={{ position: "absolute", bottom: "100%", right: 0, marginBottom: 10, background: "#1C2333", color: "#F9FAFB", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", border: "1px solid #374151", boxShadow: "0 10px 20px rgba(0,0,0,.4)" }}>
          Fale conosco no WhatsApp 💬
        </div>
      )}
      <a href={`${WA_LINK}?text=${encodeURIComponent("Olá! Tenho interesse no CRM. Pode me ajudar?")}`} target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ position: "relative", width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,.4)", textDecoration: "none", transition: "transform .2s" }}
        className="pulse-ring">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.45.65 4.75 1.8 6.73L2 30l7.47-1.77A13.94 13.94 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.55a11.5 11.5 0 01-5.86-1.6l-.42-.25-4.43 1.05 1.08-4.3-.28-.44A11.5 11.5 0 1116 27.55zm6.32-8.61c-.35-.17-2.05-1.01-2.37-1.13-.32-.1-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.4.26-.75.09-.35-.17-1.47-.54-2.8-1.73a10.5 10.5 0 01-1.94-2.41c-.2-.35-.02-.54.15-.72.16-.16.35-.4.52-.6.17-.2.23-.35.35-.58.1-.23.05-.43-.03-.6-.09-.17-.78-1.88-1.07-2.57-.28-.67-.57-.58-.78-.59-.2-.01-.43-.01-.66-.01-.23 0-.6.09-.91.43-.32.35-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.17.23 2.42 3.7 5.87 5.19 3.45 1.49 3.45 1 4.07.93.62-.07 2.05-.84 2.34-1.65.3-.81.3-1.5.21-1.65-.09-.14-.32-.23-.67-.4z"/>
        </svg>
      </a>
    </div>
  );
}

function QRCodeDisplay({ data }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, size, size);
    const seed = data.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const modules = 25;
    const cellSize = size / modules;
    const rng = (x, y) => ((seed * (x + 1) * (y + 1) * 31337) & 0xFF) > 100;
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        const isCorner = (r < 7 && c < 7) || (r < 7 && c > modules - 8) || (r > modules - 8 && c < 7);
        const inFinder = (r < 9 && c < 9) || (r < 9 && c > modules - 10) || (r > modules - 10 && c < 9);
        let dark;
        if (isCorner) {
          dark = !(r === 1 || r === 5 || c === 1 || c === 5) && !(r >= 2 && r <= 4 && c >= 2 && c <= 4 ? false : (r === 2 || r === 4 || c === 2 || c === 4));
          dark = (r === 0 || r === 6 || c === 0 || c === 6) || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
          if (r < 7 && c >= modules - 8) { const nc = c - (modules - 7); dark = (r === 0 || r === 6 || nc === 0 || nc === 6) || (r >= 2 && r <= 4 && nc >= 2 && nc <= 4); }
          if (r >= modules - 7 && c < 7) { const nr = r - (modules - 7); dark = (nr === 0 || nr === 6 || c === 0 || c === 6) || (nr >= 2 && nr <= 4 && c >= 2 && c <= 4); }
        } else if (inFinder && !isCorner) {
          dark = false;
        } else {
          dark = rng(r, c);
        }
        if (dark) {
          ctx.fillStyle = "#000";
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [data]);
  return <canvas ref={canvasRef} style={{ borderRadius: 8, display: "block" }} />;
}

function CheckoutModal({ plan: planKey, onClose }) {
  const plan = PLANS[planKey];
  const bump = ORDER_BUMPS[planKey];
  const [bumpChecked, setBumpChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const effectivePlan = bumpChecked && bump ? PLANS[bump.to] : plan;
  const effectivePrice = bumpChecked && bump ? (plan.price + bump.diff) : plan.price;

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_PAYLOAD).then(() => { setCopied(true); setTimeout(() => setCopied(false), 3000); });
  };

  const handlePaid = () => {
    const msg = encodeURIComponent(`Olá! Acabei de fazer o pagamento do plano ${effectivePlan.name}. Segue comprovante 📎`);
    window.open(`${WA_LINK}?text=${msg}`, "_blank");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(8px)" }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: "#111827", borderRadius: 24, border: "1px solid #1F2937", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", padding: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Bricolage Grotesque',sans-serif" }}>Checkout seguro</h3>
            <p style={{ fontSize: 13, color: "#6B7280" }}>Pagamento via PIX — instantâneo</p>
          </div>
          <button onClick={onClose} style={{ background: "#1C2333", border: "1px solid #1F2937", borderRadius: 8, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ background: "#1C2333", borderRadius: 16, padding: 20, marginBottom: 20, border: "1px solid #1F2937" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Plano selecionado</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{effectivePlan.name}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Total mensal</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#10B981" }}>
                R$ {effectivePrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {bump && (
          <div style={{ background: bumpChecked ? "rgba(16,185,129,.08)" : "#1C2333", borderRadius: 16, padding: 20, marginBottom: 20, border: `2px solid ${bumpChecked ? "#10B981" : "#374151"}`, cursor: "pointer", transition: "all .25s ease" }}
            onClick={() => setBumpChecked(!bumpChecked)}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${bumpChecked ? "#10B981" : "#374151"}`, background: bumpChecked ? "#10B981" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s", animation: bumpChecked ? "bounce-in .3s ease" : "none" }}>
                {bumpChecked && <Check size={14} color="#fff" />}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: bumpChecked ? "#10B981" : "#F9FAFB" }}>
                  ✅ Adicione o plano {PLANS[bump.to].name} por apenas +R$ {bump.diff.toFixed(2).replace(".", ",")}/mês
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                  {bump.benefits.map(b => (
                    <li key={b} style={{ fontSize: 13, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 6 }}>
                      <Check size={12} color="#10B981" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 12 }}>
            <QRCodeDisplay data={PIX_PAYLOAD} />
          </div>
          <p style={{ fontSize: 13, color: "#9CA3AF", textAlign: "center" }}>Escaneie o QR Code acima com o app do seu banco</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>Código PIX copia e cola:</div>
          <div style={{ background: "#1C2333", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, border: "1px solid #1F2937" }}>
            <code style={{ fontSize: 11, color: "#9CA3AF", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "monospace" }}>
              {PIX_PAYLOAD}
            </code>
            <button onClick={handleCopy} style={{ background: copied ? "#10B981" : "#374151", border: "none", borderRadius: 6, padding: "6px 10px", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5, transition: "background .2s" }}>
              {copied ? <><CheckCircle2 size={13} /> Copiado!</> : <><Copy size={13} /> Copiar</>}
            </button>
          </div>
        </div>

        <div style={{ background: "rgba(59,130,246,.08)", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid rgba(59,130,246,.2)", fontSize: 13, color: "#93C5FD", lineHeight: 1.6 }}>
          ℹ️ Após o pagamento, envie o comprovante via WhatsApp para ativarmos seu plano em minutos.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button variant="primary" size="lg" onClick={handlePaid} style={{ justifyContent: "center" }}>
            <CheckCircle2 size={18} /> Já fiz o pagamento — Enviar comprovante
          </Button>
          <Button variant="ghost" onClick={onClose} style={{ justifyContent: "center", fontSize: 13, color: "#6B7280" }}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FlowCRMPage() {
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  return (
    <>
      <style>{CSS}</style>
      <div style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
        <Header onPlanClick={setCheckoutPlan} />
        <main>
          <Hero onPlanClick={setCheckoutPlan} />
          <SocialProof />
          <Dores onPlanClick={setCheckoutPlan} />
          <Transformacao />
          <Funcionalidades />
          <ComoFunciona />
          <Segmentos />
          <Comparativo />
          <Planos onPlanClick={setCheckoutPlan} />
          <Depoimentos />
          <FAQ />
          <CTAFinal onPlanClick={setCheckoutPlan} />
        </main>
        <Footer />
        <WhatsAppButton />
        {checkoutPlan && (
          <CheckoutModal plan={checkoutPlan} onClose={() => setCheckoutPlan(null)} />
        )}
      </div>
    </>
  );
}
