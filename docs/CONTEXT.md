# Ghost Story Web Application — Technical Specification

This document describes the high-level flow and detailed features of a Ghost Story Web Application focused on collecting user-generated ghost stories from Thailand. It is intended for frontend and backend developers familiar with Next.js (v15), TypeScript, TailwindCSS, shadcn/ui, and Supabase (or similar). Key differentiators include:

- **User-Generated Content (UGC):** Registered members can submit, edit, and view ghost stories.
- **Text-to-Speech (TTS):** Each story page offers an audio playback of the story text.
- **Location-Based Search (Main Function):** Visitors can search for ghost stories “near me” by leveraging geospatial queries (latitude/longitude).

> **Assumptions & Context:**
> - Developers will use **Next.js 15** with **TypeScript**, **TailwindCSS**, and **shadcn/ui** for UI components.
> - **Supabase** (or an equivalent PostgreSQL database with a geospatial extension) will serve as the backend (database + auth).
> - **Vercel/AI SDK** (or another TTS API) will handle text-to-speech generation.
> - The application targets Thai users (18+), so all UI strings, date formats, and map defaults should localize to Thailand (e.g., default map center at Bangkok).

---

## Table of Contents

1. [Architecture & Tech Stack](#architecture--tech-stack)  
2. [High-Level User Flows](#high-level-user-flows)  
   1. [Visitor Browsing & Location Search](#visitor-browsing--location-search)  
   2. [User Registration & Authentication](#user-registration--authentication)  
   3. [Story Submission & Management](#story-submission--management)  
3. [Data Model & Database Schemas](#data-model--database-schemas)  
4. [API Endpoints & Server-Side Logic](#api-endpoints--server-side-logic)  
5. [UI Components & Page Structure](#ui-components--page-structure)  
   1. [Global Layout & Navigation](#global-layout--navigation)  
   2. [Homepage & Search Interface](#homepage--search-interface)  
   3. [Story Detail Page (with TTS)](#story-detail-page-with-tts)  
   4. [Story Submission Form](#story-submission-form)  
   5. [User Profile & Story Management](#user-profile--story-management)  
6. [Text-to-Speech Integration](#text-to-speech-integration)  
7. [Location-Based Search Implementation](#location-based-search-implementation)  
8. [Authentication & Authorization](#authentication--authorization)  
9. [Additional Considerations](#additional-considerations)  
   - [Moderation / Content Review](#moderation--content-review)  
   - [Performance & Caching](#performance--caching)  
   - [Internationalization (i18n)](#internationalization-i18n)  
   - [Deployment & Environment Variables](#deployment--environment-variables)  
   - [Monitoring & Logging](#monitoring--logging)  
10. [Project Structure (Filesystem)](#project-structure-filesystem)  

---

## 1. Architecture & Tech Stack

| Layer                  | Technology / Library                   | Purpose                                                              |
|------------------------|----------------------------------------|----------------------------------------------------------------------|
| Frontend Framework     | Next.js (v15) + TypeScript             | React-based SSR/SSG, routing, API routes.                            |
| UI Styling             | TailwindCSS + shadcn/ui                | Utility-first styles, prebuilt components for consistent UI.         |
| Database               | Supabase (PostgreSQL + PostGIS)        | Persistent storage: users, stories, geospatial queries.              |
| Authentication         | Supabase Auth                          | Email/password & social login (optional), session management.        |
| File Storage           | Supabase Storage (optional)            | If you allow image uploads (e.g., photos of haunted sites).          |
| Text-to-Speech (TTS)   | Vercel/AI SDK (Vercel.ai) or Google TTS| Convert story text → audio URL.                                       |
| Maps & Geocoding       | Leaflet.js (OpenStreetMap) + OpenCage | Map UI + forward geocoding for user-entered locations.               |
| State Management       | React Context / Jotai (if needed)      | Manage global UI state (e.g., current user, TTS playback state).     |
| Hosting & Deployment   | Vercel (Next.js) + Environment Variables| Auto-deploy from Git; secure env vars (e.g., TTS API keys).           |
| CI/CD                  | GitHub Actions (optional)             | Run tests, lint, and auto-deploy to Vercel.                           |

---

## 2. High-Level User Flows

### 2.1 Visitor Browsing & Location Search

1. **Homepage Load (SSR/SSG):**  
   - Fetch popular/recent ghost stories (optional).  
   - Initialize map centered on default coordinates (e.g., Bangkok, Thailand).  

2. **Search “Near Me” Button or Manual Location Entry:**  
   - If the visitor consents to geolocation, prompt browser to retrieve latitude/longitude.  
   - If declined, provide an input (city/province/village) with auto-completion (using OpenCage geocoding).  

3. **Display Nearby Stories:**  
   - Call `GET /api/stories/nearby?lat=<>&lng=<>‎&radius=5km`  
   - Backend returns stories whose geolocation is within specified radius (e.g., 5 km).  
   - Frontend displays markers on map + list view (title, snippet, distance).  

4. **Select a Story Marker or List Item:**  
   - Navigate to `/stories/[storyId]` (dynamic Next.js route).  
   - Render story detail & initialize TTS toggle (Play/Pause).  

---

### 2.2 User Registration & Authentication

1. **Sign Up / Sign In:**  
   - `/auth/signin` & `/auth/signup` pages using Supabase Auth.  
   - Validate email format, password strength.  
   - On successful sign-in, store user session (cookie or JWT).  

2. **Protected Routes (Optional):**  
   - Only **logged-in** members can submit/edit ghost stories.  
   - Middleware (`middleware.ts` in Next.js) checks Supabase Auth session; redirects to `/auth/signin` if no session.  

---

### 2.3 Story Submission & Management

1. **Create Story (`/stories/new`):** (Protected)  
   1. **Form Fields:**  
      - **Title** (string, required)  
      - **Content/Body** (multi-line text, required)  
      - **Location** (input with map picker or address autocomplete; geocode → lat/lng)  
      - **Optional Images** (upload to Supabase Storage; store URL references)  
      - **Tags / Category** (e.g., “Wat,” “Village,” “Urban Legend”)  

   2. **Client-Side Validation:**  
      - Ensure required fields are not empty; validate location.  

   3. **On Submit:**  
      - Call `POST /api/stories`: send `{ title, body, latitude, longitude, tags[], imageURLs[] }`.  
      - Backend validates, inserts into Supabase table (`stories`), returns new `storyId`.  

   4. **Redirect:**  
      - After successful creation, redirect to `/stories/[storyId]` with a success toast.  

2. **Edit / Delete Story (`/stories/[storyId]/edit`):** (Protected, Owner-only)  
   - Pre-populate form with existing data.  
   - On “Save Changes,” call `PUT /api/stories/[storyId]`.  
   - On “Delete,” call `DELETE /api/stories/[storyId]` (with a confirmation modal).  

3. **User Dashboard (`/profile` or `/my-stories`):**  
   - Fetch all stories by current user: `GET /api/users/me/stories`.  
   - List each story with edit/delete buttons.  
   - Option to create a new story.  

---

## 3. Data Model & Database Schemas

Below are the recommended Supabase (PostgreSQL) tables. Use the PostGIS extension for location queries.

### 3.1 Table: `users`

| Column        | Type                     | Constraints                       | Description                                |
|---------------|--------------------------|-----------------------------------|--------------------------------------------|
| `id`          | `uuid`                   | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique user identifier.              |
| `email`       | `text`                   | UNIQUE, NOT NULL                  | User’s email (used for login).             |
| `password_hash` | `text`                 | NOT NULL                          | Hashed password (handled by Supabase Auth).|
| `display_name`| `text`                   | NULLABLE                          | Optional display name.                     |
| `created_at`  | `timestamp with time zone` | DEFAULT `now()`                 | Account creation timestamp.                |

### 3.2 Table: `stories`

| Column          | Type                                  | Constraints                                 | Description                                                    |
|-----------------|---------------------------------------|---------------------------------------------|----------------------------------------------------------------|
| `id`            | `uuid`                                | PRIMARY KEY, DEFAULT `gen_random_uuid()`    | Unique story ID.                                               |
| `user_id`       | `uuid`                                | REFERENCES `users(id)` ON DELETE CASCADE     | Author (foreign key).                                          |
| `title`         | `text`                                | NOT NULL                                    | Story title.                                                   |
| `body`          | `text`                                | NOT NULL                                    | Full story content.                                            |
| `location_name` | `text`                                | NOT NULL                                    | Human-readable location (e.g., “Wat Arun, Bangkok”).           |
| `geog`          | `geography(Point, 4326)`              | NOT NULL                                    | PostGIS geography point: (latitude, longitude).                |
| `tags`          | `text[]`                              | DEFAULT `'{""}'`                            | Array of tags/categories.                                      |
| `image_urls`    | `text[]`                              | DEFAULT `'{}'`                              | Array of URLs for uploaded images.                              |
| `created_at`    | `timestamp with time zone`            | DEFAULT `now()`                             | Story creation timestamp.                                      |
| `updated_at`    | `timestamp with time zone`            | DEFAULT `now()`                             | Last update timestamp (auto‐update with trigger).              |
| `is_published`  | `boolean`                             | DEFAULT `true`                              | Toggle for admin moderation or draft states (optional).        |

> **PostGIS Note:**  
> - The `geog` column uses SRID 4326 so that you can run `ST_DWithin(geog, ST_MakePoint(<lng>,<lat>)::geography, <distance_meters>)` to find stories within a radius.  
> - Create an index:  
>   ```sql
>   CREATE INDEX idx_stories_geog ON stories USING GIST(geog);
>   ```  

### 3.3 Table: `tts_cache` (Optional, for performance)

| Column         | Type                     | Constraints                       | Description                                                      |
|----------------|--------------------------|-----------------------------------|------------------------------------------------------------------|
| `story_id`     | `uuid`                   | PRIMARY KEY, REFERENCES `stories(id)` | Foreign key to story.                                          |
| `audio_url`    | `text`                   | NOT NULL                          | URL of generated TTS audio.                                      |
| `generated_at` | `timestamp with time zone` | DEFAULT `now()`                 | Timestamp for cache invalidation (optional).                     |

---

## 4. API Endpoints & Server-Side Logic

Below is a recommended set of Next.js API routes (`/pages/api/...`) or equivalent **app router** endpoints (`/app/api/.../route.ts`) that interface between the frontend and Supabase.

> **General Pattern:**  
> - All endpoints respond with JSON:  
>   ```ts
>   res.status(200).json({ success: true, data: ... });
>   ```  
>   or  
>   ```ts
>   res.status(400).json({ success: false, error: "Error message" });
>   ```  
> - Use `@supabase/supabase-js` on the server to connect with service_role key for privileged queries (e.g., moderation).  
> - Use edge functions or Next.js middleware to protect authenticated routes.

### 4.1 Public Endpoints

1. **`GET /api/stories/nearby?lat=<>&lng=<>&radius=<km>`**  
   - **Purpose:** Return all published stories within `<radius>` kilometers of (`lat`, `lng`).  
   - **Server Logic:**  
     1. Parse `lat`, `lng`, `radius`. Convert `radius` km → meters (× 1000).  
     2. Run geospatial query:  
        ```ts
        const { data, error } = await supabase
          .from('stories')
          .select('id, title, body, location_name, image_urls, tags, created_at, geog')
          .filter('is_published', 'eq', true)
          .filter('ST_DWithin', 
                  `geog, ST_MakePoint(${lng}, ${lat})::geography, ${radiusMeters}`)
        ```
     3. Return list of stories with computed distance (optional: use `ST_Distance`).  

2. **`GET /api/stories/[storyId]`**  
   - **Purpose:** Fetch full details of a specific story.  
   - **Server Logic:**  
     1. Validate `storyId` format.  
     2. Query Supabase:  
        ```ts
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .eq('id', storyId)
          .single();
        ```  
     3. If `tts_cache` exists for this story, include `audio_url`. Otherwise, return `audio_url: null`.  

3. **`GET /api/stories/random?limit=<n>`** (Optional)  
   - **Purpose:** Fetch `n` random published stories (for homepage “Featured” section).  

### 4.2 Protected Endpoints (Require Auth)

> _Use middleware to verify Supabase JWT in request headers (e.g., `Authorization: Bearer <access_token>`). Abort with `401 Unauthorized` if invalid._

1. **`POST /api/stories`**  
   - **Purpose:** Create a new ghost story.  
   - **Request Body:**  
     ```jsonc
     {
       "title": "Haunted Library of Chiang Mai",
       "body": "When I was a child…",
       "location_name": "Chiang Mai Central Library",
       "latitude": 18.7877,
       "longitude": 98.9931,
       "tags": ["Library", "Chiang Mai", "Urban Legend"],
       "image_urls": ["https://bucket.supa.co/.../image1.jpg"]
     }
     ```
   - **Server Logic:**  
     1. Validate required fields.  
     2. Construct `geog`:  
        ```ts
        const geog = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };
        ```  
     3. Insert into `stories` table with `user_id = supabase.auth.user().id`.  
     4. Return `{ success: true, data: { storyId } }`.  

2. **`PUT /api/stories/[storyId]`**  
   - **Purpose:** Edit an existing story (only the author).  
   - **Server Logic:**  
     1. Validate `storyId` → fetch story → ensure `user_id === currentUser.id`.  
     2. Update fields: `title`, `body`, `location_name`, `geog`, `tags`, `image_urls`. Update `updated_at = now()`.  
     3. Return success status.  

3. **`DELETE /api/stories/[storyId]`**  
   - **Purpose:** Delete a story (soft-delete or permanent).  
   - **Server Logic:**  
     1. Validate author.  
     2. If using soft-delete, set `is_published = false`; else, delete row.  
     3. Return success.  

4. **`GET /api/users/me/stories`**  
   - **Purpose:** Fetch all stories authored by the logged-in user.  
   - **Server Logic:**  
     1. Query:  
        ```ts
        supabase
          .from('stories')
          .select('id, title, location_name, created_at, is_published')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });
        ```  
     2. Return list.  

---

## 5. UI Components & Page Structure

Below is a breakdown of Next.js page routes (or app router folder structure) and the associated React components. Use **shadcn/ui** components (e.g., `<Card>`, `<Button>`) with **TailwindCSS** utility classes for styling. All code is assumed to be written in TypeScript.

### 5.1 Global Layout & Navigation

- **`/components/Layout.tsx`**  
  - Contains:  
    - `<Header>` with logo, site title (e.g., “Thai Ghost Stories”), and nav links: Home, Submit Story (if authenticated), Sign In/Sign Up or Profile.  
    - `<Footer>` with copyright.  
  - Wrap all pages with `<Layout>` in `_app.tsx` or `layout.tsx`.

- **`/components/MapContainer.tsx`**  
  - A reusable Leaflet map component that accepts:  
    - `center: { lat: number; lng: number }`  
    - `markers: Array<{ id: string; lat: number; lng: number; title: string }>`  
    - `onMarkerClick: (id: string) => void`  

- **`/components/SearchBar.tsx`**  
  - Input for “Enter location” + geocoding autocomplete (OpenCage).  
  - “Use My Location” button: triggers browser geolocation.

- **`/components/StoryCard.tsx`**  
  - Displays: thumbnail (optional), title, snippet (first 150 chars), distance (e.g., “2.3 km away”), and tags.  
  - On click: navigate to `/stories/[id]`.  

---

### 5.2 Homepage & Search Interface (`/pages/index.tsx` or `/app/page.tsx`)

1. **Hero Section**  
   - Title: “ค้นหาเรื่องผีรอบตัวคุณ” (Find Ghost Stories Around You).  
   - Subtitle: “ฟังเรื่องเล่าหลอน ๆ จากสมาชิกคนอื่น ๆ” (Listen to chilling tales from fellow members).  
   - “ค้นหาใกล้ฉัน” (Search Near Me) button (calls `navigator.geolocation.getCurrentPosition`).  

2. **Search Bar & Map**  
   - Below hero, show `<SearchBar>` to manually enter a location (autocomplete).  
   - Once location is determined, render `<MapContainer center={location} markers={storiesMarkers} />`.  

3. **List of Nearby Stories**  
   - When a location is selected (browser geolocation or manual), call `GET /api/stories/nearby`.  
   - Show `<StoryCard />` components in a responsive grid (e.g., 2 columns on desktop, 1 on mobile).  
   - Include a “Load More” button if pagination is needed.

4. **Featured Stories (Optional)**  
   - Carousel or horizontal scroll of random/popular stories.  
   - Each item is a smaller `<StoryCard>`.  

---

### 5.3 Story Detail Page (with TTS) (`/pages/stories/[storyId].tsx`)

1. **Data Fetching (SSR or SSG)**  
   - Use `getServerSideProps` (or `generateMetadata` + `fetch`) to retrieve story data from `GET /api/stories/[storyId]`.  
   - If story not found → return `404`.

2. **Render Story Content**  
   - **Header:** Story title (`<h1>`), author (display name), created date (localized `DD MMMM YYYY`, e.g., “2 มิถุนายน 2025”).  
   - **Location Display:**  
     - Show `location_name` text.  
     - Embed a small map panel (`<MapContainer center={storyGeog} markers={[{…story}]} zoom={15} />`).  

3. **Body Text**  
   - Render story `body` in `<div className="prose prose-lg">`.  
   - Ensure Thai text support (tailwind preset `typography`).  

4. **Text-to-Speech (TTS) Player**  
   - If `audio_url` exists (from `tts_cache`), render an HTML5 `<audio controls>` with that URL.  
   - Else, show a “Generate Audio” button:  
     - On click → call `POST /api/tts/generate` with `{ storyId }`.  
     - While generating, disable button & show spinner.  
     - On success, refresh page or update state to display `<audio>` with the new `audio_url`.  

5. **Story Metadata & Actions**  
   - List of tags as pill buttons (e.g., “Wat,” “Village Legend”).  
   - If the current user is the author → show “Edit” & “Delete” buttons.  
   - “Back to Search” link (takes user back to previous location coordinates, if any).  

6. **Comments / Reactions (Optional)**  
   - For social engagement, you can allow other users to comment below the story. Not in MVP scope, but placeholder area.  

---

### 5.4 Story Submission Form (`/pages/stories/new.tsx` & `/pages/stories/[storyId]/edit.tsx`)

1. **Page Layout**  
   - Protected Route: Check `supabase.auth.getSession()` in `getServerSideProps` or middleware.  
   - Breadcrumb: Home / My Stories / New Story.  

2. **Form Component (`<StoryForm>`)**  
   - **Fields:**  
     - **Title** (`<Input>` from shadcn/ui)  
     - **Content** (`<Textarea>` or rich-text editor if desired)  
     - **Location:**  
       - `<Input>` for address with autocomplete (OpenCage).  
       - `<MapContainer>` with draggable marker to fine-tune lat/lng.  
       - Hidden fields: `latitude`, `longitude`.  
     - **Tags:**  
       - `<Select multiple>` or multi-input component. Preload with common tags (e.g., “Wat,” “Temple,” “School,” “Village”).  
     - **Image Upload (Optional):**  
       - `<FileInput>` accepts multiple images (max 3).  
       - On file select, upload to Supabase Storage via `supabase.storage.from('stories-images').upload(...)` → get public URL.  
     - **Submit Button** (`<Button type="submit">Submit Story</Button>`)  

   - **Validation Logic:**  
     - Ensure title length ≤ 100 chars; content ≥ 200 chars; location is valid lat/lng.  
     - If any validation fails, display inline error messages.  

3. **Submission Handling**  
   - On form “submit” → call `POST /api/stories` or `PUT /api/stories/[storyId]`.  
   - If successful → redirect to `/stories/[storyId]` with toast “Story successfully posted!”  
   - If error → show error toast (e.g., “Failed to create story. Please try again.”)  

---

### 5.5 User Profile & Story Management (`/pages/profile.tsx` or `/pages/my-stories.tsx`)

1. **Profile Overview** (`/profile`)  
   - Show user’s `display_name`, email (readonly).  
   - Option to edit `display_name`.  

2. **My Stories List** (`/profile#my-stories` or `/my-stories`)  
   - Fetch authenticated user’s stories using `GET /api/users/me/stories`.  
   - Display a table or grid of `<StoryCard>` (with smaller thumbnail).  
   - Each item: Title, location_name, created_at, is_published status.  
   - Actions: “Edit,” “Delete,” “View”.  
   - “Create New Story” button at top.  

---

## 6. Text-to-Speech Integration

TTS can be implemented using the **Vercel AI SDK** (via Vercel Functions) or a dedicated TTS API (e.g., Google Cloud TTS, AWS Polly). Below is a recommended flow using Vercel/Azure (as Vercel.ai).

### 6.1 TTS Generation Flow

1. **Endpoint: `POST /api/tts/generate`**  
   - **Request Body:**  
     ```json
     { "storyId": "<uuid>" }
     ```
   - **Server Logic:**  
     1. Fetch story body text from Supabase:  
        ```ts
        const { data: story } = await supabase
          .from('stories')
          .select('body')
          .eq('id', storyId)
          .single();
        ```  
     2. Check if TTS already cached (`SELECT audio_url FROM tts_cache WHERE story_id = storyId`).  
        - If exists and `generated_at` < 30 days ago → return existing `audio_url`.  
     3. Otherwise, call TTS API:  
        ```ts
        import { createTTS } from '@vercel/ai';
        const tts = createTTS({ provider: 'vercel' /* or 'azure' */ });
        const audioBuffer = await tts.synthesize({
          text: story.body,
          voice: 'th-TH-NiwatNeural', // Example Thai voice (Azure)
          format: 'mp3',
          speakingRate: 1.0,
        });
        // Save Buffer to Supabase Storage:
        const filePath = `tts-audio/${storyId}.mp3`;
        await supabase.storage
          .from('tts-audio')
          .upload(filePath, audioBuffer, { contentType: 'audio/mpeg' });
        const { publicUrl } = supabase.storage
          .from('tts-audio')
          .getPublicUrl(filePath);
        ```
     4. Insert into `tts_cache` table:  
        ```sql
        INSERT INTO tts_cache (story_id, audio_url, generated_at)
        VALUES (storyId, publicUrl, now());
        ```
     5. Return `{ success: true, data: { audio_url: publicUrl } }`.  

2. **Frontend Consumption**  
   - On `/stories/[storyId]` initial load, check if `story.audio_url` exists.  
   - If not, show a “Generate Audio” button; else show `<audio>` controls.  
   - When user clicks “Generate Audio,” call the above endpoint, then update local React state to render `<audio>`.

---

## 7. Location-Based Search Implementation

### 7.1 Geocoding User Input

1. **Auto-Complete Address Field** (`<SearchBar>`)  
   - Use **OpenCage Geocoding API** (or Mapbox) to auto-complete addresses.  
   - On user input (debounced), call `/api/geocode?query=<address>`.  

2. **Endpoint: `GET /api/geocode?query=<string>`**  
   - Use serverless function to proxy to OpenCage (so API key isn’t exposed).  
   - Return top 5 results: `{ formatted: string, latitude: number, longitude: number }[]`.  
   - Frontend displays a dropdown of suggestions; on select, set `{ lat, lng }` in state.

### 7.2 Browser Geolocation

- On “ค้นหาใกล้ฉัน” (Search Near Me) click → call:  
  ```ts
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      // Call GET /api/stories/nearby?lat=...&lng=...&radius=5
    },
    (error) => {
      // Show toast: “ไม่สามารถใช้งานตำแหน่งปัจจุบันได้” (Cannot access current location)
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
