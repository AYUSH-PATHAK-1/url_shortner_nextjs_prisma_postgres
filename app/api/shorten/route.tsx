import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  const shortCode = nanoid(8);

  const shortendUrl = await prisma.url.create({
    data: {
      originalURL: url,
      shortCode,
    },
  });

  return NextResponse.json({ shoertCode: shortendUrl.shortCode });
}
