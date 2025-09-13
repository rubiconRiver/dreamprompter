import DreamForm from '@/components/dream-form';
import DreamFeed from '@/components/dream-feed';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            DreamPrompter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Turn your weird dreams into real-world actions
          </p>
        </header>

        <div className="mb-12">
          <DreamForm />
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Recent Dreams & Actions
          </h2>
          <Suspense fallback={<DreamFeedSkeleton />}>
            <DreamFeed />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

function DreamFeedSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}