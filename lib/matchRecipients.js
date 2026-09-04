// Matches a story to recipients from the `recipients` table.
//
// This starts as straightforward rule-based matching — category overlap
// plus a region substring check, with a named organization taking
// priority — rather than an opaque model call. It's easy to audit ("why
// did this get sent here?") and costs nothing to run. If you want an LLM
// in the loop later, the natural place is upstream of this: use it to
// extract a cleaner category/region/organization from the free-text
// story before it ever reaches this function, not to pick the recipient
// itself — recipient selection should stay inspectable.

export async function matchRecipients(supabaseAdmin, story) {
  const { data: recipients, error } = await supabaseAdmin
    .from("recipients")
    .select("id, name, email, region, categories");

  if (error || !recipients) return [];

  const regionNeedle = story.region.toLowerCase();
  const orgNeedle = story.organization?.toLowerCase();

  // 1. If the submitter named an organization, prefer an exact-ish name match.
  if (orgNeedle) {
    const namedMatch = recipients.filter((r) =>
      r.name.toLowerCase().includes(orgNeedle) || orgNeedle.includes(r.name.toLowerCase())
    );
    if (namedMatch.length > 0) return dedupe(namedMatch);
  }

  // 2. Otherwise match on category + region substring overlap.
  const matched = recipients.filter((r) => {
    const categoryMatch = r.categories?.includes(story.category);
    const regionMatch =
      r.region && (regionNeedle.includes(r.region.toLowerCase()) || r.region.toLowerCase().includes(regionNeedle));
    return categoryMatch && regionMatch;
  });

  if (matched.length > 0) return dedupe(matched);

  // 3. Fall back to category-only matches (broader agencies with no fixed region).
  const categoryOnly = recipients.filter((r) => r.categories?.includes(story.category) && !r.region);
  return dedupe(categoryOnly);
}

function dedupe(recipients) {
  const seen = new Set();
  return recipients.filter((r) => {
    if (seen.has(r.email)) return false;
    seen.add(r.email);
    return true;
  });
}
