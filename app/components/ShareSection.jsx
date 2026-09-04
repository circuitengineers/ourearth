import ShareForm from "./ShareForm";

const points = [
  {
    title: "Location, not identity",
    body: "We ask for a place — a town, a watershed, a coastline — never a home address or your name.",
  },
  {
    title: "You choose what's public",
    body: "Your written story can appear on the public map. Your routing details never do.",
  },
  {
    title: "One story, many doors",
    body: "A single account can be copied to more than one recipient — a local council and a national regulator, for instance.",
  },
];

export default function ShareSection() {
  return (
    <section id="share" className="py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 sm:px-8 md:grid-cols-2">
        <div>
          <h2 className="text-3xl sm:text-4xl">Tell us what happened, and where.</h2>
          <p className="mt-5 text-lg text-ink-soft">
            The more specific the place and the problem, the more precisely your
            story can be routed. You control exactly how much you share.
          </p>
          <ul className="mt-7">
            {points.map((point, i) => (
              <li
                key={point.title}
                className={`flex gap-4 border-t border-line py-5 ${
                  i === points.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="min-w-[22px] font-display text-lg italic text-teal">
                  {i + 1}
                </span>
                <p className="text-sm text-ink-soft">
                  <strong className="mb-1 block font-semibold text-ink">
                    {point.title}
                  </strong>
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <ShareForm />
      </div>
    </section>
  );
}
