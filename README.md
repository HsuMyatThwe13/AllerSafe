
  # AllerSafe – Meal & Allergen Companion

  ## 1. Project Description
  - **What it does:** AllerSafe helps individuals with food allergies browse meals, track their personal allergen profile, and get tailored warnings before eating. Admins can enrich the catalog with new meals, ingredients, and allergen metadata without any external database.
  - **Why it exists:** Managing meal safety is stressful. So, AllerSafe provides a guided experience that keeps allergen knowledge close to the plate and promotes transparency between diners and providers.
  - **Who it’s for:**
    - Everyday diners who need quick allergen insights and a place to store favorites/ratings.
    - Restaurant or canteen admins who curate menus, ingredients, and allergen lists.
  - **Key features:**
    - Dual-role onboarding (user or admin) with in-browser persistence.
    - User dashboard with allergen severity tracking, dietary preferences, searchable meals, favorites, and reviews.
    - Admin dashboard to create meals, ingredients, and allergens that sync instantly to users.
    - Local-first data model backed by `localStorage`, so created content and favorites survive refreshes.

  ## 2. Tech Stack
  - **Languages:** TypeScript, CSS
  - **Frameworks/Runtimes:** React 18, Vite 6 (build + dev server)
  - **UI Libraries:** Radix UI primitives, shadcn-inspired components, lucide-react icons, Embla carousel, react-hook-form, recharts, tailwind-merge/class-variance-authority utilities
  - **State & Data:** Custom `usePersistentState` hook + `localStorage` (no external DB required)
  - **Tooling:** Node.js (>=18 recommended), npm, SWC-based React plugin for Vite

  ## 3. Installation / Setup Instructions
  1. **Clone the repo**
    ```bash
    git clone https://github.com/HsuMyatThwe13/AllerSafe.git
    cd AllerSafe
    ```
  2. **Install dependencies**
    ```bash
    npm install
    ```
  3. **Environment variables**
    - No external services are required. The app persists data in `localStorage`, so no `.env` setup is necessary. (Add one later if you integrate APIs.)
  4. **Run locally**
    ```bash
    npm run dev
    ```
    Vite will print the local URL (defaults to `http://localhost:3000`).
  5. **Build for production** (optional)
    ```bash
    npm run build
    npm run preview   # serve the build output
    ```

  ## 4. Usage Guide
  1. Start the dev server (`npm run dev`) and open the printed URL.
  2. Pick a role on the welcome screen:
    - **Regular User:** Sign up with any email/password to create a personal profile. Favorites, allergen settings, ratings, and dietary preferences persist per user.
    - **Administrator:** Either sign up as an admin or log in with the created account.
  3. Explore the dashboards:
    - Users can search meals, view allergen warnings, save favorites, rate dishes, and edit their allergen profile.
    - Admins can create meals by combining stored ingredients, add new ingredients/allergens, and delete outdated entries. All changes reflect immediately for every user because the data layer is shared via `localStorage`.
  4. Refresh the page—the data remains because everything is cached locally. To reset, clear your browser’s storage for the site.


  ### Example Commands
  ```bash
  # Install deps
  npm install

  # Run dev server
  npm run dev

  # Create a production build
  npm run build

  # Preview the built site
  npm run preview
  ```
  