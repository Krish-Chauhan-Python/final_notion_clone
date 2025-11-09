'use client'
import { useEffect, useState } from 'react';
import Sidebar from '@/app/dashboard/components/sidebar.jsx';

interface Task {
  _id: string;
  title: string;
  due_date: string;
  updatedAt: string;
  content?: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()); 
  return `${day}-${month}-${year}`;
}

function classifyTasks(tasks: Task[]): {
  past: Task[];
  today: Task[];
  soon: Task[];
} {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  return {
    past: tasks.filter(
      t => new Date(t.due_date) < todayStart
    ).sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()),
    today: tasks.filter(
      t => {
        const d = new Date(t.due_date);
        return d >= todayStart && d <= todayEnd;
      }
    ).sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()),
    soon: tasks.filter(
      t => {
        const d = new Date(t.due_date);
        return d > todayEnd && d <= new Date(todayEnd.getTime() + 7 * 24 * 60 * 60 * 1000);
      }
    ).sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()),
  };
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/data/')
      .then(res => res.json())
      .then(json => setTasks(json))
      .catch(console.error);
  }, []);

  const recentTasks = [...tasks].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 6);

  const classified = classifyTasks(tasks);

  return (
    <div className="flex mt-10 rounded-2xl w-250 bg-gray-300 min-h-screen">
      <Sidebar />
      <main className="flex-1 py-12 px-6 ">
        
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Recently Added</h1>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12 justify-center">
          {recentTasks.length ? recentTasks.map(task => (
                <div key={task._id} className="bg-white rounded-xl shadow p-5 flex flex-col">
                  <a href={`/dashboard/Assignments/${task._id}`} className="text-blue-600 hover:underline text-xs"><span className="text-blue-700 font-semibold text-lg mb-1">{task.title}</span></a>
                  <span className="text-gray-600 text-sm mb-2">
                    Updated: {formatDate(task.updatedAt)}
                  </span>
                  <span className="bg-blue-50 text-blue-600 rounded px-2 py-0.5 w-fit text-xs mb-2">
                    Due: {formatDate(task.due_date)}
                  </span>
                  <p className="text-gray-700 text-sm line-clamp-2 mb-2">{task.content}</p>
                </div>
              ))
            : <div className="col-span-3 text-gray-400 text-center">No recent tasks.</div>}
        </div>

        {/* Main tasks section */}
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Your Tasks</h2>
        <div className="grid md:grid-cols-3 gap-7">
          {/* Past Due */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-2 text-center">Past Due Date</h3>
            <div className="space-y-4">
            {classified.past.length
              ? classified.past.map(task => (
                  <div key={task._id} className="bg-red-50 rounded shadow p-3">
                    <span className="text-red-700 font-semibold">{task.title}</span>
                    <span className="block text-xs text-gray-600 mb-1">Due: {formatDate(task.due_date)}</span>
                  </div>
                ))
              : <div className="text-center text-gray-400">No past-due tasks</div>}
            </div>
          </div>

          {/* Due Today */}
          <div>
            <h3 className="text-lg font-bold text-green-600 mb-2 text-center">Due Today</h3>
            <div className="space-y-4">
            {classified.today.length
              ? classified.today.map(task => (
                  <div key={task._id} className="bg-green-50 rounded shadow p-3">
                    <span className="text-green-700 font-semibold">{task.title}</span>
                    <span className="block text-xs text-gray-600 mb-1">Due: {formatDate(task.due_date)}</span>
                  </div>
                ))
              : <div className="text-center text-gray-400">No tasks due today</div>}
            </div>
          </div>

          {/* Due Soon */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-2 text-center">Due Soon</h3>
            <div className="space-y-4">
            {classified.soon.length
              ? classified.soon.map(task => (
                  <div key={task._id} className="bg-blue-50 rounded shadow p-3">
                    <span className="text-blue-700 font-semibold">{task.title}</span>
                    <span className="block text-xs text-gray-600 mb-1">Due: {formatDate(task.due_date)}</span>
                  </div>
                ))
              : <div className="text-center text-gray-400">No upcoming tasks</div>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
