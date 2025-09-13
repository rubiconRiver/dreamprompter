'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DreamForm() {
  const [dream, setDream] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dream.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/dreams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: dream }),
      });

      if (response.ok) {
        setDream('');
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to save dream:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <label htmlFor="dream" className="block text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          What did you dream about last night?
        </label>
        <textarea
          id="dream"
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="I was chased by ducks through a neon city while carrying a pizza..."
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors resize-none"
          rows={4}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          disabled={isLoading || !dream.trim()}
          className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
        >
          {isLoading ? 'Interpreting Dream...' : 'Transform My Dream'}
        </button>
      </div>
    </form>
  );
}