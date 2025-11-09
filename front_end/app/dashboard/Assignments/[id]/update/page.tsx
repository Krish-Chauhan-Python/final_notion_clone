'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/app/dashboard/components/sidebar.jsx';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear());
  const hour = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hour}:${mins}:${seconds}`;
}

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/data/${id}`)
      .then(res => res.json())
      .then(json => setAssignment(json))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDate(formatDate(assignment.due_date));
      setDesc(assignment.content);
    }
  }, [assignment]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen py-10 px-6 md:pl-16 flex flex-col items-center ">
        <div className="mt-8 bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-3xl mb-4">
          {assignment ? (
            <div className="space-y-10">
              {/* Title Section */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <span className="text-2xl md:text-4xl font-bold text-white">Task:</span>
                <input
                  type="text"
                  className="grow border border-gray-400 rounded-lg px-4 py-2 text-xl md:text-2xl bg-gray-900 text-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow"
                  placeholder="Enter task title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <button
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow transition disabled:bg-blue-300"
                  onClick={async () => {
                    const utcDateIso = new Date(date).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata',hour12: false});

                    const res = await fetch(`http://localhost:3001/api/data/${id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        title,
                        due_date: utcDateIso,
                        content: desc
                      })
                    });
                    await res.json();
                    router.push('/dashboard');
                  }}
                >
                  Update
                </button>
              </div>
              {/* Due Date Section */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <span className="text-lg md:text-2xl font-bold text-white">Due Date:</span>
                <input
                  type="text"
                  className="grow border border-gray-400 rounded-lg px-4 py-2 text-xl md:text-2xl bg-gray-900 text-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow"
                  placeholder="Enter due date (MM-DD-YYYY HH:MM:SS)"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
              {/* Description Section */}
              <div>
                <span className="text-lg md:text-2xl font-bold text-white block mb-2">Description:</span>
                <textarea
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full text-xl md:text-2xl h-44 bg-gray-900 text-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow resize-none"
                  placeholder="Enter task description (optional)"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                />
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
