export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-20 pt-24 sm:pt-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-8 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h1 className="text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl">
            The climate crisis has a face.
            <br />
            <em className="font-display italic text-moss">Millions of them.</em>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-ink-soft">
            OurEarth collects first-hand accounts of how a warming world is changing
            daily life — the failed harvest, the flooded home, the summer that
            finally became unbearable — and delivers them straight to the desks
            that can act.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#share"
              className="rounded-sm bg-forest-dark px-6 py-3.5 text-sm font-semibold text-paper transition hover:-translate-y-px hover:bg-forest-deep"
            >
              Share your story
            </a>
            <a
              href="#stories"
              className="rounded-sm border border-ink px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper"
            >
              Read the stories
            </a>
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            No name, no email, no account required. Your location is only ever
            shown as a general region.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
            <circle cx="200" cy="200" r="180" stroke="#3F5C46" strokeOpacity="0.14" />
            <circle cx="200" cy="200" r="145" stroke="#3F5C46" strokeOpacity="0.18" />
            <circle cx="200" cy="200" r="110" stroke="#3F5C46" strokeOpacity="0.22" />
            <circle cx="200" cy="200" r="75" stroke="#3F5C46" strokeOpacity="0.28" />
            <circle cx="200" cy="200" r="40" stroke="#3F5C46" strokeOpacity="0.34" />
            <path
              d="M40 260 C 120 220, 180 300, 260 250 S 380 220 400 260"
              stroke="#3E7C82"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <path
              d="M20 150 C 100 180, 160 110, 240 140 S 360 170 390 130"
              stroke="#5C7A5E"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
          </svg>
          <span className="absolute left-[62%] top-[28%] h-[9px] w-[9px] rounded-full bg-moss shadow-[0_0_0_5px_rgba(92,122,94,0.18)]" />
          <span className="absolute left-[38%] top-[44%] h-[9px] w-[9px] rounded-full bg-gold shadow-[0_0_0_5px_rgba(184,134,59,0.18)]" />
          <span className="absolute left-[70%] top-[60%] h-[9px] w-[9px] rounded-full bg-teal shadow-[0_0_0_5px_rgba(62,124,130,0.18)]" />
          <span className="absolute left-[30%] top-[70%] h-[9px] w-[9px] rounded-full bg-moss shadow-[0_0_0_5px_rgba(92,122,94,0.18)]" />
          <span className="absolute left-[52%] top-[52%] h-[9px] w-[9px] rounded-full bg-teal shadow-[0_0_0_5px_rgba(62,124,130,0.18)]" />
        </div>
      </div>
    </section>
  );
}
