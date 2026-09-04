export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 sm:px-8">
        <span className="font-display text-xl italic">OurEarth</span>
        <div className="flex items-center gap-8 text-sm">
          <a href="#stories" className="hidden text-ink-soft transition hover:text-ink sm:inline">
            Stories
          </a>
          <a href="#how" className="hidden text-ink-soft transition hover:text-ink sm:inline">
            How it works
          </a>
          <a
            href="#share"
            className="rounded-sm bg-forest-dark px-5 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-px hover:bg-forest-deep"
          >
            Share your story
          </a>
        </div>
      </div>
    </nav>
  );
}
