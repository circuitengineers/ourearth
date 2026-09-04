import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy — OurEarth",
};

export default function Privacy() {
  return (
    <>
      <Nav />
      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h1 className="text-4xl">Privacy</h1>
        <p className="mt-6 text-lg text-ink-soft">
          OurEarth does not collect your name, email address, or exact
          location. Stories are stored with a general region only, and a
          private story code is generated so you can check on or withdraw
          your submission — that code is shown to you once and is not linked
          to any other identifying information.
        </p>
        <p className="mt-5 text-lg text-ink-soft">
          Every submission is reviewed by a person before it is published on
          the story wall or routed to any organization. This is placeholder
          copy for the demo — replace it with your actual data handling and
          retention policy before launch.
        </p>
      </section>
      <Footer />
    </>
  );
}
