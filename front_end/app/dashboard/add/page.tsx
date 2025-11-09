'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/dashboard/components/sidebar.jsx';

function parseDDMMYYYY(dateStr) {

  const match = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (!match) return null;
  const [, dd, mm, yyyy, hh = '00', min = '00', ss = '00'] = match;

  const d = new Date(`${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`);
  if (isNaN(d.getTime())) return null; // Invalid check
  return d;
}

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen py-10 px-6 md:pl-16 flex flex-col items-center">
        <div className="mt-8 bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-3xl mb-4">
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
                  const d = parseDDMMYYYY(date);
                  if (!d) {
                    setDateError('Please enter a valid date in DD-MM-YYYY format.');
                    return;
                  }
                  setDateError('');
                  const res = await fetch('http://localhost:3001/api/data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: title,
                      due_date: d.toISOString(), // store as UTC ISO
                      content: desc,
                    }),
                  });
                  await res.json();
                  router.push('/dashboard');
                }}
                disabled={!!dateError}
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <span className="text-lg md:text-2xl font-bold text-white">Due Date:</span>
              <input
                type="text"
                className="grow border border-gray-400 rounded-lg px-4 py-2 text-xl md:text-2xl bg-gray-900 text-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow"
                placeholder="Enter due date (DD-MM-YYYY HH:MM[:SS])"
                value={date}
                onChange={e => {
                  setDate(e.target.value);
                  const d = parseDDMMYYYY(e.target.value);
                  setDateError(d ? '' : 'The date format or value is invalid.');
                }}
              />
              <p>
              {dateError && <div className="text-red-500 text-sm ml-35">{dateError}</div>}
              </p>
            </div>

            <div>
              <span className="text-lg md:text-2xl font-bold text-white block mb-2">Description:</span>
              <textarea
                className="border border-gray-400 rounded-lg px-4 py-2 w-full text-xl md:text-2xl h-44 bg-gray-900 text-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow resize-none"
                placeholder="Enter description of the task (optional)"
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
