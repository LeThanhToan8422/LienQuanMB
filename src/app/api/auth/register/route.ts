import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).max(64),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, password, name } = bodySchema.parse(json);
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 });
    }
    const passwordHash = await hash(password, 10);
    await prisma.user.create({ data: { email, passwordHash, name } });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Invalid";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
