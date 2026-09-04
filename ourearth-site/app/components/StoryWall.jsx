import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { seedStories, categoryStyles, categoryLabels } from "@/lib/seedStories";

async function getStories() {
  if (!isSupabaseConfigured) return seedStories;

  const { data, error } = await supabase
    .from("stories")
    .select("id, category, quote, region, context")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(9);

  if (error || !data || data.length === 0) return seedStories;
  return data;
}

export default async function StoryWall() {
  const stories = await getStories();

  return (
    <section id="stories" className="py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl sm:text-4xl">Every story here happened to someone.</h2>
          <p className="mt-4 text-lg text-ink-soft">
            A small sample of what people have shared. Locations are shown only
            as broad regions to protect anonymity.
          </p>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {stories.map((story) => (
            <div
              key={story.id}
              className="mb-6 break-inside-avoid rounded-sm border border-line bg-paper-dim p-6"
            >
              <span
                className={`mb-4 inline-block rounded-sm px-2.5 py-1 text-xs font-semibold text-paper ${
                  categoryStyles[story.category] ?? "bg-slate"
                }`}
              >
                {categoryLabels[story.category] ?? story.category}
              </span>
              <p className="font-display text-lg italic leading-snug">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5 text-sm text-ink-soft">
                <span className="font-semibold text-ink">{story.region}</span>
                <span>{story.context}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
