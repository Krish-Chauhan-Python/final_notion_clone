'use client';
import Sidebar from '@/app/dashboard/components/sidebar.jsx';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const timeZoneDiff = (5 * 60 + 30) * 60 * 1000;

function formatDateIST(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: false
  });
}

export default function Page() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/data/${id}`)
      .then(res => res.json())
      .then(json => setAssignment(json))
      .catch(error => console.error('Error fetching data:', error));
    
  }, [id]);

  

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen py-10 px-6 md:pl-16 flex flex-col items-center ">
        <div className="mt-8 bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-3xl mb-4">
          {assignment ? (
            <div className="w-full">
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <span className="text-2xl md:text-4xl font-bold text-white">
                  Task: {assignment.title}
                </span>
                <div className="flex gap-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
                    onClick={() => router.push(`${id}/update`)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
                    onClick={async () => {
                      await fetch(`http://localhost:3001/api/data/${assignment._id}`, {
                        method: 'DELETE'
                      });
                      router.push('/dashboard');
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr className="border-t-2 border-gray-700 rounded-full mb-6" />
              <div className="mb-6">
                <p className="text-lg md:text-2xl text-white font-semibold mb-2">Due Date:</p>
                <div className="bg-gray-900 rounded-lg px-3 py-2 text-base md:text-xl text-blue-100 inline-block">
                  {formatDateIST(assignment.due_date)}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-lg md:text-2xl text-white font-semibold mb-2">Description:</p>
                <div className="bg-gray-900 rounded-lg px-3 py-2 text-base md:text-lg text-blue-100 overflow-y-auto max-h-56 whitespace-pre-line">
                  {assignment.content ? assignment.content : "No description available"}
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3 text-gray-200 text-sm md:text-base shadow">
                <p>Created At:<br/>{formatDateIST(assignment.createdAt)}</p>
                <p>Last Updated:<br/>{formatDateIST(assignment.updatedAt)}</p>
              </div>
            </div>
          ) : (
            <div className="text-white text-lg">Loading...</div>
          )}
        </div>
      </main>
    </div>
  );
}
