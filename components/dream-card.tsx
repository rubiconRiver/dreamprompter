'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import type { Dream, Task } from '@prisma/client';

interface DreamWithTasks extends Dream {
  tasks: Task[];
}

interface DreamCardProps {
  dream: DreamWithTasks;
}

interface DreamTheme {
  keyword: string;
  category: string;
  action: string;
}

export default function DreamCard({ dream }: DreamCardProps) {
  const [showTasks, setShowTasks] = useState(false);
  const themes = (dream.themes as unknown) as DreamTheme[];

  const downloadCalendar = async () => {
    const response = await fetch(`/api/dreams/${dream.id}/calendar`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dream-tasks-${dream.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(dream.createdAt), 'MMM d, yyyy · h:mm a')}
          </time>
          <button
            onClick={downloadCalendar}
            className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            📅 Export to Calendar
          </button>
        </div>

        <p className="text-gray-800 dark:text-gray-200 text-lg mb-4 leading-relaxed">
          {dream.content}
        </p>

        {themes && themes.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Dream Themes:</p>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                >
                  {theme.keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowTasks(!showTasks)}
          className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          {showTasks ? 'Hide' : 'Show'} {dream.tasks.length} Generated Tasks →
        </button>

        {showTasks && (
          <div className="mt-4 space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            {dream.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <input
                  type="checkbox"
                  defaultChecked={task.completed}
                  className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  onChange={async (e) => {
                    await fetch(`/api/tasks/${task.id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ completed: e.target.checked }),
                    });
                  }}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Due: {format(new Date(task.dueDate), 'MMM d, yyyy')} · Theme: {task.theme}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}