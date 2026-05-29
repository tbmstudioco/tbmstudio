import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 503 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/portfolio");

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
