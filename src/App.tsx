import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { FeaturedWork } from './components/sections/FeaturedWork';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { OpenSource } from './components/sections/OpenSource';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Cta } from './components/sections/Cta';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <div id="top" className="bg-canvas text-ink">
      <Nav />
      <Hero />
      <FeaturedWork />
      <Experience />
      <Projects />
      <OpenSource />
      <Skills />
      <Education />
      <Cta />
      <Footer />
    </div>
  );
}
