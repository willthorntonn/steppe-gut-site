import Navbar from "./components/layout/Nav";
import HeroBox from "./components/home/HeroBox";
import SteppeArmyProgress from "./components/home/SteppeArmyProgress";
import OriginFeature from "./components/home/OriginFeature";
import ProcessRow from "./components/home/ProcessRow";
import ReadsCarousel from "./components/home/ReadsCarousel";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/ui/BackToTop";
import Reveal from "./components/ui/Reveal";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-md bg-forest px-4 py-2 font-sans text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main" className="bg-cream">
        {/* Not wrapped in Reveal: the hero runs its own 300–900ms word and
            stage sequence on load, which a scroll reveal would fight. */}
        <HeroBox />

        <SteppeArmyProgress />

        <Reveal>
          <OriginFeature />
        </Reveal>
        <Reveal>
          <ProcessRow />
        </Reveal>
        <ReadsCarousel />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
