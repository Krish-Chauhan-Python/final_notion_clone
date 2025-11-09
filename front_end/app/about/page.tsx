import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="max-w-full mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg h-full border">
      <h1 className="text-3xl font-extrabold hover:text-blue-500 transition delay-75 text-blue-700 mb-4 text-center tracking-tight">
        About Us
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center">
        Learn more about the one and only <span className="font-semibold text-blue-600">KRISH CHAUHAN</span> behind the <span className="font-semibold text-blue-600">Notion Clone</span>.
      </p>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start bg-blue-50 rounded-lg p-6 border border-blue-100 shadow-sm">
          <div className="shrink-0 mr-0 sm:mr-6 mb-4 sm:mb-0">
            
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">My Mission</h2>
            <p className="text-gray-700">
              My goal is to build a simplified, focused note-taking and productivity tool inspired by Notion. As a learning task from Altair.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start bg-blue-50 rounded-lg p-6 border border-blue-100 shadow-sm">
          <div className="shrink-0 mr-0 sm:mr-6 mb-4 sm:mb-0">
            
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Who Am I</h2>
            <p className="text-gray-700">
              This project is built by <i>very </i>passionate student experimenting with modern web technologies and UI. I hate clean code, great design, and building from scratch to learn.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-400 pt-4 pb-2 italic">
          Want to know more? Here's my number: <span className = "text-white border-gray-400 border-3 rounded px-2 py-0.5 hover:text-gray-400 transition ">jk I aint giving it</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
