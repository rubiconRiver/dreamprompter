# DreamPrompter 🌙✨

Transform your weird dreams into real-world actionable tasks!

## What It Does

DreamPrompter takes your dream descriptions and:
1. Parses them for themes using keyword mapping (no AI required!)
2. Generates 3-5 actionable real-world tasks
3. Spreads tasks across 3 days
4. Exports to calendar (.ics files)
5. Tracks your dream history in a Twitter-style feed

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Docker locally, cloud in production)
- **ORM**: Prisma
- **Calendar**: ics library for .ics export

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start PostgreSQL: `docker-compose up -d`
4. Run migrations: `npx prisma migrate dev`
5. Start dev server: `npm run dev`
6. Open http://localhost:3000

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://dreamuser:dreampass@localhost:5432/dreamprompter?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

For production, you'll need a cloud PostgreSQL database URL.

## Deployment

This app is configured for Vercel deployment:
1. Connect your GitHub repository to Vercel
2. Add `DATABASE_URL` environment variable with your production database
3. Deploy!

## Example Dreams

Try these dreams to see the parser in action:
- "I was chased by ducks through a neon city while carrying a pizza"
- "Flying over a forest with my best friend, finding treasure chests of chocolate"
- "Teaching cats how to use computers while it rained stars"

## How It Works

The dream parser looks for keywords in these categories:
- **Animals** → Zoo visits, animal shelters, nature docs
- **Locations** → Urban exploration, hiking, museums
- **Food** → New restaurants, cooking classes, farmers markets
- **Activities** → Sports, dance lessons, new skills
- **Nature** → Gardening, stargazing, camping
- **Colors** → Art galleries, photography, redecorating
- And more!

Each theme generates a specific actionable task to help you explore the real-world connections to your dream world.

## License

MIT