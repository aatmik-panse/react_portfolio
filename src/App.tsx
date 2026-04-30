import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { FeaturedWork } from './components/sections/FeaturedWork';
import { Experience } from './components/sections/Experience';

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <FeaturedWork />
      <Experience />
    </div>
  );
}
