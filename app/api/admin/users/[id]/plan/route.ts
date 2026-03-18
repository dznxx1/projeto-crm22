import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { plan } = await req.json();
  const validPlans = ["FREE","START","PRO","MAX"];
  if (!validPlans.includes(plan)) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  const user = await prisma.user.update({ where: { id: params.id }, data: { plan } });
  return NextResponse.json({ success: true, user });
}
