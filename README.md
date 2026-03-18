# FlowCRM — CRM SaaS B2B Premium

## Stack
- Next.js 14+ (App Router)
- TypeScript strict
- TailwindCSS + Framer Motion
- Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- NextAuth.js v5
- PIX via QR Code estático

## Quickstart

```bash
npm install
cp .env.example .env
npx prisma db push
npx ts-node prisma/seed.ts
npm run dev
```

## Admin default
- Email: admin@flowcrm.com.br
- Senha: Admin@2024!
- Role: ADMIN / Plano: MAX

## Estrutura de arquivos-chave
- `app/page.tsx` → Homepage (usar FlowCRM.jsx como base)
- `app/dashboard/page.tsx` → Dashboard do usuário
- `app/admin/page.tsx` → Painel administrativo
- `app/login/page.tsx` → Login / Cadastro
- `lib/auth.ts` → Configuração NextAuth v5
- `lib/plans.ts` → Definição de planos + payload PIX
- `prisma/schema.prisma` → Schema do banco
- `middleware.ts` → Proteção de rotas

## PIX Payload (estático)
```
00020126580014br.gov.bcb.pix013688db2773-f09a-4119-8aef-5e35e7928fdf5204000053039865802BR5923DIEGO FERNANDES ALMEIDA6009Sao Paulo62290525REC69BA04B016F7175892606563042A97
```

## WhatsApp
https://wa.me/5516991996264
