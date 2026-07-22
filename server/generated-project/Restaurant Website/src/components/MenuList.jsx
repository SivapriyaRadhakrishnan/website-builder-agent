import React from 'react';

const MenuList = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 gap-6">
        <article>
          <h2 className="text-lg font-bold">Food Item 1</h2>
          <img src="food-item-1.jpg" alt="Food item 1 image" />
          <p className="text-gray-600">Description of food item 1.</p>
        </article>
        <article>
          <h2 className="text-lg font-bold">Food Item 2</h2>
          <img src="food-item-2.jpg" alt="Food item 2 image" />
          <p className="text-gray-600">Description of food item 2.</p>
        </article>
        <article>
          <h2 className="text-lg font-bold">Food Item 3</h2>
          <img src="food-item-3.jpg" alt="Food item 3 image" />
          <p className="text-gray-600">Description of food item 3.</p>
        </article>
      </div>
    </section>
  );
};

export default MenuList;