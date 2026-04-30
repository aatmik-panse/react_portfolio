import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { FeaturedWork } from './components/sections/FeaturedWork';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <FeaturedWork />
      <Experience />
      <Projects />
    </div>
  );
}
