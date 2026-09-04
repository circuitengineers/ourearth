const events = [
  "Sent to the Ministry of Water Resources — 4 minutes ago",
  "Sent to a regional agricultural board — 11 minutes ago",
  "Sent to a coastal municipal council — 26 minutes ago",
  "Sent to an industrial emissions regulator — 33 minutes ago",
  "Sent to a national disaster relief office — 51 minutes ago",
];

export default function Ticker() {
  const doubled = [...events, ...events];
  return (
    <div className="overflow-hidden border-y border-line-dark bg-forest-dark py-3.5 text-paper">
      <div className="animate-ticker inline-flex whitespace-nowrap">
        {doubled.map((event, i) => (
          <span key={i} className="mx-7 text-sm opacity-85">
            <span className="mr-2 text-gold">●</span>
            {event}
          </span>
        ))}
      </div>
    </div>
  );
}
