import React from 'react';
import { useField } from 'react-hook-form';

const ReservationForm = () => {
  const { register, errors } = useField('name', '');
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <header>
        <h1 className="text-center text-gray-900">Reservation Form</h1>
      </header>
      <main>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <label htmlFor="name" className="text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              {...register('name', { required: true })}
              className="w-full px-4 py-2 text-gray-900 border rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register('email', { required: true })}
              className="w-full px-4 py-2 text-gray-900 border rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="phone" className="text-gray-600">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              {...register('phone', { required: true })}
              className="w-full px-4 py-2 text-gray-900 border rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="date" className="text-gray-600">
              Date and Time:
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              {...register('date', { required: true })}
              className="w-full px-4 py-2 text-gray-900 border rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            />
          </div>
        </form>
      </main>
    </section>
  );
};

export default ReservationForm;