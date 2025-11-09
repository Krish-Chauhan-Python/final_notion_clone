import React from 'react';


const FeaturesPage = () => {
  return (
    <div className="max-w-full mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg h-full border ">
      <h1 className="text-3xl font-extrabold hover:text-blue-500 transition delay-75 text-blue-700 mb-4 text-center tracking-tight">
        Features
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center">
        Welcome to the <span className="font-semibold text-blue-600">Notion Clone</span>!
      </p>
      <div className="space-y-6">
        <div className="flex items-start bg-blue-50 rounded-lg p-5 border border-blue-100 shadow-sm">
          <div className="shrink-0 mr-4">
            
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-1">To-Do List Creation</h2>
            <p className="text-gray-700">
              Easily add, track, and manage your tasks with our intuitive to-do list interface. <br/>
              Create new to-do items, check them off when completed, and stay organized in a distraction-free workspace.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-400 pt-4 pb-2 italic">
          More features coming soon hopefully.
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
