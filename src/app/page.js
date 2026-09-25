import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Members from "@/components/sections/Members";
import Clusters from "@/components/sections/Clusters";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Events />
        <Members />
        <Clusters />
      </main>
      <Footer />
    </>
  );
}
