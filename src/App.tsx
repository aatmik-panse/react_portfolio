import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { FeaturedWork } from './components/sections/FeaturedWork';

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <FeaturedWork />
    </div>
  );
}
