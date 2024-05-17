import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    domain: '',
    room: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const { domain, room } = formData;
      navigate(`/bot/${domain || '(link unavailable)'}/${room}`);
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.room || !/^[a-zA-Z0-9-]+$/.test(values.room)) {
      errors.room = 'Please enter a valid room name.';
    }
    return errors;
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Join a Room
          </h2>
          {/* INSTANCE INPUT */}
          {/* <div className="relative mb-4">
            <label htmlFor="domain" className="leading-7 text-sm text-gray-600">
              Instance
            </label>
            <input
              type="text"
              id="domain"
              name="domain"
              onChange={handleChange}
              value={formData.domain}
              placeholder="(link unavailable)"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div> */}
          <div className="relative mb-4">
            <label htmlFor="room" className="leading-7 text-sm text-gray-600">
              Room name
            </label>
            <input
              type="text"
              id="room"
              name="room"
              onChange={handleChange}
              value={formData.room}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.room && <p className="text-xs text-red-500 mt-3">{errors.room}</p>}
          </div>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit"
          >
            Join now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Home;