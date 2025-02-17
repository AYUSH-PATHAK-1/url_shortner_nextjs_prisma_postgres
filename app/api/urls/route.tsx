import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = await prisma.url.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return NextResponse.json(url);
  } catch (error) {
    console.error("error fetching urls", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
