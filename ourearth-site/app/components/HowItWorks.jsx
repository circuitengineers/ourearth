const steps = [
  {
    title: "Share anonymously",
    body: "Describe what happened, where, and how it affected you. No account, no name, no contact details required.",
  },
  {
    title: "AI reads for context",
    body: "The story is classified by issue, region, and any authority or company named — nothing more than what you wrote.",
  },
  {
    title: "Matched to a recipient",
    body: "A public directory of relevant ministries, regulators, local officials, and companies is matched against the story.",
  },
  {
    title: "Delivered and counted",
    body: "The story is emailed to the matched recipient and added to a public, anonymized map of collective impact.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-forest-dark py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl sm:text-4xl text-paper">How your story becomes action</h2>
          <p className="mt-4 text-lg text-paper/70">
            You write it once. From there, the system does the work of finding
            who should read it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-9 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative pr-0 md:pr-7">
              {i < steps.length - 1 && (
                <span className="absolute right-0 top-[22px] hidden h-px w-full bg-line-dark md:block" />
              )}
              <div className="relative z-10 mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-line-dark bg-forest-dark font-display text-lg italic text-gold">
                {i + 1}
              </div>
              <h3 className="mb-2.5 text-lg font-medium text-paper">{step.title}</h3>
              <p className="max-w-[32ch] text-sm text-paper/70">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-7 rounded-sm border border-line-dark bg-forest-mid p-9 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <h4 className="mb-3.5 text-sm font-semibold text-gold">What you wrote</h4>
            <div className="mb-2.5 rounded-sm border border-gold bg-gold/10 px-3.5 py-3 text-sm">
              &ldquo;...the chemical plant&apos;s runoff since 2019... our well water...&rdquo;
            </div>
            <div className="mb-2.5 rounded-sm border border-line-dark bg-paper/5 px-3.5 py-3 text-sm">
              Region: Ohio River Valley
            </div>
            <div className="rounded-sm border border-line-dark bg-paper/5 px-3.5 py-3 text-sm">
              Category: Water contamination
            </div>
          </div>
          <div className="text-center font-display text-3xl italic text-gold">→</div>
          <div>
            <h4 className="mb-3.5 text-sm font-semibold text-gold">Where it&apos;s sent</h4>
            <div className="mb-2.5 rounded-sm border border-gold bg-gold/10 px-3.5 py-3 text-sm">
              State Environmental Protection Agency
            </div>
            <div className="mb-2.5 rounded-sm border border-line-dark bg-paper/5 px-3.5 py-3 text-sm">
              County health department
            </div>
            <div className="rounded-sm border border-line-dark bg-paper/5 px-3.5 py-3 text-sm">
              Named facility&apos;s compliance office
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
