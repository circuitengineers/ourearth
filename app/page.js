import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import StoryWall from "./components/StoryWall";
import HowItWorks from "./components/HowItWorks";
import ShareSection from "./components/ShareSection";
import Trust from "./components/Trust";
import Footer from "./components/Footer";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <StoryWall />
      <HowItWorks />
      <ShareSection />
      <Trust />
      <Footer />
    </>
  );
}
