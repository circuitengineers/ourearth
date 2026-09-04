"use client";

import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { categoryLabels } from "@/lib/seedStories";

function generateStoryCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 7; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `OE-${code}`;
}

const categories = Object.entries(categoryLabels);

export default function ShareForm() {
  const [story, setStory] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("fire");
  const [organization, setOrganization] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [storyCode, setStoryCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!story.trim() || !region.trim()) return;

    setStatus("submitting");
    setErrorMessage("");
    const code = generateStoryCode();

    if (!isSupabaseConfigured) {
      // Demo mode: no backend configured yet, simulate success so the flow is visible.
      setTimeout(() => {
        setStoryCode(code);
        setStatus("success");
      }, 500);
      return;
    }

    const { error } = await supabase.from("stories").insert({
      quote: story.trim(),
      region: region.trim(),
      category,
      organization: organization.trim() || null,
      story_code: code,
      status: "pending_review",
    });

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong sending your story. Please try again.");
      return;
    }

    setStoryCode(code);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-teal bg-teal/10 p-9">
        <h3 className="mb-3 text-xl">Your story is on its way.</h3>
        <p className="text-ink-soft">
          It will be reviewed and routed to the relevant office, usually within
          a few days. Save your story code to check its status or withdraw it
          later — we don&apos;t keep any other way to identify you.
        </p>
        <div className="mt-5 inline-block rounded-sm border border-line bg-paper px-5 py-3 font-display text-lg italic">
          {storyCode}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-line bg-paper-dim p-9">
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold" htmlFor="story">
          What happened?
        </label>
        <textarea
          id="story"
          required
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="The wildfire smoke this August was worse than any year I remember. School closed for two weeks and my son's asthma..."
          className="min-h-[110px] w-full rounded-sm border border-line bg-paper px-3.5 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold" htmlFor="region">
          Where did this happen?
        </label>
        <input
          id="region"
          required
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Multnomah County, Oregon"
          className="w-full rounded-sm border border-line bg-paper px-3.5 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold">What kind of impact was this?</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(([key, label]) => (
            <button
              type="button"
              key={key}
              onClick={() => setCategory(key)}
              className={`rounded-sm border px-3.5 py-2 text-sm transition ${
                category === key
                  ? "border-forest-dark bg-forest-dark text-paper"
                  : "border-line text-ink-soft hover:border-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold" htmlFor="organization">
          Is a specific company, agency, or official best placed to respond?
        </label>
        <input
          id="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="Oregon Dept. of Environmental Quality (optional)"
          className="w-full rounded-sm border border-line bg-paper px-3.5 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      <div className="mb-6 flex gap-3 rounded-sm border border-teal/30 bg-teal/10 px-4.5 py-4 text-sm text-ink-soft">
        <span aria-hidden="true">🌍</span>
        <span>
          <strong className="text-ink">Your name is never collected.</strong> This
          story will be reviewed, routed, and sent as an anonymous account. You
          can withdraw it at any time using your private story code.
        </span>
      </div>

      {status === "error" && (
        <p className="mb-4 text-sm text-brick">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-sm bg-forest-dark px-6 py-3.5 text-sm font-semibold text-paper transition hover:-translate-y-px hover:bg-forest-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Share your story"}
      </button>
    </form>
  );
}
