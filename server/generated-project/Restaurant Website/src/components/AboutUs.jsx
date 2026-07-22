import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-3xl font-bold">About Us</h1>
        <img src="https://via.placeholder.com/300" alt="Image" />
      </div>
      <p className="text-lg leading-relaxed text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
      </p>
    </section>
  );
};

export default AboutUs;