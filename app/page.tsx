import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowCRM — CRM inteligente para equipes de vendas",
  description: "Organize leads, acompanhe oportunidades e transforme seu comercial em uma operação previsível.",
};

import FlowCRMPage from "@/components/FlowCRMPage";

export default function Home() {
  return <FlowCRMPage />;
}
