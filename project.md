TECH PALZ
Gambia Sports Platform
Product Blueprint & Technical Specification
─────────────────────────────────────────
Prepared by Tech Palz
Version 1.0
Date April 2026
Status Active Development Plan
Team size 7 people

This document is the complete technical and product plan for the Gambia Sports Platform — a Next.js web application that will become the definitive home for football statistics, live scores, league management, and sports news in The Gambia.

 

1. Vision & Overview
   The Gambia Sports Platform is a web-based product that centralises football league management, live match tracking, player statistics, and sports journalism in one place. It is built to start small — one pilot league — and scale to become the ESPN of The Gambia.
   The platform serves three types of users:
   • Fans — anyone who visits the website to check results, standings, news, or player stats.
   • League administrators — officials who log in to manage their league: enter results, register teams and players, schedule fixtures.
   • Match reporters — people at the ground during live matches who enter goals, cards, and substitutions in real time.

1.1 Core goals
• Replace paper-based football administration in The Gambia with a simple digital system.
• Give every football fan in The Gambia one place to get accurate, up-to-date sports information.
• Build a sustainable business through league fees, local advertising, and eventually a paid API.
• Start with football; expand to basketball, wrestling, and athletics over time.
1.2 What makes this different
There is currently no centralised digital home for Gambian football. Results are shared on WhatsApp, standings are calculated manually, and player records do not exist. This platform fills that gap, and by being first, becomes the standard.

  2. Tech Stack
The entire platform is built on one consistent stack from Phase 1 through Phase 4. Nothing is ever replaced — only added to. Every technology listed below has a generous free tier that covers the platform until it has real users paying for it.

Technology What it does Why this choice Free tier limit
Next.js 14 Frontend + API routes React-based, works for public site and admin dashboard in one codebase. Team already knows React. Unlimited on Vercel
Supabase Database + Auth + Realtime PostgreSQL database, built-in login system, real-time subscriptions for live scores. No backend server needed. 50,000 rows, 500MB
Tailwind CSS UI styling Build professional interfaces fast without needing a designer. Mobile-first by default. Free, open source
Vercel Hosting & deployment Connects to GitHub. Every code push auto-deploys. Custom domain support. Free SSL. Unlimited hobby projects
GitHub Code storage & collaboration All 7 team members work from one repo. Code review, branches, and history. Free for teams
Supabase Storage Image & file uploads Store team logos, player photos, article images. Integrated with the same Supabase project. 1GB free
Tiptap Rich text editor (Phase 2) For writing news articles and match reports in the admin panel. Works inside Next.js. Free, open source
Paystack Payments (Phase 3) Accepts Gambian Dalasi, mobile money, and bank transfer. Used for league subscriptions. Free, % per transaction
React Native / Expo Mobile app (Phase 4) Reuses the team's existing JavaScript/React skills. One codebase for Android and iOS. Free

All code is written in TypeScript for better reliability and easier debugging as the team grows.

  3. Database Structure
All data lives in a single Supabase (PostgreSQL) project. The schema is designed from day one to support multiple leagues and multiple seasons — this prevents having to rebuild anything in Phase 2. Every table that belongs to a league includes a league_id foreign key, and every time-bound table includes a season_id.

3.1 Core tables (Phase 1)
leagues
Column Type Description
id uuid PK Unique identifier, auto-generated
name text Full league name, e.g. Banjul Community League
slug text URL-friendly name, e.g. banjul-community-league
logo_url text Path to league logo in Supabase Storage
created_at timestamp Auto-set on creation

seasons
Column Type Description
id uuid PK Unique identifier
league_id uuid FK References leagues.id
name text Season label, e.g. 2026 Season
start_date date Season start
end_date date Season end
status text active | completed | upcoming

teams
Column Type Description
id uuid PK Unique identifier
league_id uuid FK References leagues.id
name text Team name
slug text URL-friendly team name
logo_url text Team badge image
home_ground text Name of home venue
founded_year integer Optional founding year

players
Column Type Description
id uuid PK Unique identifier
team_id uuid FK Current team — references teams.id
name text Full player name
position text GK | DEF | MID | FWD
jersey_number integer Squad number
date_of_birth date Optional, for age calculation
photo_url text Player profile photo

matches
Column Type Description
id uuid PK Unique identifier
season_id uuid FK References seasons.id
home_team_id uuid FK References teams.id
away_team_id uuid FK References teams.id
scheduled_at timestamp Kick-off date and time
venue text Match venue name
status text scheduled | live | completed | postponed
home_score integer Final or current home score
away_score integer Final or current away score
minute integer Current match minute (live only)

3.2 Extended tables (Phase 2+)
match_events
Column Type Description
id uuid PK Unique identifier
match_id uuid FK References matches.id
player_id uuid FK Player involved — references players.id
team_id uuid FK Which team the event belongs to
event_type text goal | assist | yellow_card | red_card | substitution_in | substitution_out
minute integer Minute the event occurred
created_at timestamp When the event was recorded

articles
Column Type Description
id uuid PK Unique identifier
league_id uuid FK Which league this article is about (nullable for general news)
author_id uuid FK References Supabase auth.users
title text Article headline
slug text URL-friendly title
body jsonb Rich text content from Tiptap editor
cover_image_url text Article header image
published_at timestamp Publication date (null = draft)

player_contracts
Column Type Description
id uuid PK Unique identifier
player_id uuid FK References players.id
team_id uuid FK References teams.id
start_date date When the player joined this team
end_date date When the player left (null = current)

profiles (auth extension)
Column Type Description
id uuid PK Matches Supabase auth.users.id
role text super_admin | league_admin | reporter | fan
league_id uuid FK Which league this admin manages (nullable)
display_name text Public display name

 
Phase
1 Foundation
Months 1–3 | One pilot league live. Public site. Admin dashboard.

4.1 Objectives
• Launch a live website for one real Gambian football league.
• Any fan can visit, see the standings, fixtures, and team pages — no login required.
• League admin can log in and enter match results, register teams and players.
• Confirm the pilot league partner and get real user feedback within 6 weeks.
• Establish the full codebase structure that all future phases build on.

4.2 Features
Feature Description How to implement
League standings Auto-calculated table showing W/D/L/Pts/GD for every team. Updates when a result is entered. Supabase query groups match results by team. Next.js server component renders the table. Updates on page load.
Fixtures & results List of upcoming matches (date, time, venue) and past matches showing final score. matches table filtered by status. /fixtures page shows scheduled, /results shows completed.
Team pages Each team has a page showing squad, home ground, current form (last 5 results). Dynamic route /teams/[slug]. SQL query joins teams + players + recent matches.
Player list per team Registered squad with name, position, and jersey number. players table filtered by team_id. Displayed on the team page.
Admin login Secure email + password login for the league administrator. Supabase Auth. Login page at /admin/login. Next.js middleware protects all /admin/\* routes.
Result entry form Admin enters home score and away score for a completed match. Protected form at /admin/matches/[id]. Updates matches table. Standings recalculate automatically.
Team & player management Admin can add teams, edit team details, add players and update their info. /admin/teams and /admin/players pages. Full CRUD using Supabase client.
Fixture scheduling Admin creates upcoming matches by selecting home team, away team, date, time, and venue. /admin/fixtures/new form. Inserts into matches table with status = scheduled.
Mobile-responsive UI Every page works well on a smartphone. Most Gambian users browse on mobile. Tailwind CSS responsive utility classes. Test throughout on Chrome mobile emulation.
SEO-ready pages Each team and league page is indexable by Google. Next.js server-side rendering. Metadata (title, description) set per page using generateMetadata.

4.3 Pages
Route / URL Page name Who sees it What it shows
/ Home Everyone Latest results, upcoming fixtures, top news headline
/standings League table Everyone Full standings with W/D/L/Pts/GD
/fixtures Fixtures Everyone Upcoming matches with date, time, venue
/results Results Everyone Completed matches with scores
/teams Teams list Everyone All teams in the league with badges
/teams/[slug] Team page Everyone Squad, form, fixtures, results for one team
/players/[id] Player page Everyone Player info and basic stats
/admin Admin dashboard Admin only Overview: recent results, upcoming matches
/admin/matches Manage matches Admin only List all matches, enter results
/admin/teams Manage teams Admin only Add, edit, remove teams
/admin/players Manage players Admin only Add, edit players per team
/admin/fixtures/new Schedule fixture Admin only Form to create a new upcoming match
/admin/login Login Admin only Email + password login form

4.4 Tech stack for this phase
Next.js 14 Supabase DB Supabase Auth Tailwind CSS Vercel GitHub

4.5 Team tasks
Person(s) Role Week 1–2 task
1 person Project lead Contact pilot league. Set up GitHub org and repo. Create Vercel and Supabase accounts.
2 people Frontend devs Set up Next.js project. Build home page, standings, fixtures, results pages.
2 people Backend devs Design and create Supabase tables. Write queries for standings calculation.
1 person UI / design Create Tailwind theme: colours, fonts, component styles. Design mobile layout.
1 person QA / testing Test all pages on mobile. Check result entry updates standings correctly.

 
Phase
2 Sports News Platform
Months 4–7 | Multi-league. News. Player stats. Season history.

5.1 Objectives
• Expand from one pilot league to three to five leagues.
• Launch a sports news section so fans come back for content, not just scores.
• Build full player profiles with season and career statistics.
• Add season history so past champions and top scorers are preserved.
• Introduce per-league admin accounts with isolated data access.

5.2 Features
Feature Description How to implement
Multi-league support Each league has its own standings, fixtures, and teams under one platform. Add league selector to navigation. Every query filters by league_id. Separate /leagues/[slug] routes.
News & match reports Admins write articles with photos. Appears on home page and a dedicated news section. articles table in Supabase. Tiptap rich text editor in admin. Image upload to Supabase Storage.
Player profiles & stats Goals, assists, yellow/red cards, appearances. Per season and career totals. match_events table stores each event. SQL views aggregate stats per player per season.
Top scorers table Leaderboard of highest goal-scorers per league and across all leagues. Supabase SQL view counts goals grouped by player_id. Rendered at /stats/top-scorers.
Season history Past seasons are archived. Fans can browse 2024 champions, 2025 top scorers, etc. seasons table with status field. Season selector UI on standings, fixtures, and stats pages.
Search Find any player, team, or article by name from a search bar in the header. Supabase full-text search (tsvector) on players, teams, articles. Results page at /search?q=...
Per-league admin roles Each league gets their own login. They can only edit data belonging to their league. Supabase Row Level Security policies. profiles.league_id matches their records only.
League home page Each league has a branded page: logo, standings, recent results, latest news. Dynamic route /leagues/[slug]. All data filtered by league. Custom league colours via DB.
Article categories & tags Tag articles as match report, transfer news, injury update, opinion. category and tags fields on articles table. Filter by category on news page.

5.3 New pages added
Route / URL Page name Who sees it What it shows
/news News home Everyone Latest articles across all leagues
/news/[slug] Article page Everyone Full article with photos and related articles
/leagues Leagues directory Everyone All leagues on the platform
/leagues/[slug] League home Everyone League-specific standings, results, news
/stats/top-scorers Top scorers Everyone Goal leaderboard per league and combined
/stats/top-assists Top assists Everyone Assist leaderboard
/players/[id] Player profile Everyone Full career stats, current season breakdown
/search Search results Everyone Search across players, teams, articles
/admin/news/new Write article Admin only Rich text editor for match reports and news
/admin/news Manage articles Admin only List, edit, publish, delete articles
/admin/events/[matchId] Match events Admin only Add goals, cards, subs to a completed match

5.4 Tech added in this phase
Tiptap (rich text) Supabase Storage Supabase RLS Full-text search SQL Views

 
Phase
3 Live Platform
Months 8–14 | Real-time scores. Notifications. Revenue begins.

6.1 Objectives
• Stream live match events to all viewers in real time — no page refresh.
• Give reporters a simple mobile tool to enter goals, cards, and substitutions from the ground.
• Support cup and knockout competitions alongside league formats.
• Send push notifications to fans following their teams.
• Begin generating revenue through local advertising and league subscription fees.

6.2 Features
Feature Description How to implement
Live score streaming Score updates appear instantly on screen for all viewers during a match. Supabase Realtime subscribes to matches table changes. React component updates without page reload.
Live match timeline Event feed: goal at 34 min, yellow card at 67 min, sub at 80 min. match_events table with Realtime subscription. New events push to all subscribers within one second.
Mobile reporter tool Simple mobile-optimised page for the person at the ground. Large buttons for each event type. /reporter/[matchId] route protected by reporter role. One tap logs a goal, card, or substitution.
Knockout / cup brackets Visual bracket for cup competitions. Winners automatically advance. tournament_rounds table with bracket positions. React component renders the bracket. Admin advances winners.
Push notifications Fans opt in to be notified when their team scores or a match starts. Web Push API with service worker. Subscriptions stored in Supabase. Triggered on match_events insert.
Local advertising Banner and sponsored card placements for Gambian businesses. ads table with image, link, position, date range. Rendered in page layouts. Charged weekly or monthly.
League subscription billing Leagues pay a monthly fee to be featured on the platform. Manual invoicing via Wave App (free) initially. Paystack integration for online payment in same phase.
Match of the week Editor picks a featured match with a highlighted write-up on the home page. featured_match field on matches. Home page renders the highlighted match in a special card layout.
Referee & venue tracking Record which referee officiated a match and at which ground. referee_id and venue fields on matches. Simple admin dropdowns. Public display on match detail page.

6.3 New pages added
Route / URL Page name Who sees it What it shows
/match/[id] Live match page Everyone Real-time score, timeline, lineups, stats
/reporter/[matchId] Reporter tool Reporter only Mobile-optimised event entry interface
/cups/[slug] Cup competition Everyone Knockout bracket with results
/notifications Notifications setup Everyone Manage push notification preferences
/admin/live/[matchId] Live match control Admin only Start match, update minute, end match
/admin/ads Manage ads Super admin Upload, schedule, and manage ad placements

6.4 Tech added in this phase
Supabase Realtime Web Push API Service Workers Paystack Wave App (invoicing)
6.5 Revenue model
Revenue stream How it works Target price (GMD)
Local business ads Businesses pay for banner placement on the platform for a set period. D500–D2,000/month
League subscription fee Leagues pay a monthly fee to be officially listed and managed on the platform. D300–D800/month
Featured team page Teams pay to have a promoted, enhanced profile with sponsor logo. D200–D500/month
SMS match alerts Fans pay a small fee for SMS notifications if they do not have a smartphone. D10–D20/month

 
Phase
4 The Full Product
Months 15–24 | Mobile app. Analytics. Multi-sport. Public API.

7.1 Objectives
• Launch a native Android app on Google Play using React Native and Expo.
• Build deep player analytics — form charts, performance trends, career comparisons.
• Let fans create accounts, follow teams, comment on articles, and get personalised feeds.
• Expand to basketball, wrestling, and athletics using the same platform infrastructure.
• Launch a public API so journalists, the GFF, and developers can build on your data.

7.2 Features
Feature Description How to implement
Android mobile app Native app on Google Play. Live scores, news, notifications. Works offline for cached content. React Native with Expo. Calls same Supabase API. Shares business logic with web app.
Advanced player analytics Form charts, goals per game, seasonal comparison, head-to-head with other players. Recharts library. Data already in Supabase from Phase 2–3 match events. New /analytics routes.
Fan accounts & follows Fans register, follow teams, get a personalised home page, comment on match reports. Extend Supabase Auth to public users. follows table. Comments table with admin moderation flag.
Player transfer tracker Full career history — every team a player has played for with dates. player_contracts table (added in Phase 2 DB). Timeline component on player profile page.
Multi-sport expansion Add basketball, wrestling, athletics. Sport-specific events and stats. sport_type field on leagues. Sport-specific event types. Separate stat calculation logic per sport.
Video highlights Short video clips attached to match pages. Match of the week video. Cloudflare R2 for video storage (very cheap). Video player component. Upload via admin dashboard.
Photo galleries Match day photo galleries per game. Team season photo albums. Supabase Storage. Gallery component. Admin uploads multiple photos per match.
Public API Developers and journalists can query live data via a documented REST API. Next.js API routes with API key authentication. Rate limiting via Upstash Redis. Paid tiers via Paystack.
Personalised news feed Logged-in fans see news about their followed teams first. follows table joined with articles. Server component renders filtered feed for authenticated users.
Coach & staff profiles Managers and coaching staff listed on team pages with career history. coaches table linked to teams. Displayed on team page below squad. Admin CRUD in dashboard.

7.3 New pages added
Route / URL Page name Who sees it What it shows
/feed Personal feed Logged-in fans News and results from followed teams only
/analytics/player/[id] Player analytics Everyone Charts, trends, career comparison
/analytics/team/[id] Team analytics Everyone Form, goal patterns, season progress
/community/[league] League community Everyone Fan comments, polls, discussion
/api/v1/\* Public API Developers (paid) JSON endpoints for all platform data
/admin/media Media manager Admin only Upload videos and photo galleries
/settings Fan settings Logged-in fans Manage follows, notifications, account

7.4 Tech added in this phase
React Native / Expo Recharts Cloudflare R2 Upstash Redis Google Play Store

  8. Project Folder Structure
The Next.js project is organised using the App Router (Next.js 14). Each major section of the site has its own folder. Shared components, database queries, and utility functions are separated from page files.

Path What lives here
src/app/(public)/ All public-facing pages: home, standings, fixtures, teams, players, news
src/app/admin/ All admin pages: dashboard, match entry, team management, player management
src/app/reporter/ Mobile reporter tool pages for live match event entry
src/app/api/ API routes: used by admin forms and future public API
src/components/ui/ Reusable UI components: buttons, cards, tables, inputs, badges
src/components/league/ League-specific components: standings table, fixture card, result row
src/components/match/ Match components: live timeline, score display, event feed
src/components/player/ Player components: stat card, profile header, form chart
src/lib/supabase/ Supabase client setup and typed database query functions
src/lib/queries/ All database queries as named functions (e.g. getStandings, getTeamBySlug)
src/types/ TypeScript type definitions for all database tables
public/ Static assets: default logos, icons, favicon

  9. Risks & Mitigations
Risk Likelihood Impact Mitigation
Pilot league does not commit Medium High Show them a live demo on wp-demo.joomsport.com before asking for commitment. Start with a free trial period.
Team members lose motivation Medium High Weekly standups. Public GitHub activity. Celebrate every small launch with the group.
Low internet speed for live features High Medium Supabase Realtime only sends diffs, not full pages. Reporter tool is optimised for 2G/3G.
Data loss or corruption Low High Supabase provides automatic daily backups. Enable point-in-time recovery before Phase 2 launch.
No paying customers in Phase 3 Medium Medium Start selling ad space in Phase 2 informally. Build relationships with local businesses early.
Key developer leaves the team Medium High All code on GitHub. Document every major function. No single person owns a feature alone.
Competition from a rival platform Low Medium Move fast in Phase 1. Being first in market with real leagues is a strong moat.

  10. Timeline Summary
Phase Period Key milestone Definition of done
Phase 1 Months 1–3 One pilot league live on a real domain Fans can view standings and fixtures. Admin can enter results.
Phase 2 Months 4–7 Sports news platform with multi-league support 3+ leagues live. Player stats. Top scorers. News articles.
Phase 3 Months 8–14 Live scores and first revenue Real-time match updates. Local ads running. First paying league.
Phase 4 Months 15–24 Mobile app and full product Android app on Play Store. Fan accounts. Analytics. Multi-sport.

11. Immediate Next Steps
    Before any code is written, these five actions must happen this week:
1. Create the GitHub organisation (techpalz) and a private repo (gambia-sports). Add all 7 team members.
1. Create free accounts on Supabase, Vercel, and purchase a .com or .gm domain name.
1. Project lead visits the two pilot league leads with a printed version of this document and confirms a partner.
1. Frontend team runs npx create-next-app@latest and pushes the skeleton project to GitHub.
1. Backend team creates the Phase 1 tables in Supabase: leagues, seasons, teams, players, matches.

This document is a living plan. Update it as the product evolves, user feedback changes priorities, or the team learns new things. Version and date every update.
