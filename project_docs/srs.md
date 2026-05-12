**TECH PALZ**

**Gambia Sports Platform**

_Software Requirements Specification_

Document 2 of 2 · User Stories · Business Rules · Field Specs · Permissions

| **Document type**      | Software Requirements Specification (SRS)                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| **Version**            | 1.0                                                                                                     |
| **Date**               | May 2026                                                                                                |
| **Companion document** | Blueprint v2.0 (Document 1 of 2) - database schema, tech stack, revenue model, architecture             |
| **Scope**              | All phases (Phase 1 full detail; Phase 2-4 complete requirements)                                       |
| **Phases covered**     | Phase 1 (Foundation), Phase 2 (News & Stats), Phase 3 (Live & Revenue), Phase 4 (Mobile & Full Product) |

# **1\. How to Read This Document**

This is the authoritative specification for what the Gambia Sports Platform does, how it behaves, and who is allowed to do what. Every developer, tester, and stakeholder should be able to read any module and know exactly what is expected - without needing to ask for clarification.

## **1.1 Story Format**

Every user story follows the format: As a \[role\], I want to \[action\] so that \[outcome\].

Acceptance criteria are written as testable conditions. A story is only considered done when every acceptance criterion is verifiable.

## **1.2 User Roles**

| **Role**           | **Summary**                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Fan**            | Public visitor. No login. Read-only access to all public data.                                                                  |
| **Content Editor** | Writes and publishes news articles. Scoped to one league or platform-wide (Super Admin toggle). Login required.                 |
| **Reporter**       | Records live match events from the ground. Login required. Permissions toggled by Super Admin.                                  |
| **League Admin**   | Manages one league's data - teams, players, fixtures, results, tournaments. Login required. Permissions toggled by Super Admin. |
| **Super Admin**    | Full platform control. Manages all leagues, all users, ads, billing. Toggles individual permissions for all other roles.        |

## **1.3 Story ID Convention**

Story IDs follow the pattern US-\[MODULE\]-\[NUMBER\]. Example: US-04-03 = Module 04 (Teams), story 3. Business rules follow BR-\[MODULE\]-\[NUMBER\].

**MODULE 01**

**Home Page & Navigation**

_What every visitor sees - results, fixtures, and site-wide navigation_

## **Overview**

The home page and navigation bar are the entry point for all visitors. They must load fast, work on 3G mobile, and route the visitor to the right section within one tap.

## **User Stories**

| **ID**       | **Role** | **User Story**                                                                                                                           | **Acceptance Criteria**                                                                                                                                                                                                                                   |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-01-01** | **Fan**  | As a fan, I want to see the five most recent match results on the home page so that I can catch up quickly without navigating elsewhere. | Five most recent completed matches displayed.<br><br>Each shows: home team, score, away team, date.<br><br>Ordered newest first.<br><br>Visible content within 3 seconds on 3G.                                                                           |
| **US-01-02** | **Fan**  | As a fan, I want to see the next five upcoming fixtures on the home page so that I know when to watch.                                   | Five next scheduled matches displayed.<br><br>Each shows: home team, away team, date, time, venue.<br><br>If no fixtures exist, a friendly empty state is shown.                                                                                          |
| **US-01-03** | **Fan**  | As a fan, I want a navigation bar on every page so that I can jump to any section without using the back button.                         | Nav present on every public page.<br><br>Links: Home, Standings, Fixtures, Results, Teams, News (Phase 2).<br><br>Active page is visually highlighted.<br><br>On mobile: collapses to hamburger menu.<br><br>Hamburger opens a full-screen slide-in menu. |
| **US-01-04** | **Fan**  | As a fan on a mobile phone, I want the site to fully work on a small screen so that I can check scores anywhere.                         | All pages pass 375px width mobile check.<br><br>No horizontal scrolling on any public page.<br><br>All tap targets minimum 44×44px.<br><br>Text readable without zooming.                                                                                 |
| **US-01-05** | **Fan**  | As a fan, I want to see the active league or competition name on the home page so that I know which competition I am viewing.            | Active league name shown prominently on home page.<br><br>If multiple active leagues exist (Phase 2), a league selector appears.                                                                                                                          |
| **US-01-06** | **Fan**  | As a fan, I want to see a featured news headline on the home page so that I am drawn to read more.                                       | Most recently published article shown as a headline card.<br><br>Card shows: title, cover image (or placeholder), excerpt, publication date.<br><br>Tapping navigates to full article. (Phase 2 - placeholder shown in Phase 1)                           |

## **Business Rules**

| **Rule / Constraint**          | **Detail**                                                                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **BR-01-01: Default league**   | Home page always shows data for the most recently created active league. If no active league exists, a holding message is shown. |
| **BR-01-02: Mobile first**     | All public pages designed for 375px width. Desktop is an enhancement, not the baseline.                                          |
| **BR-01-03: Page load**        | Public pages must render content within 3 seconds on simulated 3G (Next.js server components + indexed Supabase queries).        |
| **BR-01-04: No login on home** | The home page never prompts visitors to log in. The admin login link is only accessible via /admin/login.                        |

**MODULE 02**

**League Standings**

_The main league table - always live, always accurate_

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                       | **Acceptance Criteria**                                                                                                                                                                                             |
| ------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-02-01** | **Fan**          | As a fan, I want to see the full league standings so that I know which team is leading.                              | All teams in active season shown.<br><br>Columns: # (position), Team, P, W, D, L, GF, GA, GD, Pts.<br><br>Sorted by points descending.                                                                              |
| **US-02-02** | **Fan**          | As a fan, I want the correct tiebreaker applied automatically so that the table is accurate.                         | Tiebreaker order: (1) Goal difference, (2) Goals scored, (3) Alphabetical.<br><br>Applied automatically - no admin input required.                                                                                  |
| **US-02-03** | **Fan**          | As a fan, I want promotion and relegation zones highlighted so that I understand what the positions mean.            | Top N positions highlighted green if configured.<br><br>Bottom M positions highlighted red if configured.<br><br>N and M are configurable per season by League Admin.<br><br>A legend key is shown below the table. |
| **US-02-04** | **Fan**          | As a fan, I want team names in the table to be tappable links so that I can go to a team's page easily.              | Every team name in the standings is a hyperlink to /teams/\[slug\].                                                                                                                                                 |
| **US-02-05** | **Fan**          | As a fan, I want the standings to update automatically when a result is entered so that I always see current data.   | Standings recalculate on every page load from current match data.<br><br>No manual admin action required to update the table.<br><br>Timestamp of last completed match shown below table.                           |
| **US-02-06** | **League Admin** | As a League Admin, I want to configure which positions are highlighted so that the table reflects my league's rules. | Admin can set: number of promotion spots (green), number of relegation spots (red) per season.<br><br>Defaults to 0 for both (no highlighting).                                                                     |
| **US-02-07** | **Fan**          | As a fan, I want to view standings for a past season so that I can look up historical champions.                     | A season selector dropdown appears when more than one season exists.<br><br>Selecting a past season shows that season's final standings.<br><br>(Phase 2 - Phase 1 shows active season only)                        |

## **Business Rules**

| **Rule / Constraint**                | **Detail**                                                                                                           |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **BR-02-01: Points**                 | Win = 3 pts. Draw = 1 pt each. Loss = 0 pts.                                                                         |
| **BR-02-02: Completed matches only** | Only matches with status = completed are included. Postponed, scheduled, and live matches are excluded.              |
| **BR-02-03: Both teams counted**     | Every completed match contributes to both the home team and away team rows.                                          |
| **BR-02-04: Tiebreaker order**       | 1\. Points 2. Goal difference (GF−GA) 3. Goals scored (GF) 4. Alphabetical (temporary - head-to-head added Phase 2). |
| **BR-02-05: No manual editing**      | Standings are always derived from match data. There is no way to manually set a team's points or position.           |
| **BR-02-06: Season isolation**       | Standings are always scoped to one season_id. Matches from other seasons never affect the current table.             |

**MODULE 03**

**Fixtures & Results**

_Upcoming matches and completed scores_

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                | **Acceptance Criteria**                                                                                                                                                                                                                                                                                              |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-03-01** | **Fan**          | As a fan, I want to see all upcoming fixtures in date order so that I can plan when to watch.                 | All matches with status = scheduled listed.<br><br>Sorted by scheduled_at ascending.<br><br>Each shows: date, time, home team, away team, venue.<br><br>Grouped by date if multiple matches on same day.<br><br>Venue shown as 'TBC' if not set.                                                                     |
| **US-03-02** | **Fan**          | As a fan, I want to see all completed results with scores so that I can catch up.                             | All matches with status = completed listed.<br><br>Sorted by scheduled_at descending.<br><br>Each shows: date, home team, score, away team.<br><br>Winning team score shown in bold.                                                                                                                                 |
| **US-03-03** | **Fan**          | As a fan, I want to filter fixtures by team so that I can see only my team's games.                           | Team filter dropdown on fixtures and results pages.<br><br>Selecting a team filters the list to that team's matches only.<br><br>Filter resets when navigating away.                                                                                                                                                 |
| **US-03-04** | **League Admin** | As a League Admin, I want to schedule a new fixture so that teams and fans know when matches are.             | Admin selects: home team, away team, date, time, venue.<br><br>Both teams must belong to the active season.<br><br>A team cannot play itself - rejected at API level.<br><br>Duplicate fixture (same two teams same date) shows a warning before saving.<br><br>Fixture appears on public fixtures page immediately. |
| **US-03-05** | **League Admin** | As a League Admin, I want to edit or postpone a fixture so that I can handle schedule changes.                | Admin can edit: date, time, venue, status of any scheduled match.<br><br>Setting status to postponed removes from public fixtures list.<br><br>Postponed matches visible in admin under a Postponed tab.<br><br>Completed matches cannot have date changed - only score corrections by Super Admin.                  |
| **US-03-06** | **League Admin** | As a League Admin, I want to enter a result so that standings update.                                         | Admin selects a scheduled match and enters home score and away score.<br><br>A confirmation dialog shows the proposed result before saving.<br><br>Saving sets status to completed.<br><br>Standings recalculate on next page load.<br><br>Result is timestamped with entry time.                                    |
| **US-03-07** | **Fan**          | As a fan, I want to see postponed matches in a separate section so that I know which games have been delayed. | A Postponed tab or section on the fixtures page lists all postponed matches.<br><br>Each shows original scheduled date and both teams.<br><br>(Phase 1 - rescheduled date shown once admin updates it)                                                                                                               |

## **Business Rules**

| **Rule / Constraint**           | **Detail**                                                                                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-03-01: No self-fixture**   | A team cannot be scheduled to play itself. Rejected at API level, not just UI.                                                                    |
| **BR-03-02: Score validation**  | Scores must be non-negative integers. Decimal or negative values rejected.                                                                        |
| **BR-03-03: Status flow**       | scheduled → live → completed, or scheduled → postponed. Completed cannot revert to scheduled without Super Admin intervention.                    |
| **BR-03-04: Season scoping**    | All public fixtures and results scoped to active season. Archived seasons require explicit navigation.                                            |
| **BR-03-05: Penalty scores**    | For knockout tournament matches only: home_penalties and away_penalties can be entered after the 90-minute score. Do not affect league standings. |
| **BR-03-06: Duplicate warning** | System warns but does not block if the same two teams are scheduled on the same date. Admin must confirm.                                         |

## **Permissions**

| **Action**                 | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| -------------------------- | ------- | --------------------- | ---------------- | --------------- |
| View fixtures page         | **✓**   | **✓**                 | **✓**            | **✓**           |
| View results page          | **✓**   | **✓**                 | **✓**            | **✓**           |
| Filter by team             | **✓**   | **✓**                 | **✓**            | **✓**           |
| Schedule a new fixture     | **✗**   | **✗**                 | **✓**            | **✓**           |
| Edit a scheduled fixture   | **✗**   | **✗**                 | **✓**            | **✓**           |
| Postpone a fixture         | **✗**   | **✗**                 | **✓**            | **✓**           |
| Enter a match result       | **✗**   | **✗**                 | **✓**            | **✓**           |
| Correct a completed result | **✗**   | **✗**                 | **✗**            | **✓**           |
| Delete a scheduled fixture | **✗**   | **✗**                 | **✓**            | **✓**           |
| Delete a completed match   | **✗**   | **✗**                 | **✗**            | **✗**           |

**MODULE 04**

**Team Profiles**

_Full team pages - squad, form, history, description, fixtures_

## **Overview**

Every team has a rich public profile page. Admins can write a full description and history at the time of creation and edit it at any time. The profile page aggregates live data (form, fixtures, results) with the admin-authored content.

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                                        | **Acceptance Criteria**                                                                                                                                                                                                                                                                                |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **US-04-01** | **Fan**          | As a fan, I want to see a list of all teams in the league so that I can explore the competition.                                      | Teams page shows all active teams in the active league.<br><br>Each card shows: team badge (or placeholder), team name, home ground.<br><br>Tapping a card navigates to the team's detail page at /teams/\[slug\].                                                                                     |
| **US-04-02** | **Fan**          | As a fan, I want to see a team's full squad on their profile page so that I know who is registered.                                   | Full registered squad listed.<br><br>Each player shows: jersey number, name, position.<br><br>Sorted by jersey number ascending. Players with no number shown last.<br><br>Tapping a player navigates to /players/\[id\].                                                                              |
| **US-04-03** | **Fan**          | As a fan, I want to see a team's description and history on their page so that I can learn about the club.                            | Description section rendered from the description field (plain text Phase 1, rich text Phase 2).<br><br>History section rendered from the history field.<br><br>Both sections shown only if content has been added by admin - no empty section headings shown.                                         |
| **US-04-04** | **Fan**          | As a fan, I want to see a team's last five results as form badges so that I can judge their current run.                              | Last five completed matches shown as W/D/L coloured badges (green/grey/red).<br><br>Badges ordered left = oldest, right = most recent.<br><br>Each badge is tappable and links to the result.                                                                                                          |
| **US-04-05** | **Fan**          | As a fan, I want to see a team's next five fixtures on their profile page so that I can plan to attend.                               | Next five scheduled fixtures shown.<br><br>Each shows: date, opponent name (linked), home or away indicator, venue.                                                                                                                                                                                    |
| **US-04-06** | **Fan**          | As a fan, I want to see a team's home ground, founding year, and colours on their profile page.                                       | Home ground, founded year, and club colours shown in a info panel on the team page.<br><br>Fields shown only if they have been set by admin.                                                                                                                                                           |
| **US-04-07** | **League Admin** | As a League Admin, I want to add a new team with a full profile so that they are well represented on the platform.                    | Admin form includes: name, home ground, founded year, colours, logo upload, cover image upload, description (text area), history (text area).<br><br>Slug auto-generated from name and shown for confirmation. Editable before first save.<br><br>Team appears in teams list immediately after saving. |
| **US-04-08** | **League Admin** | As a League Admin, I want to edit any team detail including their description and history at any time so that profiles stay accurate. | All team fields editable via /admin/teams/\[id\].<br><br>Description and history fields are large text areas with no length limit.<br><br>Slug is read-only after first save.<br><br>Changes reflected on public team page immediately.                                                                |
| **US-04-09** | **League Admin** | As a League Admin, I want to upload a team badge and a cover image so that the team's page looks professional.                        | Logo upload: max 2 MB, JPEG or PNG. Displayed as team badge throughout the platform.<br><br>Cover image upload: max 5 MB, JPEG, PNG, or WebP. Displayed as a wide banner at the top of the team page.<br><br>Both uploads go to Supabase Storage.                                                      |
| **US-04-10** | **League Admin** | As a League Admin, I want to deactivate a team so that they no longer appear in the active league.                                    | Admin sets team status to inactive.<br><br>Inactive teams hidden from public teams list and cannot be selected for fixtures.<br><br>Existing completed match data and player history preserved.<br><br>Admin can reactivate the team at any time.                                                      |

## **Team Profile - Complete Field Specification**

| **Field**           | **Type**  | **Required** | **Notes**                                                                                                      |
| ------------------- | --------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| **name**            | Text      | Yes          | Max 100 chars. Must be unique within the league.                                                               |
| **slug**            | Text      | Yes          | Auto-generated from name. URL-safe. Immutable after first save.                                                |
| **description**     | Long text | No           | About the team - playing style, community ties, achievements. No length limit. Editable at any time.           |
| **history**         | Long text | No           | Full club history - founding, notable seasons, famous players, records. No length limit. Editable at any time. |
| **logo_url**        | URL       | No           | Team badge. Max 2 MB. JPEG or PNG. Stored in Supabase Storage.                                                 |
| **cover_image_url** | URL       | No           | Wide banner image. Max 5 MB. JPEG, PNG, or WebP.                                                               |
| **home_ground**     | Text      | No           | Venue name. Max 100 chars.                                                                                     |
| **founded_year**    | Integer   | No           | Between 1800 and current year.                                                                                 |
| **colours**         | Text      | No           | e.g. Red and White. Max 60 chars.                                                                              |
| **contact_email**   | Email     | No           | Optional public contact address.                                                                               |
| **status**          | Enum      | Yes          | active \| inactive. Defaults to active.                                                                        |
| **league_id**       | UUID      | Yes          | Set on creation. Cannot be changed.                                                                            |

## **Permissions**

| **Action**                 | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| -------------------------- | ------- | --------------------- | ---------------- | --------------- |
| View teams list            | **✓**   | **✓**                 | **✓**            | **✓**           |
| View team profile page     | **✓**   | **✓**                 | **✓**            | **✓**           |
| Add a new team             | **✗**   | **✗**                 | **✓**            | **✓**           |
| Edit team details          | **✗**   | **✗**                 | **✓**            | **✓**           |
| Edit description & history | **✗**   | **✗**                 | **✓**            | **✓**           |
| Upload logo / cover image  | **✗**   | **✗**                 | **✓**            | **✓**           |
| Deactivate a team          | **✗**   | **✗**                 | **✓**            | **✓**           |
| Reactivate a team          | **✗**   | **✗**                 | **✓**            | **✓**           |
| Delete team permanently    | **✗**   | **✗**                 | **✗**            | **✓**           |

**MODULE 05**

**Player Profiles**

_Individual player pages - biography, career, statistics_

## **Overview**

Every player has a public profile page. Admins write a biography and description at registration and can update them at any time. The profile aggregates live match data (goals, cards, appearances) as Phase 2 statistics become available.

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                                         | **Acceptance Criteria**                                                                                                                                                                                                                                                                                           |
| ------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-05-01** | **Fan**          | As a fan, I want to see a player's profile page with their position, jersey number, and photo so that I can identify them.             | Player profile at /players/\[id\].<br><br>Displays: photo (or placeholder avatar), name, position, jersey number, nationality, age (calculated from DOB), current team.<br><br>Current team name links to /teams/\[slug\].                                                                                        |
| **US-05-02** | **Fan**          | As a fan, I want to read a player's biography so that I can learn their background.                                                    | Biography section rendered from the biography field.<br><br>Description section rendered from the description field.<br><br>Sections shown only if content has been entered - no empty headings.                                                                                                                  |
| **US-05-03** | **Fan**          | As a fan, I want to see a player's career history (teams they have played for) so that I know their background.                        | Career history section lists all teams from player_contracts, newest first.<br><br>Each entry shows: team name (linked), start date, end date (or 'Present' if current).<br><br>(Phase 2 - Phase 1 shows current team only)                                                                                       |
| **US-05-04** | **Fan**          | As a fan, I want to see a player's season statistics (goals, assists, cards) on their profile so that I can assess their contribution. | Statistics table shows: season, team, appearances, goals, assists, yellow cards, red cards.<br><br>Career total row shown at the bottom.<br><br>(Phase 2 - requires match_events data)                                                                                                                            |
| **US-05-05** | **Fan**          | As a fan, I want to tap a player name on a team page and be taken to their profile.                                                    | All player names on team squad lists are tappable links to /players/\[id\].                                                                                                                                                                                                                                       |
| **US-05-06** | **League Admin** | As a League Admin, I want to register a new player with a full profile so that they are properly represented.                          | Admin form includes: name, position, jersey number, date of birth, nationality, photo upload, biography (text area), description (text area), team assignment.<br><br>Jersey number must be unique within the assigned team - error shown if clash.<br><br>Player visible in team squad immediately after saving. |
| **US-05-07** | **League Admin** | As a League Admin, I want to edit a player's biography and description at any time so that their profile stays current.                | All player fields editable via /admin/players/\[id\].<br><br>Biography and description are large text areas with no length limit.<br><br>Changes reflected on public player page immediately.                                                                                                                     |
| **US-05-08** | **League Admin** | As a League Admin, I want to transfer a player to a different team so that their current team assignment is correct.                   | Admin edits player's team_id to the new team.<br><br>A player_contracts record is created automatically: previous team end_date set to today, new team start_date set to today.<br><br>Player appears in new team's squad immediately. Removed from previous team's squad.                                        |
| **US-05-09** | **League Admin** | As a League Admin, I want to bulk-import players from a CSV file so that I can register a full squad quickly.                          | Admin uploads CSV with columns: name, position, jersey_number, date_of_birth.<br><br>System validates each row before importing.<br><br>Rows with errors shown in a report - valid rows still imported.<br><br>All imported players assigned to the team selected before upload.                                  |
| **US-05-10** | **League Admin** | As a League Admin, I want to mark a player as inactive or retired so that they are removed from active squad lists.                    | Admin sets player status to inactive or retired.<br><br>Player removed from all active squad lists.<br><br>Historical match event data and career records preserved.<br><br>Admin can reactivate at any time.                                                                                                     |

## **Player Profile - Complete Field Specification**

| **Field**         | **Type**  | **Required** | **Notes**                                                                              |
| ----------------- | --------- | ------------ | -------------------------------------------------------------------------------------- |
| **name**          | Text      | Yes          | Full name. Max 100 chars.                                                              |
| **position**      | Enum      | Yes          | GK \| DEF \| MID \| FWD. No free-text positions.                                       |
| **jersey_number** | Integer   | No           | 1-99. Unique within team. DB constraint enforced.                                      |
| **date_of_birth** | Date      | No           | Cannot be in the future. Age auto-calculated.                                          |
| **nationality**   | Text      | No           | Defaults to Gambian. Max 60 chars.                                                     |
| **biography**     | Long text | No           | Player background, career path, personal story. No length limit. Editable at any time. |
| **description**   | Long text | No           | Short player summary for profile card. Editable at any time.                           |
| **photo_url**     | URL       | No           | Player photo. Max 2 MB. JPEG or PNG.                                                   |
| **team_id**       | UUID      | No           | Current team. Null = unassigned.                                                       |
| **status**        | Enum      | Yes          | active \| inactive \| retired. Defaults to active.                                     |
| **slug**          | Text      | Yes          | Auto-generated. Used in profile URLs. Globally unique.                                 |

## **Business Rules**

| **Rule / Constraint**            | **Detail**                                                                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-05-01: Jersey uniqueness**  | Two active players on the same team cannot share a jersey number. Enforced at DB level with unique constraint on (team_id, jersey_number) where status = active. |
| **BR-05-02: No hard deletion**   | Player records are never deleted to preserve historical match event data. Use status = inactive or retired.                                                      |
| **BR-05-03: Position values**    | Must be one of: GK, DEF, MID, FWD. Free-text rejected at API level.                                                                                              |
| **BR-05-04: Age calculation**    | Player age displayed as: (today − date_of_birth) in years. Shown only if date_of_birth is set.                                                                   |
| **BR-05-05: Transfer recording** | Every team change creates a player_contracts record. This builds the career history automatically.                                                               |

**MODULE 06**

**League & Competition Profiles**

_Public profile pages for leagues and tournaments_

## **Overview**

Every league and tournament has a rich public profile page. Admins author a description and history at creation and can update them at any time. The profile page combines this authored content with live competition data.

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                              | **Acceptance Criteria**                                                                                                                                                                                                                                |
| ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **US-06-01** | **Fan**          | As a fan, I want to see a league's profile page with its description and history so that I can learn about the competition. | League profile at /leagues/\[slug\].<br><br>Displays: league logo, cover image, name, description, history.<br><br>Description and history rendered from admin-authored text.<br><br>Sections shown only if content has been entered.                  |
| **US-06-02** | **Fan**          | As a fan, I want to see the current season's standings on the league profile page so that I get a full overview.            | Active season's standings table embedded on the league profile page.<br><br>Links through to full /standings page.                                                                                                                                     |
| **US-06-03** | **Fan**          | As a fan, I want to see the league's most recent results on its profile page.                                               | Five most recent completed results shown as compact result rows.<br><br>Each links to the full results page filtered by league.                                                                                                                        |
| **US-06-04** | **Fan**          | As a fan, I want to see a tournament's profile page with its format, description, and history.                              | Tournament profile at /tournaments/\[slug\].<br><br>Displays: tournament logo, cover image, name, format, description, history.<br><br>Shows tournament status (upcoming, group stage, knockout, completed).<br><br>Links to group tables and bracket. |
| **US-06-05** | **Fan**          | As a fan, I want to see a list of past champions on the league or tournament profile page so that I know the history.       | Champions section shows: season/year, champion team name (linked), runner-up if available.<br><br>Available for completed seasons and tournaments.<br><br>(Phase 2 - Phase 1 shows current season only)                                                |
| **US-06-06** | **League Admin** | As a League Admin, I want to write and edit a description and history for my league so that it has a rich public profile.   | League description and history editable via /admin/leagues/\[id\].<br><br>Large text areas with no length limit.<br><br>Changes reflected on public league page immediately.                                                                           |
| **US-06-07** | **League Admin** | As a League Admin, I want to upload a logo and cover image for my league and tournaments.                                   | Logo upload: max 2 MB, JPEG or PNG.<br><br>Cover image: max 5 MB, JPEG, PNG, or WebP.<br><br>Uploads stored in Supabase Storage.<br><br>Both displayed on the public profile page.                                                                     |
| **US-06-08** | **League Admin** | As a League Admin, I want to write and edit a description and history for each tournament I manage.                         | Tournament description and history editable via /admin/tournaments/\[id\].<br><br>Large text areas with no length limit.<br><br>Displayed on the tournament's public profile page.                                                                     |

## **League Profile - Complete Field Specification**

| **Field**           | **Type**  | **Required** | **Notes**                                                                                         |
| ------------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------- |
| **name**            | Text      | Yes          | Full league name. Max 120 chars.                                                                  |
| **slug**            | Text      | Yes          | Auto-generated. Immutable after first save.                                                       |
| **description**     | Long text | No           | About the league - format, structure, participating areas. No length limit. Editable at any time. |
| **history**         | Long text | No           | Historical record - founding, notable seasons, records, famous clubs. No length limit.            |
| **logo_url**        | URL       | No           | League logo. Max 2 MB. JPEG or PNG.                                                               |
| **cover_image_url** | URL       | No           | Wide banner. Max 5 MB. JPEG, PNG, or WebP.                                                        |
| **founded_year**    | Integer   | No           | Year the league was established.                                                                  |
| **contact_email**   | Email     | No           | Public contact address.                                                                           |
| **status**          | Enum      | Yes          | active \| inactive.                                                                               |

**MODULE 07**

**Nawetans & Tournament Management**

_Group stages, knockout brackets, and competition lifecycle_

## **Overview**

The Nawetans format combines a group stage (round-robin within groups) with a knockout stage (single-elimination to the final). The platform manages the full lifecycle: setup, group draw, fixture generation, standings, bracket, and result entry including penalty shootouts.

## **User Stories - Setup**

| **ID**       | **Role**         | **User Story**                                                                                                                 | **Acceptance Criteria**                                                                                                                                                                                                                                                                                                                                                                             |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-07-01** | **League Admin** | As a League Admin, I want to create a Nawetans tournament with a full profile so that it appears on the platform.              | Form includes: name, format (nawetans), season, number of groups, teams advancing per group, round-robin type (single or home-and-away), description, history, logo, cover image.<br><br>Tournament created with status = upcoming.<br><br>Public tournament page created immediately at /tournaments/\[slug\].                                                                                     |
| **US-07-02** | **League Admin** | As a League Admin, I want to create groups and assign teams to them so that the group stage can begin.                         | Admin creates groups (Group A, Group B, etc.) up to 8 groups.<br><br>Admin assigns teams to each group from the league's team list.<br><br>Each team can only be in one group per tournament - enforced by DB constraint.<br><br>Admin can reorder teams within a group for seeding purposes.                                                                                                       |
| **US-07-03** | **League Admin** | As a League Admin, I want to generate group-stage fixtures automatically so that I don't have to schedule every match by hand. | System generates round-robin fixtures for each group.<br><br>Single round-robin: each pair plays once. Home-and-away: each pair plays twice.<br><br>Fixtures created with status = scheduled and no date/time.<br><br>Admin fills in dates for each fixture after generation.<br><br>Generated fixtures appear in the main fixtures list filtered by tournament.                                    |
| **US-07-04** | **League Admin** | As a League Admin, I want to transition the tournament to the knockout stage once all group matches are complete.              | Transition button visible in admin once all group matches have status = completed.<br><br>Admin selects the qualifying teams from each group on a confirmation screen.<br><br>System validates that the number of qualifiers matches the bracket size.<br><br>Tournament status set to knockout.                                                                                                    |
| **US-07-05** | **League Admin** | As a League Admin, I want the knockout bracket to be generated automatically from group qualifiers.                            | System creates knockout rounds (Round of 16 → QF → SF → Final) based on number of qualifiers.<br><br>First-round pairings follow standard seeding: Group A winner vs Group B runner-up, etc.<br><br>Each knockout match created as a scheduled fixture with stage field set.<br><br>Bracket visible immediately on public bracket page.                                                             |
| **US-07-06** | **League Admin** | As a League Admin, I want to advance winners through the knockout bracket after each result is entered.                        | After a knockout match result is saved, the winning team is automatically placed in the next round's bracket slot.<br><br>If match is drawn after 90 minutes in knockout stage, admin is prompted to enter penalty shootout scores.<br><br>Winner determined by penalty scores. 90-minute score displayed with penalties noted separately.<br><br>Final bracket slot shows the tournament champion. |

## **User Stories - Public Viewing**

| **ID**       | **Role** | **User Story**                                                                                 | **Acceptance Criteria**                                                                                                                                                                                                                                 |
| ------------ | -------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-07-07** | **Fan**  | As a fan, I want to see all group standings for a tournament so that I know who is qualifying. | All groups displayed as separate mini-tables on /tournaments/\[slug\]/groups.<br><br>Columns: #, Team, P, W, D, L, GD, Pts.<br><br>Qualifying positions highlighted in green.<br><br>Elimination positions shown without highlight.                     |
| **US-07-08** | **Fan**  | As a fan, I want to see the knockout bracket so that I can follow the path to the final.       | Visual bracket on /tournaments/\[slug\]/bracket.<br><br>Completed matches show score.<br><br>Upcoming matches show team names (or TBD if not yet determined).<br><br>Champion slot highlighted at the final.<br><br>Mobile-friendly scrollable bracket. |
| **US-07-09** | **Fan**  | As a fan, I want to see all fixtures within a group so that I know when each match is played.  | Group detail page at /tournaments/\[slug\]/groups/\[group\].<br><br>Lists all matches in the group: date, home team, score (if completed), away team.<br><br>Sorted by date ascending.                                                                  |
| **US-07-10** | **Fan**  | As a fan, I want the tiebreaker explanation shown when two teams are level on points.          | When two or more teams are tied on points, a note below the group table explains which tiebreaker was applied.                                                                                                                                          |

## **Business Rules**

| **Rule / Constraint**                                     | **Detail**                                                                                                                                                                                                 |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-07-01: Tiebreaker order**                            | 1\. Points 2. Head-to-head points (matches between tied teams only) 3. Head-to-head goal difference 4. Overall goal difference 5. Goals scored 6. Alphabetical.                                            |
| **BR-07-02: Head-to-head calculation**                    | When two or more teams are level on points, a mini-table is calculated using only the matches between those specific teams. Their results from all other group matches are excluded from the tiebreaker.   |
| **BR-07-03: Knockout draw rule**                          | If a knockout match ends level after 90 minutes, the result is a draw. Admin must enter penalty shootout scores (home_penalties and away_penalties). The winner is the team with the higher penalty score. |
| **BR-07-04: Penalties don't affect standings**            | Penalty shootout scores have no effect on group standings or league standings. They only determine the knockout winner.                                                                                    |
| **BR-07-05: One group per team**                          | A team can only be assigned to one group per tournament. Enforced by DB unique constraint on (tournament_id, team_id).                                                                                     |
| **BR-07-06: Group matches don't affect league standings** | Group-stage match results affect only the group's standing table - not the main league standings table.                                                                                                    |
| **BR-07-07: Bracket immutability**                        | Once a knockout round result is entered, the bracket slot cannot be manually reassigned. Score corrections by Super Admin create an audit log entry.                                                       |
| **BR-07-08: Status flow**                                 | upcoming → group_stage (admin starts) → knockout (all groups complete, admin confirms qualifiers) → completed (final result entered).                                                                      |

**MODULE 08**

**Authentication & Access Control**

_Login, sessions, invitations, and role enforcement_

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                           | **Acceptance Criteria**                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-08-01** | **League Admin** | As a League Admin, I want to log in with email and password so that I can access the admin dashboard.                    | Login page at /admin/login.<br><br>Accepts email + password.<br><br>On success: redirects to /admin.<br><br>On failure: generic error 'Invalid email or password' (no hint which field is wrong).<br><br>Brute-force: 5 failed attempts triggers a 15-minute lockout.                                                                                                                                                   |
| **US-08-02** | **League Admin** | As a League Admin, I want my session to persist between browser visits so that I don't log in every time.                | Session stored in HTTP-only cookie via Supabase SSR.<br><br>Session valid for 7 days.<br><br>Auto-refreshed on each page load if within expiry window.                                                                                                                                                                                                                                                                  |
| **US-08-03** | **League Admin** | As a League Admin, I want a logout button so that I can secure my account on shared devices.                             | Logout button in admin header on every admin page.<br><br>Logging out destroys session cookie immediately.<br><br>User redirected to /admin/login after logout.<br><br>Any admin page redirect to /admin/login if session missing or expired.                                                                                                                                                                           |
| **US-08-04** | **Super Admin**  | As a Super Admin, I want to invite a new user by email so that they can access the platform.                             | Super Admin enters email, selects role, selects league (if applicable), sets is_global for Content Editors.<br><br>Supabase sends invitation email with password-setup link.<br><br>Link expires after 48 hours.<br><br>Super Admin can resend expired invitations.<br><br>New user's permissions default to the standard set for their role. Super Admin can toggle individual permissions before or after invitation. |
| **US-08-05** | **Super Admin**  | As a Super Admin, I want to toggle individual permissions for any user so that access is precisely controlled.           | User management page at /admin/users.<br><br>For each user: Super Admin sees a permissions panel with toggle switches for each permission in the predefined list.<br><br>Changes take effect immediately.<br><br>Permissions stored as JSONB on profiles.permissions.                                                                                                                                                   |
| **US-08-06** | **Super Admin**  | As a Super Admin, I want to set a Content Editor as platform-wide so that their articles appear in the global news feed. | Toggle is_global to true on the user's profile.<br><br>league_id automatically set to null when is_global is enabled.<br><br>Content Editor's articles are no longer scoped to a single league.<br><br>Reversible - Super Admin can disable is_global and reassign a league at any time.                                                                                                                                |
| **US-08-07** | **Super Admin**  | As a Super Admin, I want to deactivate a user account so that a former admin can no longer log in.                       | Super Admin sets user status to inactive.<br><br>Inactive user cannot log in - Supabase auth ban applied.<br><br>Existing data created by that user is preserved.<br><br>Super Admin can reactivate the account at any time.                                                                                                                                                                                            |
| **US-08-08** | **Any**          | As any visitor, I want to be redirected to login if I access an admin page without being logged in.                      | Next.js middleware intercepts all requests to /admin/\* and /reporter/\*.<br><br>If no valid session: redirect to /admin/login.<br><br>Original URL saved in query param so user is redirected back after login.                                                                                                                                                                                                        |

## **Business Rules**

| **Rule / Constraint**                     | **Detail**                                                                                                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-08-01: No self-registration**        | There is no public sign-up form. All accounts created by Super Admin invitation only.                                                                                   |
| **BR-08-02: RLS at DB level**             | All data isolation enforced by Supabase RLS. The UI is a convenience - it is not the security boundary. Bypassing the UI does not bypass access control.                |
| **BR-08-03: Password requirements**       | Minimum 8 characters. Enforced by Supabase Auth.                                                                                                                        |
| **BR-08-04: Brute force protection**      | 5 failed login attempts triggers a 15-minute account lockout. Enforced by Supabase Auth rate limiting.                                                                  |
| **BR-08-05: League Admin data isolation** | League Admin queries are always scoped to their league_id by RLS. They cannot read or write data belonging to other leagues even if they know the URL.                  |
| **BR-08-06: Reporter scope**              | Reporter can record events only for live matches belonging to their assigned league. Enforced by RLS on match_events.                                                   |
| **BR-08-07: Content Editor scope**        | League-scoped Content Editor can only create and edit articles for their league_id. Global Content Editor (is_global = true) can create articles with league_id = null. |
| **BR-08-08: Super Admin protection**      | Super Admin accounts cannot be deactivated via the admin UI - requires direct Supabase dashboard action. Prevents lockout.                                              |

**MODULE 09**

**Admin Dashboard & Match Management**

_The control centre for league officials_

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                       | **Acceptance Criteria**                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-09-01** | **League Admin** | As a League Admin, I want to see a dashboard overview on login so that I know what needs attention.                  | Dashboard at /admin shows summary cards: total teams, total players, completed matches, upcoming fixtures.<br><br>Recent section: 3 most recent results.<br><br>Upcoming section: next 3 fixtures.<br><br>Alerts section: postponed matches needing rescheduling, incomplete tournament rounds.                                                                                                                                                   |
| **US-09-02** | **League Admin** | As a League Admin, I want to see all matches in one list grouped by status so that I have a complete picture.        | Matches list at /admin/matches shows tabs: Scheduled, Live, Completed, Postponed.<br><br>Each tab lists matches with: date, home team, score (if completed), away team, venue.<br><br>Scheduled tab has 'Enter Result' button per match.<br><br>Completed tab has 'View' button. Super Admin sees 'Edit Score' button.                                                                                                                            |
| **US-09-03** | **League Admin** | As a League Admin, I want to enter a result with a confirmation step so that I don't submit the wrong score.         | Tapping 'Enter Result' opens /admin/matches/\[id\].<br><br>Page displays team names prominently.<br><br>Large number inputs for home score and away score.<br><br>For knockout matches: additional penalty shootout score inputs appear if match is in a knockout round.<br><br>Confirmation dialog: 'Save result: Team A 2 - 1 Team B?'<br><br>Admin must tap Confirm before DB is updated.<br><br>Success message and redirect to matches list. |
| **US-09-04** | **Super Admin**  | As a Super Admin, I want to correct a match result so that standings reflect accurate data.                          | Super Admin sees 'Edit Score' on any completed match.<br><br>Editing opens a form pre-filled with current scores.<br><br>Super Admin enters corrected scores and a reason (optional).<br><br>Saving writes to match_audit table: old scores, new scores, editor ID, reason, timestamp.<br><br>Standings recalculate automatically.                                                                                                                |
| **US-09-05** | **League Admin** | As a League Admin, I want quick-action buttons on the dashboard so that I can navigate to common tasks in one tap.   | Quick-action cards: Enter Result (links to scheduled matches), Schedule Fixture, Manage Teams, Manage Players, Manage Tournament.                                                                                                                                                                                                                                                                                                                 |
| **US-09-06** | **Super Admin**  | As a Super Admin, I want to see all leagues' dashboards from a single view so that I can monitor the whole platform. | Super Admin dashboard has a league selector at the top.<br><br>Selecting a league loads that league's data in all dashboard sections.<br><br>'All Leagues' view shows platform-wide totals and a table of leagues with their subscription status.                                                                                                                                                                                                 |

## **Business Rules**

| **Rule / Constraint**                     | **Detail**                                                                                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-09-01: Audit trail**                 | Every score correction by Super Admin is written to match_audit. Records are immutable - no UPDATE or DELETE on match_audit.                            |
| **BR-09-02: League Admin data isolation** | All admin pages automatically filter data to the logged-in admin's league_id. Direct URL navigation to another league's match ID returns 403 Forbidden. |
| **BR-09-03: No completed match deletion** | Completed matches cannot be deleted. Score corrections only - via the edit flow with audit trail.                                                       |
| **BR-09-04: Confirmation required**       | All result saves (new result + corrections) require explicit admin confirmation. No auto-save on form submit.                                           |

**MODULE 10**

**User Management**

_Inviting, configuring, and controlling platform users_

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                                            | **Acceptance Criteria**                                                                                                                                                                                                                                                                                          |
| ------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-10-01** | **Super Admin**  | As a Super Admin, I want to see all users on the platform in one list so that I can manage them.                                          | User list at /admin/users shows all users: name, email, role, league, status, last login.<br><br>Filterable by role and status.<br><br>Search by name or email.                                                                                                                                                  |
| **US-10-02** | **Super Admin**  | As a Super Admin, I want to invite a new League Admin and assign them to a league.                                                        | Invite form: email, role = league_admin, league selector.<br><br>Supabase sends invitation email.<br><br>New user appears in user list with status = pending until they accept.<br><br>League Admin can only be assigned to leagues that exist.                                                                  |
| **US-10-03** | **Super Admin**  | As a Super Admin, I want to invite a Content Editor and choose whether they are league-scoped or global.                                  | Invite form: email, role = content_editor, league selector (optional), is_global toggle.<br><br>If is_global = true: league selector is disabled and league_id set to null.<br><br>User's article scope matches their setting immediately after accepting the invitation.                                        |
| **US-10-04** | **Super Admin**  | As a Super Admin, I want to invite a Reporter and assign them to a league.                                                                | Invite form: email, role = reporter, league selector.<br><br>Reporter can only record events for live matches in their assigned league.                                                                                                                                                                          |
| **US-10-05** | **League Admin** | As a League Admin (with permission), I want to invite a Reporter for my league.                                                           | League Admin sees an Invite Reporter button if the 'can invite reporters' permission is enabled.<br><br>Reporter invitation scoped to the League Admin's own league.<br><br>League Admin cannot invite other League Admins or Super Admins.                                                                      |
| **US-10-06** | **Super Admin**  | As a Super Admin, I want to toggle individual permissions for a user so that their access is precisely matched to their responsibilities. | User detail page shows a permissions panel with toggle switches for each permission in the predefined list.<br><br>Toggles take effect immediately - no page reload needed.<br><br>Permissions stored in profiles.permissions (JSONB).<br><br>A summary shows which permissions differ from the role's defaults. |
| **US-10-07** | **Super Admin**  | As a Super Admin, I want to deactivate and reactivate users so that I can manage access without losing their data.                        | Deactivate button on user detail page.<br><br>Deactivated user cannot log in.<br><br>All data created by that user preserved.<br><br>Reactivate button restores login access.                                                                                                                                    |

## **Predefined Toggleable Permissions Reference**

| **Permission**                                | **League Admin default** | **Reporter default** | **Content Editor default** | **Notes**                                                          |
| --------------------------------------------- | ------------------------ | -------------------- | -------------------------- | ------------------------------------------------------------------ |
| **Can enter / correct match results**         | On                       | Off                  | Off                        | Correction (super admin only) remains restricted regardless.       |
| **Can schedule and edit fixtures**            | On                       | Off                  | Off                        |                                                                    |
| **Can manage teams (add/edit/deactivate)**    | On                       | Off                  | Off                        |                                                                    |
| **Can manage players (add/edit/transfer)**    | On                       | Off                  | Off                        |                                                                    |
| **Can manage tournaments**                    | On                       | Off                  | Off                        | Includes creating groups and advancing bracket.                    |
| **Can post and publish news articles**        | On                       | Off                  | On                         | League Admin and Content Editor default on; Reporter default off.  |
| **Can upload photos and media**               | On                       | On                   | On                         | All three roles default on.                                        |
| **Can invite reporters**                      | On                       | Off                  | Off                        | League Admin can invite reporters for their own league only.       |
| **Can view financial / subscription reports** | Off                      | Off                  | Off                        | Default off for all - Super Admin grants selectively.              |
| **Can record live match events**              | Off                      | On                   | Off                        | Reporter's primary permission.                                     |
| **Can start / end a live match session**      | Off                      | Off                  | Off                        | Default off - Super Admin grants to trusted reporters.             |
| **Is platform-wide (Content Editor only)**    | N/A                      | N/A                  | Off                        | When on: articles not scoped to a league. Super Admin toggle only. |

**MODULE 11**

**News & Articles**

_Sports journalism and match reports - Phase 2_

**Phase 2**

News and articles are Phase 2 features. The articles and article_tags tables are included in the Phase 1 database schema to avoid restructuring later, but the public news pages and article editor are built in Phase 2.

## **User Stories**

| **ID**       | **Role**           | **User Story**                                                                                                         | **Acceptance Criteria**                                                                                                                                                                                                                                                                                 |
| ------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-11-01** | **Fan**            | As a fan, I want to see a news page with the latest articles so that I can read about my league.                       | News page at /news lists published articles newest first.<br><br>Each card: headline, cover image (or placeholder), author, date, excerpt.<br><br>League-scoped articles shown first; global articles below.<br><br>Tapping a card navigates to /news/\[slug\].                                         |
| **US-11-02** | **Fan**            | As a fan, I want to read a full article with photos and formatting so that it is enjoyable.                            | Article body rendered from Tiptap JSON to HTML.<br><br>Supports: headings, bold, italic, bullet lists, numbered lists, images, blockquotes, links.<br><br>Cover image shown as a wide banner at the top.<br><br>Author name and publication date shown.                                                 |
| **US-11-03** | **Fan**            | As a fan, I want to filter news by category so that I can find match reports or transfer news.                         | Category filter tabs on news page: All, Match Report, Transfer News, Injury Update, Opinion.<br><br>Filtering by category shows only articles with that category.                                                                                                                                       |
| **US-11-04** | **Content Editor** | As a Content Editor, I want to write and publish an article using a rich text editor so that I can share news.         | Editor at /admin/news/new.<br><br>Tiptap editor supports all formats in US-11-02.<br><br>Fields: title (generates slug), excerpt, category, cover image upload, league tag (for global editors), body.<br><br>Save as draft or publish immediately.<br><br>Published articles appear within 60 seconds. |
| **US-11-05** | **Content Editor** | As a Content Editor, I want to upload a cover image for my article.                                                    | Image upload field in editor.<br><br>Stored in Supabase Storage.<br><br>Max 5 MB. JPEG, PNG, or WebP.<br><br>Image shown as preview before saving.                                                                                                                                                      |
| **US-11-06** | **Content Editor** | As a Content Editor, I want to edit or unpublish an article after publication so that I can correct errors.            | Article list at /admin/news shows all my articles with status.<br><br>Edit navigates to editor pre-filled with existing content.<br><br>Unpublish button sets published_at to null - article disappears from public view immediately.                                                                   |
| **US-11-07** | **League Admin**   | As a League Admin (with permission), I want to edit or delete any article in my league so that I can moderate content. | League Admin sees all articles for their league in /admin/news.<br><br>Can edit or delete any article regardless of author.<br><br>Deleting an article is irreversible - confirmation dialog required.                                                                                                  |

## **Business Rules**

| **Rule / Constraint**             | **Detail**                                                                                                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-11-01: Draft vs published**  | Articles with published_at = null are drafts. Never visible to fans. Published = published_at is set.                                                                           |
| **BR-11-02: League scoping**      | League-scoped Content Editors and League Admins can only manage articles with their league_id. Global Content Editors (is_global = true) manage articles with league_id = null. |
| **BR-11-03: Slug uniqueness**     | Article slugs must be globally unique. System auto-appends a number if a clash exists.                                                                                          |
| **BR-11-04: Author immutability** | author_id set at creation. Cannot be changed even if another user edits the article.                                                                                            |
| **BR-11-05: Article deletion**    | Deleted articles are permanently removed. No soft delete for articles. Confirmation required.                                                                                   |

## **Permissions**

| **Action**                   | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| ---------------------------- | ------- | --------------------- | ---------------- | --------------- |
| View published articles      | **✓**   | **✓**                 | **✓**            | **✓**           |
| Write and publish articles   | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Edit own articles            | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Edit other editors' articles | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Unpublish articles           | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Delete articles              | **✗**   | **✗**                 | **✓**            | **✓**           |
| Manage categories and tags   | **✗**   | **✗**                 | **Partial**      | **✓**           |

_P = Partial - depends on toggleable permission being enabled by Super Admin._

**MODULE 12**

**Player Statistics & Leaderboards**

_Goals, assists, cards, and season records - Phase 2_

**Phase 2**

Player statistics require match_events data. The match_events table is in the Phase 1 schema. Events can be entered retrospectively by League Admin in Phase 2. Real-time event recording by Reporter tool is Phase 3.

## **User Stories**

| **ID**       | **Role**         | **User Story**                                                                                                  | **Acceptance Criteria**                                                                                                                                                                                                                                                                                                                        |
| ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-12-01** | **Fan**          | As a fan, I want to see the top scorers table so that I know who the leading goal scorer is.                    | Top scorers page at /stats/top-scorers.<br><br>Shows: rank, player name (linked), team name (linked), goals.<br><br>Sorted goals descending. Tied players at equal rank.<br><br>Filterable by league, tournament, and season.                                                                                                                  |
| **US-12-02** | **Fan**          | As a fan, I want to see the assists leaderboard.                                                                | Top assists page at /stats/top-assists.<br><br>Same format as top scorers. Sorted by assists descending.                                                                                                                                                                                                                                       |
| **US-12-03** | **Fan**          | As a fan, I want to see the discipline table showing yellow and red cards.                                      | Discipline page at /stats/discipline.<br><br>Shows: player, team, yellow cards, red cards, second yellows.<br><br>Sorted by red cards then yellows descending.                                                                                                                                                                                 |
| **US-12-04** | **Fan**          | As a fan, I want to see a player's stats on their profile page including per-season breakdown.                  | Player profile statistics table: season, team, appearances, goals, assists, yellow cards, red cards.<br><br>Career total row at the bottom.<br><br>Tournament stats shown separately from league stats.                                                                                                                                        |
| **US-12-05** | **League Admin** | As a League Admin, I want to enter match events for a completed match so that player statistics are calculated. | Event entry page at /admin/events/\[matchId\].<br><br>Admin selects: event type, player (from either team), minute.<br><br>For substitutions: admin selects both the player coming on and the player going off.<br><br>Events can be added and deleted for any completed match.<br><br>Statistics recalculate automatically on next page load. |
| **US-12-06** | **Fan**          | As a fan, I want to see tournament-specific top scorers separately from league top scorers.                     | Top scorers page includes a Competition selector: All, League, and each tournament by name.<br><br>Selecting a tournament filters stats to match_events from that tournament's matches only.                                                                                                                                                   |

## **Business Rules**

| **Rule / Constraint**                   | **Detail**                                                                                                                                                                   |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-12-01: Stats from events only**    | Player stats always derived from match_events. No manual stat entry separate from events.                                                                                    |
| **BR-12-02: Own goals**                 | Own goals (event_type = own_goal) count toward the conceding team's score but do NOT count toward the player's personal goal tally.                                          |
| **BR-12-03: Appearance counting**       | An appearance is counted when a player is named in any match_event for that match (goal, card, substitution, or explicit lineup entry in Phase 4).                           |
| **BR-12-04: Red card from two yellows** | A second yellow card event automatically implies a red card. Both the second_yellow event and a red_card event should be recorded. Counts as 1 red card in discipline stats. |

**MODULE 13**

**Live Match & Reporter Tool**

_Real-time scores and event logging - Phase 3_

**Phase 3**

The live match module and reporter tool are Phase 3 features. The database schema (match_events, live_sessions) is in place from Phase 1. Development of the UI and Supabase Realtime subscriptions is Phase 3 work.

## **User Stories - Fan Experience**

| **ID**       | **Role** | **User Story**                                                                                                   | **Acceptance Criteria**                                                                                                                                                                                                                                      |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **US-13-01** | **Fan**  | As a fan, I want to see a live match page that updates in real time so that I can follow the game as it happens. | Live match page at /match/\[id\].<br><br>Displays: current score, match minute (auto-incrementing), event timeline.<br><br>Score updates within 2 seconds of a reporter entering an event.<br><br>No page refresh required - Supabase Realtime subscription. |
| **US-13-02** | **Fan**  | As a fan, I want to see who scored each goal on the live match page.                                             | Each goal in the timeline shows: minute, player name, team.<br><br>Assist shown beneath if entered.<br><br>Penalty goals labelled (pen).                                                                                                                     |
| **US-13-03** | **Fan**  | As a fan, I want to see yellow and red cards in the event timeline.                                              | Yellow cards shown with a yellow badge. Red cards shown with a red badge.<br><br>Player name and minute displayed for each card.                                                                                                                             |

## **User Stories - Reporter Tool**

| **ID**       | **Role**         | **User Story**                                                                                           | **Acceptance Criteria**                                                                                                                                                                                                                                                                                                                                          |
| ------------ | ---------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-13-04** | **Reporter**     | As a Reporter, I want a simple mobile page to log events quickly from the sideline.                      | Reporter tool at /reporter/\[matchId\].<br><br>Large buttons: GOAL, YELLOW CARD, RED CARD, SUBSTITUTION, PENALTY SCORED, PENALTY MISSED.<br><br>Tapping GOAL opens player picker for both teams.<br><br>Admin selects scoring team first, then player.<br><br>Event saved to Supabase within 1 second.<br><br>All fans on live page see update within 2 seconds. |
| **US-13-05** | **Reporter**     | As a Reporter, I want to undo the most recent event I entered so that I can correct a mistake.           | Undo Last Event button always visible in reporter tool.<br><br>Only the most recent event can be undone.<br><br>Undo removes the event from match_events.<br><br>Realtime update sent to all fans on the live page.                                                                                                                                              |
| **US-13-06** | **League Admin** | As a League Admin, I want to start and end the match from the admin panel so that the status is correct. | Admin live control at /admin/live/\[matchId\].<br><br>Buttons: Start Match (sets status to live, records kick-off time in live_sessions), Half Time, Second Half, Full Time (sets status to completed).<br><br>Match minute displayed and auto-increments from kick-off time.                                                                                    |

## **Business Rules**

| **Rule / Constraint**                 | **Detail**                                                                                                                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-13-01: Live matches only**       | Reporter tool only accessible when match status = live. Error shown for scheduled or completed matches.                                                                             |
| **BR-13-02: Registered players only** | Goals, cards, and substitutions can only be attributed to players registered to one of the two match teams.                                                                         |
| **BR-13-03: Realtime mechanism**      | Live page subscribes to INSERT events on match_events filtered by match_id. Score changes subscribe to UPDATE events on matches. Both via Supabase Realtime.                        |
| **BR-13-04: Penalty shootout live**   | After Full Time is called on a drawn knockout match, admin can enter a series of penalty_scored and penalty_missed events. System calculates final penalty score from these events. |
| **BR-13-05: Undo limit**              | Only the single most recent event can be undone. Events older than the most recent cannot be deleted via the reporter tool - only by League Admin in /admin/events/\[matchId\].     |

**MODULE 14**

**Push Notifications**

_Fan alerts for goals and match events - Phase 3_

## **User Stories**

| **ID**       | **Role** | **User Story**                                                                                               | **Acceptance Criteria**                                                                                                                                                                                                 |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-14-01** | **Fan**  | As a fan, I want to opt in to push notifications for my followed teams so that I am alerted when they score. | Notification preferences page at /notifications.<br><br>Fan selects teams to follow from a searchable list.<br><br>Browser push permission requested on opt-in.<br><br>Subscription stored in push_subscriptions table. |
| **US-14-02** | **Fan**  | As a fan, I want to receive a push notification when a match I follow starts.                                | Notification sent when match status changes to live for a team in the fan's followed list.<br><br>Notification text: '\[Team A\] vs \[Team B\] has kicked off!'                                                         |
| **US-14-03** | **Fan**  | As a fan, I want to receive a push notification when my team scores a goal.                                  | Notification sent within 5 seconds of a goal event being recorded for a team in the fan's followed list.<br><br>Text: '\[Player name\] scores for \[Team\]! \[Score\]'                                                  |
| **US-14-04** | **Fan**  | As a fan, I want to manage and turn off notifications at any time.                                           | Notification preferences page allows fan to remove any team from their followed list.<br><br>Removing a team stops all notifications for that team immediately.                                                         |

## **Business Rules**

| **Rule / Constraint**            | **Detail**                                                                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-14-01: Opt-in only**        | Push notifications are strictly opt-in. No notifications sent to fans who have not explicitly subscribed.                                                               |
| **BR-14-02: Delivery mechanism** | Notifications sent via Web Push API using service worker. Triggered server-side by Supabase database function on match_events INSERT.                                   |
| **BR-14-03: No spam**            | Maximum one notification per match per fan per event type. If a team scores 5 goals, 5 goal notifications are sent - but no duplicate notifications for the same event. |

**MODULE 15**

**Advertising Management**

_Local business ads - placement, tracking, and reporting - Phase 3_

## **User Stories**

| **ID**       | **Role**        | **User Story**                                                                                             | **Acceptance Criteria**                                                                                                                                                                                                                                              |
| ------------ | --------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-15-01** | **Fan**         | As a fan, I want ads to be clearly labelled so that I can distinguish them from content.                   | All ad placements have a visible 'Sponsored' or 'Advertisement' label.<br><br>Ads are visually distinct with a border or background colour.                                                                                                                          |
| **US-15-02** | **Super Admin** | As a Super Admin, I want to upload and schedule a banner ad so that a local business can advertise.        | Ad management at /admin/ads.<br><br>Fields: title (internal), image upload, link URL, advertiser name, position, league filter (or all leagues), start date, end date, price (GMD, internal).<br><br>Ad goes live automatically on start_date and stops on end_date. |
| **US-15-03** | **Super Admin** | As a Super Admin, I want to see impressions and clicks per ad so that I can report to advertisers.         | Ad detail page shows: total impressions, total clicks, click-through rate, daily breakdown chart.<br><br>Each public page load that includes the ad increments impressions.<br><br>Each ad tap increments clicks.                                                    |
| **US-15-04** | **Super Admin** | As a Super Admin, I want to pause or archive ads without deleting them so that I can manage the inventory. | Ad status can be set to: active, paused, archived.<br><br>Paused ads are not served but retain their impression and click data.<br><br>Archived ads not served and hidden from the default ad list. Accessible via filter.                                           |

## **Business Rules**

| **Rule / Constraint**                 | **Detail**                                                                                                       |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **BR-15-01: No third-party networks** | Platform does not use Google Ads or any external ad network. All ads managed directly by Super Admin.            |
| **BR-15-02: Auto-expiry**             | Ads automatically stop serving after end_date. Status set to expired by a daily scheduled function.              |
| **BR-15-03: Admin-free**              | Admin dashboard pages never show advertisements.                                                                 |
| **BR-15-04: Impression tracking**     | Impressions incremented server-side on page render, not client-side, to prevent ad blockers from skewing counts. |

**MODULE 16**

**Fan Accounts & Personalised Feed**

_Registered fans, team follows, and personalised content - Phase 4_

## **User Stories**

| **ID**       | **Role** | **User Story**                                                                                               | **Acceptance Criteria**                                                                                                                                                                                                                      |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-16-01** | **Fan**  | As a fan, I want to create an account so that I can follow teams and get a personalised feed.                | Public sign-up form (Phase 4 - not available in Phases 1-3).<br><br>Requires: display name, email, password (min 8 chars).<br><br>Email verification required before login.<br><br>Profile created automatically in fan_profiles.            |
| **US-16-02** | **Fan**  | As a fan, I want to follow teams so that my home feed shows their results and news.                          | Follow button on every team page.<br><br>Followed teams stored in follows table.<br><br>Home feed at /feed shows results, fixtures, and articles for followed teams only.                                                                    |
| **US-16-03** | **Fan**  | As a fan, I want to comment on news articles so that I can share my opinions.                                | Comment section at bottom of every published article.<br><br>Must be logged in to comment.<br><br>Comments shown newest first.<br><br>Each comment shows: author display name, comment text, date.<br><br>Admin can hide or delete comments. |
| **US-16-04** | **Fan**  | As a fan, I want to manage my account settings so that I can update my profile and notification preferences. | Settings page at /settings.<br><br>Editable: display name, avatar photo, notification preferences.<br><br>Password change form.<br><br>Account deletion option (soft delete - data retained, login disabled).                                |

**MODULE 17**

**Analytics, Charts & Public API**

_Player analytics, team charts, and developer API - Phase 4_

## **User Stories - Analytics**

| **ID**       | **Role** | **User Story**                                                                                  | **Acceptance Criteria**                                                                                                                                                                                  |
| ------------ | -------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-17-01** | **Fan**  | As a fan, I want to see a player's form chart showing their goal contributions over the season. | Player analytics page at /analytics/player/\[id\].<br><br>Line chart: goals + assists per matchday.<br><br>Bar chart: appearances per season.<br><br>Powered by Recharts library.                        |
| **US-17-02** | **Fan**  | As a fan, I want to see a team's form curve across the season showing points per game.          | Team analytics page at /analytics/team/\[id\].<br><br>Line chart: cumulative points over the season.<br><br>Bar chart: goals scored and conceded per match.<br><br>Win/draw/loss distribution pie chart. |
| **US-17-03** | **Fan**  | As a fan, I want to compare two players' stats side by side.                                    | Player comparison page at /analytics/compare.<br><br>Fan selects two players from a searchable dropdown.<br><br>Side-by-side stat table and overlaid chart.                                              |

## **User Stories - Public API**

| **ID**       | **Role**        | **User Story**                                                                                                | **Acceptance Criteria**                                                                                                                                                                                                                                                           |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-17-04** | **Any**         | As a developer, I want to query league data via a REST API so that I can build apps using Gambia Sports data. | API base at /api/v1/.<br><br>Endpoints: GET /leagues, /leagues/\[slug\]/standings, /leagues/\[slug\]/fixtures, /leagues/\[slug\]/results, /teams/\[slug\], /players/\[id\], /tournaments/\[slug\].<br><br>All responses in JSON.<br><br>API key required in Authorization header. |
| **US-17-05** | **Any**         | As a developer, I want to know my rate limit so that I can plan my usage.                                     | Free tier: 100 requests/day. Paid tier: 10,000 requests/day.<br><br>Rate limit headers in every response: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset.<br><br>429 Too Many Requests returned when limit exceeded.                                                 |
| **US-17-06** | **Super Admin** | As a Super Admin, I want to issue and revoke API keys so that I can control developer access.                 | API key management at /admin/api-keys.<br><br>Generate new key: assigns to a user account, sets tier.<br><br>Raw key shown only once at creation.<br><br>Revoke button immediately invalidates the key.                                                                           |

## **Business Rules**

| **Rule / Constraint**          | **Detail**                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **BR-17-01: API key hashing**  | Raw API keys are never stored. Only SHA-256 hash stored in api_keys table. Key shown to developer once at creation. |
| **BR-17-02: Rate limiting**    | Enforced by Upstash Redis, not database. Requests per day tracked per key. Resets at midnight UTC.                  |
| **BR-17-03: Read-only API**    | The public API is read-only. No POST, PUT, or DELETE endpoints exposed publicly.                                    |
| **BR-17-04: Public data only** | API returns only data visible to unauthenticated fans. No admin data, no draft articles, no user profiles.          |

**MODULE 18**

**Non-Functional Requirements**

_Security, performance, accessibility, reliability, and data integrity_

## **Security**

| **Rule / Constraint**                      | **Detail**                                                                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **SEC-01: RLS at DB level**                | All multi-tenant data isolation enforced by Supabase RLS. UI is convenience only - not the security boundary.                              |
| **SEC-02: No service role key in browser** | NEXT_PUBLIC_SUPABASE_ANON_KEY is the only Supabase credential in client-side code. Service role key is never exposed to the browser.       |
| **SEC-03: Environment variables**          | .env.local never committed to GitHub. Production secrets stored only in Vercel environment variables.                                      |
| **SEC-04: Admin route middleware**         | Next.js middleware runs before every request to /admin/\* and /reporter/\*. Unauthenticated requests redirected before any page code runs. |
| **SEC-05: Input validation**               | All inputs validated on both client (UX) and server/database level. Client-side validation alone is never the security boundary.           |
| **SEC-06: Image uploads**                  | File type validated by MIME type, not extension. Max sizes enforced at upload API level.                                                   |
| **SEC-07: Brute force protection**         | 5 failed login attempts = 15-minute lockout. Enforced by Supabase Auth.                                                                    |
| **SEC-08: API key security**               | API keys hashed (SHA-256) before storage. Raw key shown only once at creation. No mechanism to retrieve raw key.                           |

## **Performance**

| **Rule / Constraint**            | **Detail**                                                                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **PERF-01: Public page load**    | Public pages render visible content within 3 seconds on simulated 3G (12 Mbps, 55ms RTT).                              |
| **PERF-02: Server components**   | All public pages use Next.js server components. No client-side data fetching on initial page load.                     |
| **PERF-03: Admin page load**     | Admin pages render within 5 seconds. Client-side fetching acceptable for interactive forms.                            |
| **PERF-04: Database indexes**    | All Supabase queries that power public pages use indexed columns. See Blueprint B.7.1 for required indexes.            |
| **PERF-05: Realtime efficiency** | Supabase Realtime sends only diffs, not full page reloads. Live match page subscribes only to events for one match_id. |

## **Accessibility**

| **Rule / Constraint**            | **Detail**                                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **A11Y-01: Colour contrast**     | All text meets WCAG AA contrast ratio (4.5:1 for normal, 3:1 for large text).                               |
| **A11Y-02: Alt text**            | All images - logos, photos, article covers - must have descriptive alt text attributes.                     |
| **A11Y-03: Keyboard navigation** | All interactive elements reachable and operable by keyboard alone.                                          |
| **A11Y-04: Tap target size**     | All tappable elements minimum 44×44px on mobile.                                                            |
| **A11Y-05: Semantic HTML**       | Proper use of heading hierarchy (h1→h2→h3). Tables used only for tabular data. Lists used for list content. |

## **Reliability**

| **Rule / Constraint**                     | **Detail**                                                                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **REL-01: Supabase backups**              | Automatic daily backups. Point-in-time recovery enabled before Phase 2 launch.                                                                |
| **REL-02: Build gate**                    | Vercel deployment blocked if npm run build fails. Broken code cannot reach production.                                                        |
| **REL-03: TypeScript strict**             | TypeScript strict mode enabled. Type errors treated as build failures.                                                                        |
| **REL-04: Error boundaries**              | All public pages have an error boundary showing a friendly error page if Supabase query fails.                                                |
| **REL-05: Graceful Realtime degradation** | If Supabase Realtime connection drops on live match page, last known score remains visible with a 'Connection lost - reconnecting' indicator. |

## **Data Integrity**

| **Rule / Constraint**                      | **Detail**                                                                                         |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **DI-01: No cascade-delete of match data** | Deleting a team or player does not delete match records or match events.                           |
| **DI-02: UUID primary keys**               | All tables use UUID PKs. Sequential integer IDs never used.                                        |
| **DI-03: Soft deletes**                    | Entities with historical data use status fields, not hard deletion.                                |
| **DI-04: Timestamps**                      | All tables include created_at defaulting to now(). Editable tables include updated_at via trigger. |
| **DI-05: Audit trail**                     | All score corrections by Super Admin logged in match_audit. Records are immutable.                 |

# **Appendix A - Global Permissions Matrix**

Y = Allowed. N = Not allowed. P = Partial / depends on Super Admin permission toggle.

## **Public Content**

| **Action**                       | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| -------------------------------- | ------- | --------------------- | ---------------- | --------------- |
| View standings                   | **✓**   | **✓**                 | **✓**            | **✓**           |
| View fixtures and results        | **✓**   | **✓**                 | **✓**            | **✓**           |
| View team profiles               | **✓**   | **✓**                 | **✓**            | **✓**           |
| View player profiles             | **✓**   | **✓**                 | **✓**            | **✓**           |
| View league profiles             | **✓**   | **✓**                 | **✓**            | **✓**           |
| View tournament groups & bracket | **✓**   | **✓**                 | **✓**            | **✓**           |
| View published news articles     | **✓**   | **✓**                 | **✓**            | **✓**           |
| View top scorers / leaderboards  | **✓**   | **✓**                 | **✓**            | **✓**           |
| View live match page             | **✓**   | **✓**                 | **✓**            | **✓**           |

## **Teams & Players**

| **Action**                      | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| ------------------------------- | ------- | --------------------- | ---------------- | --------------- |
| Add a new team                  | **✗**   | **✗**                 | **✓**            | **✓**           |
| Edit team details / description | **✗**   | **✗**                 | **✓**            | **✓**           |
| Upload team logo / cover image  | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Deactivate / reactivate a team  | **✗**   | **✗**                 | **✓**            | **✓**           |
| Delete a team                   | **✗**   | **✗**                 | **✗**            | **✓**           |
| Register a new player           | **✗**   | **✗**                 | **✓**            | **✓**           |
| Edit player details / biography | **✗**   | **✗**                 | **✓**            | **✓**           |
| Transfer player to new team     | **✗**   | **✗**                 | **✓**            | **✓**           |
| Bulk import players (CSV)       | **✗**   | **✗**                 | **✓**            | **✓**           |
| Mark player inactive / retired  | **✗**   | **✗**                 | **✓**            | **✓**           |

## **Fixtures, Results & Matches**

| **Action**                 | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| -------------------------- | ------- | --------------------- | ---------------- | --------------- |
| Schedule a new fixture     | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Edit a scheduled fixture   | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Postpone a fixture         | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Enter a match result       | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Correct a completed result | **✗**   | **✗**                 | **✗**            | **✓**           |
| Delete a scheduled fixture | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Delete a completed match   | **✗**   | **✗**                 | **✗**            | **✗**           |

## **Tournaments / Nawetans**

| **Action**                          | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| ----------------------------------- | ------- | --------------------- | ---------------- | --------------- |
| Create a tournament                 | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Edit tournament description/history | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Create groups & assign teams        | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Generate group fixtures             | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Transition to knockout stage        | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Generate knockout bracket           | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Advance winners in bracket          | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Enter penalty shootout score        | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Archive / close a tournament        | **✗**   | **✗**                 | **✗**            | **✓**           |

## **Live Match & Reporter**

| **Action**                       | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| -------------------------------- | ------- | --------------------- | ---------------- | --------------- |
| Start / end a live match session | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Record a goal event              | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Record a card event              | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Record a substitution event      | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Undo last event                  | **✗**   | **Partial**           | **Partial**      | **✓**           |

## **News & Content**

| **Action**                   | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| ---------------------------- | ------- | --------------------- | ---------------- | --------------- |
| Write and publish articles   | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Edit own articles            | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Edit other editors' articles | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Unpublish articles           | **✗**   | **Partial**           | **Partial**      | **✓**           |
| Delete articles              | **✗**   | **✗**                 | **✓**            | **✓**           |

## **User Management**

| **Action**                    | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| ----------------------------- | ------- | --------------------- | ---------------- | --------------- |
| Invite League Admin           | **✗**   | **✗**                 | **✗**            | **✓**           |
| Invite Reporter               | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Invite Content Editor         | **✗**   | **✗**                 | **✗**            | **✓**           |
| Toggle user permissions       | **✗**   | **✗**                 | **✗**            | **✓**           |
| Set Content Editor as global  | **✗**   | **✗**                 | **✗**            | **✓**           |
| Deactivate / reactivate users | **✗**   | **✗**                 | **✗**            | **✓**           |

## **Revenue & Platform**

| **Action**                  | **Fan** | **Reporter / Editor** | **League Admin** | **Super Admin** |
| --------------------------- | ------- | --------------------- | ---------------- | --------------- |
| Manage advertisements       | **✗**   | **✗**                 | **✗**            | **✓**           |
| Manage league subscriptions | **✗**   | **✗**                 | **✗**            | **✓**           |
| View financial reports      | **✗**   | **✗**                 | **Partial**      | **✓**           |
| Issue and revoke API keys   | **✗**   | **✗**                 | **✗**            | **✓**           |
| Manage platform settings    | **✗**   | **✗**                 | **✗**            | **✓**           |

# **Appendix B - Glossary**

| **Acceptance criteria**      | Testable conditions that must all be true for a user story to be considered complete.                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Active season**            | A season with status = active. Only one season per league can be active at a time.                                          |
| **Bracket**                  | A visual diagram showing knockout round pairings and results from first round to the final.                                 |
| **Business rule**            | A constraint the system must enforce regardless of who is logged in or how they access it.                                  |
| **Completed match**          | A match with status = completed and both home and away scores entered.                                                      |
| **Content Editor**           | A user role for journalists and writers. Creates and publishes news articles.                                               |
| **DXA**                      | Device-independent units used in Word/OOXML documents. 1 inch = 1440 DXA.                                                   |
| **Fan**                      | A member of the public visiting the website. No login required.                                                             |
| **Global Content Editor**    | A Content Editor with is_global = true. Their articles are platform-wide, not scoped to one league.                         |
| **Group stage**              | The first phase of a Nawetans tournament where teams play round-robin within their group.                                   |
| **Head-to-head**             | The result of the direct match(es) between two specific teams, used as a tiebreaker.                                        |
| **is_global**                | A boolean field on profiles. When true for a Content Editor, their articles are not scoped to any league.                   |
| **Knockout**                 | A single-elimination round where the loser is eliminated from the tournament.                                               |
| **League Admin**             | An authenticated user who manages one specific league's data.                                                               |
| **Live match**               | A match with status = live, currently being tracked in real time.                                                           |
| **Match event**              | A recorded action within a match - goal, assist, card, substitution, or penalty.                                            |
| **Nawetans**                 | A community football competition format common in The Gambia, combining group stages and knockout rounds.                   |
| **Penalty shootout**         | A tiebreaker for knockout matches that are drawn after 90 minutes.                                                          |
| **Permissions (toggleable)** | A predefined set of permissions that Super Admin can enable or disable per user, stored in profiles.permissions as JSONB.   |
| **Reporter**                 | An authenticated user who records live match events from the ground.                                                        |
| **RLS**                      | Row Level Security - a Supabase/PostgreSQL feature restricting which rows a user can see or modify based on their identity. |
| **Season**                   | A time-bounded competition period within a league (e.g. 2026 Season).                                                       |
| **Slug**                     | A URL-friendly version of a name - e.g. banjul-united from Banjul United.                                                   |
| **Soft delete**              | Setting a status field (inactive, retired, archived) instead of removing a record from the database.                        |
| **Super Admin**              | A Tech Palz platform operator with full access to all leagues, users, ads, and billing.                                     |
| **Tournament**               | A structured competition within a season - league, nawetans, cup, or friendly format.                                       |
| **User story**               | A feature description from the perspective of the user who benefits from it.                                                |

_Tech Palz - Gambia Sports Platform | SRS v1.0 | Document 2 of 2 | May 2026_
