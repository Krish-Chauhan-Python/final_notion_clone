import React from 'react';

const HomePage = () => {
  return (
    <div className="max-w-full mx-auto mt-30 p-8 bg-white rounded-xl shadow-lg h-full border">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center tracking-tight hover:text-blue-500 transition">
        Notion Clone
      </h1>
      <p className="text-gray-700 text-xl mb-10 text-center">
        Welcome to the minimal, modern productivity app designed by <span className="font-semibold text-blue-600">Krish Chauhan</span> for learning and experimentation.
      </p>
      <div className="grid md:grid-cols-2 gap-8 py-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 flex flex-col items-center shadow-sm">
          
          <h2 className="text-lg font-bold text-blue-800 mb-1">Create To-Do Lists</h2>
          <p className="text-gray-700 text-center">Organize your tasks and stay productive with a clean, distraction-free to-do list feature.</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 flex flex-col items-center shadow-sm">
          
          <h2 className="text-lg font-bold text-blue-800 mb-1">Simple and Fast</h2>
          <p className="text-gray-700 text-center">Enjoy a lightning-fast experience wrapped in a modern Next.js design.</p>
        </div>
      </div>
      <div className="text-center mt-10">
        <a href="/features" className="inline-block px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition shadow">
          Explore Features
        </a>
      </div>
      <div className="text-center text-gray-400 pt-8 pb-2 italic">
        <span className="text-blue-500 font-semibold">Made by Krish Chauhan</span> for Altair.
      </div>
    </div>
  );
};

export default HomePage;
