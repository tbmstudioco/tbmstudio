import { NextResponse } from "next/server";
import { getFrameioStreamUrl, isFrameioConfigured } from "@/lib/frameio";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;

  if (!fileId) {
    return NextResponse.json({ error: "Missing file ID." }, { status: 400 });
  }

  if (!isFrameioConfigured()) {
    return NextResponse.json(
      { error: "Frame.io is not configured on the server." },
      { status: 503 }
    );
  }

  try {
    const url = await getFrameioStreamUrl(fileId);

    return NextResponse.json(
      { url },
      {
        headers: {
          "Cache-Control": "private, max-age=3000, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load Frame.io video.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
