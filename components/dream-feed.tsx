import { db } from '@/lib/db';
import DreamCard from './dream-card';

export default async function DreamFeed() {
  const dreams = await db.dream.findMany({
    include: {
      tasks: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  });

  if (dreams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No dreams yet. Share your first dream above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {dreams.map((dream) => (
        <DreamCard key={dream.id} dream={dream} />
      ))}
    </div>
  );
}