# Claude Chief

A curated directory for the Claude AI ecosystem - skills, workflows, MCPs, updates, and creators.

## Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Hosting**: Netlify

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a project at [supabase.com](https://supabase.com)
   - Get your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Add them to your `.env.local` file

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deploying to Netlify

### Option 1: Netlify CLI (Recommended)

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import from Git"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Deploy!

### Option 3: Drag & Drop

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `.next` folder to the deploy area

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For Netlify, add these in Settings → Environment Variables.

## Features

- Dark, grainy premium UI design
- Glassmorphism cards with spring animations
- Full-text search across skills, workflows, MCPs
- Department-based filtering
- Supabase authentication
- Protected download links
- SEO optimized with JSON-LD structured data
- Mobile-first responsive design

## Project Structure

```
app/
├── page.tsx                    # Homepage
├── skills/                   # Skills directory
├── workflows/                 # Workflows directory
├── mcps/                      # MCPs directory
├── updates/                   # Anthropic updates
├── creators/                  # Creators directory
├── blog/                     # Blog
├── sign-in/                  # Authentication
├── sign-up/
└── search/                  # Search results
```

## License

Not affiliated with Anthropic. Claude is a trademark of Anthropic PBC.
