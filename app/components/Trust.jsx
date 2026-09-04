const stats = [
  {
    number: "0",
    body: "Names or contact details ever attached to a published story.",
  },
  {
    number: "100%",
    body: "Of recipients are public offices or company contacts, sourced from public directories — never sold or shared elsewhere.",
  },
  {
    number: "1+",
    body: "Story can be sent to more than one desk at once, so no single office can quietly let it go unread.",
  },
];

export default function Trust() {
  return (
    <section className="bg-forest-mid py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.body}>
              <div className="font-display text-4xl italic text-gold">{stat.number}</div>
              <p className="mt-2.5 max-w-[34ch] text-sm text-paper/70">{stat.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
