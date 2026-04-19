# Bark Block

A modern blog-style web application for browsing articles, user authentication, profiles, and an admin area for content management. The frontend is a single-page application (SPA) that talks to a separate REST API (see companion backend repo if applicable).

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| **UI** | [React 19](https://react.dev/) |
| **Build tool** | [Vite 7](https://vite.dev/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`) |
| **HTTP client** | [Axios](https://axios-http.com/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Markdown** | [react-markdown](https://github.com/remarkjs/react-markdown) (article content) |
| **Utilities** | `clsx`, `tailwind-merge` (class names), path alias `@/` → `src/` |

---

## How It Works

1. **Entry** – `main.jsx` mounts the app and loads global styles (`index.css`).
2. **Routing** – `App.jsx` wraps the tree in `AuthProvider` and `BrowserRouter`, then defines routes for public pages (home, article detail, login, signup, profile, reset password), success page, admin section, and a `/test-health` route for API checks.
3. **Authentication** – `AuthContext` stores user state and JWT (`access_token`) in `localStorage`. Login and registration call the backend (`POST /auth/login`, etc.); protected flows rely on the token and optional `/auth/get-user` verification on load.
4. **Articles** – Listing and detail pages use `articlesAPI` (`src/api/articles.js`) against `API_BASE_URL` (see Environment). Categories, search, and pagination are handled via hooks such as `useArticles`.
5. **Admin** – Admin routes use the same auth flow; access is typically restricted to users with an `admin` role returned by the API after login.

---

## Environment Variables

Create a `.env` file in the project root (Vite exposes only variables prefixed with `VITE_`):

```env
VITE_API_BASE_URL=https://your-api.example.com
```

- **Development (`npm run dev`)** – If `VITE_API_BASE_URL` is unset, the app defaults to `http://localhost:4000` (see `src/constants/api.js`).
- **Production build** – Set `VITE_API_BASE_URL` to your deployed API (e.g. `https://personal-block-server.vercel.app`).

The backend must allow your frontend origin **(CORS)** or the browser will block API calls.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (Vite, HMR) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Test Login (Tester Account)

Use these credentials to sign in on the **Login** page (and admin login if the same user has admin role on the server):

| Field | Value |
|--------|--------|
| **Email** | `tester@gmail.com` |
| **Password** | `111111` |

> **Note:** These credentials must exist in your backend database. If login fails, seed or create the user on the API side.

---

## Main Routes (overview)

| Path | Purpose |
|------|---------|
| `/`, `/article` | Home & article list |
| `/article/:id` | Article detail |
| `/login`, `/signup` | Authentication |
| `/profile`, `/reset-password` | User profile & password reset |
| `/success` | Post-registration success |
| `/admin/login` | Admin login |
| `/admin/dashboard`, `/admin/dashboard/create`, `/admin/dashboard/edit/:id` | Admin dashboard & article CRUD |
| `/admin/categories`, `/admin/notifications` | Admin sections |
| `/admin/profile`, `/admin/reset-password` | Admin profile & password |
| `/test-health` | Simple API connectivity test |

---

## Project Structure (high level)

```
src/
├── api/              # API clients (articles, health)
├── components/       # UI (NavBar, article, admin, auth, …)
├── constants/        # e.g. API_BASE_URL
├── context/          # AuthContext
├── hooks/            # Custom hooks (useArticles, useForm, …)
├── pages/            # Route-level pages
├── utils/            # Helpers (e.g. date formatting)
├── App.jsx
└── main.jsx
```

---

## License

Private / educational project – adjust as needed.
