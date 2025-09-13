import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createEvents, EventAttributes } from 'ics';
import { format } from 'date-fns';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dream = await db.dream.findUnique({
      where: { id: params.id },
      include: { tasks: true },
    });

    if (!dream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 });
    }

    const events: EventAttributes[] = dream.tasks.map((task) => {
      const dueDate = new Date(task.dueDate);
      return {
        title: task.title,
        description: task.description || undefined,
        start: [
          dueDate.getFullYear(),
          dueDate.getMonth() + 1,
          dueDate.getDate(),
          9,
          0,
        ],
        duration: { hours: 1 },
        categories: ['DreamPrompter', task.theme],
        productId: 'dreamprompter',
        uid: task.id,
      };
    });

    const { error, value } = createEvents(events);

    if (error || !value) {
      console.error('Failed to create calendar:', error);
      return NextResponse.json({ error: 'Failed to create calendar' }, { status: 500 });
    }

    return new NextResponse(value, {
      headers: {
        'Content-Type': 'text/calendar',
        'Content-Disposition': `attachment; filename="dream-tasks-${params.id}.ics"`,
      },
    });
  } catch (error) {
    console.error('Failed to create calendar:', error);
    return NextResponse.json({ error: 'Failed to create calendar' }, { status: 500 });
  }
}