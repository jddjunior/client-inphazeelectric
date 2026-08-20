import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Lead received:", body);
  return NextResponse.json({ success: true, leadId: `lead-${Date.now()}` });
}
