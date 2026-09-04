export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper py-14">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 sm:px-8">
        <div>
          <div className="mb-3 font-display text-xl italic">OurEarth</div>
          <p className="max-w-[40ch] text-sm text-ink-soft">
            A place to say what climate change has cost you — and make sure the
            right people read it.
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#stories" className="text-ink-soft hover:text-ink">
            Stories
          </a>
          <a href="#how" className="text-ink-soft hover:text-ink">
            How it works
          </a>
          <a href="#share" className="text-ink-soft hover:text-ink">
            Share your story
          </a>
          <a href="/privacy" className="text-ink-soft hover:text-ink">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
