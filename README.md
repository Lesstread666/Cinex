# Cinex

**Cinex** is a cinema-themed web application built with Next.js, TypeScript, Tailwind CSS, the TMDB API, and Supabase. It combines movie and TV-series discovery with a community where users can share posts.

## Features

### Movies and TV series
- Trending movies and TV series on the home page.
- Separate browsing pages for movies and series.
- Dynamic detail pages using TMDB data.
- Responsive cards, navigation, and a dark neon-themed interface.

### Authentication and community
- User registration and login with Supabase Authentication.
- Community feed and individual post pages.
- Create, edit, and delete posts.
- Optional post images uploaded to Supabase Storage.
- Keep, replace, or remove an existing post image when editing.
- Author-only post editing and deletion, enforced with Supabase Row Level Security policies.

## Tech stack

| Technology | Purpose |
| --- | --- |
| Next.js (App Router) | Routing, pages, and server actions |
| React & TypeScript | Component-based, typed frontend |
| Tailwind CSS | Responsive styling |
| TMDB API | Movie and TV-series data |
| Supabase | Authentication, PostgreSQL database, and Storage |
| React Hook Form & Zod | Form handling and validation |
| TanStack Query | Handling form mutations |

## Pages

- **Home:** Trending movie and TV content.
- **Movies / Series:** Dedicated content lists.
- **Movie / Series details:** Dynamic routes for individual titles.
- **Login / Sign up:** User authentication.
- **Community:** Browse posts and open individual post pages.
- **Create post:** Publish a post with optional image.
- **Edit post:** Change a post's title, content, or image.

## How it works

The app retrieves movie and TV data from the **TMDB API**. **Supabase** handles authentication and stores community posts in PostgreSQL. Images are uploaded to a public Supabase Storage bucket (`post-images`), and the corresponding public URLs are saved with posts. Server actions handle post changes, with validation and database access policies.

## Getting started

### Prerequisites

- Node.js and npm
- TMDB API access token
- Supabase project configured with the tables, authentication, storage bucket, and policies used by the app

### Installation

```bash
git clone <YOUR_REPOSITORY_URL>
cd cinex
npm install
```

Create a `.env.local` file in the project root. Configure the TMDB token and Supabase environment variables used by your client files, for example:

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_public_key
```

**Note:** Verify the exact Supabase environment variable names in your own `serverClient.ts` and `browserClient.ts`; they may differ. Never commit `.env.local` or private keys.

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

### Supabase setup

The application uses `Posts` and `Users` tables, Supabase Authentication, and a public Storage bucket named `post-images` for JPEG, PNG, and WebP uploads. Appropriate Row Level Security policies must be configured for reading, creating, updating, and deleting posts, and for uploading images. A fresh Supabase project requires this configuration before the community features work.

## Skills demonstrated

- Next.js App Router and dynamic routing
- REST API integration
- Supabase authentication, database, and file storage
- CRUD operations and access control
- Reusable React components and validated forms

## Credits

Movie and TV-series data is provided by [TMDB](https://www.themoviedb.org/). This project uses the TMDB API but is not endorsed or certified by TMDB.
