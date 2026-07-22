import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ feature }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-gray-900">{feature.title}</h2>
        <p className="text-gray-600">{feature.description}</p>
      </section>
    </div>
  );
};

export default FeatureCard;