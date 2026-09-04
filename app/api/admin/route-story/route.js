import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { isAuthorized } from "@/lib/adminAuth";
import { matchRecipients } from "@/lib/matchRecipients";
import { sendBrevoEmail, buildStoryEmail } from "@/lib/sendBrevoEmail";

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ error: "Supabase admin is not configured." }, { status: 503 });
  }

  const { storyId } = await request.json();
  if (!storyId) {
    return NextResponse.json({ error: "storyId is required." }, { status: 400 });
  }

  const { data: story, error: fetchError } = await supabaseAdmin
    .from("stories")
    .select("*")
    .eq("id", storyId)
    .single();

  if (fetchError || !story) {
    return NextResponse.json({ error: "Story not found." }, { status: 404 });
  }

  const recipients = await matchRecipients(supabaseAdmin, story);

  if (recipients.length === 0) {
    return NextResponse.json(
      { ok: false, message: "No matching recipient found. Add one to the recipients table, or route manually." },
      { status: 200 }
    );
  }

  const { subject, htmlContent } = buildStoryEmail(story);
  const sentTo = [];
  const failedTo = [];

  for (const recipient of recipients) {
    try {
      await sendBrevoEmail({ to: { email: recipient.email, name: recipient.name }, subject, htmlContent });
      sentTo.push(recipient.email);
    } catch (err) {
      failedTo.push({ email: recipient.email, error: err.message });
    }
  }

  if (sentTo.length > 0) {
    await supabaseAdmin
      .from("stories")
      .update({ status: "routed", routed_to: sentTo })
      .eq("id", storyId);
  }

  return NextResponse.json({ ok: sentTo.length > 0, sentTo, failedTo });
}
