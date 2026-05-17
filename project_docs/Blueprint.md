**TECH PALZ**

**Gambia Sports Platform**

_Product Blueprint & Technical Reference_

Document 1 of 2

| **Document type**    | Product Blueprint & Technical Reference                        |
| -------------------- | -------------------------------------------------------------- |
| **Version**          | 2.0                                                            |
| **Date**             | May 2026                                                       |
| **Status**           | Active development plan                                        |
| **Document 2 of 2**  | Software Requirements Specification (SRS) - separate document  |
| **Tech stack**       | Next.js 16, Supabase (latest), Tailwind CSS 4, Vercel, GitHub  |
| **Team size**        | 7 people                                                       |
| **Intended readers** | Developers, project lead, pilot league stakeholders, investors |

**PART A**

**Vision, Roles & Roadmap**

_What we are building, who it serves, and the phased plan to get there_

# **A.1 Vision & Product Goals**

The Gambia Sports Platform is a web-based product that centralises football league management, live match tracking, player statistics, and sports journalism in one place. It is built to start with one pilot league and scale to become the definitive digital home for sport in The Gambia.

There is currently no centralised digital platform for Gambian football. Results are shared on WhatsApp, standings are calculated manually on paper, and player records do not exist. This platform fills that gap - and by being first, becomes the standard.

## **A.1.1 Core Goals**

- Replace paper-based football administration with a simple, accurate digital system.
- Give every football fan in The Gambia one place to get accurate, up-to-date sports information.
- Support the full Nawetans competition format - group stages, knockout rounds, and finals - natively.
- Build a sustainable business through league subscription fees, local advertising, tournament hosting fees, and eventually a public API.
- Start with football and expand to basketball, wrestling, and athletics using the same infrastructure.
- Provide every team, league, and player with a rich public profile including full history and description.

## **A.1.2 What Makes This Different**

No existing platform serves Gambian football specifically. BBC Sport, ESPN, and SofaScore are built for European and global markets. Local alternatives do not exist. The Gambia Sports Platform is built for the Gambian context: mobile-first design for low-bandwidth connections, support for the Nawetans community competition format, local pricing in Gambian Dalasi, and content written by and for Gambian sports fans.

**The Nawetans Opportunity**

The Nawetans is the most widely played form of organised football in The Gambia - run in wards and neighbourhoods across the country. No digital platform currently manages Nawetans competitions. This is the platform's strongest early differentiator and the feature most likely to drive rapid adoption.

# **A.2 User Roles**

The platform has five named roles. Every person interacting with the system is one of these roles. Roles are assigned by a Super Admin at invitation - there is no self-registration in Phase 1.

| **Role**           | **Who they are**                                   | **Summary of access**                                                                                                       |
| ------------------ | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Fan**            | Any member of the public visiting the website      | Read-only. No login required. Sees all public data.                                                                         |
| **Content Editor** | A journalist or writer creating sports content     | Login required. Can write, edit, and publish news articles. Scoped to one league or platform-wide (toggled by Super Admin). |
| **Reporter**       | A trusted person at the ground during a live match | Login required. Can record live match events. Additional permissions toggled by Super Admin.                                |
| **League Admin**   | An official managing one specific league           | Login required. Full management of their league's data. Individual permissions toggled by Super Admin.                      |
| **Super Admin**    | A Tech Palz platform operator                      | Login required. All League Admin powers across all leagues, plus platform settings, user management, ads, and billing.      |

## **A.2.1 Toggleable Permissions**

Super Admin can enable or disable individual permissions for any League Admin, Reporter, or Content Editor. Permissions are stored as a JSON object on the user's profile record. The predefined toggleable permissions are:

### **League Admin toggleable permissions**

- Can enter and correct match results
- Can schedule and edit fixtures
- Can manage teams (add, edit, deactivate)
- Can manage players (add, edit, transfer)
- Can manage tournaments (create groups, advance knockout bracket)
- Can post and publish news articles
- Can upload photos and media
- Can invite Reporters for their league
- Can view subscription and financial reports for their league

### **Reporter toggleable permissions**

- Can record live match events (goals, cards, substitutions)
- Can post news articles
- Can upload match photos
- Can start and end a live match session

### **Content Editor toggleable permissions**

- Can post and publish news articles
- Can edit other editors' articles (within their scope)
- Can upload photos and media
- Can manage article categories and tags
- Is platform-wide (not scoped to one league) - toggled by Super Admin

**Content Editor Scope**

A Content Editor is assigned to one league by default (league_id set on their profile). Super Admin can toggle them to platform-wide scope by setting is_global = true and league_id = null. A global Content Editor's articles are not tied to any league and appear in the main news feed visible to all visitors.

# **A.3 Tech Stack - All Versions**

The entire platform is built on one consistent stack from Phase 1 through Phase 4. Nothing is replaced - only added to. All versions listed are the latest stable releases as of May 2026.

| **Technology**          | **Version** | **What it does**                     | **Why this choice**                                                                                 |
| ----------------------- | ----------- | ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **Next.js**             | 16 (stable) | Frontend framework + API routes      | App Router, server actions, Turbopack. Team knows React. Single codebase for public site and admin. |
| **Supabase**            | 2.x client  | Database + Auth + Realtime + Storage | PostgreSQL, built-in login, realtime for live scores. No separate backend server needed.            |
| **Tailwind CSS**        | 4.x         | UI styling                           | CSS-first config, no tailwind.config.js, faster builds, smaller output. Mobile-first by default.    |
| **Vercel**              | Latest      | Hosting & deployment                 | GitHub integration, auto-deploy on push, custom domain, free SSL, global edge network.              |
| **GitHub**              | N/A         | Code storage & collaboration         | All team members work from one repo. Code review, branches, history. Free for teams.                |
| **Supabase Storage**    | Latest      | Image & file uploads                 | Team logos, player photos, article images. Same Supabase project. 1 GB free.                        |
| **TypeScript**          | 5.x         | Type safety                          | Strict mode enabled. Type errors block builds. All tables have TypeScript types generated.          |
| **Tiptap**              | 2.x         | Rich text editor (Phase 2)           | News articles and match reports. Works in Next.js. Free, open source.                               |
| **Paystack**            | Latest      | Payments (Phase 3)                   | Accepts Gambian Dalasi, mobile money, bank transfer. % per transaction.                             |
| **React Native / Expo** | Latest SDK  | Mobile app (Phase 4)                 | Reuses React skills. One codebase for Android and iOS. Same Supabase backend.                       |
| **Recharts**            | Latest      | Charts (Phase 4)                     | Player analytics, form charts, season comparisons. Works in Next.js and React Native.               |
| **Upstash Redis**       | Latest      | Rate limiting (Phase 4)              | Public API rate limiting. Serverless, pay-per-request. Free tier for development.                   |
| **Cloudflare R2**       | Latest      | Video storage (Phase 4)              | Match highlight videos. Very low storage cost. Compatible with S3 API.                              |

# **A.4 Phase Roadmap**

The platform is built in four phases. Each phase builds on the previous - no code is thrown away. The database schema is designed from day one to support all four phases.

| **Phase**   | **Period**   | **Name**          | **Key milestone**                  | **Definition of done**                                                                      |
| ----------- | ------------ | ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------------- |
| **Phase 1** | Months 1-3   | **Foundation**    | One pilot league or Nawetans live  | Fans view standings, group tables, bracket. Admin enters results. Nawetans fully supported. |
| **Phase 2** | Months 4-7   | **News & Stats**  | Sports news platform, multi-league | 3+ leagues live. Player stats, top scorers. News articles. Content Editor role active.      |
| **Phase 3** | Months 8-14  | **Live Platform** | Live scores and first revenue      | Real-time match updates. Local ads running. First paying league subscription.               |
| **Phase 4** | Months 15-24 | **Full Product**  | Mobile app and full product        | Android app on Play Store. Fan accounts. Analytics. Multi-sport expansion.                  |

**PART B**

**Complete Database Reference**

_Every table, column, constraint, index, and RLS policy across all four phases_

# **B.1 Database Design Principles**

- All tables use UUID primary keys generated by gen_random_uuid().
- Every table includes created_at timestamp defaulting to now().
- Tables with editable records include updated_at managed by a Supabase trigger.
- Every table with league data includes league_id for multi-tenant isolation.
- Every time-bound table includes season_id for season scoping.
- Soft deletes are used for entities with historical data (status field, not deletion).
- Foreign keys use ON DELETE CASCADE for child data, SET NULL for optional references.
- Row Level Security (RLS) is enabled on every table.

# **B.2 Phase 1 Core Tables**

### **leagues**

_One row per league on the platform. Every team, season, and tournament belongs to a league._

| **Column**          | **Type**    | **Required** | **Notes / Constraints**                                                                               |
| ------------------- | ----------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| **id**              | uuid PK     | Yes          | gen_random_uuid(). Immutable after creation.                                                          |
| **name**            | text        | Yes          | Full league name. Max 120 chars. e.g. Banjul Community League.                                        |
| **slug**            | text UNIQUE | Yes          | URL-friendly. Auto-generated from name. Immutable after first save.                                   |
| **description**     | text        | No           | Long-form rich text description of the league. Editable by League Admin and Super Admin at any time.  |
| **history**         | text        | No           | Historical background of the league - founding story, notable seasons, records. Editable at any time. |
| **logo_url**        | text        | No           | Path in Supabase Storage. Max 2 MB. JPEG or PNG.                                                      |
| **cover_image_url** | text        | No           | Wide banner image for the league profile page.                                                        |
| **founded_year**    | integer     | No           | Year the league was established. Must be between 1800 and current year.                               |
| **country**         | text        | No           | Defaults to 'Gambia'. Supports future multi-country expansion.                                        |
| **sport_type**      | text        | No           | football \| basketball \| wrestling \| athletics. Defaults to football.                               |
| **contact_email**   | text        | No           | Public contact email for the league.                                                                  |
| **website_url**     | text        | No           | Optional external website URL.                                                                        |
| **status**          | text        | Yes          | active \| inactive. Defaults to active. Inactive leagues are hidden from public listings.             |
| **created_at**      | timestamp   | Yes          | Auto-set on creation.                                                                                 |
| **updated_at**      | timestamp   | Yes          | Auto-updated by trigger on any change.                                                                |

### **seasons**

_A time-bounded competition period within a league. One season can contain multiple tournaments._

| **Column**      | **Type**  | **Required** | **Notes / Constraints**                                                    |
| --------------- | --------- | ------------ | -------------------------------------------------------------------------- |
| **id**          | uuid PK   | Yes          | gen_random_uuid().                                                         |
| **league_id**   | uuid FK   | Yes          | References leagues.id. ON DELETE CASCADE.                                  |
| **name**        | text      | Yes          | e.g. 2026 Season. Max 80 chars.                                            |
| **description** | text      | No           | Notes about the season - format changes, special rules, number of teams.   |
| **start_date**  | date      | No           | Season start date.                                                         |
| **end_date**    | date      | No           | Season end date. Must be after start_date if both are set.                 |
| **status**      | text      | Yes          | upcoming \| active \| completed. Only one season per league can be active. |
| **created_at**  | timestamp | Yes          | Auto-set on creation.                                                      |
| **updated_at**  | timestamp | Yes          | Auto-updated by trigger.                                                   |

### **teams**

_One row per team. A team belongs to a league and persists across seasons._

| **Column**          | **Type**    | **Required** | **Notes / Constraints**                                                                             |
| ------------------- | ----------- | ------------ | --------------------------------------------------------------------------------------------------- |
| **id**              | uuid PK     | Yes          | gen_random_uuid().                                                                                  |
| **league_id**       | uuid FK     | Yes          | References leagues.id. ON DELETE CASCADE.                                                           |
| **name**            | text        | Yes          | Team name. Max 100 chars. Must be unique within the league.                                         |
| **slug**            | text UNIQUE | Yes          | Auto-generated from name. Immutable after first save.                                               |
| **description**     | text        | No           | About the team - playing style, achievements, community ties. Editable at any time.                 |
| **history**         | text        | No           | Full club history - founding story, notable seasons, famous players, records. Editable at any time. |
| **logo_url**        | text        | No           | Team badge. Max 2 MB. JPEG or PNG.                                                                  |
| **cover_image_url** | text        | No           | Wide banner image for the team profile page.                                                        |
| **home_ground**     | text        | No           | Name of home venue. Max 100 chars.                                                                  |
| **founded_year**    | integer     | No           | Must be between 1800 and current year.                                                              |
| **colours**         | text        | No           | Team colours. e.g. Red and White. Displayed on profile page.                                        |
| **contact_email**   | text        | No           | Team contact email.                                                                                 |
| **status**          | text        | Yes          | active \| inactive. Inactive teams hidden from public listings and cannot be selected for fixtures. |
| **created_at**      | timestamp   | Yes          | Auto-set on creation.                                                                               |
| **updated_at**      | timestamp   | Yes          | Auto-updated by trigger.                                                                            |

### **players**

_One row per registered player. Players persist across seasons; only their team assignment changes._

| **Column**        | **Type**    | **Required** | **Notes / Constraints**                                                                                               |
| ----------------- | ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------- |
| **id**            | uuid PK     | Yes          | gen_random_uuid().                                                                                                    |
| **team_id**       | uuid FK     | No           | References teams.id. SET NULL on team delete. Null = unassigned.                                                      |
| **name**          | text        | Yes          | Full player name. Max 100 chars.                                                                                      |
| **slug**          | text UNIQUE | Yes          | Auto-generated from name + unique suffix. Used in profile URLs.                                                       |
| **position**      | text        | Yes          | GK \| DEF \| MID \| FWD. No free-text positions accepted.                                                             |
| **jersey_number** | integer     | No           | 1-99. Unique within team. Enforced by DB constraint.                                                                  |
| **date_of_birth** | date        | No           | Cannot be in the future. Used to calculate age on profile page.                                                       |
| **nationality**   | text        | No           | Player nationality. Defaults to Gambian.                                                                              |
| **biography**     | text        | No           | Player biography - background, career path, strengths. Editable at any time by admin.                                 |
| **description**   | text        | No           | Short player description for profile card. Editable at any time.                                                      |
| **photo_url**     | text        | No           | Player photo. Max 2 MB. JPEG or PNG.                                                                                  |
| **status**        | text        | Yes          | active \| inactive \| retired. Inactive/retired players hidden from active squad lists but historical data preserved. |
| **created_at**    | timestamp   | Yes          | Auto-set on creation.                                                                                                 |
| **updated_at**    | timestamp   | Yes          | Auto-updated by trigger.                                                                                              |

### **matches**

_One row per match - league fixtures, tournament group matches, and knockout matches all use this table._

| **Column**         | **Type**  | **Required** | **Notes / Constraints**                                                                                  |
| ------------------ | --------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| **id**             | uuid PK   | Yes          | gen_random_uuid().                                                                                       |
| **season_id**      | uuid FK   | Yes          | References seasons.id. ON DELETE CASCADE.                                                                |
| **tournament_id**  | uuid FK   | No           | References tournaments.id. Null for regular league fixtures.                                             |
| **group_id**       | uuid FK   | No           | References tournament_groups.id. Set for group-stage matches only.                                       |
| **round_id**       | uuid FK   | No           | References tournament_rounds.id. Set for knockout matches only.                                          |
| **home_team_id**   | uuid FK   | Yes          | References teams.id. Cannot equal away_team_id.                                                          |
| **away_team_id**   | uuid FK   | Yes          | References teams.id. Cannot equal home_team_id.                                                          |
| **scheduled_at**   | timestamp | No           | Kick-off date and time. Null = date TBC.                                                                 |
| **venue**          | text      | No           | Match venue name. Max 100 chars.                                                                         |
| **status**         | text      | Yes          | scheduled \| live \| completed \| postponed. Transitions enforced by business rules.                     |
| **home_score**     | integer   | No           | Final or current home score. Non-negative. Defaults to 0.                                                |
| **away_score**     | integer   | No           | Final or current away score. Non-negative. Defaults to 0.                                                |
| **home_penalties** | integer   | No           | Penalty shootout score for home team. Knockout matches only. Null otherwise.                             |
| **away_penalties** | integer   | No           | Penalty shootout score for away team. Knockout matches only. Null otherwise.                             |
| **stage**          | text      | No           | group \| round_of_16 \| quarter_final \| semi_final \| final \| third_place. Set for tournament matches. |
| **minute**         | integer   | No           | Current match minute. Live matches only. Updated by reporter tool.                                       |
| **referee**        | text      | No           | Name of the referee. Optional.                                                                           |
| **attendance**     | integer   | No           | Crowd attendance figure. Optional.                                                                       |
| **match_notes**    | text      | No           | Admin notes about the match - weather, incidents, postponement reasons.                                  |
| **created_at**     | timestamp | Yes          | Auto-set on creation.                                                                                    |
| **updated_at**     | timestamp | Yes          | Auto-updated by trigger.                                                                                 |

### **profiles**

_One row per authenticated user. Created automatically when a user is invited via Supabase Auth._

| **Column**        | **Type**  | **Required** | **Notes / Constraints**                                                                       |
| ----------------- | --------- | ------------ | --------------------------------------------------------------------------------------------- |
| **id**            | uuid PK   | Yes          | References auth.users.id. Created by trigger on_auth_user_created.                            |
| **role**          | text      | Yes          | fan \| content_editor \| reporter \| league_admin \| super_admin.                             |
| **league_id**     | uuid FK   | No           | Which league this user manages. Null for Super Admin and global Content Editors.              |
| **is_global**     | boolean   | Yes          | For Content Editors: if true, articles are platform-wide. Defaults to false.                  |
| **display_name**  | text      | No           | Public display name. Defaults to email prefix.                                                |
| **avatar_url**    | text      | No           | Profile photo URL.                                                                            |
| **permissions**   | jsonb     | No           | Per-user permission overrides. JSON object with boolean flags for each toggleable permission. |
| **status**        | text      | Yes          | active \| inactive. Inactive users cannot log in.                                             |
| **last_login_at** | timestamp | No           | Timestamp of most recent successful login.                                                    |
| **invited_by**    | uuid FK   | No           | References auth.users.id. Tracks which Super Admin created this account.                      |
| **created_at**    | timestamp | Yes          | Auto-set on creation.                                                                         |
| **updated_at**    | timestamp | Yes          | Auto-updated by trigger.                                                                      |

# **B.3 Tournament Tables (Phase 1)**

These tables support the Nawetans competition format with group stages and knockout rounds. They are created in Phase 1 alongside the core tables.

### **tournaments**

_One row per competition within a season. A season can have multiple tournaments._

| **Column**                  | **Type**    | **Required** | **Notes / Constraints**                                                                              |
| --------------------------- | ----------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| **id**                      | uuid PK     | Yes          | gen_random_uuid().                                                                                   |
| **season_id**               | uuid FK     | Yes          | References seasons.id. ON DELETE CASCADE.                                                            |
| **name**                    | text        | Yes          | Tournament name. e.g. Nawetans 2026 - Serrekunda West.                                               |
| **slug**                    | text UNIQUE | Yes          | Auto-generated. Immutable after first save.                                                          |
| **description**             | text        | No           | About this competition - format, participating wards, prize information, special rules.              |
| **history**                 | text        | No           | Historical record of this competition - past winners, notable matches, records.                      |
| **logo_url**                | text        | No           | Tournament logo or trophy image.                                                                     |
| **cover_image_url**         | text        | No           | Wide banner for the tournament profile page.                                                         |
| **format**                  | text        | Yes          | nawetans \| league \| cup \| friendly. Determines how fixtures are generated.                        |
| **status**                  | text        | Yes          | upcoming \| group_stage \| knockout \| completed. Controlled by admin actions.                       |
| **num_groups**              | integer     | No           | Number of groups in the group stage. Required for nawetans format.                                   |
| **teams_advance_per_group** | integer     | No           | How many teams from each group qualify for knockout. Required for nawetans.                          |
| **round_robin_type**        | text        | No           | single \| home_and_away. Determines if group fixtures are generated as single or double round-robin. |
| **start_date**              | date        | No           | Tournament start date.                                                                               |
| **end_date**                | date        | No           | Tournament end date.                                                                                 |
| **created_at**              | timestamp   | Yes          | Auto-set on creation.                                                                                |
| **updated_at**              | timestamp   | Yes          | Auto-updated by trigger.                                                                             |

### **tournament_groups**

_One row per group within a tournament's group stage._

| **Column**        | **Type**  | **Required** | **Notes / Constraints**                                   |
| ----------------- | --------- | ------------ | --------------------------------------------------------- |
| **id**            | uuid PK   | Yes          | gen_random_uuid().                                        |
| **tournament_id** | uuid FK   | Yes          | References tournaments.id. ON DELETE CASCADE.             |
| **name**          | text      | Yes          | Group label. e.g. Group A, Group B. Max 40 chars.         |
| **slug**          | text      | Yes          | URL-friendly. e.g. group-a. Unique within the tournament. |
| **description**   | text      | No           | Optional notes about this group.                          |
| **created_at**    | timestamp | Yes          | Auto-set on creation.                                     |

### **tournament_group_teams**

_Junction table assigning teams to groups. A team can only be in one group per tournament._

| **Column**     | **Type**  | **Required** | **Notes / Constraints**                                         |
| -------------- | --------- | ------------ | --------------------------------------------------------------- |
| **id**         | uuid PK   | Yes          | gen_random_uuid().                                              |
| **group_id**   | uuid FK   | Yes          | References tournament_groups.id. ON DELETE CASCADE.             |
| **team_id**    | uuid FK   | Yes          | References teams.id. ON DELETE CASCADE.                         |
| **seeding**    | integer   | No           | Optional seed position within the group for fixture generation. |
| **created_at** | timestamp | Yes          | Auto-set on creation.                                           |

### **tournament_rounds**

_One row per knockout round within a tournament._

| **Column**        | **Type**  | **Required** | **Notes / Constraints**                                             |
| ----------------- | --------- | ------------ | ------------------------------------------------------------------- |
| **id**            | uuid PK   | Yes          | gen_random_uuid().                                                  |
| **tournament_id** | uuid FK   | Yes          | References tournaments.id. ON DELETE CASCADE.                       |
| **name**          | text      | Yes          | Round name. e.g. Semi-Final, Final, Third Place Play-off.           |
| **stage**         | text      | Yes          | round_of_16 \| quarter_final \| semi_final \| final \| third_place. |
| **round_number**  | integer   | Yes          | Ordering. 1 = earliest round. Used for bracket display ordering.    |
| **created_at**    | timestamp | Yes          | Auto-set on creation.                                               |

# **B.4 Phase 2 Extended Tables**

### **match_events**

_One row per event within a match - goals, cards, substitutions, penalties._

| **Column**                | **Type**  | **Required** | **Notes / Constraints**                                                                                                                            |
| ------------------------- | --------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **id**                    | uuid PK   | Yes          | gen_random_uuid().                                                                                                                                 |
| **match_id**              | uuid FK   | Yes          | References matches.id. ON DELETE CASCADE.                                                                                                          |
| **player_id**             | uuid FK   | No           | References players.id. SET NULL on player delete. Required for most event types.                                                                   |
| **team_id**               | uuid FK   | Yes          | References teams.id. Which team the event belongs to.                                                                                              |
| **event_type**            | text      | Yes          | goal \| own_goal \| assist \| yellow_card \| red_card \| second_yellow \| substitution_in \| substitution_out \| penalty_scored \| penalty_missed. |
| **minute**                | integer   | Yes          | Minute the event occurred. 1-120. Injury time stored as e.g. 90.                                                                                   |
| **minute_display**        | text      | No           | Display string. e.g. 90+3 for injury time events.                                                                                                  |
| **substituted_player_id** | uuid FK   | No           | For substitution events: the player coming on or going off. References players.id.                                                                 |
| **notes**                 | text      | No           | Optional admin notes about the event. Not shown publicly.                                                                                          |
| **recorded_by**           | uuid FK   | No           | References auth.users.id. Which reporter or admin recorded this event.                                                                             |
| **created_at**            | timestamp | Yes          | Auto-set on creation.                                                                                                                              |

### **articles**

_One row per news article or match report._

| **Column**          | **Type**    | **Required** | **Notes / Constraints**                                                                   |
| ------------------- | ----------- | ------------ | ----------------------------------------------------------------------------------------- |
| **id**              | uuid PK     | Yes          | gen_random_uuid().                                                                        |
| **league_id**       | uuid FK     | No           | References leagues.id. Null for platform-wide articles by global Content Editors.         |
| **author_id**       | uuid FK     | Yes          | References auth.users.id. Immutable after creation.                                       |
| **tournament_id**   | uuid FK     | No           | References tournaments.id. Optional - links article to a specific competition.            |
| **match_id**        | uuid FK     | No           | References matches.id. Optional - links article to a specific match.                      |
| **title**           | text        | Yes          | Article headline. Max 200 chars.                                                          |
| **slug**            | text UNIQUE | Yes          | Auto-generated from title. Globally unique. Immutable after publication.                  |
| **excerpt**         | text        | No           | Short summary shown in article cards. Max 300 chars. Auto-generated from body if not set. |
| **body**            | jsonb       | Yes          | Rich text content in Tiptap JSON format.                                                  |
| **cover_image_url** | text        | No           | Article header image. Max 5 MB. JPEG, PNG, or WebP.                                       |
| **category**        | text        | No           | match_report \| transfer_news \| injury_update \| opinion \| general.                     |
| **status**          | text        | Yes          | draft \| published \| archived. Defaults to draft.                                        |
| **published_at**    | timestamp   | No           | Set when article is published. Null = draft.                                              |
| **views**           | integer     | Yes          | Page view count. Incremented on each public page load. Defaults to 0.                     |
| **created_at**      | timestamp   | Yes          | Auto-set on creation.                                                                     |
| **updated_at**      | timestamp   | Yes          | Auto-updated by trigger.                                                                  |

### **article_tags**

_Junction table linking articles to tags._

| **Column**     | **Type** | **Required** | **Notes / Constraints**                                    |
| -------------- | -------- | ------------ | ---------------------------------------------------------- |
| **article_id** | uuid FK  | Yes          | References articles.id. ON DELETE CASCADE.                 |
| **tag**        | text     | Yes          | Tag string. e.g. nawetans, banjul, transfer. Max 40 chars. |

### **player_contracts**

_Records a player's team membership over time. One row per team the player has been registered with._

| **Column**     | **Type**  | **Required** | **Notes / Constraints**                                            |
| -------------- | --------- | ------------ | ------------------------------------------------------------------ |
| **id**         | uuid PK   | Yes          | gen_random_uuid().                                                 |
| **player_id**  | uuid FK   | Yes          | References players.id. ON DELETE CASCADE.                          |
| **team_id**    | uuid FK   | Yes          | References teams.id. ON DELETE CASCADE.                            |
| **season_id**  | uuid FK   | No           | References seasons.id. Optional - the season they were registered. |
| **start_date** | date      | Yes          | When the player joined this team.                                  |
| **end_date**   | date      | No           | When the player left. Null = currently registered.                 |
| **notes**      | text      | No           | Loan, transfer fee paid, other notes. Not shown publicly.          |
| **created_at** | timestamp | Yes          | Auto-set on creation.                                              |

### **team_seasons**

_Tracks which teams participated in which seasons. Enables season-scoped queries._

| **Column**     | **Type**  | **Required** | **Notes / Constraints**                   |
| -------------- | --------- | ------------ | ----------------------------------------- |
| **id**         | uuid PK   | Yes          | gen_random_uuid().                        |
| **team_id**    | uuid FK   | Yes          | References teams.id. ON DELETE CASCADE.   |
| **season_id**  | uuid FK   | Yes          | References seasons.id. ON DELETE CASCADE. |
| **created_at** | timestamp | Yes          | Auto-set on creation.                     |

### **match_audit**

_Immutable log of all result corrections made by Super Admin._

| **Column**         | **Type**  | **Required** | **Notes / Constraints**                        |
| ------------------ | --------- | ------------ | ---------------------------------------------- |
| **id**             | uuid PK   | Yes          | gen_random_uuid().                             |
| **match_id**       | uuid FK   | Yes          | References matches.id.                         |
| **changed_by**     | uuid FK   | Yes          | References auth.users.id. Must be Super Admin. |
| **old_home_score** | integer   | Yes          | Score before the correction.                   |
| **old_away_score** | integer   | Yes          | Score before the correction.                   |
| **new_home_score** | integer   | Yes          | Score after the correction.                    |
| **new_away_score** | integer   | Yes          | Score after the correction.                    |
| **reason**         | text      | No           | Optional reason entered by Super Admin.        |
| **changed_at**     | timestamp | Yes          | Auto-set on creation. Immutable.               |

# **B.5 Phase 3 Live & Revenue Tables**

### **ads**

_One row per advertisement placement managed by Super Admin._

| **Column**          | **Type**  | **Required** | **Notes / Constraints**                                                    |
| ------------------- | --------- | ------------ | -------------------------------------------------------------------------- |
| **id**              | uuid PK   | Yes          | gen_random_uuid().                                                         |
| **title**           | text      | Yes          | Internal name for the ad. Not shown publicly.                              |
| **image_url**       | text      | Yes          | Ad image. Stored in Supabase Storage.                                      |
| **link_url**        | text      | Yes          | URL the ad links to when tapped.                                           |
| **advertiser_name** | text      | Yes          | Name of the business paying for the ad.                                    |
| **position**        | text      | Yes          | header_banner \| sidebar \| footer \| between_results \| match_page.       |
| **league_id**       | uuid FK   | No           | If set, ad only appears on pages for this league. Null = all leagues.      |
| **start_date**      | date      | Yes          | First day the ad is served.                                                |
| **end_date**        | date      | Yes          | Last day the ad is served. Ad stops serving after this date automatically. |
| **price_gmd**       | integer   | No           | Amount charged for this placement in Gambian Dalasi. Internal reference.   |
| **impressions**     | integer   | Yes          | Total times ad has been displayed. Incremented server-side. Defaults to 0. |
| **clicks**          | integer   | Yes          | Total times ad has been tapped. Defaults to 0.                             |
| **status**          | text      | Yes          | active \| paused \| expired \| archived.                                   |
| **created_at**      | timestamp | Yes          | Auto-set on creation.                                                      |
| **updated_at**      | timestamp | Yes          | Auto-updated by trigger.                                                   |

### **subscriptions**

_League subscription billing records._

| **Column**                   | **Type**  | **Required** | **Notes / Constraints**                                  |
| ---------------------------- | --------- | ------------ | -------------------------------------------------------- |
| **id**                       | uuid PK   | Yes          | gen_random_uuid().                                       |
| **league_id**                | uuid FK   | Yes          | References leagues.id. ON DELETE CASCADE.                |
| **plan**                     | text      | Yes          | basic \| standard \| premium. Determines feature access. |
| **price_gmd**                | integer   | Yes          | Monthly price in Gambian Dalasi.                         |
| **billing_cycle**            | text      | Yes          | monthly \| quarterly \| annual.                          |
| **status**                   | text      | Yes          | trial \| active \| past_due \| cancelled.                |
| **trial_ends_at**            | timestamp | No           | When the free trial ends.                                |
| **current_period_start**     | date      | No           | Start of current billing period.                         |
| **current_period_end**       | date      | No           | End of current billing period.                           |
| **paystack_customer_id**     | text      | No           | Paystack customer reference for automated billing.       |
| **paystack_subscription_id** | text      | No           | Paystack subscription reference.                         |
| **created_at**               | timestamp | Yes          | Auto-set on creation.                                    |
| **updated_at**               | timestamp | Yes          | Auto-updated by trigger.                                 |

### **invoices**

_Manual invoice records for Wave invoicing and direct billing._

| **Column**          | **Type**  | **Required** | **Notes / Constraints**                                           |
| ------------------- | --------- | ------------ | ----------------------------------------------------------------- |
| **id**              | uuid PK   | Yes          | gen_random_uuid().                                                |
| **league_id**       | uuid FK   | No           | References leagues.id. Null for ad invoices not tied to a league. |
| **ad_id**           | uuid FK   | No           | References ads.id. Set for advertising invoices.                  |
| **amount_gmd**      | integer   | Yes          | Invoice amount in Gambian Dalasi.                                 |
| **description**     | text      | Yes          | What this invoice is for. e.g. Monthly subscription - June 2026.  |
| **status**          | text      | Yes          | draft \| sent \| paid \| overdue \| cancelled.                    |
| **issued_at**       | date      | Yes          | When the invoice was issued.                                      |
| **due_at**          | date      | Yes          | Payment due date.                                                 |
| **paid_at**         | date      | No           | When payment was received. Null = unpaid.                         |
| **wave_invoice_id** | text      | No           | Wave App reference number.                                        |
| **notes**           | text      | No           | Internal notes.                                                   |
| **created_at**      | timestamp | Yes          | Auto-set on creation.                                             |

### **push_subscriptions**

_Web Push API subscriptions for fan notifications._

| **Column**            | **Type**    | **Required** | **Notes / Constraints**                                                       |
| --------------------- | ----------- | ------------ | ----------------------------------------------------------------------------- |
| **id**                | uuid PK     | Yes          | gen_random_uuid().                                                            |
| **user_id**           | uuid FK     | No           | References auth.users.id. Null for anonymous fan subscriptions.               |
| **endpoint**          | text UNIQUE | Yes          | Web Push endpoint URL provided by the browser.                                |
| **p256dh**            | text        | Yes          | Encryption key.                                                               |
| **auth_key**          | text        | Yes          | Auth secret.                                                                  |
| **followed_team_ids** | uuid\[\]    | No           | Array of team IDs the subscriber follows. Notifications sent for these teams. |
| **created_at**        | timestamp   | Yes          | Auto-set on creation.                                                         |

### **live_sessions**

_Tracks the lifecycle of a live match session._

| **Column**         | **Type**       | **Required** | **Notes / Constraints**                                            |
| ------------------ | -------------- | ------------ | ------------------------------------------------------------------ |
| **id**             | uuid PK        | Yes          | gen_random_uuid().                                                 |
| **match_id**       | uuid FK UNIQUE | Yes          | References matches.id. One session per match.                      |
| **started_by**     | uuid FK        | Yes          | References auth.users.id. Admin or Reporter who started the match. |
| **started_at**     | timestamp      | Yes          | When the match was set to live.                                    |
| **half_time_at**   | timestamp      | No           | When half time was called.                                         |
| **second_half_at** | timestamp      | No           | When second half started.                                          |
| **ended_at**       | timestamp      | No           | When the match was set to completed.                               |
| **ended_by**       | uuid FK        | No           | References auth.users.id. Who ended the match.                     |
| **created_at**     | timestamp      | Yes          | Auto-set on creation.                                              |

# **B.6 Phase 4 Fan, Analytics & API Tables**

### **fan_profiles**

_Extended profile for fan accounts (Phase 4). Created when a fan registers._

| **Column**       | **Type**  | **Required** | **Notes / Constraints**    |
| ---------------- | --------- | ------------ | -------------------------- |
| **id**           | uuid PK   | Yes          | References auth.users.id.  |
| **display_name** | text      | Yes          | Fan's chosen display name. |
| **avatar_url**   | text      | No           | Profile photo.             |
| **bio**          | text      | No           | Short fan bio.             |
| **created_at**   | timestamp | Yes          | Auto-set on creation.      |

### **follows**

_Tracks which fans follow which teams._

| **Column**     | **Type**  | **Required** | **Notes / Constraints**                      |
| -------------- | --------- | ------------ | -------------------------------------------- |
| **id**         | uuid PK   | Yes          | gen_random_uuid().                           |
| **fan_id**     | uuid FK   | Yes          | References auth.users.id. ON DELETE CASCADE. |
| **team_id**    | uuid FK   | Yes          | References teams.id. ON DELETE CASCADE.      |
| **created_at** | timestamp | Yes          | Auto-set on creation.                        |

### **comments**

_Fan comments on articles. Moderated by League Admin and Super Admin._

| **Column**     | **Type**  | **Required** | **Notes / Constraints**                            |
| -------------- | --------- | ------------ | -------------------------------------------------- |
| **id**         | uuid PK   | Yes          | gen_random_uuid().                                 |
| **article_id** | uuid FK   | Yes          | References articles.id. ON DELETE CASCADE.         |
| **author_id**  | uuid FK   | Yes          | References auth.users.id.                          |
| **body**       | text      | Yes          | Comment text. Max 1000 chars.                      |
| **status**     | text      | Yes          | visible \| hidden \| flagged. Defaults to visible. |
| **flagged_at** | timestamp | No           | When the comment was flagged for review.           |
| **created_at** | timestamp | Yes          | Auto-set on creation.                              |

### **api_keys**

_API keys issued to developers for the public API (Phase 4)._

| **Column**         | **Type**    | **Required** | **Notes / Constraints**                                             |
| ------------------ | ----------- | ------------ | ------------------------------------------------------------------- |
| **id**             | uuid PK     | Yes          | gen_random_uuid().                                                  |
| **user_id**        | uuid FK     | Yes          | References auth.users.id. Owner of the key.                         |
| **key_hash**       | text UNIQUE | Yes          | SHA-256 hash of the API key. The raw key is shown only at creation. |
| **name**           | text        | Yes          | Friendly name. e.g. My App, Journalist Dashboard.                   |
| **tier**           | text        | Yes          | free \| paid. Determines rate limits.                               |
| **requests_today** | integer     | Yes          | Counter reset daily. Enforced by Upstash Redis.                     |
| **status**         | text        | Yes          | active \| revoked.                                                  |
| **last_used_at**   | timestamp   | No           | Timestamp of most recent API request.                               |
| **created_at**     | timestamp   | Yes          | Auto-set on creation.                                               |

### **coaches**

_Coaching staff and managers linked to teams._

| **Column**      | **Type**  | **Required** | **Notes / Constraints**                                                      |
| --------------- | --------- | ------------ | ---------------------------------------------------------------------------- |
| **id**          | uuid PK   | Yes          | gen_random_uuid().                                                           |
| **team_id**     | uuid FK   | Yes          | References teams.id. ON DELETE CASCADE.                                      |
| **name**        | text      | Yes          | Full name. Max 100 chars.                                                    |
| **role**        | text      | Yes          | head_coach \| assistant_coach \| goalkeeper_coach \| fitness_coach \| other. |
| **biography**   | text      | No           | Coach background and career history. Editable at any time.                   |
| **photo_url**   | text      | No           | Coach photo.                                                                 |
| **joined_date** | date      | No           | When they joined this team.                                                  |
| **status**      | text      | Yes          | active \| former. Former coaches remain visible in history.                  |
| **created_at**  | timestamp | Yes          | Auto-set on creation.                                                        |

### **video_clips**

_Match highlight video records linked to Cloudflare R2 storage._

| **Column**           | **Type**  | **Required** | **Notes / Constraints**                                  |
| -------------------- | --------- | ------------ | -------------------------------------------------------- |
| **id**               | uuid PK   | Yes          | gen_random_uuid().                                       |
| **match_id**         | uuid FK   | No           | References matches.id. Null for general highlight clips. |
| **league_id**        | uuid FK   | No           | References leagues.id.                                   |
| **title**            | text      | Yes          | Clip title. e.g. Goal of the Week - Saidou Jallow.       |
| **description**      | text      | No           | Clip description.                                        |
| **video_url**        | text      | Yes          | Cloudflare R2 storage URL.                               |
| **thumbnail_url**    | text      | No           | Preview image URL.                                       |
| **duration_seconds** | integer   | No           | Clip duration for display purposes.                      |
| **status**           | text      | Yes          | processing \| published \| archived.                     |
| **created_at**       | timestamp | Yes          | Auto-set on creation.                                    |

# **B.7 Row Level Security Policies**

RLS is enabled on every table. The following policies govern data access. Unauthenticated users (fans) can only read data explicitly made public.

| **Table**                                                                                                                | **Operation**  | **Policy**                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **leagues, seasons, teams, players, matches, tournaments, tournament_groups, tournament_group_teams, tournament_rounds** | SELECT         | Allow for all (public read). No authentication required.                                                                                       |
| **articles**                                                                                                             | SELECT         | Allow if status = published, for all. Drafts and archived articles only visible to authenticated users with matching league_id or Super Admin. |
| **profiles**                                                                                                             | SELECT         | Users can only read their own profile. Super Admin can read all profiles.                                                                      |
| **profiles**                                                                                                             | UPDATE         | Users can only update their own profile (display_name, avatar_url). Role, permissions, league_id only updatable by Super Admin.                |
| **matches**                                                                                                              | INSERT, UPDATE | Authenticated users with league_admin or super_admin role and matching league_id.                                                              |
| **teams, players**                                                                                                       | INSERT, UPDATE | Authenticated users with league_admin or super_admin role and matching league_id.                                                              |
| **match_events**                                                                                                         | INSERT, DELETE | Authenticated users with reporter, league_admin, or super_admin role and matching league_id.                                                   |
| **articles**                                                                                                             | INSERT, UPDATE | Authenticated users with content_editor, league_admin, or super_admin role. Content Editors scoped to their league_id unless is_global = true. |
| **ads, subscriptions, invoices**                                                                                         | ALL            | Super Admin only.                                                                                                                              |
| **match_audit**                                                                                                          | INSERT         | Super Admin only. No UPDATE or DELETE - audit records are immutable.                                                                           |
| **follows, comments, fan_profiles**                                                                                      | ALL            | Authenticated fan users for their own records. Super Admin for all.                                                                            |
| **api_keys**                                                                                                             | SELECT, UPDATE | Users can read and manage their own API keys. Super Admin can read all.                                                                        |

## **B.7.1 Key Database Indexes**

The following indexes are required for query performance on large datasets:

- matches(season_id) - standings and fixture queries filter by season.
- matches(tournament_id) - tournament bracket and group queries.
- matches(home_team_id), matches(away_team_id) - team-specific match lookups.
- matches(status) - separating scheduled, live, and completed matches.
- matches(scheduled_at) - ordering fixtures by date.
- players(team_id) - squad listing queries.
- match_events(match_id) - all events for a match (timeline and stats).
- match_events(player_id) - player statistics queries.
- articles(league_id, published_at) - news feed queries.
- articles(status) - filtering published vs draft.
- follows(fan_id) - personalised feed queries.
- ads(status, start_date, end_date) - serving active ads.

**PART C**

**Architecture & Project Structure**

_Folder layout, page routes, and component organisation_

# **C.1 Folder Structure**

The Next.js 16 project uses the App Router. All code lives in src/. The folder structure is designed to scale cleanly through all four phases without restructuring.

| **Path**                       | **What lives here**                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| **src/app/(public)/**          | All public-facing pages - home, standings, fixtures, teams, players, tournaments, news, stats |
| **src/app/admin/**             | All admin pages - dashboard, matches, teams, players, tournaments, users, ads, news           |
| **src/app/reporter/**          | Mobile reporter tool pages for live match event entry                                         |
| **src/app/api/**               | API routes - used by admin forms and public API (Phase 4)                                     |
| **src/components/ui/**         | Reusable base components - Button, Card, Table, Input, Badge, Modal, Toast                    |
| **src/components/layout/**     | Nav, Footer, Breadcrumb, AdminSidebar, MobileMenu                                             |
| **src/components/league/**     | StandingsTable, FixtureCard, ResultRow, LeagueHeader                                          |
| **src/components/tournament/** | GroupTable, KnockoutBracket, RoundCard, BracketSlot                                           |
| **src/components/match/**      | LiveTimeline, ScoreDisplay, EventFeed, MatchCard                                              |
| **src/components/team/**       | TeamCard, SquadList, FormBadges, TeamHeader, TeamProfile                                      |
| **src/components/player/**     | PlayerCard, StatBar, CareerHistory, PlayerHeader, PlayerProfile                               |
| **src/components/article/**    | ArticleCard, ArticleBody, ArticleEditor (Tiptap), CategoryBadge                               |
| **src/components/ads/**        | BannerAd, SidebarAd, AdLabel                                                                  |
| **src/components/charts/**     | FormChart, GoalsChart, SeasonComparison, LeaderboardRow (Phase 4)                             |
| **src/lib/supabase/**          | createClient (browser), createServerClient (server), createAdminClient                        |
| **src/lib/queries/**           | All database query functions - getStandings, getGroupStandings, getTeamBySlug, etc.           |
| **src/lib/standings/**         | Standings calculation - including group head-to-head tiebreaker logic                         |
| **src/lib/notifications/**     | Web Push helper functions (Phase 3)                                                           |
| **src/lib/api/**               | Public API auth, rate limiting, response formatting (Phase 4)                                 |
| **src/types/**                 | TypeScript types for all database tables - auto-generated from Supabase schema                |
| **src/middleware.ts**          | Protects /admin/\* and /reporter/\* routes - runs before every request                        |
| **public/**                    | Static assets - placeholder logos, icons, favicon, manifest.json                              |
| **.env.local**                 | Secret API keys - NEVER committed to GitHub                                                   |

# **C.2 Complete Page Route Reference**

Every page across all four phases. Phase 1 pages are built first; Phase 2-4 pages are added without changing Phase 1 routes.

| **Route**                                  | **Phase** | **Access**     | **Description**                                                          |
| ------------------------------------------ | --------- | -------------- | ------------------------------------------------------------------------ |
| **/**                                      | 1         | Public         | Home - latest results, upcoming fixtures, news headline                  |
| **/standings**                             | 1         | Public         | Full league standings table for active season                            |
| **/fixtures**                              | 1         | Public         | Upcoming fixtures list with date, time, venue                            |
| **/results**                               | 1         | Public         | Completed results with scores                                            |
| **/teams**                                 | 1         | Public         | All teams in the league with badges and home ground                      |
| **/teams/\[slug\]**                        | 1         | Public         | Full team profile - squad, form, fixtures, results, description, history |
| **/players/\[id\]**                        | 1         | Public         | Player profile - position, stats, biography, career history              |
| **/leagues/\[slug\]**                      | 1         | Public         | League profile - description, history, current standings, recent results |
| **/tournaments/\[slug\]**                  | 1         | Public         | Tournament profile - description, history, format, status                |
| **/tournaments/\[slug\]/groups**           | 1         | Public         | All group standings for a Nawetans tournament                            |
| **/tournaments/\[slug\]/groups/\[group\]** | 1         | Public         | Single group standings and fixtures                                      |
| **/tournaments/\[slug\]/bracket**          | 1         | Public         | Visual knockout bracket                                                  |
| **/admin/login**                           | 1         | Admin only     | Email and password login form                                            |
| **/admin**                                 | 1         | Admin only     | Dashboard overview - summary stats, recent results, upcoming fixtures    |
| **/admin/matches**                         | 1         | Admin only     | All matches list grouped by status                                       |
| **/admin/matches/\[id\]**                  | 1         | Admin only     | Enter or correct match result                                            |
| **/admin/fixtures/new**                    | 1         | Admin only     | Schedule a new fixture                                                   |
| **/admin/teams**                           | 1         | Admin only     | Manage teams - list, add, edit, deactivate                               |
| **/admin/teams/\[id\]**                    | 1         | Admin only     | Edit team details including description and history                      |
| **/admin/players**                         | 1         | Admin only     | Manage players - list, add, edit, transfer                               |
| **/admin/players/\[id\]**                  | 1         | Admin only     | Edit player details including biography                                  |
| **/admin/tournaments**                     | 1         | Admin only     | Manage tournaments - list and create                                     |
| **/admin/tournaments/new**                 | 1         | Admin only     | Create a new tournament                                                  |
| **/admin/tournaments/\[id\]**              | 1         | Admin only     | Edit tournament details                                                  |
| **/admin/tournaments/\[id\]/groups**       | 1         | Admin only     | Create groups, assign teams, generate fixtures                           |
| **/admin/tournaments/\[id\]/bracket**      | 1         | Admin only     | Manage knockout bracket, advance winners                                 |
| **/admin/users**                           | 1         | Super Admin    | Manage all platform users - invite, assign roles, toggle permissions     |
| **/admin/leagues**                         | 1         | Super Admin    | Manage all leagues on the platform                                       |
| **/admin/leagues/\[id\]**                  | 1         | Super Admin    | Edit league details including description and history                    |
| **/news**                                  | 2         | Public         | News home - latest articles across leagues                               |
| **/news/\[slug\]**                         | 2         | Public         | Full article page with photos                                            |
| **/leagues**                               | 2         | Public         | All leagues directory                                                    |
| **/stats/top-scorers**                     | 2         | Public         | Goal leaderboard per league and combined                                 |
| **/stats/top-assists**                     | 2         | Public         | Assist leaderboard                                                       |
| **/stats/discipline**                      | 2         | Public         | Yellow and red card leaderboard                                          |
| **/search**                                | 2         | Public         | Search results across players, teams, articles                           |
| **/admin/news**                            | 2         | Admin + Editor | Article management list                                                  |
| **/admin/news/new**                        | 2         | Admin + Editor | Rich text article editor                                                 |
| **/admin/news/\[id\]**                     | 2         | Admin + Editor | Edit existing article                                                    |
| **/admin/events/\[matchId\]**              | 2         | Admin          | Enter match events for a completed match                                 |
| **/match/\[id\]**                          | 3         | Public         | Live match page - real-time score and event timeline                     |
| **/reporter/\[matchId\]**                  | 3         | Reporter only  | Mobile reporter event entry tool                                         |
| **/notifications**                         | 3         | Public         | Manage push notification preferences                                     |
| **/admin/live/\[matchId\]**                | 3         | Admin          | Live match control - start, half time, end                               |
| **/admin/ads**                             | 3         | Super Admin    | Upload and manage advertisement placements                               |
| **/admin/billing**                         | 3         | Super Admin    | League subscriptions and invoicing                                       |
| **/feed**                                  | 4         | Fan login      | Personalised news and results feed from followed teams                   |
| **/analytics/player/\[id\]**               | 4         | Public         | Player analytics charts - form, goals per game, comparisons              |
| **/analytics/team/\[id\]**                 | 4         | Public         | Team analytics - form curve, goal patterns, season progress              |
| **/settings**                              | 4         | Fan login      | Account settings - follows, notifications, profile                       |
| **/api/v1/\***                             | 4         | API key        | Public JSON REST API endpoints for all platform data                     |
| **/admin/media**                           | 4         | Admin          | Upload and manage video highlights and galleries                         |

**PART D**

**Revenue Model & Business Plan**

_How the platform generates sustainable income from day one_

# **D.1 Revenue Philosophy**

The platform is free for fans and low-cost for leagues during Phase 1 to drive adoption. Revenue begins informally in Phase 2 through relationship-based ad sales, becomes structured in Phase 3 with Paystack integration, and scales in Phase 4 through the public API and Android app.

All pricing is in Gambian Dalasi (GMD). Prices are set to be accessible to local businesses and league committees while covering platform operating costs.

# **D.2 Revenue Streams**

## **D.2.1 Local Business Advertising**

Banner and card advertisements sold directly to Gambian businesses by the Tech Palz project lead. No third-party ad network is used in Phase 3 - all ads are managed directly in the platform admin.

| **Ad position**             | **Price (GMD/month)** | **Visibility**           | **Notes**                                                             |
| --------------------------- | --------------------- | ------------------------ | --------------------------------------------------------------------- |
| **Header banner**           | D1,500-D3,000         | All pages                | Full-width banner below navigation. Highest visibility.               |
| **Between-results card**    | D800-D1,500           | Results & fixtures pages | Sponsored card injected between match results. Natural placement.     |
| **Match page banner**       | D500-D1,000           | Live match pages only    | High traffic during live matches. Premium for live events.            |
| **Footer banner**           | D300-D600             | All pages                | Lower visibility. Good for brand awareness campaigns.                 |
| **League-specific banner**  | D400-D800             | One league's pages only  | Targeted to fans of a specific league. Good for local businesses.     |
| **Tournament sponsor slot** | D2,000-D5,000         | Tournament pages + home  | Named tournament sponsor. Logo on all tournament pages and home page. |

## **D.2.2 League Subscription Fees**

Leagues pay a monthly subscription to be managed on the platform. The free trial period builds trust before payment begins. Fees are introduced informally in Phase 2 and automated via Paystack in Phase 3.

| **Plan**     | **Price (GMD/month)** | **Leagues/season**     | **Includes**                                                                                              |
| ------------ | --------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------- |
| **Basic**    | D300                  | Up to 1 active league  | Standings, fixtures, results, team and player pages. Up to 20 teams.                                      |
| **Standard** | D600                  | Up to 3 active leagues | All Basic features + tournament support (Nawetans), news articles, player statistics, 3 admin accounts.   |
| **Premium**  | D1,200                | Unlimited leagues      | All Standard features + live scores, reporter tool, advanced stats, 10 admin accounts, dedicated support. |

## **D.2.3 Tournament Hosting Fees**

Ward associations and district sports committees pay a one-time fee to have their Nawetans competition fully managed on the platform - group draws, fixtures, results, bracket, and public profile.

| **Tournament size**         | **Fee (GMD)** | **Includes**                                                                                  |
| --------------------------- | ------------- | --------------------------------------------------------------------------------------------- |
| **Up to 8 teams**           | D500          | Group stage + final. Up to 2 groups. Full public tournament page.                             |
| **9-16 teams**              | D1,000        | Group stage + knockout from Round of 16. Full bracket. Tournament page with history.          |
| **17-32 teams**             | D2,000        | Full Nawetans format. Multiple groups. Complete knockout bracket. Premium tournament profile. |
| **Custom / district level** | D3,000+       | Custom format, multiple venues, extended history page, tournament sponsor slot included.      |

## **D.2.4 Featured Team Pages**

Teams pay for an enhanced profile featuring their sponsor's logo, a highlighted profile in the teams list, and a premium badge on their team page.

| **Feature**                   | **Price (GMD/month)** | **Description**                                                              |
| ----------------------------- | --------------------- | ---------------------------------------------------------------------------- |
| **Sponsor logo on team page** | D200                  | Club sponsor's logo displayed prominently on the team's public profile page. |
| **Featured listing**          | D300                  | Team card appears first in the teams list with a Featured badge.             |
| **Team bundle**               | D400                  | Both above features combined at a discount.                                  |

## **D.2.5 Public API Access (Phase 4)**

Developers, journalists, and the Gambia Football Federation can query live data via a documented REST API. Two tiers are offered:

| **Tier** | **Price (GMD/month)** | **Rate limit**      | **Includes**                                                                                                      |
| -------- | --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Free** | D0                    | 100 requests/day    | Read-only access to public data - standings, fixtures, results, team info. For hobbyists and journalists.         |
| **Paid** | D500                  | 10,000 requests/day | All public endpoints. Webhook support for live score events. Priority response. For developers and organisations. |

## **D.2.6 SMS Match Alerts (Phase 3)**

Fans without smartphones can pay for SMS notifications when their team scores or a match starts. Delivered via partnership with a local Gambian SMS gateway provider.

- Price: D10-D20 per month per fan.
- Delivered via local SMS gateway API. Tech Palz partners with a provider at bulk SMS rates.
- Fan opts in by texting a code to a short number. Their phone number is stored against their followed team.

# **D.3 Billing & Invoicing**

Phase 3 uses Paystack for automated card and mobile money payments. Until Paystack is integrated, all billing is manual using Wave App (free invoicing tool).

- Wave App: Free. Super Admin creates invoices manually and sends them by email or WhatsApp. Payment confirmed manually.
- Paystack: Integrated in Phase 3. League Admins receive a payment link. Subscriptions auto-renew monthly. Failed payments trigger a 7-day grace period before the account is downgraded.
- All invoice records are stored in the invoices table regardless of payment method.
- Super Admin can view all invoices and subscription statuses in /admin/billing.

# **D.4 Revenue Projections**

Conservative projections based on 3 active leagues, 2 tournaments, and 10 advertising clients in the first year:

| **Stream**           | **Monthly (GMD)** | **Annual (GMD)** | **Assumptions**                                                      |
| -------------------- | ----------------- | ---------------- | -------------------------------------------------------------------- |
| League subscriptions | D1,800            | D21,600          | 3 leagues on Standard plan at D600/month.                            |
| Tournament hosting   | D3,000            | D6,000           | 2 Nawetans per year at D1,500 average.                               |
| Local advertising    | D8,000            | D96,000          | 6 banner ads at average D1,000/month + 4 card ads at D500/month.     |
| Featured teams       | D1,200            | D14,400          | 4 teams on bundle plan at D300/month.                                |
| API access (Phase 4) | D1,500            | D18,000          | 3 paid API clients at D500/month.                                    |
| **TOTAL**            | **D15,500**       | **D156,000**     | Conservative. Grows significantly with more leagues and tournaments. |

**PART E**

**Risks, Mitigations & Next Steps**

_What could go wrong and what to do about it_

# **E.1 Risk Register**

| **Risk**                                         | **Likelihood** | **Impact** | **Mitigation**                                                                                                                                             |
| ------------------------------------------------ | -------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pilot league does not commit**                 | Medium         | High       | Demonstrate a live demo with sample data before requesting commitment. Offer free trial for first 3 months. Have a second league lined up as backup.       |
| **Team members lose motivation or leave**        | Medium         | High       | Weekly standups. All code on GitHub - no single person owns a feature. Document every major function. Celebrate every small launch.                        |
| **Low internet speed affects live features**     | High           | Medium     | Supabase Realtime sends only diffs, not full pages. Reporter tool is optimised for 2G/3G. Graceful degradation if realtime fails: show last known score.   |
| **Data loss or corruption**                      | Low            | High       | Supabase automatic daily backups. Enable point-in-time recovery before Phase 2. Never hard-delete match records.                                           |
| **No paying customers by Phase 3**               | Medium         | Medium     | Sell ad space informally in Phase 2. Build relationships with local businesses early. The Nawetans format creates strong urgency for committee adoption.   |
| **Competition from a rival platform**            | Low            | Medium     | Move fast in Phase 1. Being first with real leagues and the Nawetans format is a strong moat. No current platform serves the Gambian market.               |
| **Nawetans format complexity**                   | Medium         | Medium     | Tournament tables are designed in Phase 1 DB schema. Implementation guide covers full setup step by step. Tested with sample data.                         |
| **Supabase free tier limits reached**            | Medium         | Low        | Free tier: 50,000 rows, 500 MB DB. With 10 leagues and 3 seasons, this is unlikely before Phase 3. Monitor usage. Upgrade to Pro (\$25/month) when needed. |
| **Browser push notification opt-out rates high** | High           | Low        | Push notifications are opt-in only. SMS alerts provide an alternative for non-smartphone users. Focus on quality over quantity in notifications.           |
| **Paystack payment failures in Gambia**          | Medium         | Medium     | Wave invoicing as parallel manual backup. Accept cash payment and mark invoices manually as paid. Direct bank transfer as alternative.                     |

# **E.2 Immediate Next Steps**

Before any code is written, these actions must happen:

- Create the GitHub repository (gambia-sports). Add all 7 team members. Set up branch protection on main.
- Create free accounts on Supabase and Vercel. Purchase a .com or .gm domain name.
- Project lead visits the two pilot league leads with a printed version of this document and confirms a signed partner.
- Frontend team runs npx create-next-app@latest (scaffolds Next.js 16). Push skeleton project to GitHub.
- Backend team creates all Phase 1 tables in Supabase: leagues, seasons, teams, players, matches, tournaments, tournament_groups, tournament_group_teams, tournament_rounds, profiles.
- Super Admin account created via Supabase dashboard invite.
- Sample data loaded: one league, one season, 8 teams, 80 players, 10 completed matches.
- Verify Vercel deployment pipeline: push to GitHub, confirm live URL updates within 2 minutes.

**Rule for all phases**

Never throw away working code to add a new feature. Always build on top. The blueprint is designed so that every Phase 1 table, component, and query is still used in Phase 4. Adding a column to a table is always better than creating a new one.

_Tech Palz - Gambia Sports Platform | Product Blueprint v2.0 | Document 1 of 2 | May 2026_
