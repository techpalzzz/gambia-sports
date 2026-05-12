**TECH PALZ**

**Gambia Sports Platform**

_UI / UX Design Specification_

Visual Design · Interaction Patterns · Page-by-Page Wireframes · Component Library

| **Document type**       | UI/UX Design Specification                                                  |
| ----------------------- | --------------------------------------------------------------------------- |
| **Version**             | 1.0                                                                         |
| **Date**                | May 2026                                                                    |
| **Companion documents** | Blueprint v2.0 (Document 1) \| SRS v1.0 (Document 2)                        |
| **Scope**               | Public site, Admin dashboard, Reporter tool - all phases                    |
| **Primary audience**    | Developers building the UI, project lead, stakeholders reviewing the design |

**SECTION 1**

**Design System**

_Colours, typography, spacing, components - the rules every page follows_

# **1.1 Design Principles**

Every design decision on the Gambia Sports Platform is guided by four principles:

| **Mobile First**<br><br>Designed for 375px phones on 3G. Desktop is an enhancement, not the baseline. | **Speed**<br><br>Content visible in 3 seconds on 3G. No layout shift. No loading spinners on first paint. | **Clarity**<br><br>Scores, standings, and fixtures must be readable at a glance. Data first, decoration second. | **Local Identity**<br><br>Green and red palette mirrors the Gambian flag. The platform feels unmistakably Gambian. |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |

# **1.2 Colour Palette**

The palette is built around the Gambian national colours - deep green and red - with carefully chosen supporting tones for data visualisation, status indicators, and neutral surfaces.

## **Primary Colours**

|     | **Name & Hex**                            | **Usage**                                                                                          |
| --- | ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
|     | **Forest Green - Primary**<br><br>#1A6B3A | Navigation bar background, primary buttons, section banners, heading accents, active states        |
|     | **Midnight Green - Dark**<br><br>#0F4A28  | Navigation bar bg on dark. Hover state for primary buttons. Dark header text on green backgrounds. |
|     | **Leaf Green - Mid**<br><br>#2D8A50       | Secondary buttons, icon fills, success badges, promotion zone highlights in standings table        |
|     | **Pale Green - Light**<br><br>#E8F5EE     | Card backgrounds for success states, green callout boxes, promotion zone row tints                 |
|     | **Gambia Red**<br><br>#C1272D             | Relegation zone highlights, red card badges, error states, destructive action buttons              |
|     | **Pale Red**<br><br>#FEE2E2               | Error callout backgrounds, relegation zone row tints, red card icon backgrounds                    |

## **Neutral & Surface Colours**

|     | **Name & Hex**                       | **Usage**                                                         |
| --- | ------------------------------------ | ----------------------------------------------------------------- |
|     | **White**<br><br>#FFFFFF             | Card backgrounds, input fields, table row alternates              |
|     | **Off-white Surface**<br><br>#F3F4F6 | Page background behind all cards and content                      |
|     | **Light Gray**<br><br>#F9FAFB        | Alternating table rows (zebra stripe), secondary card surfaces    |
|     | **Border Gray**<br><br>#E5E7EB       | All card and component borders, divider lines, table cell borders |
|     | **Muted Text Gray**<br><br>#6B7280   | Labels, secondary text, captions, placeholder text, metadata      |
|     | **Body Text Dark**<br><br>#1F2937    | All primary body text, table data, headings within cards          |
|     | **Near Black**<br><br>#111827        | Page-level headings, the heaviest text on the page                |

## **Status & Data Colours**

|     | **Name & Hex**                   | **Usage**                                                      |
| --- | -------------------------------- | -------------------------------------------------------------- |
|     | **Win Green**<br><br>#16A34A     | W badge in form strip, win result indicator                    |
|     | **Draw Gray**<br><br>#9CA3AF     | D badge in form strip, draw result indicator                   |
|     | **Loss Red**<br><br>#DC2626      | L badge in form strip, loss result indicator                   |
|     | **Live Red**<br><br>#EF4444      | LIVE badge on live match cards and navigation indicator        |
|     | **Amber Warning**<br><br>#D97706 | Yellow card badge, postponed status badge, amber callout boxes |
|     | **Info Blue**<br><br>#1D4ED8     | Links, info callout boxes, external URL colour                 |

# **1.3 Typography**

The platform uses the system sans-serif stack (Inter, then system-ui) for all UI text. This keeps file sizes small, loads instantly, and renders correctly on all Gambian mobile devices.

| **Element**          | **Font**    | **Size**         | **Weight** | **Colour**        | **Usage**                                                     |
| -------------------- | ----------- | ---------------- | ---------- | ----------------- | ------------------------------------------------------------- |
| Page title / H1      | System sans | 32px / 2rem      | 700        | #111827           | Page names on public pages - 'League Standings', 'Fixtures'   |
| Section heading / H2 | System sans | 24px / 1.5rem    | 600        | #111827           | Major sections within a page - 'Group A', 'Recent Results'    |
| Card heading / H3    | System sans | 18px / 1.125rem  | 600        | #1F2937           | Team name on result card, article headline                    |
| Body text            | System sans | 16px / 1rem      | 400        | #1F2937           | Descriptions, article body, form labels                       |
| Table data           | System sans | 14px / 0.875rem  | 400        | #1F2937           | All standings, fixtures, and results table data               |
| Table header         | System sans | 12px / 0.75rem   | 600        | #FFFFFF           | Column headers inside tables - bold white on green background |
| Caption / meta       | System sans | 13px / 0.8125rem | 400        | #6B7280           | Dates, venues, author names, timestamps                       |
| Badge text           | System sans | 11px / 0.6875rem | 600        | varies            | Status badges: LIVE, WIN, DRAW, GK, DEF, etc.                 |
| Navigation links     | System sans | 15px / 0.9375rem | 500        | #CCFFCC on nav bg | All navigation items in top bar                               |
| Button text          | System sans | 15px / 0.9375rem | 600        | varies            | Primary and secondary button labels                           |

## **Line height & Spacing**

- Body text line height: 1.6 (comfortable for reading on mobile)
- Heading line height: 1.2
- Table row height: minimum 44px (tap target compliance)
- Card internal padding: 16px on mobile, 20px on desktop
- Section gap: 24px between cards on the same page

# **1.4 Spacing & Grid**

The platform uses an 8px base grid. All spacing, padding, and margin values are multiples of 8px. This creates visual consistency across all pages and screen sizes.

| **Token**         | **Value** | **Usage**                                                                  |
| ----------------- | --------- | -------------------------------------------------------------------------- |
| space-1           | 8px       | Icon-to-label gap, badge internal padding, tight inline spacing            |
| space-2           | 16px      | Card internal padding (mobile), form field internal padding, list item gap |
| space-3           | 24px      | Card internal padding (desktop), gap between sibling cards                 |
| space-4           | 32px      | Section gap on page - between standings and fixtures sections              |
| space-6           | 48px      | Major section gap - between nav bar and first content area                 |
| space-8           | 64px      | Page-level padding top/bottom on desktop                                   |
| max-width         | 768px     | Maximum content width on mobile (full width) and tablet                    |
| max-width-desktop | 1080px    | Maximum content width on desktop - centred with auto margins               |

## **Responsive Breakpoints**

| **Breakpoint** | **Width**      | **Layout behaviour**                                                                                                   |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Mobile (base)  | < 640px        | Single column. Full-width cards. Navigation collapses to hamburger. Tap targets 44px minimum.                          |
| Tablet         | 640px - 1023px | Two-column grid for cards where appropriate. Navigation expands to horizontal links.                                   |
| Desktop        | ≥ 1024px       | Content capped at 1080px, centred. Three-column grid for team cards. Sidebar appears on team and player profile pages. |

# **1.5 Component Library**

## **Navigation Bar**

The navigation bar is the primary wayfinding element. It appears on every public page in identical form. It is sticky - it remains visible as the user scrolls.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

| **Element**          | **Design detail**                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Logo / wordmark**  | Left-aligned. White text on forest green background. Tapping returns to the home page.                                                                                                |
| **Nav links**        | Right-aligned horizontal list on desktop. Each link is 15px medium weight in pale green (#CCFFCC) to stand out on the dark green background.                                          |
| **Active state**     | The current page link has a white underline (2px solid). The colour remains the same - only the underline distinguishes active.                                                       |
| **Mobile hamburger** | On screens below 640px, the nav links collapse. A hamburger icon (three horizontal lines) appears on the right. Tapping it slides in a full-screen nav overlay from the right.        |
| **Mobile overlay**   | The overlay covers the full screen. Background is forest green (#1A6B3A). Links are stacked vertically at 20px each with 24px vertical spacing. A close (×) button appears top-right. |
| **Admin indicator**  | When a League Admin or Super Admin is logged in on the admin dashboard, a separate admin navigation sidebar replaces the top bar. The public nav top bar is not shown in admin views. |

## **Match Result Card**

Used on the home page, results page, and team profile pages. Shows a completed match.

Tuesday 14 May 2026 · Independence Stadium

| **Banjul FC** | **2 - 1** | **Serrekunda United** |
| ------------- | --------- | --------------------- |

| **Element**            | **Design detail**                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Card container**     | White background, 1px border in #E5E7EB, 8px border radius. Full width on mobile. 16px padding on all sides.         |
| **Match metadata**     | Date and venue in muted gray (#6B7280), 13px, above the score row.                                                   |
| **Score block**        | Dark background pill (#111827) with white score text (28px bold). Centre of the card. Always shows final score.      |
| **Team names**         | 24px bold, dark (#1F2937). Right-aligned for home team, left-aligned for away team. Tap navigates to team profile.   |
| **Winner emphasis**    | Winning team name is shown in forest green (#1A6B3A) instead of dark. No extra bold - colour alone marks the winner. |
| **Card tap behaviour** | Tapping anywhere on the card navigates to the match detail page (live in Phase 3, result summary in Phase 1).        |

## **Fixture Card**

Used on the home page and fixtures page. Shows an upcoming match.

| **Brikama United** | **Sat 18 May**<br><br>**15:00**<br><br>Banjul Stadium | **Yundum Stars** |
| ------------------ | ----------------------------------------------------- | ---------------- |

| **Element**      | **Design detail**                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| **Centre panel** | Green-tinted background (#E8F5EE). Shows date, kick-off time (large), and venue. Rounded corners. |
| **Time format**  | 24-hour format (15:00 not 3:00 PM). Date in short form: Sat 18 May.                               |
| **Team names**   | 22px bold. Right-aligned for home, left-aligned for away. No score shown - just the matchup.      |
| **Venue text**   | 13px muted gray below the time. Truncated to one line with ellipsis if too long.                  |

## **Form Strip**

Shows a team's last five results as colour-coded badges. Used on team profile pages and optionally in the standings table.

**W** **W** **D** **L** **W** _← oldest newest →_

| **Element**       | **Design detail**                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **W badge**       | 32×32px rounded square. Background: #16A34A (win green). Text: white, 11px bold.           |
| **D badge**       | 32×32px rounded square. Background: #9CA3AF (neutral gray). Text: #1F2937 dark, 11px bold. |
| **L badge**       | 32×32px rounded square. Background: #DC2626 (loss red). Text: white, 11px bold.            |
| **Order**         | Left = oldest, right = most recent. The rightmost badge is the last completed match.       |
| **Tap behaviour** | Each badge is tappable. Tapping navigates to that specific result's match detail page.     |

## **Status Badges**

Used throughout the platform to communicate match status, player position, and competition stage.

| **Badge** | **Background**       | **Text colour** | **Used for**                                         |
| --------- | -------------------- | --------------- | ---------------------------------------------------- |
| LIVE      | #EF4444 (red)        | White           | Live matches - flashes with a subtle pulse animation |
| COMPLETED | #6B7280 (gray)       | White           | Completed matches in admin match list                |
| SCHEDULED | #1D4ED8 (blue)       | White           | Upcoming fixtures in admin match list                |
| POSTPONED | #D97706 (amber)      | White           | Postponed matches                                    |
| GK        | #0F4A28 (dark green) | White           | Goalkeeper position badge on player cards            |
| DEF       | #1A6B3A (green)      | White           | Defender position badge                              |
| MID       | #1D4ED8 (blue)       | White           | Midfielder position badge                            |
| FWD       | #DC2626 (red)        | White           | Forward position badge                               |
| PROMOTED  | #16A34A (green)      | White           | Promotion zone indicator in standings - Championship |
| RELEGATED | #DC2626 (red)        | White           | Relegation zone indicator in standings               |

# **1.6 Iconography**

The platform uses a consistent icon set throughout. Icons are always 20px on mobile and 18px on desktop, in the same colour as the surrounding text unless they communicate status.

| **Icon**      | **Represents**          | **Colour**    | **Used on**                            |
| ------------- | ----------------------- | ------------- | -------------------------------------- |
| ⚽ Ball       | Football, matches       | Match colour  | Match cards, nav                       |
| 🏆 Trophy     | League title, champions | Amber #D97706 | League profile, standings top position |
| 📅 Calendar   | Fixtures, dates         | Muted gray    | Fixture cards, admin scheduling        |
| 📊 Chart      | Standings, statistics   | Green         | Standings page, stats pages            |
| 👤 Person     | Player, team roster     | Dark gray     | Player profile, squad list             |
| 🔴 Red circle | Live match indicator    | #EF4444       | Live match card, LIVE badge pulse      |
| ✏️ Pencil     | Edit action             | Muted gray    | Admin edit buttons                     |
| ✓ Tick        | Completed, confirmed    | Green         | Success states, completed match status |
| ✗ Cross       | Error, dismissed        | Red           | Error states, form validation          |
| 🔒 Lock       | Protected, admin only   | Muted gray    | Admin-only sections in navigation      |

**SECTION 2**

**Public Pages**

_Home, Standings, Fixtures, Results, Teams, Players, Tournaments, News_

# **2.1 Home Page**

The home page is the first impression for every visitor. It must communicate what the platform is, show the most critical live information, and route the user to the right section within one tap. On mobile it is a single scrolling column. On desktop it uses a two-column layout.

## **Mobile Layout (375px)**

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**Banjul Community League**

2026 Season · Matchday 14 of 30

**Latest Results**

| **Banjul FC**      | **2 - 1** | **Serrekunda Utd** |
| ------------------ | --------- | ------------------ |
| **Brikama United** | **0 - 0** | **Yundum Stars**   |

**→ View all results**

**Upcoming Fixtures**

| **Kanifing FC** | **Sat 15:00** | **Banjul FC** |
| --------------- | ------------- | ------------- |

**→ View all fixtures**

| **Element**          | **Design detail**                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Page title area**  | League name in 28px bold. Season name and matchday count in muted gray below. Full width, white background, 16px padding.     |
| **Section headings** | 'Latest Results' and 'Upcoming Fixtures' in 20px bold, 8px bottom margin. Followed immediately by the list.                   |
| **Results layout**   | Three-column row: right-aligned home team \| dark score pill \| left-aligned away team. Winner in green. Zebra striped rows.  |
| **Fixtures layout**  | Same three-column structure. Centre panel is green-tinted with date and time. No score - just the matchup.                    |
| **View all links**   | Blue link text (→ View all results). 16px, appears after the list. Routes to the respective full-page list.                   |
| **Desktop layout**   | Two-column layout: left column shows results (60% width), right column shows fixtures (40% width). Both scroll independently. |

# **2.2 Standings Page**

The standings page is the most-visited page on the platform. The table must be immediately scannable and work on a 375px screen without horizontal scrolling.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**League Standings**

Banjul Community League · 2026 Season

| **#** | **Team**          | **P** | **W** | **D** | **L** | **GD** | **Pts** |
| ----- | ----------------- | ----- | ----- | ----- | ----- | ------ | ------- |
| **1** | **Banjul FC**     | 14    | 10    | 3     | 1     | +18    | **33**  |
| **2** | Serrekunda United | 14    | 9     | 2     | 3     | +12    | **29**  |
| **3** | Brikama United    | 14    | 7     | 4     | 3     | +7     | **25**  |
| **4** | Kanifing FC       | 14    | 6     | 3     | 5     | +2     | **21**  |
| **5** | Yundum Stars      | 14    | 5     | 4     | 5     | −2     | **19**  |
| **6** | West Coast FC     | 14    | 3     | 2     | 9     | −12    | **11**  |
| **7** | Kombo North Utd   | 14    | 1     | 2     | 11    | −25    | **5**   |

■ Promotion / Title challenge ■ Relegation zone

| **Element**                     | **Design detail**                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Table column width strategy** | Position (#) is narrow (44px). Team name column is widest. All stat columns (P,W,D,L,GD,Pts) are equal narrow width. On mobile, GF and GA columns are hidden - only GD and Pts shown. |
| **Promotion rows (top N)**      | Pale green background (#E8F5EE). Team name in dark green (#0F4A28). Points in dark green bold.                                                                                        |
| **Relegation rows (bottom M)**  | Pale red background (#FEE2E2). Team name in red (#991B1B). Points in red bold.                                                                                                        |
| **Team name tap**               | Every team name in the table is a tappable link to /teams/\[slug\].                                                                                                                   |
| **Points column**               | Bold in all rows. This is the most important number - visually emphasised.                                                                                                            |
| **Column headers**              | 12px white bold text on forest green background. Abbreviated column names (P, W, D, L, GD, Pts).                                                                                      |
| **Season selector**             | Appears above the table as a dropdown when more than one season exists. Defaults to active season.                                                                                    |
| **Key / legend**                | Below the table: coloured squares with labels for promotion and relegation zones.                                                                                                     |

# **2.3 Team Profile Page**

The team profile is the richest public page. It combines admin-authored content (description, history) with live data (form, squad, recent results, upcoming fixtures). It is designed to feel like a club Wikipedia page.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

⬡ **Banjul FC**

🏟 Independence Stadium · Founded 1952 · Red & White

**W** **W** **D** **L** **W** _Last 5 results_

**Season Stats**

| **10**<br><br>Wins | **3**<br><br>Draws | **1**<br><br>Losses | **33**<br><br>Points |
| ------------------ | ------------------ | ------------------- | -------------------- |

**About Banjul FC**

Banjul FC is one of the oldest football clubs in The Gambia, founded in 1952 by dock workers in the capital city. The club's colours of red and white have been worn by generations of Banjul's most talented players. Known for their attacking style and passionate home support at Independence Stadium, they have won the national league title four times...

**→ Read full history**

**Squad**

| **#**  | **Pos** | **Name**        |     |
| ------ | ------- | --------------- | --- |
| **1**  | **GK**  | Muhammed Jallow | →   |
| **4**  | **DEF** | Lamin Ceesay    | →   |
| **9**  | **FWD** | Saidou Touray   | →   |
| **10** | **MID** | Omar Sanneh     | →   |

| **Element**           | **Design detail**                                                                                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Team hero header**  | Full-width dark green banner (#0F4A28). Contains team badge (placeholder hexagon), team name (36px white bold), home ground / founded year / colours (muted green, 19px), and form strip. |
| **Hero height**       | 240px on mobile, 320px on desktop. Cover image displayed if uploaded - team badge floats over it.                                                                                         |
| **Stats row**         | Four equal stat cards below the hero: Wins, Draws, Losses, Points. Each has a large number (36px bold) and a label (13px muted).                                                          |
| **About section**     | Team description from the admin-authored description field. Shows first ~200 characters as a preview with '→ Read full history' link to expand or navigate to the full text.              |
| **History tab**       | Full history text accessible by tapping 'Read full history'. On mobile this expands the section. On desktop a sidebar shows it.                                                           |
| **Squad table**       | Jersey number (bold), position badge (colour-coded), player name. Each row taps to player profile. Sorted by jersey number.                                                               |
| **Upcoming fixtures** | Shown below the squad: next 3 matches. Same fixture card format as the home page.                                                                                                         |
| **Recent results**    | Below upcoming fixtures: last 5 results in compact result row format.                                                                                                                     |

# **2.4 Player Profile Page**

The player profile is rich with admin-authored content and, in Phase 2, populated with match statistics. The page is designed to feel like a professional footballer's profile card.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

| 👤<br><br>**#10**<br><br>**MID** | **Omar Sanneh**<br><br>Banjul FC<br><br>🏳 Gambian · Age 24 |
| -------------------------------- | ----------------------------------------------------------- |

**2026 Season Stats**

| **12**<br><br>Appearances | **7**<br><br>Goals | **4**<br><br>Assists | **2**<br><br>Yellow cards |
| ------------------------- | ------------------ | -------------------- | ------------------------- |

**Biography**

Omar Sanneh is a technically gifted central midfielder known for his vision and precise passing. He joined Banjul FC in 2024 after two impressive seasons at Yundum Stars, where he was the league's top assist provider. A graduate of the Gambia Football Academy youth programme, Omar is widely regarded as one of the most promising midfielders of his generation...

**Career History**

| **Club**      | **Period**     | **Apps / Goals**   |
| ------------- | -------------- | ------------------ |
| **Banjul FC** | 2024 - Present | 24 apps · 13 goals |
| Yundum Stars  | 2022 - 2024    | 40 apps · 18 goals |

| **Element**                         | **Design detail**                                                                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Player hero - two-column layout** | Left column: player photo (or person placeholder icon), jersey number in white bold, position badge. Right column: player name (32px bold white), club name (linked, pale green), nationality and age. |
| **Jersey number size**              | 32px bold white - intentionally large. This is a distinctive visual identifier for the player.                                                                                                         |
| **Position badge in hero**          | 20px bold, pale green (#CCFFCC) text on dark green background. Position abbreviation (GK, DEF, MID, FWD).                                                                                              |
| **Stats row**                       | Four equal cards: Appearances, Goals, Assists, Yellow Cards. Large numbers (36px bold), small labels.                                                                                                  |
| **Biography section**               | Full-text biography from admin-authored field. No character limit - scrollable on mobile.                                                                                                              |
| **Career history table**            | Three columns: Club (bold, linked), Period (dates), and Apps/Goals. Sorted newest first (current club at top).                                                                                         |
| **Phase 2 stats table**             | In Phase 2, a full per-season statistics table replaces the simplified 4-card row. Shows: Season, Team, Apps, Goals, Assists, Yellow, Red, in a scrollable table.                                      |

# **2.5 League & Tournament Profile Page**

Every league and Nawetans competition has a dedicated profile page. The page combines admin-authored description and history with live competition data.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**🏆 Banjul Community League**

Founded 1988 · Banjul, The Gambia · 14 Teams · Active

Banjul Community League · 2026 Season - Matchday 14

**About This League**

The Banjul Community League was founded in 1988 as a way to bring structured football to the capital's neighbourhoods. The league has grown from an initial 6 teams to 14, with clubs representing every ward in Banjul. Known for competitive, high-quality football, the BCL has produced several players who have gone on to represent the Gambian national team...

**→ Read full history**

**Current Standings**

_\[ Embedded standings table - top 5 rows shown \]_

**→ Full standings**

**Past Champions**

| **Season** | **Champions**  | **Runner-up**     |
| ---------- | -------------- | ----------------- |
| **2025**   | Banjul FC      | Serrekunda United |
| **2024**   | Brikama United | Banjul FC         |

# **2.6 Nawetans Tournament Pages**

The Nawetans section has three distinct views: the tournament overview, the group standings tables, and the knockout bracket. Each is designed for at-a-glance readability on mobile.

## **Group Standings View**

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**Nawetans 2026 - Serrekunda West**

Group Stage · Round 2 of 3

**GROUP A**

| **#** | **Team**         | **P** | **W** | **D** | **GD** | **Pts** |
| ----- | ---------------- | ----- | ----- | ----- | ------ | ------- |
| **1** | Latrikunda Lions | 4     | 3     | 1     | +6     | **10**  |
| **2** | Bakau FC         | 4     | 2     | 2     | +3     | **8**   |
| **3** | Old Town United  | 4     | 1     | 1     | −2     | 4       |
| **4** | Churchill Town   | 4     | 0     | 0     | −7     | 0       |

■ Qualifies for knockout round

| **Element**         | **Design detail**                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Group label**     | Small all-caps label 'GROUP A' above each group table, in muted gray.                                                                     |
| **Qualifying rows** | Top 2 (or N as configured) rows have pale green background (#E8F5EE) and green text. These are the teams advancing to the knockout stage. |
| **Points column**   | Bold in all rows. Qualifying rows have points in a green-tinted cell for extra emphasis.                                                  |
| **Multiple groups** | On the groups overview page (/tournaments/\[slug\]/groups), all groups are stacked vertically, separated by a divider and a group label.  |

## **Knockout Bracket View**

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**Nawetans 2026 - Knockout Stage**

| **Semi-Finals**                                                           | **Final**                                                               | **Result**                   |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------- |
| **Latrikunda Lions**<br><br>_vs_<br><br>Bakau FC<br><br>2 - 0 (completed) | **Latrikunda Lions**<br><br>_vs_<br><br>_TBD_<br><br>Sat 25 May · 16:00 | **🏆 Champion**<br><br>_TBD_ |

| **Element**                  | **Design detail**                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bracket layout on mobile** | Three-column table: Semi-final \| Final \| Champion. On mobile, this scrolls horizontally (the only page with intentional horizontal scroll). |
| **Completed match cell**     | Shows both teams, score, and '(completed)' label. Winner name in green bold.                                                                  |
| **Upcoming match cell**      | Pale green background. Shows known team (qualifier from left) vs TBD or known opponent. Shows scheduled date and time.                        |
| **Champion cell**            | Gray tinted, 🏆 icon, 'Champion' label. Shows TBD until the final is played. Fills in with winner's name after the final.                     |
| **Penalty shootout display** | If a knockout match required penalties: score shown as '1 - 1 (aet) · 4 - 3 pens'. Both the 90-minute score and penalty score are visible.    |

# **2.7 News Page & Article View**

The news section is a Phase 2 feature. Articles are displayed in a clean editorial layout optimised for reading on mobile.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**News**

Latest from Gambian football

**MATCH REPORT**

**Banjul FC hold off Serrekunda United in a five-goal thriller**

A brilliant late goal by Omar Sanneh rescued a point for Banjul FC in a pulsating contest at Independence Stadium on Saturday...

14 May 2026 · Awa Touray

**TRANSFER NEWS**

**Lamin Ceesay set to join rivals after contract talks collapse**

Banjul FC's long-serving defender Lamin Ceesay is reportedly in talks with Serrekunda United after failing to agree a new deal...

12 May 2026 · Isatou Jallow

| **Element**                 | **Design detail**                                                                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Article card layout**     | No image by default (images are optional). Category tag (green, bold, small caps) > headline (22px bold) > excerpt (19px gray) > meta line (author · date, 17px muted). Full-width, separated by dividers. |
| **Category tag**            | 11px bold, forest green (#1A6B3A). Always uppercase. MATCH REPORT / TRANSFER NEWS / INJURY UPDATE / OPINION.                                                                                               |
| **Cover image (optional)**  | If a cover image is uploaded: 16:9 ratio image at top of card, full width, rounded corners top only. Image is lazy-loaded.                                                                                 |
| **Article page layout**     | Single-column. Full-width cover image at top. Headline (32px bold). Author + date (muted). Body text (18px, 1.8 line height for comfortable reading). Related articles section at the bottom.              |
| **Article body formatting** | Tiptap-rendered HTML: headings (h2, h3), paragraphs, bullet lists, blockquotes (left green border), bold, italic, inline images.                                                                           |

**SECTION 3**

**Admin Dashboard**

_The control centre for League Admins and Super Admin_

# **3.1 Admin Layout**

The admin interface uses a different layout from the public site. It has a left sidebar navigation, a top bar showing the admin's name and active league, and a main content area. The green palette is consistent with the public site but the UI is more dense and functional.

**GAMBIA SPORTS**

📊 Dashboard

⚽ Matches

📅 Fixtures

🏟 Teams

👤 Players

🏆 Tournaments

📰 News

👥 Users

_← Public site_

**Logout**

Banjul Community League · **Amadou Konateh (League Admin)**

**Dashboard**

| **14**<br><br>Teams | **168**<br><br>Players | **42**<br><br>Matches played | **3**<br><br>Upcoming |
| ------------------- | ---------------------- | ---------------------------- | --------------------- |

| **Element**                     | **Design detail**                                                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Sidebar width**               | 220px (22% of content area). Always visible on desktop. On mobile: collapses behind a hamburger button in the top bar.                  |
| **Sidebar background**          | Dark green (#0F4A28) matching the public nav bar. Creates visual continuity between admin and public.                                   |
| **Active sidebar link**         | Highlighted with a white left border (3px) and slightly brighter text. No background change - keeps the sidebar clean.                  |
| **Top bar**                     | White background. Right-aligned: league name (muted) + admin name (bold) + role label. Shows which league context the admin is in.      |
| **Content area background**     | Off-white (#F3F4F6). Cards within the content area are white with borders. Creates visual hierarchy.                                    |
| **Super Admin league selector** | A league selector dropdown appears in the top bar for Super Admin. Selecting a league switches all admin data to that league's context. |

# **3.2 Result Entry Form**

The most-used admin feature. Designed to be fast and error-proof. Large inputs, prominent team names, and a mandatory confirmation step.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**Enter Match Result**

Tuesday 14 May 2026 · Independence Stadium

| **Banjul FC**<br><br>HOME | **2**<br><br>-<br><br>**1** | **Serrekunda United**<br><br>AWAY |
| ------------------------- | --------------------------- | --------------------------------- |

\[ − \] Home Score: **2** \[ + \] \[ − \] Away Score: **1** \[ + \]

| Cancel | **Save Result: Banjul FC 2 - 1 Serrekunda United** |
| ------ | -------------------------------------------------- |

| **Element**             | **Design detail**                                                                                                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Score display**       | Two very large numbers (64px bold) with a dash between them, in a green-bordered panel. Numbers update in real time as the admin taps + and −.                                                     |
| **Score controls**      | Large − and + buttons on either side of each score number. Buttons are 44×44px minimum (tap-safe). Score cannot go below 0 - the − button disables at 0.                                           |
| **Team names**          | 22px bold. HOME / AWAY labels in small muted caps below each name.                                                                                                                                 |
| **Confirmation button** | Full-width, forest green background, white text. The button text includes the full proposed result: 'Save Result: Banjul FC 2 - 1 Serrekunda United'. The admin sees exactly what they are saving. |
| **Cancel**              | Secondary button (gray background) returns to the matches list without saving.                                                                                                                     |
| **Knockout mode**       | When the match is a knockout round, a second section appears below the main score: 'Penalty shootout scores' with two additional small inputs. Only visible for knockout matches.                  |
| **Success state**       | After saving: a green success banner slides in from the top: '✓ Result saved - Banjul FC 2 - 1 Serrekunda United'. Admin is returned to the matches list.                                          |

# **3.3 Schedule Fixture Form**

Clean, fast form for scheduling a new match. Validates against duplicate scheduling and prevents a team playing itself.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**Schedule New Fixture**

**Home Team**

Select home team ▾

**Away Team**

Select away team ▾

**Date**

DD / MM / YYYY

**Kick-off time**

HH : MM

**Venue**

e.g. Independence Stadium

**Create Fixture**

# **3.4 Tournament Management Pages**

The tournament admin pages walk the League Admin through the full Nawetans setup in a linear, step-by-step process: Create → Groups → Generate Fixtures → Enter Results → Transition to Knockout → Generate Bracket.

## **Step Indicator Pattern**

**① Create → ② Groups →** ③ Fixtures → ④ Knockout → ⑤ Complete

| **Element**           | **Design detail**                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Step indicator**    | Horizontal pill strip at the top of each tournament admin page. Completed steps are green and bold. Current step is green with underline. Future steps are muted gray. |
| **Step 1 - Create**   | Tournament name, format, number of groups, teams advancing per group, round-robin type, description, history, logo, cover image. One-page form.                        |
| **Step 2 - Groups**   | Admin creates group labels (Group A, B, etc.) and drags or selects teams into each group. Drag-and-drop on desktop; a select dropdown on mobile.                       |
| **Step 3 - Fixtures** | Admin taps 'Generate fixtures'. System shows a preview of all generated matches. Admin confirms. Admin then fills in dates for each match in an editable table.        |
| **Step 4 - Knockout** | Unlocked only when all group matches are completed. Admin confirms the qualifying teams from each group. System generates the bracket.                                 |
| **Step 5 - Complete** | Read-only summary showing tournament champion, top scorer, and a link to the public tournament page.                                                                   |

# **3.5 User Management Page**

The user management page is Super Admin-only. It presents all platform users in a table with inline permission toggles.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**User Management**

| **Name**           | **Role**           | **League**    | **Status**   | **Actions**                 |
| ------------------ | ------------------ | ------------- | ------------ | --------------------------- |
| **Amadou Konateh** | **League Admin**   | Banjul CL     | **Active**   | Edit Permissions Deactivate |
| **Awa Touray**     | **Content Editor** | Global        | **Active**   | Edit Permissions Deactivate |
| **Lamin Sanneh**   | **Reporter**       | Banjul CL     | **Active**   | Edit Permissions Deactivate |
| **Fatou Ceesay**   | **League Admin**   | Serrekunda UL | **Inactive** | Edit Reactivate             |

| **Element**           | **Design detail**                                                                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Role column**       | Role names are colour-coded to match the role throughout the platform: League Admin = green, Content Editor = purple, Reporter = teal, Super Admin = amber.                         |
| **Status column**     | 'Active' in green bold. 'Inactive' in muted gray.                                                                                                                                   |
| **Actions**           | Inline text links: Edit, Permissions, Deactivate / Reactivate. 'Permissions' opens a flyout panel showing all toggleable permissions as on/off switches.                            |
| **Permissions panel** | Slides in from the right. Lists all permissions for the user's role with toggle switches. Changes save immediately. A summary line shows how many permissions differ from defaults. |
| **Invite button**     | Green '+ Invite User' button above the table. Opens a drawer with the invitation form.                                                                                              |

**SECTION 4**

**Reporter Tool & Live Match**

_Mobile-optimised real-time event entry - Phase 3_

# **4.1 Reporter Tool**

The reporter tool is the most critically mobile-optimised page on the platform. It is used by a person standing at the sideline of a match, likely on a budget Android phone, possibly on a weak 3G connection. Every interaction must be one tap. Buttons must be enormous. Mistakes must be undoable.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**🔴 LIVE Banjul FC 2 - 1 Serrekunda United**

Minute: 67' · Half: Second

**Record an event**

| **⚽ GOAL**     | **🟨 YELLOW CARD**  |
| --------------- | ------------------- |
| **🟥 RED CARD** | **🔄 SUBSTITUTION** |

**↩ UNDO LAST EVENT**

| **Element**              | **Design detail**                                                                                                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button size**          | Each event button is minimum 80px tall on mobile. The GOAL button is slightly larger (primary action). All buttons are full-width within their column.                                                                                                                 |
| **Colour coding**        | GOAL: forest green (most positive action). YELLOW CARD: amber. RED CARD: red background. SUBSTITUTION: blue. These match the colours used on the public live match timeline.                                                                                           |
| **Tap → modal flow**     | Tapping GOAL opens a bottom sheet modal. The modal shows: 'Which team scored?' (two large team buttons). After selecting team: 'Who scored?' (scrollable player list). After selecting player: 'Confirm: Omar Sanneh scored for Banjul FC (67')'. One final tap saves. |
| **Player list in modal** | Players are sorted by jersey number. Large tap targets (56px row height). Shows: jersey number badge, player name, position badge. Search field at the top for quick lookup.                                                                                           |
| **Minute auto-fill**     | The event minute is automatically calculated from kick-off time and displayed in the confirmation step. The reporter can edit it if needed (±5 minute correction).                                                                                                     |
| **Undo button**          | Full-width, gray, below the main buttons. Tapping shows: 'Undo: Omar Sanneh GOAL (67')? This cannot be re-done.' Confirm removes the event.                                                                                                                            |
| **Offline resilience**   | Events are queued locally if the connection drops and submitted when connection returns. A banner shows: 'Reconnecting... 1 event queued'.                                                                                                                             |

# **4.2 Live Match Page (Fan View)**

The public live match page updates in real time as the Reporter enters events. Fans see the score, match minute, and a live event timeline.

| **🟢 Gambia Sports** | Standings Fixtures Results Teams News |
| -------------------- | ------------------------------------- |

**🔴 LIVE 67'**

| **Banjul FC** | **2 - 1** | **Serrekunda Utd** |
| ------------- | --------- | ------------------ |

**Match Events**

| **67'** | ⚽  | **Omar Sanneh (Banjul FC)** | Goal (assist: Lamin Ceesay) |
| ------- | --- | --------------------------- | --------------------------- |

| **52'** | 🟨  | **Ibou Jobe (Serrekunda United)** | Yellow card |
| ------- | --- | --------------------------------- | ----------- |

| **34'** | ⚽  | **Saidou Touray (Banjul FC)** | Goal |
| ------- | --- | ----------------------------- | ---- |

| **12'** | ⚽  | **Momodou Ceesay (Serrekunda United)** | Goal |
| ------- | --- | -------------------------------------- | ---- |

**SECTION 5**

**Interaction Patterns & UX Behaviour**

_How the system responds to user actions across all pages_

# **5.1 Navigation Patterns**

| **Pattern**       | **Trigger**                                   | **Behaviour**                                                                     |
| ----------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| Team name tap     | Any team name on public pages                 | Navigate to /teams/\[slug\] - instant client-side navigation                      |
| Player name tap   | Any player name in squad list or match events | Navigate to /players/\[id\]                                                       |
| Result card tap   | Tapping a result card on home/results page    | Navigate to match detail page (Phase 1: static; Phase 3: live page)               |
| Standings row tap | Tapping any row in the standings table        | Navigate to /teams/\[slug\] for that team                                         |
| Breadcrumb nav    | Available on all admin pages                  | Navigate up the hierarchy: Admin Dashboard > Matches > Match Detail               |
| Back button       | Browser native back                           | Always works - no JavaScript-controlled back navigation                           |
| League selector   | Dropdown on home/standings (Phase 2+)         | Filters all content on the page to the selected league without a full page reload |
| Season selector   | Dropdown on standings/stats (Phase 2+)        | Loads the selected season's data. Defaults to active season.                      |

# **5.2 Form Interaction Patterns**

| **Pattern**               | **Behaviour**                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required field validation | Inline error message appears directly below the field on blur. Red border on the field. Error text in red (#DC2626), 13px.                                                          |
| Slug auto-generation      | When admin types a team or player name, the slug field auto-populates with a URL-safe version in real time. Admin can edit it before first save.                                    |
| Image upload preview      | After selecting an image file, a preview thumbnail appears immediately. If the file is too large (>2 MB), an inline error is shown and the file is not queued.                      |
| Score + / − buttons       | Score cannot go below 0. The − button shows as disabled (gray, 0.5 opacity) when score is at 0.                                                                                     |
| Dropdown search           | Team and player dropdowns include a type-to-filter search field at the top. Shows 'No results' if no match.                                                                         |
| Confirmation dialogs      | For destructive actions (delete team, deactivate user, correct score): a modal dialog with explicit 'Confirm' (red button) and 'Cancel' (gray button). Never triggered by accident. |
| Loading states            | Form submit buttons show a spinner and disabled state while the Supabase request is in flight. Prevents double-submission.                                                          |
| Success toasts            | After a successful save: a green toast notification slides in from the top right corner: '✓ \[Action\] saved'. Auto-dismisses after 3 seconds.                                      |
| Error toasts              | After a failed save: a red toast: '✗ Something went wrong - please try again'. Does not auto-dismiss. Shows a Retry button.                                                         |

# **5.3 Empty States**

Every list and data section has a defined empty state - shown when no data exists yet.

| **Page / section**           | **Empty state message**                                                                              | **Action shown**                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Standings                    | 'No matches have been played yet this season. Results will appear here as the season gets underway.' | No action - informational only            |
| Fixtures                     | 'No upcoming fixtures are scheduled. Check back soon!'                                               | No action                                 |
| Results                      | 'No results yet - the season is just getting started.'                                               | No action                                 |
| Team squad                   | 'No players have been registered for this team yet.'                                                 | Admin sees: '+ Add Player' link           |
| News page                    | 'No articles have been published yet.'                                                               | Editor sees: '+ Write first article' link |
| Admin matches list           | 'No matches in this season yet. Start by scheduling your first fixture.'                             | '+ Schedule Fixture' button               |
| Group standings (no results) | 'The group stage has not started yet. Fixtures are being arranged.'                                  | No action - informational                 |

# **5.4 Error States**

| **Error**                                   | **Display**                                                                                                  | **Recovery action**                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| Database query fails                        | Full-page error boundary: icon + 'Something went wrong loading this page.' in dark text on white background. | 'Try again' button reloads the page              |
| Network offline                             | Banner at top of page: '⚠ You appear to be offline. Scores may not be up to date.'                           | Auto-hides when connection returns               |
| Admin route without session                 | Immediate redirect to /admin/login before any page content renders                                           | Login form - returns to original URL after login |
| Admin tries to access another league's data | HTTP 403 response. Error page: 'You don't have permission to view this.'                                     | Link back to admin dashboard                     |
| Image upload fails                          | Inline error below upload field: 'Upload failed. Please try again.'                                          | Retry button in the error                        |
| Duplicate jersey number                     | Inline error on jersey number field: 'Jersey #10 is already assigned to Lamin Ceesay on this team.'          | Admin changes the number                         |
| API rate limit exceeded                     | 403 page for admin, graceful degradation for public pages (cached data shown)                                | Contact support message for API users            |

# **5.5 Loading States**

| **Context**                   | **Loading behaviour**                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Public page initial load      | Server-rendered - content visible immediately. No loading spinner on first paint.                                                  |
| Admin dashboard on login      | Dashboard summary cards show skeleton placeholders (gray animated bars) while stat counts load client-side.                        |
| Image upload                  | Progress bar below the upload field shows upload percentage.                                                                       |
| Form submit                   | Button shows spinner + 'Saving...' text. All form fields disabled during submission.                                               |
| Tournament bracket generation | Full-width progress bar: 'Generating bracket... please wait'. Takes 1-2 seconds.                                                   |
| Live match real-time updates  | New events slide in at the top of the timeline with a brief green flash. Score update: the score number briefly pulses green.      |
| Search (Phase 2)              | Results appear below the search input as the user types, after a 300ms debounce. A small spinner shows while results are fetching. |

# **5.6 Mobile-Specific Behaviours**

| **Behaviour**             | **Detail**                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Hamburger menu            | Icon: three horizontal lines, 24×24px, top right of nav. Tapping slides in a full-screen green overlay from the right with all nav links.       |
| Swipe to close menu       | On mobile, the nav overlay can be dismissed by swiping right.                                                                                   |
| Pull to refresh           | On the home, standings, and fixtures pages: pull-down gesture triggers a fresh data fetch. A subtle spinner appears at the top.                 |
| Bottom sheet modals       | On mobile, all modals (player picker, confirmation dialogs) slide up from the bottom as a bottom sheet. They cover 60-80% of the screen height. |
| Tap highlight             | All tappable elements show a brief gray flash on tap (the browser default tap highlight is replaced with a custom one that matches the brand).  |
| Safe area padding         | The nav bar and bottom action areas respect iOS safe areas (notch and home indicator). No content is obscured.                                  |
| Bracket horizontal scroll | The knockout bracket table on /tournaments/\[slug\]/bracket scrolls horizontally on mobile. A subtle scroll indicator shows on first load.      |

# **5.7 Accessibility Behaviours**

| **Requirement**             | **Implementation**                                                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Focus management            | After navigating between pages, focus moves to the main heading (h1) of the new page.                                                     |
| Skip to content             | A 'Skip to main content' link is the first focusable element on every page. Visible on focus, hidden otherwise.                           |
| Screen reader announcements | Live score updates on the live match page are announced via aria-live='polite'. New events are announced as they appear.                  |
| Form error focus            | After a form validation error, focus moves to the first error field. The error message is associated with the field via aria-describedby. |
| Image alt text              | All team logos, player photos, and article cover images have descriptive alt text. Position badges have text alternatives.                |
| Colour not sole indicator   | Win/Draw/Loss is communicated by colour AND letter (W, D, L). Promotion/relegation zones have a text label in the key.                    |
| Touch target compliance     | All interactive elements have a minimum touch target area of 44×44px. Spacing between adjacent targets is at least 8px.                   |

# **5.8 Animation & Motion**

All animations are subtle and functional - they communicate state changes, not decorate the interface. All animations respect the prefers-reduced-motion media query.

| **Animation**      | **Element**                                                         | **Duration**                    | **Effect**                                                                                   |
| ------------------ | ------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------- |
| LIVE badge pulse   | The red LIVE badge on live match cards and the reporter tool header | 1.5s infinite                   | Opacity pulses from 1.0 to 0.6 and back. Communicates active state without distraction.      |
| Score update flash | The score numbers on the live match page when a goal is scored      | 0.4s once                       | Score briefly pulses to a brighter green then returns to white. Draws the eye to the change. |
| Event slide-in     | New events on the live match timeline as they are recorded          | 0.3s                            | New event slides in from the top of the timeline with a fade.                                |
| Toast notification | Success / error toast messages                                      | 0.25s in, auto-dismiss after 3s | Slides in from top right. Slides out on dismiss.                                             |
| Nav overlay        | Mobile hamburger menu slide-in                                      | 0.25s                           | Slides in from the right edge. Background fades to dark overlay.                             |
| Bottom sheet       | Mobile modals (player picker, confirmation)                         | 0.3s                            | Slides up from the bottom edge.                                                              |
| Form field focus   | Text inputs and dropdowns on focus                                  | 0.15s                           | Border colour transitions from gray (#D1D5DB) to green (#1A6B3A). Box shadow appears.        |
| Button active      | All buttons on press                                                | 0.1s                            | Scale transforms to 0.97×. Releases back to 1.0× on finger lift.                             |
| Page transition    | Navigation between pages                                            | Next.js default                 | Instantaneous - no transition animation. Speed over polish.                                  |

_Tech Palz - Gambia Sports Platform | UI/UX Design Specification v1.0 | May 2026_
