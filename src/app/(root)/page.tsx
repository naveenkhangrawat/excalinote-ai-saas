import ApplicationBanner from "./_components/ApplicationBanner";
import DotBackground from "./_components/DotBackground";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import InfiniteMovingItems from "./_components/InfiniteMovingItems";
import Navbar from "./_components/Navbar";
import Pricing from "./_components/Pricing";
import Testimonials from "./_components/Testimonials";


export default function Home() {

  return (
    <>
      <main className="w-full bg-[#f4f4f5]">
        <DotBackground />
        <Navbar />
        <div className="w-full relative flex flex-col">

          <section className="w-full">
            <HeroSection />
          </section>

          <section className="w-full">
            <ApplicationBanner />
          </section>

          <section className="w-full">
            <InfiniteMovingItems />
          </section>

          <section className="w-full">
            <Features />
          </section>

          <section className="w-full">
            <Testimonials />
          </section>

          <section className="w-full">
            <Pricing />
          </section>

        </div>
        
        <Footer />
      </main>
    </>
  );
}
