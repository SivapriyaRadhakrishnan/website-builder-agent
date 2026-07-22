import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Hero = () => {
  return (
    <main>
      <section className="flex items-center justify-between gap-6">
        <Navbar />
        <Hero />
      </section>
    </main>
  );
};

export default Hero;