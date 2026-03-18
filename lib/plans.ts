export const PLANS = {
  FREE:  { name: "Free",  price: 0,      popular: false, features: ["1 usuário","Até 100 leads","Pipeline básico","Cadastro de clientes","Tarefas básicas","Dashboard básico","Central de ajuda"], limits: { users: 1, leads: 100 } },
  START: { name: "Start", price: 39.90,  popular: false, features: ["Até 2 usuários","Até 500 leads","Pipeline completo","Tarefas e lembretes","Filtros e busca","Exportação simples","Suporte por chat"], limits: { users: 2, leads: 500 } },
  PRO:   { name: "Pro",   price: 89.90,  popular: true,  features: ["Até 5 usuários","Até 3.000 leads","Automações","Follow-up automático","Relatórios avançados","Metas e desempenho","Campos personalizados","Integrações principais","Suporte prioritário"], limits: { users: 5, leads: 3000 } },
  MAX:   { name: "Max",   price: 169.90, popular: false, features: ["Até 15 usuários","Até 15.000 leads","Múltiplos funis","Permissões avançadas","Relatórios estratégicos","Dashboards gerenciais","Onboarding guiado","Integrações premium","Suporte máxima prioridade"], limits: { users: 15, leads: 15000 } },
} as const;
export const ORDER_BUMPS = {
  START: { to: "PRO" as const,  diff: 50.00, benefits: ["Automações completas","Relatórios avançados","5 usuários simultâneos"] },
  PRO:   { to: "MAX" as const,  diff: 80.00, benefits: ["Múltiplos funis","Dashboards gerenciais","Onboarding guiado"] },
};
export const PIX_PAYLOAD = "00020126580014br.gov.bcb.pix013688db2773-f09a-4119-8aef-5e35e7928fdf5204000053039865802BR5923DIEGO FERNANDES ALMEIDA6009Sao Paulo62290525REC69BA04B016F7175892606563042A97";
export const WA_NUMBER = "5516991996264";
