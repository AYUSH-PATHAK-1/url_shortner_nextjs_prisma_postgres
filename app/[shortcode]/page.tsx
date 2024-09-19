import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

interface RedirectPageForm {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageForm) {
  const { shortcode } = params;

  const url = await prisma.url.findUnique({
    where: {
      shortCode: shortcode,
    },
  });

  if (!url) {
    return <div>404 - url not found</div>;
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  redirect(url.originalURL);
}
