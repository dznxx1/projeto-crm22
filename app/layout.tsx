import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading", weight: ["400","600","700","800"] });

export const metadata: Metadata = {
  title: "FlowCRM — CRM inteligente para equipes de vendas",
  description: "Organize leads, acompanhe oportunidades e transforme seu comercial com o FlowCRM.",
  openGraph: { title: "FlowCRM", description: "CRM completo para PMEs brasileiras", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${jakarta.variable} ${bricolage.variable}`}>{children}</body>
    </html>
  );
}
