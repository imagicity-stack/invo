# IMAGICITY OS

A Next.js (App Router) CRM + ERP built for IMAGICITY. The app runs in single-workspace, no-auth mode with local IndexedDB storage and is structured for future Firebase Auth and Firestore.

## Getting Started

```bash
npm install
npm run dev
```

Navigate to http://localhost:3000 to open the workspace. The first load seeds demo data across settings, services, clients, leads, deals, invoices, and payments. A Dev Mode banner highlights that authentication is off.

## Data Storage
- Local mode uses IndexedDB via [`idb`](https://github.com/jakearchibald/idb) under the database name `imagicity-os`.
- Repositories live in `src/data/repos/local` following the repository pattern so implementations can be swapped later without touching the UI or domain layers.
- Seeds are defined in `src/services/seed.ts` and can be reset from **Settings → Reset Demo Data**.

## Swapping to Firestore (high level)
1. Implement repository classes in `src/data/repos/firestore_placeholder` that match the `LocalRepo` API.
2. Wire an environment-based provider that swaps `localDataClient` to the Firestore-backed client.
3. Migrate the numbering logic (`src/services/numbering.ts`) to use Firestore transactions to maintain atomic counters.

## Future Auth Plan
- Add Firebase Auth with roles: **Admin, Sales, Accounts, PM, Viewer**.
- Guard server actions and Firestore access with role-based security rules.
- Introduce workspace documents to support multi-workspace tenancy; scope all data by workspace ID.
