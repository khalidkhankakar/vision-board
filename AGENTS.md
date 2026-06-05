# Vision Board - Agent Instructions

A **real-time collaborative drawing application** (similar to Figma) built with Next.js, React 19, Liveblocks, Drizzle ORM, and PostgreSQL. See [README.md](README.md) for feature overview.

## 🎯 Project Status

**Stage**: MVP - mostly feature-complete, with some TODOs
- ✅ Authentication, real-time sync, board management, search, organization structure
- ⏳ **Incomplete**: Pencil tool drawing, toast notifications, full layer renderers, dynamic user IDs

## 🏗️ Architecture

### Directory Structure
```
app/
├─ (auth)              # Sign-in/Sign-up (Clerk)
├─ (dashboard)         # Dashboard with board list
│  └─ _components/     # 16 UI components (board-*, org-*, navbar, search)
├─ board/[id]          # Canvas page (protected)
│  └─ _components/     # 14 canvas components (drawing, layers, toolbar)
├─ api/[...route]/     # Hono.js API router
└─ layout.tsx          # Root layout

lib/
├─ db/                 # Drizzle ORM setup, schemas (board, favorite, user), migrations
├─ query/              # API call wrappers (board.queries.ts uses SWR + fetcher)
└─ utils.ts            # Geometry helpers, color utilities, bounds calculation

components/
├─ shared/             # room.tsx (Liveblocks provider), modals
└─ ui/                 # Radix/Shadcn components (button, dialog, avatar, etc)

hooks/                 # use-debounce.ts, use-delete-layer.tsx, use-rename-model.tsx, use-selection-bounds.tsx

providers/             # model-provider.tsx (Zustand modal state)

types/                 # canvas.ts (LayerType, canvasElements, interfaces)
```

### Data Flow
```
Client (SWR)
   ↓
Next.js API Route (Hono)
   ↓
Drizzle ORM + PostgreSQL (board, favorite)
   
Real-time Layer:
Client ←→ Liveblocks ←→ Other clients
(Canvas state synced via RoomProvider)
```

## 🛠️ Tech Stack & Key Dependencies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15, React 19 | App Router, Server Components |
| **UI** | Tailwind CSS, Radix UI, Shadcn | Styling & components |
| **State** | Zustand | Modal state (rename dialog) |
| **Data Fetch** | SWR | Client-side caching |
| **Real-time** | Liveblocks | Presence, awareness, storage |
| **Backend** | Hono.js | Lightweight API in route handlers |
| **Database** | Drizzle ORM, PostgreSQL (Neon) | Type-safe queries |
| **Auth** | Clerk | User authentication |

## 🚀 Development Workflow

### Essential Commands
```bash
npm run dev              # Start Next.js + Turbopack
npm run build           # Production build
npm run lint            # ESLint check
npm run db:generate     # Generate Drizzle migrations
npm run db:push         # Apply migrations to database
```

### Environment Variables (required)
```
DATABASE_URL            # PostgreSQL connection string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
LIVEBLOCKS_PUBLIC_API_KEY
```

## 📋 Key Conventions & Patterns

### File Naming
- Components: `kebab-case.tsx`
- Hooks: `use-kebab-case.ts(x)`
- Database: lowercase table names, camelCase columns
- Database indexes: `{column}Idx` suffix

### Component Patterns
```tsx
// Standard export + static skeleton for loading states
const BoardCard = ({ id, title, ... }) => { ... }
BoardCard.Skeleton = () => <div className="skeleton">...</div>
export default BoardCard
```

### Data Fetching (SWR + SWR)
```tsx
// board.queries.ts: wrapper functions
export const fetcher = (url) => fetch(url).then(r => r.json())

// Usage in components:
const { data, error, isLoading } = useSWR(endpoint, fetcher)
```

### Type Definitions
- Database: `IBoard`, `IFavorite` (from Drizzle schema)
- Canvas: `LayerType` enum (rectangle, ellipse, text, sticky_note) in [types/canvas.ts](types/canvas.ts)

### API Routes (Hono)
All routes in [app/api/[...route]/route.ts](app/api/[...route]/route.ts):
- `GET /api/board/:orgId` — List boards with search/favorite filter
- `POST /api/board` — Create board
- `PATCH /api/board/:id` — Update (title)
- `DELETE /api/board/:id` — Delete
- `PATCH /api/favorite/:boardId` — Toggle favorite
- `GET /api/organization/:orgId/members` — Get org members

## 🎨 Canvas & Real-time Layer

### Key Files
- [app/board/_components/canvas.tsx](app/board/_components/canvas.tsx) — 300+ lines: drawing logic, selection, mutations
- [components/shared/room.tsx](components/shared/room.tsx) — Liveblocks RoomProvider setup
- [liveblocks.config.ts](liveblocks.config.ts) — Type definitions for Liveblocks storage
- [types/canvas.ts](types/canvas.ts) — Canvas types (LayerType, Bounds, etc)

### Canvas State (Liveblocks)
- Storage: `layers` (map of layer objects), `layerIds` (order)
- Presence: `user` (cursor position, selectedLayerIds, pencilDraft)

### Drawing Operations
- **Selection**: Click shape → set `selectedLayerIds`
- **Move**: Drag selected layer → update layer position
- **Resize**: Handle resize → recalculate bounds
- **Undo/Redo**: Integrated with Liveblocks history
- **Delete**: useDeleteLayer hook mutation

### Layer Renderers
- [layer-preview.tsx](app/board/_components/layer-preview.tsx) — Renders individual layers by type
  - **Rectangle**: ✅ Complete
  - **Ellipse**: ⏳ TODO (returns null)
  - **Text**: ⏳ TODO (returns null)
  - **Sticky Note**: ⏳ TODO (returns null)

## 🐛 Known Issues & TODOs

| Issue | File | Line | Impact | Priority |
|-------|------|------|--------|----------|
| Pencil/freehand drawing not implemented | canvas.tsx | 204 | Can't draw free-form lines | 🔴 High |
| No toast notifications | board-card.tsx | 43 | Silent operations (delete, rename, favorite) | 🟡 Medium |
| Layer preview incomplete | layer-preview.tsx | ~50+ | Ellipse, text, sticky notes don't render | 🟡 Medium |
| Hardcoded user ID | route.ts | 113 | Uses 'user_2p3i8...' instead of dynamic Clerk ID | 🔴 High |
| Bounds calculation for resize | utils.ts | (resize logic) | Right/bottom edge resizing may be incorrect | 🟡 Medium |
| Rename validation TODO | rename-model.tsx | 34 | Code works but has TODO comment | 🟢 Low |

## 🔑 Critical Files to Master

### Priority 1 — Core Logic
- [canvas.tsx](app/board/_components/canvas.tsx) — Drawing interactions, selection, layer mutations
- [route.ts](app/api/[...route]/route.ts) — All API endpoints and database queries
- [room.tsx](components/shared/room.tsx) — Liveblocks real-time setup
- [liveblocks.config.ts](liveblocks.config.ts) — Type definitions for real-time storage

### Priority 2 — Features
- [board-list.tsx](app/(dashboard)/_components/board-list.tsx) — Board fetching, search, filtering
- [card-menu-dropdown.tsx](app/(dashboard)/_components/card-menu-dropdown.tsx) — Delete, rename, copy operations
- [participants.tsx](app/board/_components/participants.tsx) — Multi-user presence display

### Priority 3 — Utilities
- [utils.ts](lib/utils.ts) — Geometry (bounds, colors, helpers)
- [use-delete-layer.tsx](hooks/use-delete-layer.tsx) — Delete mutation hook
- [board.queries.ts](lib/query/board.queies.ts) — API wrappers for SWR
- [canvas.ts](types/canvas.ts) — Type definitions

## ✅ Common Tasks

### Add a New Shape Type
1. Add to `LayerType` enum in [types/canvas.ts](types/canvas.ts)
2. Add shape properties to canvas state in [liveblocks.config.ts](liveblocks.config.ts)
3. Implement drawing logic in [canvas.tsx](app/board/_components/canvas.tsx)
4. Render shape in [layer-preview.tsx](app/board/_components/layer-preview.tsx)

### Add a New API Endpoint
1. Define route in [route.ts](app/api/[...route]/route.ts) using Hono
2. Add database query using Drizzle in the same file
3. Export wrapper in [board.queries.ts](lib/query/board.queies.ts) for SWR consumption

### Fix Real-time Sync Issue
1. Check Liveblocks console for presence/storage updates
2. Verify storage schema in [liveblocks.config.ts](liveblocks.config.ts)
3. Ensure mutations in [canvas.tsx](app/board/_components/canvas.tsx) call the right Liveblocks APIs

## 🔐 Authentication & Authorization

- **Clerk** handles all user authentication (sign-in, sign-up)
- **Organizations** via Clerk: users create/join orgs
- **Board Access**: Protected via route `board/[id]` — anyone in the same org can access
- **API Protection**: Verify `org_id` from Clerk context on sensitive routes

## 📊 Database Schema

See [lib/db/schemas/](lib/db/schemas/):
- **board**: id, title, authorId, authorName, orgId, createdAt, isFavorite (denormalized)
- **favorite**: id, userId, boardId
- **user**: (unused — Clerk is source of truth)

## 🚨 Before Making Changes

1. **Check existing TODOs** — Don't duplicate incomplete work
2. **Test real-time sync** — Changes to canvas state affect multiple users
3. **Verify org context** — Most features are org-scoped
4. **Update Drizzle migrations** — If schema changes, run `npm run db:push`
5. **Test Clerk auth flows** — Sign-in, sign-up, org switching

## 🤝 Git Workflow

Follow [CONTRIBUTING.md](README.md#-contribution-guidelines) pattern:
```bash
git checkout -b feature/descriptive-name
# Make changes
git commit -m "feat: add feature description"
git push origin feature/descriptive-name
# Open PR
```

---

**Last Updated**: June 2026 | **MVP Stage** 🚀
