'use client';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import Link from 'next/link';

const Sidebar = forwardRef((props, ref) => {
  const [change, setChange] = useState(true);
  const [data, setData] = useState([]);

  useImperativeHandle(ref, () => ({
    toggleChange() {
      setChange((prev) => !prev);
    },
  }));

  useEffect(() => {
    fetch('http://localhost:3001/api/data/')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  }, [change]);

  return (
    <aside className=" h-[calc(100vh-4rem)] w-70 bg-gray-900 text-white fixed top-16 left-0 shadow-xl border-r border-gray-800 flex flex-col">

      <nav className="flex-1 flex flex-col space-y-7 pt-8 px-4">
        <div>
          <Link
            href="/dashboard"
            className="block group relative rounded-lg px-3 py-2 text-xl font-medium transition-colors duration-200 overflow-hidden"
          >
            <span className="relative z-10 text-3xl">Dashboard</span>
            <span className="absolute left-0 top-0 h-full w-full bg-gray-700 opacity-0 group-hover:opacity-100 group-hover:scale-x-100 rounded-lg transition-all duration-300 ease-out z-0 scale-x-0 origin-left"></span>
          </Link>
        </div>
        <hr className="border-t-2 border-gray-700 rounded-full mb-6" />
        <div className="flex items-center text-lg font-semibold gap-2 px-1">
          <span className='ml-2 text-3xl'>Assignments</span>
          <Link
            key="add"
            href="/dashboard/add"
            className="rounded-full hover:bg-blue-600 bg-blue-700 text-white w-10 h-10 flex items-center justify-center transition-colors shadow"
            title="Add assignment"
          >
            +
          </Link>
        </div>

        <div className="space-y-2 pt-2 overflow-y-scroll max-h-100 rounded-2xl">
          {data.map((item) => (
            <div key={item._id} className="group relative">
              <Link
                href={`/dashboard/Assignments/${item._id}`}
                className="ml-3 block px-3 py-1.5 text-base rounded-lg font-normal relative z-10 transition-colors duration-200 group-hover:text-blue-200"
              >
                {item.title}
              </Link>
              
              <span className="absolute inset-0 bg-gray-700 rounded-lg z-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
});

export default Sidebar;
