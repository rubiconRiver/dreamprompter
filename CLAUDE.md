# Claude Development Guidelines for DreamPrompter

## Build-First Policy
**ALWAYS test build locally before committing/pushing:**
```bash
npm run build
```
If build fails, fix all errors before proceeding.

## Common Build Issues & Fixes

### 1. ESLint Errors
- Remove unused imports
- Fix type annotations (avoid `any` when possible)
- Use proper typing for Prisma JSON fields

### 2. Next.js 15 API Routes
Dynamic route params are now Promises:
```typescript
// OLD (Next.js 14)
{ params }: { params: { id: string } }

// NEW (Next.js 15)
{ params }: { params: Promise<{ id: string }> }
const { id } = await params;
```

### 3. Prisma JSON Type Handling
For Json fields, use:
```typescript
themes: JSON.parse(JSON.stringify(themes))
```

## Development Workflow
1. Make changes
2. Run `npm run build` to test
3. Fix any build errors
4. Test locally with `npm run dev`
5. Commit and push only after successful build

## Environment Variables
- Local: Uses `.env` with local PostgreSQL
- Production: Vercel auto-injects Neon database as `DATABASE_URL`

## Quick Commands
```bash
# Start dev server
npm run dev

# Test production build
npm run build

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```