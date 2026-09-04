"use client";

import { useState } from "react";
import { categoryLabels } from "@/lib/seedStories";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadStories(currentSecret) {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/admin/stories", {
      headers: { "x-admin-secret": currentSecret },
    });
    if (res.status === 401) {
      setMessage("Incorrect admin secret.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setStories(data.stories || []);
    setUnlocked(true);
    setLoading(false);
  }

  async function updateStatus(storyId, status) {
    setMessage("");
    const res = await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": secret },
      body: JSON.stringify({ storyId, status }),
    });
    if (res.ok) {
      setStories((prev) => prev.filter((s) => s.id !== storyId));
    } else {
      setMessage("Couldn't update that story.");
    }
  }

  async function routeStory(storyId) {
    setMessage("Sending…");
    const res = await fetch("/api/admin/route-story", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": secret },
      body: JSON.stringify({ storyId }),
    });
    const data = await res.json();
    if (data.ok) {
      setMessage(`Sent to: ${data.sentTo.join(", ")}`);
      setStories((prev) => prev.filter((s) => s.id !== storyId));
    } else {
      setMessage(data.message || "Send failed — see console for details.");
    }
  }

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-sm px-6 py-32">
        <h1 className="mb-4 text-2xl">Admin</h1>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Admin secret"
          className="mb-3 w-full rounded-sm border border-line bg-paper px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
        />
        <button
          onClick={() => loadStories(secret)}
          disabled={loading || !secret}
          className="rounded-sm bg-forest-dark px-5 py-3 text-sm font-semibold text-paper disabled:opacity-60"
        >
          {loading ? "Checking…" : "Unlock"}
        </button>
        {message && <p className="mt-3 text-sm text-brick">{message}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-2xl">Review queue</h1>
      <p className="mb-8 text-sm text-ink-soft">
        Approve makes a story visible on the public story wall. Send routes it
        to a matched recipient by email and marks it as routed.
      </p>
      {message && <p className="mb-6 text-sm text-teal">{message}</p>}

      {stories.length === 0 && (
        <p className="text-ink-soft">Nothing waiting for review right now.</p>
      )}

      <div className="space-y-5">
        {stories.map((story) => (
          <div key={story.id} className="rounded-sm border border-line bg-paper-dim p-6">
            <div className="mb-2 flex items-center justify-between text-xs text-ink-soft">
              <span>
                {categoryLabels[story.category] ?? story.category}
                {story.custom_category ? ` — ${story.custom_category}` : ""} · {story.region}
              </span>
              <span className="uppercase tracking-wide">{story.status}</span>
            </div>
            <p className="font-display italic">&ldquo;{story.quote}&rdquo;</p>
            {story.organization && (
              <p className="mt-2 text-sm text-ink-soft">Named: {story.organization}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {story.status === "pending_review" && (
                <button
                  onClick={() => updateStatus(story.id, "approved")}
                  className="rounded-sm border border-teal px-3.5 py-2 text-sm text-teal hover:bg-teal hover:text-paper"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => routeStory(story.id)}
                className="rounded-sm bg-forest-dark px-3.5 py-2 text-sm text-paper hover:bg-forest-deep"
              >
                Send to matched recipient
              </button>
              <button
                onClick={() => updateStatus(story.id, "rejected")}
                className="rounded-sm border border-brick px-3.5 py-2 text-sm text-brick hover:bg-brick hover:text-paper"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
