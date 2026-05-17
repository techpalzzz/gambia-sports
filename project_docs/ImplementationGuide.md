**TECH PALZ**

**Gambia Sports Platform**

_Solo Developer Implementation Guide_

Version 2.0 · All Phases · Next.js 16 + Supabase + Tailwind 4

| **Version**             | 2.0 - fully updated for Next.js 16, Tailwind 4, new roles, Nawetans |
| ----------------------- | ------------------------------------------------------------------- |
| **Date**                | May 2026                                                            |
| **Intended reader**     | Solo developer building the platform from scratch                   |
| **Companion documents** | Blueprint v2.0 \| SRS v1.0 \| UI/UX Design Spec v1.0                |
| **Phases covered**      | Phase 0 (setup) through Phase 4 (mobile app) - all steps numbered   |
| **Key rule**            | Never skip ahead. Each step assumes the previous one is complete.   |

**PART 0**

**Before You Write a Line of Code**

_Accounts, tools, and project scaffold - estimated time: 2-3 hours_

# **What You Are Building**

You are building a web platform for Gambian football - standings, fixtures, results, team and player profiles, Nawetans competition management, news, and live scores. It is built in four phases. This guide takes you through every step of every phase with copy-paste ready code.

Read Part 0 completely before touching a terminal. The setup steps must be done in order.

| **0.1** | **Create Your Accounts**<br><br>_GitHub, Supabase, Vercel - all free_ |
| ------- | --------------------------------------------------------------------- |

### **GitHub**

- Go to <https://github.com> and click Sign up.
- Username suggestion: your name or techpalz.
- Verify your email address. Choose the Free plan.

### **Supabase**

- Go to <https://supabase.com> and click Start for free.
- Sign up with your GitHub account (Continue with GitHub).
- Click New Project. Name it: gambia-sports.
- Choose a strong database password. Write it down somewhere safe - you will need it.
- Region: West Europe (closest available to The Gambia).
- Click Create new project and wait 2-3 minutes.

### **Vercel**

- Go to <https://vercel.com> and click Sign Up.
- Choose: Continue with GitHub. Authorise Vercel.
- Select the Hobby (free) plan.

| **0.2** | **Install Tools on Your Computer**<br><br>_Node.js 22, VS Code, Git_ |
| ------- | -------------------------------------------------------------------- |

### **Node.js 22 LTS**

- Go to <https://nodejs.org> and download the LTS version labelled 'Recommended for most users'.
- Run the installer. Click Next on every screen.
- Open your terminal (Windows: press Windows key, type cmd, press Enter).
- Verify the installation:

node --version

\# You should see: v22.x.x

npm --version

\# You should see: 10.x.x

### **VS Code**

- Go to <https://code.visualstudio.com> and download VS Code for your operating system.
- Install it. Open it.
- Install these extensions (click the four-squares icon on the left sidebar, search for each):

Tailwind CSS IntelliSense (by Tailwind Labs)

ESLint (by Microsoft)

Prettier - Code formatter (by Prettier)

GitLens (by GitKraken)

Error Lens (by Alexander) - shows errors inline in the editor

### **Git**

- Go to <https://git-scm.com/downloads> and download Git for your OS.
- Install it with default settings.
- Configure your identity (use the same email as your GitHub account):

git config --global user.name "Your Name"

git config --global user.email "<you@example.com>"

| **0.3** | **Create Your GitHub Repository**<br><br>_The home for all your code_ |
| ------- | --------------------------------------------------------------------- |

- Log into GitHub.
- Click the + icon (top right) → New repository.
- Repository name: gambia-sports.
- Set visibility to Private.
- Check: Add a README file.
- Click Create repository.

**Branch strategy**

You will work on a main branch. For significant features, create a feature branch (e.g. feature/standings-page), finish it, then merge it into main. Never push broken code directly to main - Vercel deploys main automatically.

| **0.4** | **Scaffold the Next.js 16 Project**<br><br>_Creates all the project files you need_ |
| ------- | ----------------------------------------------------------------------------------- |

Open your terminal. Navigate to where you want to store your project (e.g. your Desktop):

\# Windows

cd Desktop

\# Create the project

npx create-next-app@latest gambia-sports

The installer will ask you questions. Answer EXACTLY like this:

| **Question**                                          | **Your answer** |
| ----------------------------------------------------- | --------------- |
| Would you like to use TypeScript?                     | Yes             |
| Would you like to use ESLint?                         | Yes             |
| Would you like to use Tailwind CSS?                   | Yes             |
| Would you like to use src/ directory?                 | Yes             |
| Would you like to use App Router?                     | Yes             |
| Would you like to use Turbopack for next dev?         | Yes             |
| Would you like to customize the default import alias? | No              |

When it finishes:

cd gambia-sports

code .

### **Configure TypeScript Strict Mode**

Open tsconfig.json and ensure strict mode is enabled. Find the compilerOptions section and verify:

{ "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true } }

### **Install Required Packages**

npm install @supabase/supabase-js @supabase/ssr

npm install -D @types/node

| **0.5** | **Connect to Vercel and Test the Pipeline**<br><br>_Every git push will auto-deploy after this_ |
| ------- | ----------------------------------------------------------------------------------------------- |

- Push your new project to GitHub:

git init

git remote add origin <https://github.com/YOUR_USERNAME/gambia-sports.git>

git branch -M main

git add .

git commit -m "Initial Next.js 16 project setup"

git push -u origin main

- Go to <https://vercel.com> and log in.
- Click Add New Project.
- Find and click your gambia-sports repository.
- Click Deploy. Do not change any settings.
- Wait 1-2 minutes. Vercel will give you a URL like gambia-sports-abc.vercel.app.
- Open it in your browser - you should see the default Next.js welcome page.

**✓ CHECKPOINT**

You have a live URL. Every time you run git push from now on, Vercel automatically updates the live site within 1-2 minutes. This is your deployment pipeline.

**PHASE 1A**

**Database Foundation**

_All tables, RLS policies, indexes, and triggers - estimated time: 2-3 hours_

**Before you start**

Open your Supabase project dashboard at <https://supabase.com>. All SQL in this section is run in the SQL Editor - click the SQL Editor icon in the left sidebar, paste the SQL, and click Run.

| **1** | **Create All Phase 1 Core Tables**<br><br>_leagues, seasons, teams, players, matches, profiles_ |
| ----- | ----------------------------------------------------------------------------------------------- |

Run the following SQL in the Supabase SQL Editor. You can paste the entire block and click Run once.

\-- ── LEAGUES ─────────────────────────────────────────────────────────

CREATE TABLE leagues (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

name text NOT NULL,

slug text UNIQUE NOT NULL,

description text,

history text,

logo_url text,

cover_image_url text,

founded_year integer,

country text DEFAULT 'Gambia',

sport_type text DEFAULT 'football',

contact_email text,

status text DEFAULT 'active' CHECK (status IN ('active','inactive')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ── SEASONS ─────────────────────────────────────────────────────────

CREATE TABLE seasons (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

league_id uuid REFERENCES leagues(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

description text,

start_date date,

end_date date,

status text DEFAULT 'upcoming' CHECK (status IN ('upcoming','active','completed')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ── TEAMS ───────────────────────────────────────────────────────────

CREATE TABLE teams (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

league_id uuid REFERENCES leagues(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

slug text UNIQUE NOT NULL,

description text,

history text,

logo_url text,

cover_image_url text,

home_ground text,

founded_year integer,

colours text,

contact_email text,

status text DEFAULT 'active' CHECK (status IN ('active','inactive')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ── PLAYERS ─────────────────────────────────────────────────────────

CREATE TABLE players (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

team_id uuid REFERENCES teams(id) ON DELETE SET NULL,

name text NOT NULL,

slug text UNIQUE NOT NULL,

position text NOT NULL CHECK (position IN ('GK','DEF','MID','FWD')),

jersey_number integer CHECK (jersey_number BETWEEN 1 AND 99),

date_of_birth date CHECK (date_of_birth < CURRENT_DATE),

nationality text DEFAULT 'Gambian',

biography text,

description text,

photo_url text,

status text DEFAULT 'active' CHECK (status IN ('active','inactive','retired')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- Jersey number unique per team

CREATE UNIQUE INDEX players_team_jersey_unique

ON players(team_id, jersey_number)

WHERE status = 'active' AND jersey_number IS NOT NULL;

\-- ── MATCHES ─────────────────────────────────────────────────────────

CREATE TABLE matches (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

season_id uuid REFERENCES seasons(id) ON DELETE CASCADE NOT NULL,

tournament_id uuid,

group_id uuid,

round_id uuid,

home_team_id uuid REFERENCES teams(id) NOT NULL,

away_team_id uuid REFERENCES teams(id) NOT NULL,

scheduled_at timestamptz,

venue text,

status text DEFAULT 'scheduled'

CHECK (status IN ('scheduled','live','completed','postponed')),

home_score integer DEFAULT 0 CHECK (home_score >= 0),

away_score integer DEFAULT 0 CHECK (away_score >= 0),

home_penalties integer CHECK (home_penalties >= 0),

away_penalties integer CHECK (away_penalties >= 0),

stage text CHECK (stage IN

('group','round_of_16','quarter_final','semi_final','final','third_place')),

minute integer,

referee text,

attendance integer,

match_notes text,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now(),

\-- A team cannot play itself

CONSTRAINT no_self_fixture CHECK (home_team_id <> away_team_id)

);

\-- ── PROFILES ────────────────────────────────────────────────────────

CREATE TABLE profiles (

id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,

role text DEFAULT 'fan'

CHECK (role IN ('fan','content_editor','reporter','league_admin','super_admin')),

league_id uuid REFERENCES leagues(id) ON DELETE SET NULL,

is_global boolean DEFAULT false,

display_name text,

avatar_url text,

permissions jsonb DEFAULT '{}',

status text DEFAULT 'active' CHECK (status IN ('active','inactive')),

last_login_at timestamptz,

invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ── MATCH AUDIT ─────────────────────────────────────────────────────

CREATE TABLE match_audit (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

match_id uuid REFERENCES matches(id) NOT NULL,

changed_by uuid REFERENCES auth.users(id) NOT NULL,

old_home_score integer NOT NULL,

old_away_score integer NOT NULL,

new_home_score integer NOT NULL,

new_away_score integer NOT NULL,

reason text,

changed_at timestamptz DEFAULT now()

);

| **2** | **Create Tournament Tables**<br><br>_tournaments, groups, group_teams, rounds_ |
| ----- | ------------------------------------------------------------------------------ |

\-- ── TOURNAMENTS ─────────────────────────────────────────────────────

CREATE TABLE tournaments (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

season_id uuid REFERENCES seasons(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

slug text UNIQUE NOT NULL,

description text,

history text,

logo_url text,

cover_image_url text,

format text DEFAULT 'nawetans'

CHECK (format IN ('nawetans','league','cup','friendly')),

status text DEFAULT 'upcoming'

CHECK (status IN ('upcoming','group_stage','knockout','completed')),

num_groups integer,

teams_advance_per_group integer,

round_robin_type text DEFAULT 'single'

CHECK (round_robin_type IN ('single','home_and_away')),

start_date date,

end_date date,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ── TOURNAMENT GROUPS ────────────────────────────────────────────────

CREATE TABLE tournament_groups (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

slug text NOT NULL,

description text,

created_at timestamptz DEFAULT now(),

UNIQUE (tournament_id, slug)

);

\-- ── TOURNAMENT GROUP TEAMS ───────────────────────────────────────────

CREATE TABLE tournament_group_teams (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

group_id uuid REFERENCES tournament_groups(id) ON DELETE CASCADE NOT NULL,

team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,

seeding integer,

created_at timestamptz DEFAULT now(),

UNIQUE (group_id, team_id)

);

\-- ── TOURNAMENT ROUNDS ────────────────────────────────────────────────

CREATE TABLE tournament_rounds (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

stage text NOT NULL CHECK (stage IN

('round_of_16','quarter_final','semi_final','final','third_place')),

round_number integer NOT NULL,

created_at timestamptz DEFAULT now()

);

\-- Add FK back-references from matches to tournament tables

ALTER TABLE matches

ADD CONSTRAINT fk_tournament

FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE SET NULL,

ADD CONSTRAINT fk_group

FOREIGN KEY (group_id) REFERENCES tournament_groups(id) ON DELETE SET NULL,

ADD CONSTRAINT fk_round

FOREIGN KEY (round_id) REFERENCES tournament_rounds(id) ON DELETE SET NULL;

| **3** | **Enable RLS and Write All Policies**<br><br>_Protects all data at the database level_ |
| ----- | -------------------------------------------------------------------------------------- |

**⚠ IMPORTANT**

RLS is the security boundary of the platform. Never rely on the UI alone to protect data. Test every policy after writing it.

\-- Enable RLS on all tables

ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;

ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE match_audit ENABLE ROW LEVEL SECURITY;

ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

ALTER TABLE tournament_groups ENABLE ROW LEVEL SECURITY;

ALTER TABLE tournament_group_teams ENABLE ROW LEVEL SECURITY;

ALTER TABLE tournament_rounds ENABLE ROW LEVEL SECURITY;

\-- ── PUBLIC READ POLICIES ─────────────────────────────────────────────

CREATE POLICY "Public read leagues"

ON leagues FOR SELECT USING (true);

CREATE POLICY "Public read seasons"

ON seasons FOR SELECT USING (true);

CREATE POLICY "Public read teams"

ON teams FOR SELECT USING (true);

CREATE POLICY "Public read players"

ON players FOR SELECT USING (true);

CREATE POLICY "Public read matches"

ON matches FOR SELECT USING (true);

CREATE POLICY "Public read tournaments"

ON tournaments FOR SELECT USING (true);

CREATE POLICY "Public read tournament_groups"

ON tournament_groups FOR SELECT USING (true);

CREATE POLICY "Public read tournament_group_teams"

ON tournament_group_teams FOR SELECT USING (true);

CREATE POLICY "Public read tournament_rounds"

ON tournament_rounds FOR SELECT USING (true);

\-- ── ADMIN WRITE POLICIES ─────────────────────────────────────────────

\-- Helper: check if current user is super admin

CREATE OR REPLACE FUNCTION is_super_admin()

RETURNS boolean AS \$\$

SELECT EXISTS (

SELECT 1 FROM profiles

WHERE id = auth.uid() AND role = 'super_admin' AND status = 'active'

);

\$\$ LANGUAGE sql SECURITY DEFINER;

\-- Helper: check if current user is league admin for a given league

CREATE OR REPLACE FUNCTION is_league_admin_for(p_league_id uuid)

RETURNS boolean AS \$\$

SELECT EXISTS (

SELECT 1 FROM profiles

WHERE id = auth.uid()

AND role = 'league_admin'

AND league_id = p_league_id

AND status = 'active'

);

\$\$ LANGUAGE sql SECURITY DEFINER;

\-- Teams: league admin for that league OR super admin

CREATE POLICY "Admin insert teams"

ON teams FOR INSERT TO authenticated

WITH CHECK (is_league_admin_for(league_id) OR is_super_admin());

CREATE POLICY "Admin update teams"

ON teams FOR UPDATE TO authenticated

USING (is_league_admin_for(league_id) OR is_super_admin());

\-- Players: admin for the team's league

CREATE POLICY "Admin insert players"

ON players FOR INSERT TO authenticated

WITH CHECK (

is_super_admin() OR EXISTS (

SELECT 1 FROM teams t

JOIN profiles p ON p.league_id = t.league_id

WHERE t.id = team_id AND p.id = auth.uid()

AND p.role = 'league_admin' AND p.status = 'active'

)

);

CREATE POLICY "Admin update players"

ON players FOR UPDATE TO authenticated

USING (

is_super_admin() OR EXISTS (

SELECT 1 FROM teams t

JOIN profiles p ON p.league_id = t.league_id

WHERE t.id = team_id AND p.id = auth.uid()

AND p.role = 'league_admin' AND p.status = 'active'

)

);

\-- Matches: admin for the season's league

CREATE POLICY "Admin insert matches"

ON matches FOR INSERT TO authenticated

WITH CHECK (

is_super_admin() OR EXISTS (

SELECT 1 FROM seasons s

JOIN profiles p ON p.league_id = s.league_id

WHERE s.id = season_id AND p.id = auth.uid()

AND p.role = 'league_admin' AND p.status = 'active'

)

);

CREATE POLICY "Admin update matches"

ON matches FOR UPDATE TO authenticated

USING (

is_super_admin() OR EXISTS (

SELECT 1 FROM seasons s

JOIN profiles p ON p.league_id = s.league_id

WHERE s.id = season_id AND p.id = auth.uid()

AND p.role = 'league_admin' AND p.status = 'active'

)

);

\-- Profiles: users can read and update own profile only

CREATE POLICY "Own profile read"

ON profiles FOR SELECT TO authenticated

USING (id = auth.uid() OR is_super_admin());

CREATE POLICY "Own profile update"

ON profiles FOR UPDATE TO authenticated

USING (id = auth.uid() OR is_super_admin());

\-- Match audit: super admin only

CREATE POLICY "Super admin insert audit"

ON match_audit FOR INSERT TO authenticated

WITH CHECK (is_super_admin());

CREATE POLICY "Super admin read audit"

ON match_audit FOR SELECT TO authenticated

USING (is_super_admin());

| **4** | **Create Indexes and Triggers**<br><br>_Performance indexes and auto-update triggers_ |
| ----- | ------------------------------------------------------------------------------------- |

\-- ── PERFORMANCE INDEXES ─────────────────────────────────────────────

CREATE INDEX idx_matches_season_id ON matches(season_id);

CREATE INDEX idx_matches_tournament_id ON matches(tournament_id);

CREATE INDEX idx_matches_home_team ON matches(home_team_id);

CREATE INDEX idx_matches_away_team ON matches(away_team_id);

CREATE INDEX idx_matches_status ON matches(status);

CREATE INDEX idx_matches_scheduled_at ON matches(scheduled_at);

CREATE INDEX idx_players_team_id ON players(team_id);

CREATE INDEX idx_seasons_league_id ON seasons(league_id);

CREATE INDEX idx_tournament_groups_tournament ON tournament_groups(tournament_id);

CREATE INDEX idx_group_teams_group ON tournament_group_teams(group_id);

\-- ── UPDATED_AT TRIGGER ──────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()

RETURNS trigger AS \$\$

BEGIN

NEW.updated_at = now();

RETURN NEW;

END;

\$\$ LANGUAGE plpgsql;

\-- Apply to all tables with updated_at

CREATE TRIGGER set_updated_at_leagues

BEFORE UPDATE ON leagues

FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_teams

BEFORE UPDATE ON teams

FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_players

BEFORE UPDATE ON players

FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_matches

BEFORE UPDATE ON matches

FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_profiles

BEFORE UPDATE ON profiles

FOR EACH ROW EXECUTE FUNCTION update_updated_at();

\-- ── AUTO-CREATE PROFILE ON SIGNUP ───────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()

RETURNS trigger AS \$\$

BEGIN

INSERT INTO public.profiles (id, display_name, role)

VALUES (NEW.id, NEW.email, 'fan');

RETURN NEW;

END;

\$\$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created

AFTER INSERT ON auth.users

FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

| **5** | **Create Super Admin Account**<br><br>_Your first admin user_ |
| ----- | ------------------------------------------------------------- |

- In Supabase, click Authentication in the left sidebar.
- Click Users → Invite User.
- Enter your email address and click Invite.
- Check your email and click the link to set your password.
- Now run this SQL to set the super admin role:

\-- Replace with your actual email

UPDATE profiles

SET role = 'super_admin'

WHERE id = (SELECT id FROM auth.users WHERE email = '<your-email@example.com>');

\-- Verify it worked

SELECT id, role, status FROM profiles

WHERE id = (SELECT id FROM auth.users WHERE email = '<your-email@example.com>');

\-- Should return: role = super_admin, status = active

| **6** | **Load Sample Data**<br><br>_So you can see the platform working before entering real data_ |
| ----- | ------------------------------------------------------------------------------------------- |

\-- Insert a league

INSERT INTO leagues (name, slug, description, founded_year)

VALUES (

'Banjul Community League',

'banjul-community-league',

'The premier community football league in the capital city of The Gambia.',

1988

);

\-- Insert a season (use the league id from above)

INSERT INTO seasons (league_id, name, status)

SELECT id, '2026 Season', 'active'

FROM leagues WHERE slug = 'banjul-community-league';

\-- Insert 4 sample teams

INSERT INTO teams (league_id, name, slug, home_ground, colours)

SELECT

l.id,

t.name, t.slug, t.ground, t.colours

FROM leagues l

CROSS JOIN (VALUES

('Banjul FC', 'banjul-fc', 'Independence Stadium', 'Red and White'),

('Serrekunda United', 'serrekunda-united', 'Serrekunda Park', 'Blue and Gold'),

('Brikama United', 'brikama-united', 'Brikama Ground', 'Green and White'),

('Yundum Stars', 'yundum-stars', 'Yundum Field', 'Yellow and Black')

) AS t(name, slug, ground, colours)

WHERE l.slug = 'banjul-community-league';

\-- Insert a sample completed match

INSERT INTO matches

(season_id, home_team_id, away_team_id,

scheduled_at, venue, status, home_score, away_score)

SELECT

s.id,

home.id,

away.id,

now() - interval '3 days',

'Independence Stadium',

'completed',

2, 1

FROM seasons s

JOIN teams home ON home.slug = 'banjul-fc'

JOIN teams away ON away.slug = 'serrekunda-united'

WHERE s.name = '2026 Season';

\-- Insert a scheduled fixture

INSERT INTO matches

(season_id, home_team_id, away_team_id,

scheduled_at, venue, status)

SELECT

s.id,

home.id,

away.id,

now() + interval '7 days',

'Serrekunda Park',

'scheduled'

FROM seasons s

JOIN teams home ON home.slug = 'brikama-united'

JOIN teams away ON away.slug = 'yundum-stars'

WHERE s.name = '2026 Season';

**✓ CHECKPOINT**

Your database is set up. You have tables, RLS policies, indexes, triggers, a Super Admin account, and sample data. Go to the Supabase Table Editor and verify you can see rows in each table.

**PHASE 1B**

**Project Setup & Supabase Client**

_Environment variables, types, queries, middleware_

| **7** | **Environment Variables**<br><br>_.env.local for local development, Vercel for production_ |
| ----- | ------------------------------------------------------------------------------------------ |

Create a file called .env.local in the root of your project (next to package.json). This file is NEVER committed to GitHub.

### **Get Your Supabase Keys**

- In Supabase, click Settings (gear icon) → API.
- Copy the Project URL (looks like <https://abcdefgh.supabase.co>).
- Copy the Publishable key - this is the anon/public key, starts with sb*publishable* or eyJ.

### **Create .env.local**

\# .env.local - NEVER commit this file to GitHub

NEXT_PUBLIC_SUPABASE_URL=<https://your-project-ref.supabase.co>

NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

### **Add the same variables to Vercel**

- Go to your project on vercel.com → Settings → Environment Variables.
- Add NEXT_PUBLIC_SUPABASE_URL with the same value.
- Add NEXT_PUBLIC_SUPABASE_ANON_KEY with the same value.
- Click Save. Redeploy for the changes to take effect.

**⚠ IMPORTANT**

The NEXT*PUBLIC* prefix makes these values available in the browser. This is intentional and safe for the anon key. Never put your Supabase service role key here - that key bypasses all RLS and must never reach the browser.

| **8** | **Create the Supabase Client Files**<br><br>_Three files - browser, server, and middleware_ |
| ----- | ------------------------------------------------------------------------------------------- |

Next.js 16 requires different Supabase client instances depending on where the code runs. Create the folder src/lib/supabase/ and add these three files.

### **src/lib/supabase/client.ts - for browser components**

import { createBrowserClient } from '@supabase/ssr'

import type { Database } from '@/types/database'

export function createClient() {

return createBrowserClient&lt;Database&gt;(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

)

}

### **src/lib/supabase/server.ts - for server components and API routes**

import { createServerClient } from '@supabase/ssr'

import { cookies } from 'next/headers'

import type { Database } from '@/types/database'

export async function createClient() {

const cookieStore = await cookies()

return createServerClient&lt;Database&gt;(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

{

cookies: {

getAll() { return cookieStore.getAll() },

setAll(cookiesToSet) {

try {

cookiesToSet.forEach(({ name, value, options }) =>

cookieStore.set(name, value, options)

)

} catch {}

},

},

}

)

}

### **src/middleware.ts - protects admin and reporter routes**

import { createServerClient } from '@supabase/ssr'

import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

let supabaseResponse = NextResponse.next({ request })

const supabase = createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

{

cookies: {

getAll() { return request.cookies.getAll() },

setAll(cookiesToSet) {

cookiesToSet.forEach(({ name, value, options }) =>

request.cookies.set(name, value)

)

supabaseResponse = NextResponse.next({ request })

cookiesToSet.forEach(({ name, value, options }) =>

supabaseResponse.cookies.set(name, value, options)

)

},

},

}

)

// Refresh session if expired

const { data: { user } } = await supabase.auth.getUser()

const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

const isReporterRoute = request.nextUrl.pathname.startsWith('/reporter')

const isLoginPage = request.nextUrl.pathname === '/admin/login'

if (!user && (isAdminRoute || isReporterRoute) && !isLoginPage) {

const url = request.nextUrl.clone()

url.pathname = '/admin/login'

url.searchParams.set('redirectTo', request.nextUrl.pathname)

return NextResponse.redirect(url)

}

return supabaseResponse

}

export const config = {

matcher: \['/admin/:path\*', '/reporter/:path\*'\],

}

| **9** | **Create TypeScript Database Types**<br><br>_Type safety for all Supabase queries_ |
| ----- | ---------------------------------------------------------------------------------- |

Create src/types/database.ts. This file gives TypeScript full knowledge of your database schema. The key types you need for Phase 1 are shown below - extend this file as you add tables in later phases.

// src/types/database.ts

export type Database = {

public: {

Tables: {

leagues: {

Row: {

id: string; name: string; slug: string;

description: string | null; history: string | null;

logo_url: string | null; cover_image_url: string | null;

founded_year: number | null; country: string;

sport_type: string; contact_email: string | null;

status: 'active' | 'inactive';

created_at: string; updated_at: string;

}

Insert: Omit<Database\['public'\]\['Tables'\]\['leagues'\]\['Row'\],

'id' | 'created_at' | 'updated_at'>

Update: Partial&lt;Database\['public'\]\['Tables'\]\['leagues'\]\['Insert'\]&gt;

}

seasons: {

Row: {

id: string; league_id: string; name: string;

description: string | null; start_date: string | null;

end_date: string | null;

status: 'upcoming' | 'active' | 'completed';

created_at: string; updated_at: string;

}

Insert: Omit<Database\['public'\]\['Tables'\]\['seasons'\]\['Row'\],

'id' | 'created_at' | 'updated_at'>

Update: Partial&lt;Database\['public'\]\['Tables'\]\['seasons'\]\['Insert'\]&gt;

}

teams: {

Row: {

id: string; league_id: string; name: string; slug: string;

description: string | null; history: string | null;

logo_url: string | null; cover_image_url: string | null;

home_ground: string | null; founded_year: number | null;

colours: string | null; contact_email: string | null;

status: 'active' | 'inactive';

created_at: string; updated_at: string;

}

Insert: Omit<Database\['public'\]\['Tables'\]\['teams'\]\['Row'\],

'id' | 'created_at' | 'updated_at'>

Update: Partial&lt;Database\['public'\]\['Tables'\]\['teams'\]\['Insert'\]&gt;

}

players: {

Row: {

id: string; team_id: string | null; name: string; slug: string;

position: 'GK' | 'DEF' | 'MID' | 'FWD';

jersey_number: number | null; date_of_birth: string | null;

nationality: string; biography: string | null;

description: string | null; photo_url: string | null;

status: 'active' | 'inactive' | 'retired';

created_at: string; updated_at: string;

}

Insert: Omit<Database\['public'\]\['Tables'\]\['players'\]\['Row'\],

'id' | 'created_at' | 'updated_at'>

Update: Partial&lt;Database\['public'\]\['Tables'\]\['players'\]\['Insert'\]&gt;

}

matches: {

Row: {

id: string; season_id: string;

tournament_id: string | null; group_id: string | null;

round_id: string | null;

home_team_id: string; away_team_id: string;

scheduled_at: string | null; venue: string | null;

status: 'scheduled' | 'live' | 'completed' | 'postponed';

home_score: number; away_score: number;

home_penalties: number | null; away_penalties: number | null;

stage: string | null; minute: number | null;

referee: string | null; attendance: number | null;

match_notes: string | null;

created_at: string; updated_at: string;

}

Insert: Omit<Database\['public'\]\['Tables'\]\['matches'\]\['Row'\],

'id' | 'created_at' | 'updated_at'>

Update: Partial&lt;Database\['public'\]\['Tables'\]\['matches'\]\['Insert'\]&gt;

}

profiles: {

Row: {

id: string;

role: 'fan'|'content_editor'|'reporter'|'league_admin'|'super_admin';

league_id: string | null; is_global: boolean;

display_name: string | null; avatar_url: string | null;

permissions: Record&lt;string, boolean&gt;;

status: 'active' | 'inactive';

last_login_at: string | null; invited_by: string | null;

created_at: string; updated_at: string;

}

Insert: Omit<Database\['public'\]\['Tables'\]\['profiles'\]\['Row'\],

'created_at' | 'updated_at'>

Update: Partial&lt;Database\['public'\]\['Tables'\]\['profiles'\]\['Insert'\]&gt;

}

}

}

}

// Convenience type aliases

export type League = Database\['public'\]\['Tables'\]\['leagues'\]\['Row'\]

export type Season = Database\['public'\]\['Tables'\]\['seasons'\]\['Row'\]

export type Team = Database\['public'\]\['Tables'\]\['teams'\]\['Row'\]

export type Player = Database\['public'\]\['Tables'\]\['players'\]\['Row'\]

export type Match = Database\['public'\]\['Tables'\]\['matches'\]\['Row'\]

export type Profile = Database\['public'\]\['Tables'\]\['profiles'\]\['Row'\]

| **10** | **Create Database Query Functions**<br><br>_All the data-fetching functions your pages will use_ |
| ------ | ------------------------------------------------------------------------------------------------ |

Create the folder src/lib/queries/ and add index.ts. All database queries live here - pages import these functions rather than writing queries inline.

// src/lib/queries/index.ts

import { createClient } from '@/lib/supabase/server'

// ── LEAGUES ──────────────────────────────────────────────────────────

export async function getLeagues() {

const supabase = await createClient()

const { data, error } = await supabase

.from('leagues')

.select('\*')

.eq('status', 'active')

.order('created_at', { ascending: false })

if (error) throw error

return data

}

export async function getLeagueBySlug(slug: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('leagues')

.select('\*')

.eq('slug', slug)

.single()

if (error) throw error

return data

}

// ── SEASONS ──────────────────────────────────────────────────────────

export async function getActiveSeason(leagueId: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('seasons')

.select('\*')

.eq('league_id', leagueId)

.eq('status', 'active')

.single()

if (error) throw error

return data

}

// ── STANDINGS ────────────────────────────────────────────────────────

export async function getMatchesForStandings(seasonId: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('matches')

.select(\`

id, home_score, away_score,

home_team:teams!home_team_id(id, name, slug, logo_url),

away_team:teams!away_team_id(id, name, slug, logo_url)

\`)

.eq('season_id', seasonId)

.eq('status', 'completed')

.is('tournament_id', null)

if (error) throw error

return data

}

// ── FIXTURES ─────────────────────────────────────────────────────────

export async function getFixtures(seasonId: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('matches')

.select(\`

\*,

home_team:teams!home_team_id(id, name, slug, logo_url),

away_team:teams!away_team_id(id, name, slug, logo_url)\`,

\`)

.eq('season_id', seasonId)

.eq('status', 'scheduled')

.order('scheduled_at', { ascending: true })

if (error) throw error

return data

}

// ── RESULTS ──────────────────────────────────────────────────────────

export async function getResults(seasonId: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('matches')

.select(\`

\*,

home_team:teams!home_team_id(id, name, slug),

away_team:teams!away_team_id(id, name, slug)

\`)

.eq('season_id', seasonId)

.eq('status', 'completed')

.order('scheduled_at', { ascending: false })

.limit(20)

if (error) throw error

return data

}

// ── TEAMS ────────────────────────────────────────────────────────────

export async function getTeams(leagueId: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('teams')

.select('\*')

.eq('league_id', leagueId)

.eq('status', 'active')

.order('name')

if (error) throw error

return data

}

export async function getTeamBySlug(slug: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('teams')

.select('\*, players(\*)')

.eq('slug', slug)

.single()

if (error) throw error

return data

}

// ── PLAYERS ──────────────────────────────────────────────────────────

export async function getPlayerById(id: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('players')

.select('\*, team:teams(id, name, slug)')

.eq('id', id)

.single()

if (error) throw error

return data

}

// ── TOURNAMENTS ──────────────────────────────────────────────────────

export async function getTournamentBySlug(slug: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('tournaments')

.select('\*, season:seasons(\*)')

.eq('slug', slug)

.single()

if (error) throw error

return data

}

export async function getTournamentGroups(tournamentId: string) {

const supabase = await createClient()

const { data, error } = await supabase

.from('tournament_groups')

.select(\`

\*,

tournament_group_teams(

team:teams(id, name, slug, logo_url)

)\`,

\`)

.eq('tournament_id', tournamentId)

.order('name')

if (error) throw error

return data

}

| **11** | **Standings Calculation Logic**<br><br>_The tiebreaker algorithm - the most critical business logic_ |
| ------ | ---------------------------------------------------------------------------------------------------- |

Create src/lib/standings/index.ts. This function takes an array of completed match objects and returns a sorted standings table. It handles all tiebreaker rules.

// src/lib/standings/index.ts

type MatchData = {

home_team: { id: string; name: string; slug: string }

away_team: { id: string; name: string; slug: string }

home_score: number

away_score: number

}

type StandingRow = {

team: { id: string; name: string; slug: string }

p: number // played

w: number // won

d: number // drawn

l: number // lost

gf: number // goals for

ga: number // goals against

gd: number // goal difference

pts: number

}

export function calculateStandings(matches: MatchData\[\]): StandingRow\[\] {

const table: Record&lt;string, StandingRow&gt; = {}

for (const match of matches) {

const { home_team, away_team, home_score, away_score } = match

// Initialise rows if they don't exist yet

if (!table\[home_team.id\]) {

table\[home_team.id\] = {

team: home_team, p:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0

}

}

if (!table\[away_team.id\]) {

table\[away_team.id\] = {

team: away_team, p:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0

}

}

const home = table\[home_team.id\]

const away = table\[away_team.id\]

home.p++; away.p++

home.gf += home_score; home.ga += away_score

away.gf += away_score; away.ga += home_score

if (home_score > away_score) {

home.w++; home.pts += 3

away.l++

} else if (away_score > home_score) {

away.w++; away.pts += 3

home.l++

} else {

home.d++; home.pts += 1

away.d++; away.pts += 1

}

}

// Calculate goal difference

for (const row of Object.values(table)) {

row.gd = row.gf - row.ga

}

// Sort by: pts desc → gd desc → gf desc → name asc

return Object.values(table).sort((a, b) => {

if (b.pts !== a.pts) return b.pts - a.pts

if (b.gd !== a.gd) return b.gd - a.gd

if (b.gf !== a.gf) return b.gf - a.gf

return a.team.name.localeCompare(b.team.name)

})

}

// Group standings also use this function but filtered to one group's matches

export { calculateStandings as calculateGroupStandings }

**✓ CHECKPOINT**

Your project now has Supabase client files, TypeScript types, all query functions, the standings calculation algorithm, and auth middleware. Run npm run dev and visit <http://localhost:3000> - you should see the default Next.js page without any errors in the terminal.

**PHASE 1C**

**Public Pages**

_Every fan-facing page with complete code_

| **13** | **Root Layout and Navigation**<br><br>_The shell that wraps every public page_ |
| ------ | ------------------------------------------------------------------------------ |

Replace src/app/globals.css with the base styles, then update src/app/layout.tsx.

### **src/app/globals.css**

@import 'tailwindcss';

:root {

\--green: #1A6B3A;

\--green-dark: #0F4A28;

\--green-light: #E8F5EE;

}

body {

background-color: #F3F4F6;

color: #1F2937;

font-family: system-ui, -apple-system, sans-serif;

}

### **src/app/layout.tsx**

import type { Metadata } from 'next'

import './globals.css'

import Nav from '@/components/layout/Nav'

export const metadata: Metadata = {

title: 'Gambia Sports Platform',

description: 'Your home for Gambian football',

}

export default function RootLayout({

children,

}: { children: React.ReactNode }) {

return (

&lt;html lang='en'&gt;

&lt;body className='min-h-screen bg-gray-100'&gt;

&lt;Nav /&gt;

&lt;main className='max-w-4xl mx-auto px-4 py-6'&gt;

{children}

&lt;/main&gt;

&lt;/body&gt;

&lt;/html&gt;

)

}

### **src/components/layout/Nav.tsx**

'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { useState } from 'react'

const links = \[

{ href: '/standings', label: 'Standings' },

{ href: '/fixtures', label: 'Fixtures' },

{ href: '/results', label: 'Results' },

{ href: '/teams', label: 'Teams' },

\]

export default function Nav() {

const pathname = usePathname()

const \[open, setOpen\] = useState(false)

return (

&lt;nav className='bg-\[#0F4A28\] text-white sticky top-0 z-50'&gt;

&lt;div className='max-w-4xl mx-auto px-4 h-14 flex items-center justify-between'&gt;

&lt;Link href='/' className='font-bold text-lg text-\[#CCFFCC\]'&gt;

Gambia Sports

&lt;/Link&gt;

{/\* Desktop links \*/}

&lt;div className='hidden md:flex gap-6 text-sm font-medium'&gt;

{links.map(l => (

<Link

key={l.href} href={l.href}

className={\`text-\[#CCFFCC\] hover:text-white transition-colors

\${pathname === l.href ? 'border-b-2 border-white pb-0.5' : ''}

\`}

\>

{l.label}

&lt;/Link&gt;

))}

&lt;/div&gt;

{/\* Mobile hamburger \*/}

<button

className='md:hidden p-2'

onClick={() => setOpen(!open)}

aria-label='Toggle menu'

\>

&lt;span className='block w-6 h-0.5 bg-white mb-1' /&gt;

&lt;span className='block w-6 h-0.5 bg-white mb-1' /&gt;

&lt;span className='block w-6 h-0.5 bg-white' /&gt;

&lt;/button&gt;

&lt;/div&gt;

{/\* Mobile menu overlay \*/}

{open && (

<div className='md:hidden fixed inset-0 bg-\[#0F4A28\] z-50 flex flex-col

items-start p-8 gap-6'>

&lt;button onClick={() =&gt; setOpen(false)}

className='self-end text-white text-2xl'>✕&lt;/button&gt;

{links.map(l => (

<Link key={l.href} href={l.href}

onClick={() => setOpen(false)}

className='text-\[#CCFFCC\] text-xl font-medium'>

{l.label}

&lt;/Link&gt;

))}

&lt;/div&gt;

)}

&lt;/nav&gt;

)

}

| **14** | **Home Page**<br><br>_Latest results and upcoming fixtures_ |
| ------ | ----------------------------------------------------------- |

// src/app/page.tsx

import { getLeagues, getActiveSeason, getResults, getFixtures } from '@/lib/queries'

export default async function HomePage() {

const leagues = await getLeagues()

if (!leagues.length) {

return &lt;p className='text-gray-500 mt-8'&gt;No active leagues yet.&lt;/p&gt;

}

const league = leagues\[0\]

const season = await getActiveSeason(league.id)

if (!season) {

return &lt;p className='text-gray-500 mt-8'&gt;No active season.&lt;/p&gt;

}

const \[results, fixtures\] = await Promise.all(\[

getResults(season.id),

getFixtures(season.id),

\])

return (

&lt;div&gt;

&lt;div className='bg-white rounded-xl p-4 mb-4 border border-gray-200'&gt;

&lt;h1 className='text-2xl font-bold text-gray-900'&gt;{league.name}&lt;/h1&gt;

&lt;p className='text-gray-500 text-sm mt-1'&gt;{season.name}&lt;/p&gt;

&lt;/div&gt;

&lt;div className='grid md:grid-cols-2 gap-4'&gt;

{/\* Results column \*/}

&lt;div className='bg-white rounded-xl border border-gray-200 p-4'&gt;

&lt;h2 className='text-lg font-bold mb-3'&gt;Latest Results&lt;/h2&gt;

{results.length === 0 ? (

&lt;p className='text-gray-400 text-sm'&gt;No results yet.&lt;/p&gt;

) : (

&lt;div className='space-y-2'&gt;

{results.slice(0, 5).map(m => (

<div key={m.id}

className='flex items-center justify-between py-2

border-b border-gray-100 last:border-0'>

<span className={\`font-medium text-sm w-2/5 text-right

\${m.home_score > m.away_score ? 'text-\[#1A6B3A\]' : 'text-gray-800'}

\`}>{m.home_team.name}&lt;/span&gt;

<span className='mx-2 bg-gray-900 text-white text-sm font-bold

px-3 py-1 rounded'>

{m.home_score} - {m.away_score}

&lt;/span&gt;

<span className={\`font-medium text-sm w-2/5

\${m.away_score > m.home_score ? 'text-\[#1A6B3A\]' : 'text-gray-800'}

\`}>{m.away_team.name}&lt;/span&gt;

&lt;/div&gt;

))}

&lt;/div&gt;

)}

&lt;/div&gt;

{/\* Fixtures column \*/}

&lt;div className='bg-white rounded-xl border border-gray-200 p-4'&gt;

&lt;h2 className='text-lg font-bold mb-3'&gt;Upcoming Fixtures&lt;/h2&gt;

{fixtures.length === 0 ? (

&lt;p className='text-gray-400 text-sm'&gt;No fixtures scheduled.&lt;/p&gt;

) : (

&lt;div className='space-y-2'&gt;

{fixtures.slice(0, 5).map(m => (

<div key={m.id}

className='flex items-center justify-between py-2

border-b border-gray-100 last:border-0'>

&lt;span className='font-medium text-sm w-2/5 text-right'&gt;

{m.home_team.name}

&lt;/span&gt;

&lt;div className='mx-2 bg-\[#E8F5EE\] text-center px-3 py-1 rounded'&gt;

&lt;p className='text-xs font-bold text-\[#1A6B3A\]'&gt;

{m.scheduled_at

? new Date(m.scheduled_at).toLocaleDateString('en-GB',

{ day:'numeric', month:'short' })

: 'TBC'}

&lt;/p&gt;

{m.scheduled_at && (

&lt;p className='text-sm font-bold text-\[#0F4A28\]'&gt;

{new Date(m.scheduled_at).toLocaleTimeString(\[\],

{ hour:'2-digit', minute:'2-digit' })}

&lt;/p&gt;

)}

&lt;/div&gt;

&lt;span className='font-medium text-sm w-2/5'&gt;

{m.away_team.name}

&lt;/span&gt;

&lt;/div&gt;

))}

&lt;/div&gt;

)}

&lt;/div&gt;

&lt;/div&gt;

&lt;/div&gt;

)

}

| **15** | **Standings Page**<br><br>_Full league table with tiebreakers and zone highlighting_ |
| ------ | ------------------------------------------------------------------------------------ |

// src/app/(public)/standings/page.tsx

import { getLeagues, getActiveSeason, getMatchesForStandings } from '@/lib/queries'

import { calculateStandings } from '@/lib/standings'

import Link from 'next/link'

export default async function StandingsPage() {

const leagues = await getLeagues()

const league = leagues\[0\]

const season = await getActiveSeason(league.id)

const matches = await getMatchesForStandings(season.id)

const standings = calculateStandings(matches)

return (

&lt;div className='bg-white rounded-xl border border-gray-200 overflow-hidden'&gt;

&lt;div className='p-4 border-b border-gray-100'&gt;

&lt;h1 className='text-2xl font-bold'&gt;League Standings&lt;/h1&gt;

&lt;p className='text-gray-500 text-sm'&gt;{league.name} · {season.name}&lt;/p&gt;

&lt;/div&gt;

&lt;div className='overflow-x-auto'&gt;

&lt;table className='w-full text-sm'&gt;

&lt;thead&gt;

&lt;tr className='bg-\[#1A6B3A\] text-white text-xs font-semibold'&gt;

&lt;th className='px-3 py-3 text-left w-8'&gt;#&lt;/th&gt;

&lt;th className='px-3 py-3 text-left'&gt;Team&lt;/th&gt;

&lt;th className='px-3 py-3 text-center'&gt;P&lt;/th&gt;

&lt;th className='px-3 py-3 text-center'&gt;W&lt;/th&gt;

&lt;th className='px-3 py-3 text-center'&gt;D&lt;/th&gt;

&lt;th className='px-3 py-3 text-center'&gt;L&lt;/th&gt;

&lt;th className='px-3 py-3 text-center hidden sm:table-cell'&gt;GF&lt;/th&gt;

&lt;th className='px-3 py-3 text-center hidden sm:table-cell'&gt;GA&lt;/th&gt;

&lt;th className='px-3 py-3 text-center'&gt;GD&lt;/th&gt;

&lt;th className='px-3 py-3 text-center font-bold'&gt;Pts&lt;/th&gt;

&lt;/tr&gt;

&lt;/thead&gt;

&lt;tbody&gt;

{standings.map((row, i) => {

const isPromotion = i < 2 // top 2 - adjust per league config

const isRelegation = i >= standings.length - 2

return (

<tr key={row.team.id}

className={\`border-b border-gray-100 last:border-0

\${isPromotion ? 'bg-\[#E8F5EE\]' : ''}

\${isRelegation ? 'bg-\[#FEE2E2\]' : ''}

\${!isPromotion && !isRelegation && i % 2 === 1 ? 'bg-gray-50' : ''}

\`}

\>

<td className={\`px-3 py-3 font-bold

\${isPromotion ? 'text-\[#0F4A28\]' : ''}

\${isRelegation ? 'text-\[#991B1B\]' : ''}

\`}>{i + 1}&lt;/td&gt;

&lt;td className='px-3 py-3'&gt;

<Link href={\`/teams/\${row.team.slug}\`}

className={\`font-medium hover:underline

\${isPromotion ? 'text-\[#0F4A28\]' : ''}

\${isRelegation ? 'text-\[#991B1B\]' : 'text-gray-900'}

\`}

\>

{row.team.name}

&lt;/Link&gt;

&lt;/td&gt;

&lt;td className='px-3 py-3 text-center text-gray-600'&gt;{row.p}&lt;/td&gt;

&lt;td className='px-3 py-3 text-center text-gray-600'&gt;{row.w}&lt;/td&gt;

&lt;td className='px-3 py-3 text-center text-gray-600'&gt;{row.d}&lt;/td&gt;

&lt;td className='px-3 py-3 text-center text-gray-600'&gt;{row.l}&lt;/td&gt;

<td className='px-3 py-3 text-center text-gray-500

hidden sm:table-cell'>{row.gf}&lt;/td&gt;

<td className='px-3 py-3 text-center text-gray-500

hidden sm:table-cell'>{row.ga}&lt;/td&gt;

&lt;td className='px-3 py-3 text-center text-gray-600'&gt;

{row.gd > 0 ? \`+\${row.gd}\` : row.gd}

&lt;/td&gt;

<td className={\`px-3 py-3 text-center font-bold

\${isPromotion ? 'text-\[#0F4A28\]' : ''}

\${isRelegation ? 'text-\[#991B1B\]' : 'text-gray-900'}

\`}>{row.pts}&lt;/td&gt;

&lt;/tr&gt;

)

})}

&lt;/tbody&gt;

&lt;/table&gt;

&lt;/div&gt;

{/\* Key \*/}

&lt;div className='p-3 border-t border-gray-100 flex gap-4 text-xs text-gray-500'&gt;

&lt;span className='flex items-center gap-1'&gt;

&lt;span className='w-3 h-3 rounded-sm bg-\[#E8F5EE\] border border-\[#1A6B3A\]' /&gt;

Promotion / Title

&lt;/span&gt;

&lt;span className='flex items-center gap-1'&gt;

&lt;span className='w-3 h-3 rounded-sm bg-\[#FEE2E2\] border border-\[#991B1B\]' /&gt;

Relegation

&lt;/span&gt;

&lt;/div&gt;

&lt;/div&gt;

)

}

| **16** | **Team Profile Page**<br><br>_Rich team page with description, history, squad, form, and fixtures_ |
| ------ | -------------------------------------------------------------------------------------------------- |

// src/app/(public)/teams/\[slug\]/page.tsx

import { getTeamBySlug, getMatchesForStandings, getFixtures,

getActiveSeason, getLeagues } from '@/lib/queries'

import Link from 'next/link'

import { notFound } from 'next/navigation'

export default async function TeamPage({

params

}: { params: Promise&lt;{ slug: string }&gt; }) {

const { slug } = await params

const team = await getTeamBySlug(slug).catch(() => null)

if (!team) notFound()

// Get last 5 results for this team

const leagues = await getLeagues()

const season = await getActiveSeason(leagues\[0\].id)

const allResults = await import('@/lib/queries')

.then(q => q.getResults(season.id))

const teamResults = allResults

.filter(m => m.home_team.id === team.id || m.away_team.id === team.id)

.slice(0, 5)

return (

&lt;div&gt;

{/\* Hero banner \*/}

&lt;div className='bg-\[#0F4A28\] rounded-xl p-5 mb-4 text-white'&gt;

&lt;h1 className='text-3xl font-bold mb-1'&gt;{team.name}&lt;/h1&gt;

&lt;div className='text-\[#AADDAA\] text-sm flex flex-wrap gap-3 mb-3'&gt;

{team.home_ground && &lt;span&gt;🏟 {team.home_ground}&lt;/span&gt;}

{team.founded_year && &lt;span&gt;Est. {team.founded_year}&lt;/span&gt;}

{team.colours && &lt;span&gt;{team.colours}&lt;/span&gt;}

&lt;/div&gt;

{/\* Form strip \*/}

{teamResults.length > 0 && (

&lt;div className='flex gap-1'&gt;

{teamResults.map(m => {

const isHome = m.home_team.id === team.id

const scored = isHome ? m.home_score : m.away_score

const conceded = isHome ? m.away_score : m.home_score

const result = scored > conceded ? 'W' :

scored < conceded ? 'L' : 'D'

return (

<span key={m.id} className={\`w-8 h-8 rounded flex items-center

justify-center text-xs font-bold text-white

\${result==='W'?'bg-\[#16A34A\]':result==='L'?'bg-\[#DC2626\]':'bg-gray-500'}

\`}>{result}&lt;/span&gt;

)

})}

&lt;span className='text-\[#AADDAA\] text-xs self-center ml-2'&gt;

Last {teamResults.length}

&lt;/span&gt;

&lt;/div&gt;

)}

&lt;/div&gt;

{/\* Description \*/}

{team.description && (

&lt;div className='bg-white rounded-xl border border-gray-200 p-4 mb-4'&gt;

&lt;h2 className='text-lg font-bold mb-2'&gt;About {team.name}&lt;/h2&gt;

&lt;p className='text-gray-600 leading-relaxed'&gt;{team.description}&lt;/p&gt;

&lt;/div&gt;

)}

{/\* History \*/}

{team.history && (

&lt;div className='bg-white rounded-xl border border-gray-200 p-4 mb-4'&gt;

&lt;h2 className='text-lg font-bold mb-2'&gt;Club History&lt;/h2&gt;

&lt;p className='text-gray-600 leading-relaxed whitespace-pre-wrap'&gt;

{team.history}

&lt;/p&gt;

&lt;/div&gt;

)}

{/\* Squad \*/}

&lt;div className='bg-white rounded-xl border border-gray-200 overflow-hidden'&gt;

&lt;div className='p-4 border-b border-gray-100'&gt;

&lt;h2 className='text-lg font-bold'&gt;Squad&lt;/h2&gt;

&lt;/div&gt;

{team.players.length === 0 ? (

&lt;p className='p-4 text-gray-400 text-sm'&gt;

No players registered yet.

&lt;/p&gt;

) : (

&lt;table className='w-full text-sm'&gt;

&lt;thead&gt;

&lt;tr className='bg-\[#1A6B3A\] text-white text-xs'&gt;

&lt;th className='px-3 py-2 text-center w-10'&gt;#&lt;/th&gt;

&lt;th className='px-3 py-2 text-left w-16'&gt;Pos&lt;/th&gt;

&lt;th className='px-3 py-2 text-left'&gt;Name&lt;/th&gt;

&lt;/tr&gt;

&lt;/thead&gt;

&lt;tbody&gt;

{\[...team.players\]

.sort((a, b) => (a.jersey_number ?? 99) - (b.jersey_number ?? 99))

.map((p, i) => (

<tr key={p.id}

className={\`border-b border-gray-100 last:border-0

\${i%2===1?'bg-gray-50':''}

\`}

\>

&lt;td className='px-3 py-2.5 text-center font-bold text-gray-700'&gt;

{p.jersey_number ?? '-'}

&lt;/td&gt;

&lt;td className='px-3 py-2.5'&gt;

<span className={\`text-xs font-bold px-1.5 py-0.5 rounded

\${p.position==='GK'?'bg-\[#E8F5EE\] text-\[#0F4A28\]':''}

\${p.position==='DEF'?'bg-blue-50 text-blue-800':''}

\${p.position==='MID'?'bg-purple-50 text-purple-800':''}

\${p.position==='FWD'?'bg-red-50 text-red-800':''}

\`}>{p.position}&lt;/span&gt;

&lt;/td&gt;

&lt;td className='px-3 py-2.5'&gt;

<Link href={\`/players/\${p.id}\`}

className='font-medium text-gray-900 hover:text-\[#1A6B3A\]

hover:underline'>

{p.name}

&lt;/Link&gt;

&lt;/td&gt;

&lt;/tr&gt;

))}

&lt;/tbody&gt;

&lt;/table&gt;

)}

&lt;/div&gt;

&lt;/div&gt;

)

}

**✓ CHECKPOINT**

Your public pages are working. Run npm run dev, visit <http://localhost:3000> and verify: home page shows results and fixtures, standings page shows the table with colours, team profile shows the hero banner, squad table, description and history. Test on mobile width (375px in browser dev tools).

**PHASE 1D**

**Admin Dashboard**

_All admin pages and the full permission system_

| **20** | **Admin Layout**<br><br>_Sidebar navigation and top bar_ |
| ------ | -------------------------------------------------------- |

Create src/app/admin/layout.tsx. This wraps all admin pages with the sidebar.

// src/app/admin/layout.tsx

import { createClient } from '@/lib/supabase/server'

import { redirect } from 'next/navigation'

import AdminSidebar from '@/components/layout/AdminSidebar'

export default async function AdminLayout({

children,

}: { children: React.ReactNode }) {

const supabase = await createClient()

const { data: { user } } = await supabase.auth.getUser()

if (!user) redirect('/admin/login')

const { data: profile } = await supabase

.from('profiles')

.select('\*, league:leagues(name)')

.eq('id', user.id)

.single()

return (

&lt;div className='flex min-h-screen bg-gray-100'&gt;

&lt;AdminSidebar profile={profile} /&gt;

&lt;div className='flex-1 flex flex-col'&gt;

{/\* Top bar \*/}

<div className='bg-white border-b border-gray-200 px-6 py-3

flex items-center justify-between'>

&lt;div /&gt;

&lt;div className='text-sm text-right'&gt;

&lt;span className='text-gray-500'&gt;

{profile?.league?.name ?? 'All Leagues'} ·

&lt;/span&gt;

&lt;span className='font-semibold text-gray-900'&gt;

{profile?.display_name ?? user.email}

&lt;/span&gt;

&lt;span className='text-gray-400 ml-1'&gt;

({profile?.role?.replace('\_',' ')})

&lt;/span&gt;

&lt;/div&gt;

&lt;/div&gt;

&lt;main className='flex-1 p-6'&gt;{children}&lt;/main&gt;

&lt;/div&gt;

&lt;/div&gt;

)

}

| **21** | **Admin Login Page**<br><br>_Email and password login with redirect_ |
| ------ | -------------------------------------------------------------------- |

// src/app/admin/login/page.tsx

'use client'

import { useState } from 'react'

import { createClient } from '@/lib/supabase/client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {

const \[email, setEmail\] = useState('')

const \[password, setPassword\] = useState('')

const \[error, setError\] = useState('')

const \[loading, setLoading\] = useState(false)

const router = useRouter()

const searchParams = useSearchParams()

const redirectTo = searchParams.get('redirectTo') ?? '/admin'

async function handleLogin(e: React.FormEvent) {

e.preventDefault()

setLoading(true)

setError('')

const supabase = createClient()

const { error } = await supabase.auth.signInWithPassword({ email, password })

if (error) {

setError('Invalid email or password')

setLoading(false)

} else {

router.push(redirectTo)

}

}

return (

&lt;div className='min-h-screen flex items-center justify-center bg-gray-100'&gt;

<div className='bg-white p-8 rounded-xl shadow-sm border border-gray-200

w-full max-w-sm'>

&lt;div className='text-center mb-6'&gt;

&lt;h1 className='text-2xl font-bold text-gray-900'&gt;Admin Login&lt;/h1&gt;

&lt;p className='text-gray-500 text-sm mt-1'&gt;Gambia Sports Platform&lt;/p&gt;

&lt;/div&gt;

{error && (

<div className='bg-red-50 border border-red-200 text-red-700

rounded-lg p-3 text-sm mb-4'>

{error}

&lt;/div&gt;

)}

&lt;form onSubmit={handleLogin} className='space-y-4'&gt;

&lt;div&gt;

&lt;label className='block text-sm font-medium text-gray-700 mb-1'&gt;

Email

&lt;/label&gt;

<input

type='email' value={email} required

onChange={e => setEmail(e.target.value)}

className='w-full border border-gray-300 rounded-lg px-3 py-2.5

focus:outline-none focus:border-\[#1A6B3A\] focus:ring-1

focus:ring-\[#1A6B3A\] text-sm'

/>

&lt;/div&gt;

&lt;div&gt;

&lt;label className='block text-sm font-medium text-gray-700 mb-1'&gt;

Password

&lt;/label&gt;

<input

type='password' value={password} required

onChange={e => setPassword(e.target.value)}

className='w-full border border-gray-300 rounded-lg px-3 py-2.5

focus:outline-none focus:border-\[#1A6B3A\] focus:ring-1

focus:ring-\[#1A6B3A\] text-sm'

/>

&lt;/div&gt;

<button

type='submit' disabled={loading}

className='w-full bg-\[#1A6B3A\] text-white py-2.5 rounded-lg

font-semibold text-sm hover:bg-\[#0F4A28\] transition-colors

disabled:opacity-60'

\>

{loading ? 'Signing in...' : 'Sign In'}

&lt;/button&gt;

&lt;/form&gt;

&lt;/div&gt;

&lt;/div&gt;

)

}

| **23** | **Result Entry Form**<br><br>_Large score inputs with confirmation step_ |
| ------ | ------------------------------------------------------------------------ |

// src/app/admin/matches/\[id\]/page.tsx

'use client'

import { useState, useEffect } from 'react'

import { createClient } from '@/lib/supabase/client'

import { useRouter } from 'next/navigation'

export default function EnterResultPage({

params

}: { params: { id: string } }) {

const \[match, setMatch\] = useState&lt;any&gt;(null)

const \[homeScore, setHomeScore\] = useState(0)

const \[awayScore, setAwayScore\] = useState(0)

const \[confirming, setConfirming\] = useState(false)

const \[saving, setSaving\] = useState(false)

const router = useRouter()

const supabase = createClient()

useEffect(() => {

supabase

.from('matches')

.select('\*, home_team:teams!home_team_id(name),

away_team:teams!away_team_id(name)')

.eq('id', params.id)

.single()

.then(({ data }) => setMatch(data))

}, \[params.id\])

async function saveResult() {

setSaving(true)

const { error } = await supabase

.from('matches')

.update({

home_score: homeScore,

away_score: awayScore,

status: 'completed'

})

.eq('id', params.id)

if (!error) {

router.push('/admin/matches')

} else {

alert('Error saving result. Please try again.')

setSaving(false)

setConfirming(false)

}

}

if (!match) return &lt;p&gt;Loading...&lt;/p&gt;

return (

&lt;div className='max-w-md'&gt;

&lt;h1 className='text-xl font-bold mb-2'&gt;Enter Match Result&lt;/h1&gt;

&lt;p className='text-gray-500 text-sm mb-6'&gt;

{match.scheduled_at

? new Date(match.scheduled_at).toLocaleDateString('en-GB',

{ weekday:'long', day:'numeric', month:'long', year:'numeric' })

: 'Date TBC'}

{match.venue ? \` · \${match.venue}\` : ''}

&lt;/p&gt;

{/\* Score input \*/}

&lt;div className='bg-white rounded-xl border border-gray-200 p-6 mb-4'&gt;

&lt;div className='flex items-center gap-4'&gt;

&lt;div className='flex-1 text-center'&gt;

&lt;p className='font-bold text-gray-900 mb-3'&gt;

{match.home_team.name}

&lt;/p&gt;

&lt;p className='text-xs text-gray-400 mb-2'&gt;HOME&lt;/p&gt;

&lt;div className='flex items-center justify-center gap-2'&gt;

<button

onClick={() => setHomeScore(s => Math.max(0, s-1))}

className='w-10 h-10 rounded-lg bg-gray-100 font-bold text-lg

hover:bg-gray-200 disabled:opacity-30'

disabled={homeScore === 0}

\>−&lt;/button&gt;

&lt;span className='text-5xl font-bold w-16 text-center'&gt;

{homeScore}

&lt;/span&gt;

<button

onClick={() => setHomeScore(s => s+1)}

className='w-10 h-10 rounded-lg bg-gray-100 font-bold text-lg

hover:bg-gray-200'

\>+&lt;/button&gt;

&lt;/div&gt;

&lt;/div&gt;

&lt;div className='text-2xl font-bold text-gray-400 mt-8'&gt;-&lt;/div&gt;

&lt;div className='flex-1 text-center'&gt;

&lt;p className='font-bold text-gray-900 mb-3'&gt;

{match.away_team.name}

&lt;/p&gt;

&lt;p className='text-xs text-gray-400 mb-2'&gt;AWAY&lt;/p&gt;

&lt;div className='flex items-center justify-center gap-2'&gt;

<button

onClick={() => setAwayScore(s => Math.max(0, s-1))}

className='w-10 h-10 rounded-lg bg-gray-100 font-bold text-lg

hover:bg-gray-200 disabled:opacity-30'

disabled={awayScore === 0}

\>−&lt;/button&gt;

&lt;span className='text-5xl font-bold w-16 text-center'&gt;

{awayScore}

&lt;/span&gt;

<button

onClick={() => setAwayScore(s => s+1)}

className='w-10 h-10 rounded-lg bg-gray-100 font-bold text-lg

hover:bg-gray-200'

\>+&lt;/button&gt;

&lt;/div&gt;

&lt;/div&gt;

&lt;/div&gt;

&lt;/div&gt;

{/\* Actions \*/}

{!confirming ? (

&lt;div className='flex gap-3'&gt;

<button

onClick={() => router.back()}

className='flex-1 py-3 rounded-lg bg-gray-100 font-medium text-gray-600'

\>Cancel&lt;/button&gt;

<button

onClick={() => setConfirming(true)}

className='flex-1 py-3 rounded-lg bg-\[#1A6B3A\] text-white font-semibold'

\>Review Result&lt;/button&gt;

&lt;/div&gt;

) : (

&lt;div className='bg-\[#E8F5EE\] border border-\[#1A6B3A\] rounded-xl p-4'&gt;

&lt;p className='font-semibold text-\[#0F4A28\] mb-3'&gt;

Save result: {match.home_team.name} {homeScore} -

{awayScore} {match.away_team.name}?

&lt;/p&gt;

&lt;div className='flex gap-3'&gt;

<button

onClick={() => setConfirming(false)}

className='flex-1 py-2.5 rounded-lg bg-white border border-gray-300

font-medium text-gray-600 text-sm'

\>Go Back&lt;/button&gt;

<button

onClick={saveResult} disabled={saving}

className='flex-1 py-2.5 rounded-lg bg-\[#1A6B3A\] text-white

font-semibold text-sm disabled:opacity-60'

\>

{saving ? 'Saving...' : 'Confirm & Save'}

&lt;/button&gt;

&lt;/div&gt;

&lt;/div&gt;

)}

&lt;/div&gt;

)

}

**✓ CHECKPOINT**

Your admin dashboard is functional. Test the full flow: log in at /admin/login, view the dashboard, navigate to /admin/matches, enter a result, confirm it, and verify the standings page updates on the public site.

**PHASE 1E**

**Go Live**

_Custom domain, pre-launch checklist, first real data_

| **29** | **Custom Domain and SSL**<br><br>_Connect your domain to Vercel_ |
| ------ | ---------------------------------------------------------------- |

- Purchase a domain at Cloudflare Registrar (recommended) or Namecheap. Search for a .gm or .com domain.
- Go to your project on vercel.com → Settings → Domains → Add Domain.
- Enter your domain name (e.g. gambiasports.gm).
- Vercel shows you two DNS records to add. Copy both.
- Go to your domain registrar's DNS settings and add both records.
- DNS propagation takes 5 minutes to 48 hours. Vercel shows a green tick when it is verified.
- Vercel automatically provides a free SSL certificate (HTTPS). No action needed.

| **30** | **Pre-Launch Checklist**<br><br>_14 checks before showing the platform to anyone_ |
| ------ | --------------------------------------------------------------------------------- |

**Do every check**

Run through this list completely before sharing the URL with your pilot league partner. Fix any failing check before going further.

| **#** | **Check**                                          | **How to verify**                                                                                                                   |
| ----- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1     | All public pages load without console errors       | Open browser dev tools → Console tab. Visit every public page. No red errors.                                                       |
| 2     | Standings update after entering a result           | Enter a result in admin. Reload /standings. Verify points changed.                                                                  |
| 3     | RLS prevents cross-league data access              | Log in as a League Admin. Try to visit /admin/matches for a match belonging to a different league. Should return 403 or empty data. |
| 4     | Admin pages redirect to login if not logged in     | Log out. Try to visit /admin directly. Should redirect to /admin/login.                                                             |
| 5     | Mobile layout passes at 375px                      | Open browser dev tools → Toggle device toolbar → Set to 375px width. Visit all pages. No horizontal scroll.                         |
| 6     | Tap targets are at least 44px                      | In mobile view, verify all buttons and links are easily tappable. No tiny text links.                                               |
| 7     | Vercel env vars are set                            | Go to Vercel → Settings → Environment Variables. Confirm NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are present.    |
| 8     | Description and history fields display on profiles | Add a description to a team in admin. Verify it shows on the public team page.                                                      |
| 9     | Team cannot play itself                            | Try to schedule a fixture with the same team for both home and away. Should show an error.                                          |
| 10    | Jersey number uniqueness enforced                  | Try to give two players on the same team the same jersey number. Should show an error.                                              |
| 11    | Postponed matches don't show in fixtures           | Set a match to postponed in admin. Verify it disappears from the public fixtures page.                                              |
| 12    | Empty states are friendly                          | Delete all test matches. Visit /standings - should show a friendly message, not an error.                                           |
| 13    | Form strip shows correct W/D/L badges              | Verify team form badges match the actual results for that team.                                                                     |
| 14    | Build completes without errors                     | Run npm run build locally. Must complete with zero errors before deploy.                                                            |

| **31** | **Enter First Real League Data**<br><br>_Step-by-step from blank database to live data_ |
| ------ | --------------------------------------------------------------------------------------- |

- Go to the Supabase Table Editor. Click the leagues table → Insert row.
- Fill in: name, slug (URL-friendly version of name), description, history, founded_year.
- Go to the seasons table → Insert row. Set league_id to your new league's id. Set status to active.
- In the admin dashboard (/admin/teams), add each team. Fill in name, home ground, colours, and description.
- For each team, go to /admin/players and add the squad. Set jersey numbers, positions, and biographies.
- Go to /admin/fixtures/new and schedule the first fixtures for the season.
- After matches are played, go to /admin/matches and enter results.
- Check the public site - standings should update automatically.

**✓ CHECKPOINT**

Phase 1 complete. Your platform is live with a real league, real teams, real players, and real results. Share the URL with your pilot league partner. Congratulations.

**PHASE 2**

**News, Statistics & Multi-League**

_Estimated time: 4-6 weeks after Phase 1 is stable_

**When to start Phase 2**

Start Phase 2 only after Phase 1 has been used by the pilot league for at least 2-3 weeks and is stable. Gather feedback first. Phase 2 adds significant complexity - do not start until Phase 1 is solid.

| **32** | **Phase 2 Database Tables**<br><br>_Add match_events, articles, player_contracts, team_seasons_ |
| ------ | ----------------------------------------------------------------------------------------------- |

\-- ── MATCH EVENTS ────────────────────────────────────────────────────

CREATE TABLE match_events (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

match_id uuid REFERENCES matches(id) ON DELETE CASCADE NOT NULL,

player_id uuid REFERENCES players(id) ON DELETE SET NULL,

team_id uuid REFERENCES teams(id) NOT NULL,

event_type text NOT NULL CHECK (event_type IN (

'goal','own_goal','assist','yellow_card','red_card','second_yellow',

'substitution_in','substitution_out','penalty_scored','penalty_missed'

)),

minute integer NOT NULL CHECK (minute BETWEEN 1 AND 120),

minute_display text,

substituted_player_id uuid REFERENCES players(id) ON DELETE SET NULL,

notes text,

recorded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,

created_at timestamptz DEFAULT now()

);

CREATE INDEX idx_match_events_match_id ON match_events(match_id);

CREATE INDEX idx_match_events_player_id ON match_events(player_id);

ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read match_events"

ON match_events FOR SELECT USING (true);

CREATE POLICY "Admin insert match_events"

ON match_events FOR INSERT TO authenticated

WITH CHECK (is_super_admin() OR EXISTS (

SELECT 1 FROM matches m

JOIN seasons s ON s.id = m.season_id

JOIN profiles p ON p.league_id = s.league_id

WHERE m.id = match_id AND p.id = auth.uid()

AND p.role IN ('league_admin','reporter') AND p.status = 'active'

));

CREATE POLICY "Admin delete match_events"

ON match_events FOR DELETE TO authenticated

USING (is_super_admin() OR recorded_by = auth.uid());

\-- ── ARTICLES ────────────────────────────────────────────────────────

CREATE TABLE articles (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

league_id uuid REFERENCES leagues(id) ON DELETE CASCADE,

author_id uuid REFERENCES auth.users(id) NOT NULL,

tournament_id uuid REFERENCES tournaments(id) ON DELETE SET NULL,

match_id uuid REFERENCES matches(id) ON DELETE SET NULL,

title text NOT NULL,

slug text UNIQUE NOT NULL,

excerpt text,

body jsonb NOT NULL DEFAULT '{}',

cover_image_url text,

category text CHECK (category IN (

'match_report','transfer_news','injury_update','opinion','general'

)),

status text DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),

published_at timestamptz,

views integer DEFAULT 0,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

CREATE TABLE article_tags (

article_id uuid REFERENCES articles(id) ON DELETE CASCADE,

tag text NOT NULL,

PRIMARY KEY (article_id, tag)

);

\-- ── PLAYER CONTRACTS ─────────────────────────────────────────────────

CREATE TABLE player_contracts (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

player_id uuid REFERENCES players(id) ON DELETE CASCADE NOT NULL,

team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,

season_id uuid REFERENCES seasons(id) ON DELETE SET NULL,

start_date date NOT NULL,

end_date date,

notes text,

created_at timestamptz DEFAULT now()

);

ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

ALTER TABLE player_contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published articles"

ON articles FOR SELECT

USING (status = 'published' OR

(auth.uid() IS NOT NULL AND (

is_super_admin() OR

EXISTS (SELECT 1 FROM profiles p

WHERE p.id = auth.uid()

AND (p.league_id = league_id OR p.is_global = true)

AND p.status = 'active')

))

);

CREATE POLICY "Editor insert articles"

ON articles FOR INSERT TO authenticated

WITH CHECK (

is_super_admin() OR EXISTS (

SELECT 1 FROM profiles p WHERE p.id = auth.uid()

AND p.role IN ('content_editor','league_admin')

AND p.status = 'active'

AND (p.is_global = true OR p.league_id = league_id)

)

);

CREATE POLICY "Public read player_contracts"

ON player_contracts FOR SELECT USING (true);

| **33** | **Install Tiptap Rich Text Editor**<br><br>_For article writing_ |
| ------ | ---------------------------------------------------------------- |

npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-image

Create src/components/article/ArticleEditor.tsx:

'use client'

import { useEditor, EditorContent } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'

import Image from '@tiptap/extension-image'

type Props = {

content: any

onChange: (json: any) => void

}

export default function ArticleEditor({ content, onChange }: Props) {

const editor = useEditor({

extensions: \[StarterKit, Image\],

content,

onUpdate({ editor }) {

onChange(editor.getJSON())

},

})

return (

&lt;div className='border border-gray-300 rounded-lg overflow-hidden'&gt;

{/\* Toolbar \*/}

&lt;div className='flex gap-1 p-2 border-b bg-gray-50'&gt;

{\[

\['B', () => editor?.chain().focus().toggleBold().run(), 'bold'\],

\['I', () => editor?.chain().focus().toggleItalic().run(), 'italic'\],

\['H2', () => editor?.chain().focus().toggleHeading({level:2}).run(),

'heading'\],

\['• List', () => editor?.chain().focus().toggleBulletList().run(),

'bulletList'\],

\].map((\[label, action, type\]) => (

<button key={String(label)}

onClick={() => (action as () => void)()}

className={\`px-2 py-1 rounded text-sm font-medium

\${editor?.isActive(String(type))

? 'bg-\[#1A6B3A\] text-white'

: 'bg-white border text-gray-700 hover:bg-gray-100'}

\`}

\>{String(label)}&lt;/button&gt;

))}

&lt;/div&gt;

{/\* Editor area \*/}

<EditorContent

editor={editor}

className='prose max-w-none p-4 min-h-48 focus:outline-none'

/>

&lt;/div&gt;

)

}

**PHASE 3**

**Live Platform & Revenue**

_Realtime scores, reporter tool, ads, billing_

| **37** | **Phase 3 Database Tables**<br><br>_ads, subscriptions, invoices, live_sessions_ |
| ------ | -------------------------------------------------------------------------------- |

\-- ── ADS ─────────────────────────────────────────────────────────────

CREATE TABLE ads (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

title text NOT NULL,

image_url text NOT NULL,

link_url text NOT NULL,

advertiser_name text NOT NULL,

position text NOT NULL CHECK (position IN (

'header_banner','sidebar','footer','between_results','match_page'

)),

league_id uuid REFERENCES leagues(id) ON DELETE SET NULL,

start_date date NOT NULL,

end_date date NOT NULL,

price_gmd integer,

impressions integer DEFAULT 0,

clicks integer DEFAULT 0,

status text DEFAULT 'active' CHECK (status IN

('active','paused','expired','archived')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ── SUBSCRIPTIONS ────────────────────────────────────────────────────

CREATE TABLE subscriptions (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

league_id uuid REFERENCES leagues(id) ON DELETE CASCADE UNIQUE NOT NULL,

plan text DEFAULT 'basic' CHECK (plan IN ('basic','standard','premium')),

price_gmd integer NOT NULL,

billing_cycle text DEFAULT 'monthly'

CHECK (billing_cycle IN ('monthly','quarterly','annual')),

status text DEFAULT 'trial'

CHECK (status IN ('trial','active','past_due','cancelled')),

trial_ends_at timestamptz,

current_period_start date,

current_period_end date,

paystack_customer_id text,

paystack_subscription_id text,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ── LIVE SESSIONS ────────────────────────────────────────────────────

CREATE TABLE live_sessions (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

match_id uuid REFERENCES matches(id) UNIQUE NOT NULL,

started_by uuid REFERENCES auth.users(id) NOT NULL,

started_at timestamptz NOT NULL DEFAULT now(),

half_time_at timestamptz,

second_half_at timestamptz,

ended_at timestamptz,

ended_by uuid REFERENCES auth.users(id),

created_at timestamptz DEFAULT now()

);

ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;

\-- Ads are public-readable, super-admin-only write

CREATE POLICY "Public read ads"

ON ads FOR SELECT USING (status = 'active' AND

start_date &lt;= CURRENT_DATE AND end_date &gt;= CURRENT_DATE);

CREATE POLICY "Super admin manage ads"

ON ads FOR ALL TO authenticated USING (is_super_admin());

| **38** | **Supabase Realtime for Live Scores**<br><br>_Enable and subscribe to real-time match updates_ |
| ------ | ---------------------------------------------------------------------------------------------- |

- In Supabase dashboard → Database → Replication → enable realtime for the matches and match_events tables.

Create src/components/match/LiveScore.tsx (client component):

'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

type Props = { matchId: string; initialHome: number; initialAway: number }

export default function LiveScore({ matchId, initialHome, initialAway }: Props) {

const \[homeScore, setHomeScore\] = useState(initialHome)

const \[awayScore, setAwayScore\] = useState(initialAway)

const \[minute, setMinute\] = useState(0)

const supabase = createClient()

useEffect(() => {

const channel = supabase

.channel(\`match-\${matchId}\`)

.on('postgres_changes', {

event: 'UPDATE',

schema: 'public',

table: 'matches',

filter: \`id=eq.\${matchId}\`,

}, payload => {

setHomeScore(payload.new.home_score)

setAwayScore(payload.new.away_score)

if (payload.new.minute) setMinute(payload.new.minute)

})

.subscribe()

return () => { supabase.removeChannel(channel) }

}, \[matchId\])

return (

&lt;div className='bg-gray-900 text-white rounded-xl p-6 text-center'&gt;

&lt;div className='flex items-center gap-2 justify-center mb-2'&gt;

&lt;span className='w-2 h-2 rounded-full bg-red-500 animate-pulse' /&gt;

&lt;span className='text-red-400 font-bold text-sm'&gt;LIVE&lt;/span&gt;

&lt;span className='text-gray-400 text-sm'&gt;{minute}'&lt;/span&gt;

&lt;/div&gt;

&lt;div className='text-5xl font-bold'&gt;

{homeScore} - {awayScore}

&lt;/div&gt;

&lt;/div&gt;

)

}

**APPENDICES**

**Reference Material**

_Daily workflow, troubleshooting, environment variables_

# **Appendix A - Daily Developer Workflow**

Follow this cycle every time you work on the project:

- Start local development server: npm run dev
- Open <http://localhost:3000> in your browser.
- Make your changes in VS Code.
- Test locally - verify your change works and nothing else broke.
- When happy, save to GitHub:

git add .

git commit -m "Short description of what you changed"

git push

- Wait 1-2 minutes and check your Vercel URL - the live site will have updated.

**Never push broken code to main**

If your change doesn't work locally, don't push it. Fix it first. Vercel deploys main automatically - broken code goes live immediately.

# **Appendix B - Troubleshooting Reference**

| **Error / Symptom**                            | **Cause**                                               | **Fix**                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Module not found: '@/lib/...'                  | Import path wrong or file doesn't exist                 | Check the exact file path. Make sure the file exists. The @ alias maps to src/.                               |
| TypeError: Cannot read properties of undefined | Data loaded as undefined before the async query returns | Add a null check: if (!data) return null                                                                      |
| Error: relation 'X' does not exist             | Table not created in Supabase                           | Re-run the CREATE TABLE SQL for that table in the Supabase SQL Editor.                                        |
| 401 Unauthorized from Supabase                 | API keys wrong or missing                               | Check .env.local exists and has correct values. Check Vercel env vars for production.                         |
| RLS: permission denied for table X             | RLS policy missing or too restrictive                   | In Supabase SQL Editor, check policies for that table with: SELECT \* FROM pg_policies WHERE tablename = 'X'; |
| Page shows blank / empty                       | No active league or season in the database              | Add a league and a season with status = active in the Supabase Table Editor.                                  |
| Build failed on Vercel                         | TypeScript error or missing import                      | Run npm run build locally first. The terminal shows the exact file and line number.                           |
| Standings not updating after result            | Standings calculated on page load from live data        | Hard-refresh the standings page (Ctrl+Shift+R). If still wrong, check the match status = completed.           |
| Admin redirects to login even when logged in   | Session cookie not being set                            | Ensure you are using the SSR client (server.ts) for server components, not the browser client.                |
| Jersey number error on player save             | Unique constraint violation - number already used       | Check the players table in Supabase for duplicate jersey numbers on that team.                                |
| Supabase Realtime not updating                 | Realtime not enabled on the table                       | Go to Supabase → Database → Replication → enable the table.                                                   |
| Image upload fails silently                    | File too large or wrong format                          | Check file is JPEG or PNG and under 2MB for logos, 5MB for cover images.                                      |
| Tournament groups not showing                  | tournament_id not set on group matches                  | When generating fixtures, ensure tournament_id and group_id are set on each match INSERT.                     |
| git push rejected                              | Branch protection or no upstream set                    | Run: git push -u origin main                                                                                  |
| Vercel build shows 'env variable not found'    | Production env vars not added to Vercel                 | Go to Vercel → Settings → Environment Variables and add the missing variable. Redeploy.                       |

# **Appendix C - Environment Variables Reference**

| **Variable**                  | **Where to get it**                          | **Phase needed**   | **Notes**                                                   |
| ----------------------------- | -------------------------------------------- | ------------------ | ----------------------------------------------------------- |
| NEXT_PUBLIC_SUPABASE_URL      | Supabase → Settings → API → Project URL      | 1+                 | Public - safe in browser code                               |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase → Settings → API → Publishable key  | 1+                 | Public - safe in browser code. Never use service role here. |
| SUPABASE_SERVICE_ROLE_KEY     | Supabase → Settings → API → Service role key | 3+ (webhooks only) | SECRET - only in server-side code. Never expose to browser. |
| PAYSTACK_SECRET_KEY           | Paystack dashboard → Settings → API Keys     | 3+                 | SECRET - only used in API routes server-side.               |
| PAYSTACK_PUBLIC_KEY           | Paystack dashboard → Settings → API Keys     | 3+                 | Public - used client-side for payment initialisation.       |
| NEXT_PUBLIC_APP_URL           | Your domain, e.g. <https://gambiasports.gm>  | 3+                 | Used for Web Push and Paystack callback URLs.               |
| WEB_PUSH_VAPID_PUBLIC_KEY     | Generated via web-push npm package           | 3+                 | Public - sent to browsers for push subscription.            |
| WEB_PUSH_VAPID_PRIVATE_KEY    | Generated via web-push npm package           | 3+                 | SECRET - only used server-side to sign push messages.       |
| UPSTASH_REDIS_REST_URL        | Upstash console → REST API                   | 4+                 | For API rate limiting.                                      |
| UPSTASH_REDIS_REST_TOKEN      | Upstash console → REST API                   | 4+                 | SECRET - server-side only.                                  |

# **Appendix D - Common Commands Reference**

| **Command**             | **What it does**                                   | **When to use**                                      |
| ----------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| npm run dev             | Starts local development server on port 3000       | Every time you start working                         |
| npm run build           | Builds production version locally                  | Before pushing - catches TypeScript and build errors |
| npm run lint            | Runs ESLint on all files                           | Periodically - catches code quality issues           |
| git add .               | Stages all changed files                           | Before every commit                                  |
| git commit -m "message" | Saves a snapshot of your code                      | After completing a feature or fix                    |
| git push                | Sends commits to GitHub and triggers Vercel deploy | After committing                                     |
| git pull                | Downloads latest code from GitHub                  | If working on multiple computers                     |
| git status              | Shows which files have uncommitted changes         | Before committing - check what you're about to save  |
| git log --oneline       | Shows recent commit history                        | When you need to see what was changed                |
| npm install \[package\] | Installs a new package                             | When adding a new library                            |

_Tech Palz - Gambia Sports Platform | Implementation Guide v2.0 | May 2026_
