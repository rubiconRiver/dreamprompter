import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseDream } from '@/lib/dream-parser';
import { addDays } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Dream content is required' }, { status: 400 });
    }

    // Parse the dream to extract themes
    const themes = parseDream(content);

    // Create the dream record
    const dream = await db.dream.create({
      data: {
        content,
        themes: JSON.parse(JSON.stringify(themes)),
        tasks: {
          create: themes.map((theme, index) => ({
            title: theme.action,
            description: `Inspired by "${theme.keyword}" in your dream`,
            theme: theme.category,
            action: theme.action,
            dueDate: addDays(new Date(), index + 1), // Spread tasks over 3 days
          })),
        },
      },
      include: {
        tasks: true,
      },
    });

    return NextResponse.json(dream);
  } catch (error) {
    console.error('Failed to create dream:', error);
    return NextResponse.json({ error: 'Failed to save dream' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dreams = await db.dream.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    return NextResponse.json(dreams);
  } catch (error) {
    console.error('Failed to fetch dreams:', error);
    return NextResponse.json({ error: 'Failed to fetch dreams' }, { status: 500 });
  }
}