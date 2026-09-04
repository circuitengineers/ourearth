import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { isAuthorized } from "@/lib/adminAuth";

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ error: "Supabase admin is not configured." }, { status: 503 });
  }

  const { storyId, status } = await request.json();

  if (!storyId || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid storyId or status." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("stories").update({ status }).eq("id", storyId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
