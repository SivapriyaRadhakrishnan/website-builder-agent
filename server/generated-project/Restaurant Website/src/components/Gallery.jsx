import React from 'react';

const Gallery = ({ images }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between gap-6">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full h-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;