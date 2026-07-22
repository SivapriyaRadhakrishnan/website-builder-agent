import React from 'react';

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-3xl font-bold">Welcome to Our Restaurant</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          id="reserve-table-button"
        >
          Reserve a Table
        </button>
      </div>
    </section>
  );
};

export default Hero;