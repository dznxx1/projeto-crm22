import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PLANS, PIX_PAYLOAD } from "@/lib/plans";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  const session = await auth();
  const { plan, orderBump } = await req.json();
  const planData = PLANS[plan as keyof typeof PLANS];
  if (!planData) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  const amount = planData.price;
  const qrDataUrl = await QRCode.toDataURL(PIX_PAYLOAD, { width: 250, margin: 2 });
  if (session?.user?.id) {
    await prisma.order.create({ data: { userId: session.user.id, plan, amount, pixPayload: PIX_PAYLOAD, orderBump: !!orderBump } });
  }
  return NextResponse.json({ qrDataUrl, payload: PIX_PAYLOAD, amount });
}
