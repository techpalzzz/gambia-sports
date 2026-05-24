**TECH PALZ**

**Gambia Sports Platform**

_Team Implementation Guide_

Version 2.0 · All Phases · 7-Person Team · Next.js 16 + Supabase + Tailwind 4

| **Version**             | 2.0 - Team edition, fully updated for Next.js 16, Tailwind 4, Nawetans, new roles                |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| **Date**                | May 2026                                                                                         |
| **Team size**           | 7 people                                                                                         |
| **Intended readers**    | All team members - from experienced developers to those using AI coding tools for the first time |
| **Companion documents** | Blueprint v2.0 \| SRS v1.0 \| UI/UX Design Spec v1.0                                             |
| **Key rule**            | Never skip ahead. Every step assumes the previous one is complete.                               |

# **How to Use This Guide**

This guide is written for everyone on the team - whether you have been writing code for years or you are building with an AI assistant like Claude Code or GitHub Copilot for the first time. Every step is explained in full. Nothing is assumed.

The guide is divided into two major parts:

- Part 1 - Team Workflow: how the team is set up, how you work together every week, and how code moves from your laptop to the live website.
- Part 2 - Build Guide: what to actually build, phase by phase, with the database SQL, key code patterns, and explanations of the important decisions.

**ℹ NOTE**

If you are using Claude Code or GitHub Copilot to help you write code, read the workflow sections carefully. The code quality and organisation standards in CLAUDE.md (in the project root) apply regardless of whether a human or an AI writes the code.

## **Roles in This Project**

**Project Lead**

Sets up the project infrastructure. Is the only person who merges code into the main repository. Reviews and accepts Pull Requests each week.

**Team Members (6 people)**

Each person works on their own copy of the project. Every week, the team reviews each other's work and the best version is submitted to the Project Lead for merging.

## **The Weekly Rhythm**

After the initial setup is done, this is how every week works:

| **Day**            | **Activity**                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Start of week      | Everyone syncs their fork with the latest version of the main repository                                                |
| During the week    | Each person builds independently on their local machine                                                                 |
| Review session     | Everyone shares their screen showing their local version at localhost:3000. Group discusses and picks the best version. |
| After review       | The chosen person pushes their code to their fork and opens a Pull Request                                              |
| Project Lead       | Reviews the Pull Request and merges it into the main repository                                                         |
| Immediately after  | Vercel automatically deploys the update to the live website                                                             |
| Start of next week | Everyone syncs their fork again and the cycle repeats                                                                   |

**PART 1**

**Team Setup & Workflow**

_Everything the Project Lead and each team member needs to do once_

# **Section A - Project Lead Setup**

The Project Lead does everything in this section once. After this section is complete, other team members follow Section B to join the project.

| **A1** | **Create the GitHub Organisation**<br><br>_The shared home for the project's code_ |
| ------ | ---------------------------------------------------------------------------------- |

A GitHub Organisation is like a company account. The project repository lives here - not in anyone's personal GitHub account. This way the project belongs to the team, not to one person.

- Go to <https://github.com> and sign in.
- Click your profile picture (top right) → Your organisations → New organisation.
- Choose the Free plan.
- Organisation name: use your company/project name (e.g. techpalz or gambia-sports). This will appear in all URLs.
- Add your email address and click Next.
- Skip adding members for now - you will invite them after the repository is set up.
- Click Complete setup.

| **A2** | **Create the Repository**<br><br>_The container for all the project code_ |
| ------ | ------------------------------------------------------------------------- |

- Inside your new organisation, click New repository (the green button).
- Repository name: gambia-sports
- Set visibility to Private.
- Check: Add a README file.
- Click Create repository.

**ℹ NOTE**

The README file is important. It is where you document the current state of the codebase so that any team member or AI assistant can understand what has been built. Update it every time a significant change is made.

| **A3** | **Configure Branch Protection**<br><br>_Ensures only the Project Lead can approve code changes_ |
| ------ | ----------------------------------------------------------------------------------------------- |

Branch protection prevents anyone from pushing code directly to the main branch. All changes must go through a Pull Request that the Project Lead reviews first. This protects the live website from accidental breaking changes.

- In your repository, click Settings (the gear icon in the top menu).
- In the left sidebar, click Branches.
- Click Add branch protection rule.
- In 'Branch name pattern', type: main
- Check: Require a pull request before merging.
- Check: Require approvals. Set the number to 1.
- Check: Do not allow bypassing the above settings.
- Click Create.

**⚠ IMPORTANT**

With branch protection enabled, even the Project Lead cannot push directly to main. All changes go through a Pull Request. This is intentional and protects the live site.

| **A4** | **Invite Team Members to the Organisation**<br><br>_Give everyone access_ |
| ------ | ------------------------------------------------------------------------- |

- Go to your GitHub organisation's main page.
- Click the People tab.
- Click Invite member.
- Enter each team member's GitHub username or email address.
- Set their role to Member (not Owner - only the Project Lead should be Owner).
- Click Send invitation.
- Each team member will receive an email and must accept the invitation.

**ℹ NOTE**

Team members are Organisation Members, not Repository Owners. They can see the code and open Pull Requests, but only the Project Lead (Owner) can merge them.

| **A5** | **Scaffold the Next.js Project**<br><br>_Create the starting code_ |
| ------ | ------------------------------------------------------------------ |

The Project Lead creates the initial project on their own computer and pushes it to GitHub.

### **Install Node.js first (if not already installed)**

- Go to <https://nodejs.org>
- Download the version labelled LTS (Long Term Support) - Recommended for most users.
- Run the installer. Click through all the default options.
- Verify it worked by opening a terminal and running:

node --version

\# Should print: v22.x.x

### **Create the project**

\# Navigate to where you want to store the project

\# Windows: cd Desktop

\# Mac: cd ~/Desktop

npx create-next-app@latest gambia-sports

When the setup asks you questions, answer exactly like this:

| **Question**                                          | **Answer** |
| ----------------------------------------------------- | ---------- |
| Would you like to use TypeScript?                     | Yes        |
| Would you like to use ESLint?                         | Yes        |
| Would you like to use Tailwind CSS?                   | Yes        |
| Would you like to use src/ directory?                 | Yes        |
| Would you like to use App Router?                     | Yes        |
| Would you like to use Turbopack for next dev?         | Yes        |
| Would you like to customize the default import alias? | No         |

### **Connect to GitHub and push the initial code**

cd gambia-sports

\# Connect to your GitHub organisation repository

git remote add origin <https://github.com/YOUR-ORG-NAME/gambia-sports.git>

git branch -M main

git add .

git commit -m "feat: initial Next.js 16 project setup"

git push -u origin main

Replace YOUR-ORG-NAME with your actual organisation name (e.g. techpalz).

| **A6** | **Create the Supabase Project**<br><br>_The database, authentication, and file storage_ |
| ------ | --------------------------------------------------------------------------------------- |

- Go to <https://supabase.com> and click Start for free.
- Sign in with GitHub (recommended - keeps accounts connected).
- Click New Project.
- Select your organisation if prompted, or use your personal account.
- Project name: gambia-sports
- Database password: create a strong password and save it in a secure place (e.g. a password manager). You will need it later.
- Region: West Europe (closest available to The Gambia).
- Click Create new project. Wait 2-3 minutes for it to set up.

### **Get the API keys**

- In Supabase, click the Settings icon (gear) in the left sidebar.
- Click API.
- Copy and save these two values - you will share them securely with the team:
  - Project URL - looks like: <https://abcdefghij.supabase.co>
  - Publishable key (also called anon/public key) - a long string starting with eyJ

**🔴 NEVER DO THIS**

Never share the Service Role key with anyone on the team. Never put any key in a file that gets pushed to GitHub. The keys go in .env.local only, which is excluded from Git.

### **Configure Supabase settings**

- In Supabase → Settings → API: disable 'Automatically expose new tables in the API' - this is safer.
- In Supabase → Authentication → Settings: disable 'Enable email confirmations' for now (easier for development). Re-enable before going live.

| **A7** | **Set Up the Environment File**<br><br>_Connects your local project to Supabase_ |
| ------ | -------------------------------------------------------------------------------- |

Create a file called .env.local in the root of the gambia-sports folder (at the same level as package.json). This file is private and never goes to GitHub.

\# .env.local

\# This file is private. Never commit it to GitHub.

NEXT_PUBLIC_SUPABASE_URL=<https://your-project-ref.supabase.co>

NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

Replace the values with the ones you copied from Supabase in Step A6.

**ℹ NOTE**

The file .gitignore (created automatically by Next.js) already includes .env.local, so it will never accidentally be pushed to GitHub.

| **A8** | **Connect to Vercel**<br><br>_Automatic deployment - every merge goes live_ |
| ------ | --------------------------------------------------------------------------- |

Vercel hosts the website. Every time the Project Lead merges a Pull Request into the main branch, Vercel automatically updates the live website within 1-2 minutes.

- Go to <https://vercel.com> and click Sign Up.
- Choose: Continue with GitHub. Authorise Vercel.
- Select the Hobby (free) plan.
- Click Add New Project.
- Find the gambia-sports repository (from your organisation) and click Import.
- Do not change any settings. Click Deploy.
- Wait 1-2 minutes. Vercel will give you a live URL (e.g. gambia-sports.vercel.app).
- Open that URL in your browser - you should see the default Next.js welcome page.

### **Add the Supabase environment variables to Vercel**

- In Vercel, go to your project → Settings → Environment Variables.
- Add NEXT_PUBLIC_SUPABASE_URL with your Supabase project URL.
- Add NEXT_PUBLIC_SUPABASE_ANON_KEY with your Supabase anon key.
- Click Save. Vercel will redeploy automatically.

**✓ CHECKPOINT**

The live site is now connected to Supabase. Any code merged into main will automatically update the live website.

| **A9** | **Install Supabase Packages and Create Client Files**<br><br>_Connects the Next.js code to the database_ |
| ------ | -------------------------------------------------------------------------------------------------------- |

npm install @supabase/supabase-js @supabase/ssr

Create the folder src/lib/supabase/ and add these two files:

### **src/lib/supabase/client.ts - used in browser components**

import { createBrowserClient } from '@supabase/ssr'

import type { Database } from '@/types/database'

export function createClient() {

return createBrowserClient&lt;Database&gt;(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

)

}

### **src/lib/supabase/server.ts - used in server components and API routes**

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

### **src/middleware.ts - protects admin and reporter pages**

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

cookiesToSet.forEach(({ name, value }) =>

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

const { data: { user } } = await supabase.auth.getUser()

const isAdmin = request.nextUrl.pathname.startsWith('/admin')

const isReporter = request.nextUrl.pathname.startsWith('/reporter')

const isLogin = request.nextUrl.pathname === '/admin/login'

if (!user && (isAdmin || isReporter) && !isLogin) {

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

| **A10** | **Add Project Documentation Files**<br><br>_The docs every team member and AI assistant needs_ |
| ------- | ---------------------------------------------------------------------------------------------- |

Add the following files to the project root (same folder as package.json):

- CLAUDE.md - coding standards and workflow guide for Claude Code and all team members
- Create a folder called project_docs/ and add the converted Markdown versions of:
  - Blueprint.md
  - SRS.md
  - UIDesign.md
  - ImplementationGuide.md (this document)

Then push everything to GitHub:

git add .

git commit -m "feat: add Supabase client, middleware, and project docs"

git push

**✓ CHECKPOINT**

The Project Lead setup is complete. The repository is live on GitHub, the website is on Vercel, and the database is connected. Now each team member can join the project using Section B.

# **Section B - Each Team Member's Setup**

Every team member (including the Project Lead on their main machine) follows these steps to get the project running locally. Do this once when you first join the project, and again whenever you get a new computer.

| **B1** | **Install the Tools You Need**<br><br>_Do this once on your computer_ |
| ------ | --------------------------------------------------------------------- |

### **Node.js**

- Go to <https://nodejs.org>
- Download the LTS version and run the installer.
- Verify: open a terminal and run node --version - you should see v22.x.x

### **VS Code (recommended code editor)**

- Go to <https://code.visualstudio.com> and download VS Code for your operating system.
- Install these extensions inside VS Code (click the four-squares icon in the left bar, search for each):
  - Tailwind CSS IntelliSense - helps with Tailwind class names
  - ESLint - highlights code quality issues
  - Prettier - formats your code consistently
  - GitLens - makes Git history visible inside VS Code
  - GitHub Copilot - AI coding assistant (optional but recommended)

### **Git**

- Go to <https://git-scm.com/downloads> and download Git.
- Install with all default options.
- After installing, open a terminal and set your identity:

git config --global user.name "Your Name"

git config --global user.email "<your-github-email@example.com>"

**ℹ NOTE**

Use the same email address as your GitHub account. This connects your commits to your GitHub profile.

| **B2** | **Create a GitHub Account and Accept the Invitation**<br><br>_If you do not have one already_ |
| ------ | --------------------------------------------------------------------------------------------- |

- Go to <https://github.com> and click Sign up.
- Create an account using your email address.
- Check your email - the Project Lead will have sent you an invitation to the organisation.
- Click the link in the invitation email and accept it.
- You now have access to the organisation's repository.

| **B3** | **Fork the Repository**<br><br>_Create your own copy to work on_ |
| ------ | ---------------------------------------------------------------- |

A fork is your personal copy of the project repository. You make all your changes in your fork - the original repository stays untouched until the team decides to merge your work.

- Go to the organisation's repository on GitHub (the Project Lead will share the link).
- Click the Fork button in the top right corner.
- Under 'Owner', select your personal GitHub account (not the organisation).
- Keep the repository name as gambia-sports.
- Click Create fork.

You now have your own copy at: <https://github.com/YOUR-GITHUB-USERNAME/gambia-sports>

| **B4** | **Clone Your Fork to Your Computer**<br><br>_Download the code so you can work on it_ |
| ------ | ------------------------------------------------------------------------------------- |

Cloning downloads the repository from GitHub to your local machine.

- On your fork page on GitHub, click the green Code button.
- Make sure HTTPS is selected. Copy the URL shown.
- Open a terminal, navigate to where you want to store the project, and run:

\# Replace YOUR-GITHUB-USERNAME with your actual GitHub username

git clone <https://github.com/YOUR-GITHUB-USERNAME/gambia-sports.git>

\# Enter the project folder

cd gambia-sports

\# Install all the project dependencies

npm install

| **B5** | **Connect Your Fork to the Original Repository**<br><br>_So you can sync updates each week_ |
| ------ | ------------------------------------------------------------------------------------------- |

You need to tell Git about the original repository (called 'upstream') so you can pull in the Project Lead's merged changes at the start of each week.

\# Add the original organisation repository as 'upstream'

\# Replace YOUR-ORG-NAME with the actual organisation name

git remote add upstream <https://github.com/YOUR-ORG-NAME/gambia-sports.git>

\# Verify both remotes are set up

git remote -v

\# You should see:

\# origin <https://github.com/YOUR-USERNAME/gambia-sports.git> (fetch)

\# origin <https://github.com/YOUR-USERNAME/gambia-sports.git> (push)

\# upstream <https://github.com/YOUR-ORG-NAME/gambia-sports.git> (fetch)

\# upstream <https://github.com/YOUR-ORG-NAME/gambia-sports.git> (push)

| **B6** | **Create Your Environment File**<br><br>_Connects your local copy to the shared database_ |
| ------ | ----------------------------------------------------------------------------------------- |

Create a file called .env.local in the root of the project folder. The Project Lead will share the values with you securely (not through GitHub).

\# .env.local - never push this file to GitHub

NEXT_PUBLIC_SUPABASE_URL=<https://your-project-ref.supabase.co>

NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

**⚠ IMPORTANT**

The Project Lead should share these values through a secure channel (WhatsApp, Signal, or direct message) - never through email or a public chat. Never commit .env.local to GitHub.

| **B7** | **Start the Development Server**<br><br>_See the project running on your computer_ |
| ------ | ---------------------------------------------------------------------------------- |

npm run dev

Open your browser and go to <http://localhost:3000> - you should see the project running.

**✓ CHECKPOINT**

Your local setup is complete. You can now see the project, make changes, and test them at localhost:3000. The next section explains how the weekly workflow operates.

# **Section C - The Weekly Workflow**

This is how the team works together every week. Follow these steps in order.

| **C1** | **Start of Every Week - Sync Your Fork**<br><br>_Get the latest version before you start working_ |
| ------ | ------------------------------------------------------------------------------------------------- |

Before you write any code each week, you must sync your fork with the main repository. This gives you all the changes that were merged last week. Skipping this step means you will be working on an outdated version.

\# 1. Make sure you are on the main branch

git checkout main

\# 2. Fetch the latest changes from the original repository

git fetch upstream

\# 3. Merge those changes into your local main branch

git merge upstream/main

\# 4. Push the update to your fork on GitHub

git push origin main

\# 5. Install any new packages that may have been added

npm install

**ℹ NOTE**

If you see merge conflicts at step 3, it means you had changes on your main branch that conflict with the incoming changes. This usually happens if you accidentally committed directly to main instead of a feature branch. Ask the Project Lead for help resolving conflicts.

| **C2** | **Create a Feature Branch**<br><br>_Never work directly on main_ |
| ------ | ---------------------------------------------------------------- |

For each week's work, create a new branch. This keeps your work separate and makes it easy to submit as a Pull Request.

\# Create a new branch with a descriptive name

\# Use: feat/ for new features, fix/ for bug fixes

git checkout -b feat/standings-page

\# Or for the week's full work, you can use the week number:

git checkout -b feat/week-02-public-pages

**ℹ NOTE**

Branch names use hyphens, not spaces, and should describe what you are building. Examples: feat/team-profiles, feat/nawetans-groups, fix/standings-tiebreaker

| **C3** | **Build During the Week**<br><br>_Work on your local machine_ |
| ------ | ------------------------------------------------------------- |

Write your code, test it at <http://localhost:3000>, and commit regularly as you work.

### **Commit your work regularly - do not wait until the end of the week**

\# Stage the files you changed

git add .

\# Commit with a clear message

git commit -m "feat: add standings table with promotion zone colours"

\# Keep committing as you complete each piece of work

git commit -m "feat: add team profile hero banner"

git commit -m "fix: correct form strip badge ordering"

### **Commit message format**

| **Prefix** | **When to use**                              | **Example**                                        |
| ---------- | -------------------------------------------- | -------------------------------------------------- |
| feat:      | Adding new functionality                     | feat: add player profile biography section         |
| fix:       | Correcting a bug or mistake                  | fix: correct standings calculation for draws       |
| refactor:  | Reorganising code without changing behaviour | refactor: extract FormStrip into its own component |
| style:     | Visual/UI changes only                       | style: align standings table column widths         |
| docs:      | Updating comments or README                  | docs: add JSDoc to all query functions             |

| **C4** | **The Weekly Review Session**<br><br>_Group screens share, team picks the best version_ |
| ------ | --------------------------------------------------------------------------------------- |

At the agreed time each week, all team members share their screen and demo their localhost:3000. The group discusses each version and collectively decides which one to move forward with.

### **What to look at during the review**

- Does it work correctly at desktop width?
- Does it work at mobile width (375px)? You can test this in your browser: right-click → Inspect → toggle the mobile device icon.
- Are empty states handled (what happens when there is no data)?
- Are loading and error states handled?
- Is the design consistent with the UI/UX Design Spec?
- Is the code organised and documented (can someone else understand it)?

**ℹ NOTE**

The goal is not to pick the 'winner' - it is to pick the best foundation and improve it together. The team may decide to take the layout from one person and the data logic from another. The chosen person incorporates any agreed feedback before submitting.

| **C5** | **Push and Open a Pull Request**<br><br>_Submit the chosen version for the Project Lead to review_ |
| ------ | -------------------------------------------------------------------------------------------------- |

The person whose version was chosen (or who incorporates the agreed changes) follows these steps:

### **1\. Make sure all your work is committed**

\# Check what is uncommitted

git status

\# Add and commit anything remaining

git add .

git commit -m "feat: finalise week 2 public pages for review"

### **2\. Push your branch to your fork on GitHub**

\# Replace feat/week-02-public-pages with your actual branch name

git push origin feat/week-02-public-pages

### **3\. Open a Pull Request on GitHub**

- Go to your fork on GitHub (<https://github.com/YOUR-USERNAME/gambia-sports>).
- GitHub will show a banner: 'Compare & pull request'. Click it.
- Make sure the base repository is the ORGANISATION repository and the base branch is main.
- Give the Pull Request a clear title (e.g. 'Week 2: standings, fixtures, results, and team pages').
- In the description, briefly list what was built and any decisions made that differ from the documentation.
- Click Create pull request.

| **C6** | **Project Lead Reviews and Merges**<br><br>_The final step before the live site updates_ |
| ------ | ---------------------------------------------------------------------------------------- |

The Project Lead reviews the Pull Request on GitHub.

### **What the Project Lead checks**

- Does the code build without errors? (GitHub Actions can automate this - see below.)
- Is the code organised according to CLAUDE.md?
- Are the functions and components documented?
- Does it match what the team agreed on in the review session?
- Are there any obvious bugs or missing states?

### **How to merge**

- On the Pull Request page, review the changes in the 'Files changed' tab.
- If everything looks good, click the green 'Merge pull request' button.
- Click 'Confirm merge'.
- Vercel automatically deploys the changes. Check the live site within 2 minutes.

### **If changes are needed**

- Click 'Review changes' → 'Request changes'.
- Leave a comment explaining what needs to be fixed.
- The team member makes the changes, commits them to the same branch, and the Pull Request updates automatically.

**✓ CHECKPOINT**

After the merge, the live website updates automatically. Everyone starts the next week by syncing their fork (Step C1).

# **Section D - Working with AI Coding Tools**

Many team members will use Claude Code, GitHub Copilot, or similar AI assistants to help write code. These tools are powerful but require guidance. Here is how to use them effectively on this project.

## **How Claude Code Works**

Claude Code reads the files in your project - especially CLAUDE.md and the project_docs/ folder - to understand the project before writing any code. It then generates code, explains what it is doing, and can make multiple related changes at once.

### **Starting a Claude Code session**

- Open your terminal in the project folder.
- Run: claude (if Claude Code is installed) or use the VS Code extension.
- Claude Code will read CLAUDE.md automatically.
- Tell it clearly what you want to build. Reference the relevant module number from the SRS if you know it.

### **Examples of good instructions**

\# Good - specific and references the documentation

"Build the standings page as described in SRS Module 02.

The page should fetch matches from the getMatchesForStandings query

and use the calculateStandings function. Follow the design in UIDesign.md

section 2.2."

\# Good - asks Claude to check first

"Check what already exists in src/lib/queries/index.ts and then add

the getTeamBySlug function if it does not already exist."

\# Less helpful - too vague

"Build the teams page."

### **Review what Claude Code produces**

- Always read the code before accepting it. You are responsible for what goes in your Pull Request.
- Test it at localhost:3000 before committing.
- If Claude Code proposes something different from the documentation, it will tell you. Evaluate the suggestion and decide whether to follow it or stick with the documented approach.
- If you are not sure about something Claude Code produced, ask it to explain.

## **How GitHub Copilot Works**

GitHub Copilot works inside VS Code. As you type, it suggests code completions. You accept a suggestion by pressing Tab.

- Write a comment above a function describing what it should do - Copilot will suggest the implementation.
- Start typing a function name from the query conventions (getLeagues, calculateStandings) and Copilot will suggest completions consistent with the pattern.
- Always review suggestions before accepting. Copilot does not know the project as deeply as Claude Code does.

**⚠ IMPORTANT**

Neither Claude Code nor GitHub Copilot replaces understanding. If a piece of code goes into your Pull Request, you should be able to explain what it does and why. The Project Lead may ask.

# **Section E - Troubleshooting Common Problems**

| **Problem**                                   | **What it means**                          | **How to fix it**                                                                                                                                              |
| --------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm run dev fails with 'module not found'     | A package is missing                       | Run: npm install                                                                                                                                               |
| Page shows nothing / blank screen             | Usually a runtime error                    | Open browser dev tools (F12) → Console tab. Read the red error message.                                                                                        |
| 'Invalid API key' or '401' from Supabase      | Environment variables are missing or wrong | Check .env.local exists and has the correct values. Restart the dev server after editing it.                                                                   |
| Git says 'Your branch is ahead of origin'     | You have commits that haven't been pushed  | Run: git push origin your-branch-name                                                                                                                          |
| Git merge conflict                            | Two versions of the same file conflict     | Open the conflicting file in VS Code. You will see conflict markers (&lt;<<, ===, &gt;>>). Decide which version to keep, remove the markers, save, and commit. |
| Pull Request says 'Can't automatically merge' | Your branch has fallen behind main         | Sync your fork (Section C1) then merge main into your feature branch: git merge main                                                                           |
| Vercel deployment fails                       | Build error in the code                    | Run npm run build locally. The error message will tell you exactly which file and line has the problem.                                                        |
| localhost:3000 shows old version              | Next.js cache                              | Stop the dev server (Ctrl+C), run: rm -rf .next, then restart with npm run dev                                                                                 |
| 'permission denied' from Supabase             | RLS policy is blocking the query           | Check that the table has a public read policy in Supabase → Authentication → Policies                                                                          |
| Can't push to the organisation repo directly  | Branch protection is working correctly     | You cannot push directly to main. Follow the Pull Request process in Section C5.                                                                               |

**PART 2**

**Build Guide - Database Setup**

_Run this SQL once. All team members share the same database._

The database is set up once by the Project Lead in Supabase. All team members connect to the same database using the shared API keys. The SQL below is divided into phases - run Phase 1 SQL now, and later phases when the team reaches them.

**ℹ NOTE**

To run SQL: go to your Supabase project → SQL Editor (left sidebar) → paste the SQL → click Run. You can paste each block separately or all at once.

# **Phase 1 - Core Tables**

\-- ═══════════════════════════════════════════════════════════════════

\-- LEAGUES

\-- One row per league. Every team, season, and tournament belongs to a league.

\-- ═══════════════════════════════════════════════════════════════════

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

status text DEFAULT 'active'

CHECK (status IN ('active','inactive')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- SEASONS

\-- A time-bounded competition period within a league.

\-- Only one season per league can have status = 'active' at any time.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE seasons (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

league_id uuid REFERENCES leagues(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

description text,

start_date date,

end_date date,

status text DEFAULT 'upcoming'

CHECK (status IN ('upcoming','active','completed')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- TEAMS

\-- A team belongs to a league and persists across seasons.

\-- description and history are authored by admins and shown on public pages.

\-- ═══════════════════════════════════════════════════════════════════

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

status text DEFAULT 'active'

CHECK (status IN ('active','inactive')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- PLAYERS

\-- One row per player. Players persist across seasons.

\-- team_id is nullable - null means the player is unassigned.

\-- biography and description are authored by admins.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE players (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

team_id uuid REFERENCES teams(id) ON DELETE SET NULL,

name text NOT NULL,

slug text UNIQUE NOT NULL,

position text NOT NULL

CHECK (position IN ('GK','DEF','MID','FWD')),

jersey_number integer CHECK (jersey_number BETWEEN 1 AND 99),

date_of_birth date CHECK (date_of_birth < CURRENT_DATE),

nationality text DEFAULT 'Gambian',

biography text,

description text,

photo_url text,

status text DEFAULT 'active'

CHECK (status IN ('active','inactive','retired')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- No two active players on the same team can share a jersey number

CREATE UNIQUE INDEX players_team_jersey_unique

ON players(team_id, jersey_number)

WHERE status = 'active' AND jersey_number IS NOT NULL;

\-- ═══════════════════════════════════════════════════════════════════

\-- MATCHES

\-- Used for league fixtures, tournament group matches, and knockout matches.

\-- tournament_id, group_id, round_id are null for regular league fixtures.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE matches (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

season_id uuid REFERENCES seasons(id) ON DELETE CASCADE NOT NULL,

tournament_id uuid, -- FK added after tournaments table is created

group_id uuid, -- FK added after tournament_groups is created

round_id uuid, -- FK added after tournament_rounds is created

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

stage text CHECK (stage IN (

'group','round_of_16','quarter_final',

'semi_final','final','third_place')),

minute integer,

referee text,

attendance integer,

match_notes text,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now(),

CONSTRAINT no_self_fixture CHECK (home_team_id <> away_team_id)

);

\-- ═══════════════════════════════════════════════════════════════════

\-- PROFILES

\-- One row per authenticated user. Created automatically on signup.

\-- permissions is a JSON object of toggleable permission flags.

\-- is_global applies to Content Editors only.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE profiles (

id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,

role text DEFAULT 'fan'

CHECK (role IN (

'fan','content_editor','reporter',

'league_admin','super_admin')),

league_id uuid REFERENCES leagues(id) ON DELETE SET NULL,

is_global boolean DEFAULT false,

display_name text,

avatar_url text,

permissions jsonb DEFAULT '{}',

status text DEFAULT 'active'

CHECK (status IN ('active','inactive')),

last_login_at timestamptz,

invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- MATCH AUDIT

\-- Immutable log of all score corrections made by Super Admin.

\-- Never update or delete rows from this table.

\-- ═══════════════════════════════════════════════════════════════════

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

# **Phase 1 - Tournament Tables**

\-- ═══════════════════════════════════════════════════════════════════

\-- TOURNAMENTS

\-- One competition within a season. A season can have multiple tournaments.

\-- format = 'nawetans' enables group stage + knockout bracket.

\-- description and history are authored by admins and shown publicly.

\-- ═══════════════════════════════════════════════════════════════════

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

CHECK (status IN (

'upcoming','group_stage','knockout','completed')),

num_groups integer,

teams_advance_per_group integer,

round_robin_type text DEFAULT 'single'

CHECK (round_robin_type IN ('single','home_and_away')),

start_date date,

end_date date,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- TOURNAMENT GROUPS

\-- One row per group (Group A, Group B, etc.) within a tournament.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE tournament_groups (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

slug text NOT NULL,

description text,

created_at timestamptz DEFAULT now(),

UNIQUE (tournament_id, slug)

);

\-- ═══════════════════════════════════════════════════════════════════

\-- TOURNAMENT GROUP TEAMS

\-- Which teams are in which group. A team can only be in one group

\-- per tournament (enforced by the unique constraint).

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE tournament_group_teams (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

group_id uuid REFERENCES tournament_groups(id) ON DELETE CASCADE NOT NULL,

team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,

seeding integer,

created_at timestamptz DEFAULT now(),

UNIQUE (group_id, team_id)

);

\-- ═══════════════════════════════════════════════════════════════════

\-- TOURNAMENT ROUNDS

\-- One row per knockout round (Semi-Final, Final, etc.).

\-- round_number orders rounds: 1 = earliest, highest = final.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE tournament_rounds (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

stage text NOT NULL CHECK (stage IN (

'round_of_16','quarter_final','semi_final',

'final','third_place')),

round_number integer NOT NULL,

created_at timestamptz DEFAULT now()

);

\-- Now add the foreign keys back to the matches table

ALTER TABLE matches

ADD CONSTRAINT fk_tournament

FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE SET NULL,

ADD CONSTRAINT fk_group

FOREIGN KEY (group_id) REFERENCES tournament_groups(id) ON DELETE SET NULL,

ADD CONSTRAINT fk_round

FOREIGN KEY (round_id) REFERENCES tournament_rounds(id) ON DELETE SET NULL;

# **Phase 1 - RLS Policies, Indexes, Triggers**

\-- ═══════════════════════════════════════════════════════════════════

\-- ENABLE ROW LEVEL SECURITY ON ALL TABLES

\-- RLS is the security layer. The UI is just convenience.

\-- ═══════════════════════════════════════════════════════════════════

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

\-- ═══════════════════════════════════════════════════════════════════

\-- HELPER FUNCTIONS

\-- Used in RLS policies below.

\-- ═══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION is_super_admin()

RETURNS boolean AS \$\$

SELECT EXISTS (

SELECT 1 FROM profiles

WHERE id = auth.uid()

AND role = 'super_admin'

AND status = 'active'

);

\$\$ LANGUAGE sql SECURITY DEFINER;

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

\-- ═══════════════════════════════════════════════════════════════════

\-- PUBLIC READ POLICIES

\-- Unauthenticated visitors (fans) can read all public data.

\-- ═══════════════════════════════════════════════════════════════════

CREATE POLICY "Public read leagues" ON leagues FOR SELECT USING (true);

CREATE POLICY "Public read seasons" ON seasons FOR SELECT USING (true);

CREATE POLICY "Public read teams" ON teams FOR SELECT USING (true);

CREATE POLICY "Public read players" ON players FOR SELECT USING (true);

CREATE POLICY "Public read matches" ON matches FOR SELECT USING (true);

CREATE POLICY "Public read tournaments" ON tournaments FOR SELECT USING (true);

CREATE POLICY "Public read tournament_groups" ON tournament_groups FOR SELECT USING (true);

CREATE POLICY "Public read group_teams" ON tournament_group_teams FOR SELECT USING (true);

CREATE POLICY "Public read tournament_rounds" ON tournament_rounds FOR SELECT USING (true);

\-- ═══════════════════════════════════════════════════════════════════

\-- ADMIN WRITE POLICIES

\-- League admins can only write to their own league's data.

\-- Super admin can write to everything.

\-- ═══════════════════════════════════════════════════════════════════

CREATE POLICY "Admin insert teams" ON teams FOR INSERT TO authenticated

WITH CHECK (is_league_admin_for(league_id) OR is_super_admin());

CREATE POLICY "Admin update teams" ON teams FOR UPDATE TO authenticated

USING (is_league_admin_for(league_id) OR is_super_admin());

CREATE POLICY "Admin insert players" ON players FOR INSERT TO authenticated

WITH CHECK (

is_super_admin() OR EXISTS (

SELECT 1 FROM teams t JOIN profiles p ON p.league_id = t.league_id

WHERE t.id = team_id AND p.id = auth.uid()

AND p.role = 'league_admin' AND p.status = 'active'

)

);

CREATE POLICY "Admin update players" ON players FOR UPDATE TO authenticated

USING (

is_super_admin() OR EXISTS (

SELECT 1 FROM teams t JOIN profiles p ON p.league_id = t.league_id

WHERE t.id = team_id AND p.id = auth.uid()

AND p.role = 'league_admin' AND p.status = 'active'

)

);

CREATE POLICY "Admin insert matches" ON matches FOR INSERT TO authenticated

WITH CHECK (

is_super_admin() OR EXISTS (

SELECT 1 FROM seasons s JOIN profiles p ON p.league_id = s.league_id

WHERE s.id = season_id AND p.id = auth.uid()

AND p.role = 'league_admin' AND p.status = 'active'

)

);

CREATE POLICY "Admin update matches" ON matches FOR UPDATE TO authenticated

USING (

is_super_admin() OR EXISTS (

SELECT 1 FROM seasons s JOIN profiles p ON p.league_id = s.league_id

WHERE s.id = season_id AND p.id = auth.uid()

AND p.role = 'league_admin' AND p.status = 'active'

)

);

\-- Profiles: users can only read/update their own. Super admin can read all.

CREATE POLICY "Own profile read" ON profiles FOR SELECT TO authenticated

USING (id = auth.uid() OR is_super_admin());

CREATE POLICY "Own profile update" ON profiles FOR UPDATE TO authenticated

USING (id = auth.uid() OR is_super_admin());

\-- Match audit: super admin only, and records are immutable (no update/delete)

CREATE POLICY "Super admin insert audit" ON match_audit FOR INSERT TO authenticated

WITH CHECK (is_super_admin());

CREATE POLICY "Super admin read audit" ON match_audit FOR SELECT TO authenticated

USING (is_super_admin());

\-- ═══════════════════════════════════════════════════════════════════

\-- PERFORMANCE INDEXES

\-- These make common queries fast as the database grows.

\-- ═══════════════════════════════════════════════════════════════════

CREATE INDEX idx_matches_season ON matches(season_id);

CREATE INDEX idx_matches_tournament ON matches(tournament_id);

CREATE INDEX idx_matches_home_team ON matches(home_team_id);

CREATE INDEX idx_matches_away_team ON matches(away_team_id);

CREATE INDEX idx_matches_status ON matches(status);

CREATE INDEX idx_matches_scheduled ON matches(scheduled_at);

CREATE INDEX idx_players_team ON players(team_id);

CREATE INDEX idx_seasons_league ON seasons(league_id);

CREATE INDEX idx_groups_tournament ON tournament_groups(tournament_id);

CREATE INDEX idx_group_teams_group ON tournament_group_teams(group_id);

\-- ═══════════════════════════════════════════════════════════════════

\-- UPDATED_AT TRIGGER

\-- Automatically updates the updated_at timestamp when a row changes.

\-- ═══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at()

RETURNS trigger AS \$\$

BEGIN

NEW.updated_at = now();

RETURN NEW;

END;

\$\$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_leagues

BEFORE UPDATE ON leagues FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_seasons

BEFORE UPDATE ON seasons FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_teams

BEFORE UPDATE ON teams FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_players

BEFORE UPDATE ON players FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_matches

BEFORE UPDATE ON matches FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_profiles

BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_tournaments

BEFORE UPDATE ON tournaments FOR EACH ROW EXECUTE FUNCTION update_updated_at();

\-- ═══════════════════════════════════════════════════════════════════

\-- AUTO-CREATE PROFILE ON SIGNUP

\-- When a new user is created in auth.users, automatically create

\-- a matching row in profiles with role = 'fan'.

\-- ═══════════════════════════════════════════════════════════════════

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

# **Phase 1 - Create Super Admin Account**

- In Supabase, click Authentication in the left sidebar.
- Click Users → Invite User.
- Enter the Project Lead's email address and click Invite.
- Check the email, click the link, and set a password.
- Run this SQL to set the Super Admin role (replace the email):

UPDATE profiles

SET role = 'super_admin'

WHERE id = (

SELECT id FROM auth.users

WHERE email = '<your-email@example.com>'

);

\-- Verify

SELECT id, role, status FROM profiles

WHERE id = (SELECT id FROM auth.users WHERE email = '<your-email@example.com>');

\-- Expected result: role = super_admin, status = active

**✓ CHECKPOINT**

Database setup complete. Phase 1 tables, RLS policies, indexes, triggers, and the Super Admin account are all in place.

# **Phase 2 - Additional Tables (Run when starting Phase 2)**

\-- ═══════════════════════════════════════════════════════════════════

\-- MATCH EVENTS (Phase 2)

\-- One row per event - goals, cards, substitutions, penalties.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE match_events (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

match_id uuid REFERENCES matches(id) ON DELETE CASCADE NOT NULL,

player_id uuid REFERENCES players(id) ON DELETE SET NULL,

team_id uuid REFERENCES teams(id) NOT NULL,

event_type text NOT NULL CHECK (event_type IN (

'goal','own_goal','assist','yellow_card','red_card',

'second_yellow','substitution_in','substitution_out',

'penalty_scored','penalty_missed')),

minute integer NOT NULL CHECK (minute BETWEEN 1 AND 120),

minute_display text,

substituted_player_id uuid REFERENCES players(id) ON DELETE SET NULL,

notes text,

recorded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,

created_at timestamptz DEFAULT now()

);

CREATE INDEX idx_match_events_match ON match_events(match_id);

CREATE INDEX idx_match_events_player ON match_events(player_id);

\-- ═══════════════════════════════════════════════════════════════════

\-- ARTICLES (Phase 2)

\-- News articles and match reports written by Content Editors.

\-- league_id is null for global (platform-wide) articles.

\-- ═══════════════════════════════════════════════════════════════════

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

'match_report','transfer_news','injury_update',

'opinion','general')),

status text DEFAULT 'draft'

CHECK (status IN ('draft','published','archived')),

published_at timestamptz,

views integer DEFAULT 0,

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

CREATE INDEX idx_articles_league ON articles(league_id, published_at);

CREATE INDEX idx_articles_status ON articles(status);

CREATE TABLE article_tags (

article_id uuid REFERENCES articles(id) ON DELETE CASCADE,

tag text NOT NULL,

PRIMARY KEY (article_id, tag)

);

\-- ═══════════════════════════════════════════════════════════════════

\-- PLAYER CONTRACTS (Phase 2)

\-- Records a player's team membership over time.

\-- end_date is null if the player is currently at the team.

\-- ═══════════════════════════════════════════════════════════════════

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

\-- ═══════════════════════════════════════════════════════════════════

\-- RLS for Phase 2 tables

\-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;

ALTER TABLE player_contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read match_events" ON match_events FOR SELECT USING (true);

CREATE POLICY "Admin write match_events" ON match_events FOR INSERT TO authenticated

WITH CHECK (is_super_admin() OR EXISTS (

SELECT 1 FROM matches m

JOIN seasons s ON s.id = m.season_id

JOIN profiles p ON p.league_id = s.league_id

WHERE m.id = match_id AND p.id = auth.uid()

AND p.role IN ('league_admin','reporter') AND p.status = 'active'

));

CREATE POLICY "Admin delete match_events" ON match_events FOR DELETE TO authenticated

USING (is_super_admin() OR recorded_by = auth.uid());

\-- Published articles are public. Drafts are only visible to their authors.

CREATE POLICY "Public read published articles" ON articles FOR SELECT

USING (status = 'published' OR (

auth.uid() IS NOT NULL AND (

is_super_admin() OR

EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid()

AND (p.league_id = league_id OR p.is_global = true)

AND p.status = 'active')

)

));

CREATE POLICY "Editor insert articles" ON articles FOR INSERT TO authenticated

WITH CHECK (is_super_admin() OR EXISTS (

SELECT 1 FROM profiles p WHERE p.id = auth.uid()

AND p.role IN ('content_editor','league_admin')

AND p.status = 'active'

AND (p.is_global = true OR p.league_id = league_id)

));

CREATE POLICY "Editor update own articles" ON articles FOR UPDATE TO authenticated

USING (is_super_admin() OR author_id = auth.uid());

CREATE POLICY "Public read article_tags" ON article_tags FOR SELECT USING (true);

CREATE POLICY "Public read player_contracts" ON player_contracts FOR SELECT USING (true);

# **Phase 3 - Additional Tables (Run when starting Phase 3)**

\-- ═══════════════════════════════════════════════════════════════════

\-- ADS (Phase 3)

\-- Advertisement placements managed by Super Admin.

\-- Impressions and clicks are tracked server-side.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE ads (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

title text NOT NULL,

image_url text NOT NULL,

link_url text NOT NULL,

advertiser_name text NOT NULL,

position text NOT NULL CHECK (position IN (

'header_banner','sidebar','footer',

'between_results','match_page')),

league_id uuid REFERENCES leagues(id) ON DELETE SET NULL,

start_date date NOT NULL,

end_date date NOT NULL,

price_gmd integer,

impressions integer DEFAULT 0,

clicks integer DEFAULT 0,

status text DEFAULT 'active'

CHECK (status IN ('active','paused','expired','archived')),

created_at timestamptz DEFAULT now(),

updated_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- SUBSCRIPTIONS (Phase 3)

\-- League subscription billing records.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE subscriptions (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

league_id uuid REFERENCES leagues(id) ON DELETE CASCADE UNIQUE NOT NULL,

plan text DEFAULT 'basic'

CHECK (plan IN ('basic','standard','premium')),

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

\-- ═══════════════════════════════════════════════════════════════════

\-- INVOICES (Phase 3)

\-- Manual invoice records for Wave invoicing and direct billing.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE invoices (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

league_id uuid REFERENCES leagues(id) ON DELETE CASCADE,

ad_id uuid REFERENCES ads(id) ON DELETE SET NULL,

amount_gmd integer NOT NULL,

description text NOT NULL,

status text DEFAULT 'draft'

CHECK (status IN ('draft','sent','paid','overdue','cancelled')),

issued_at date NOT NULL,

due_at date NOT NULL,

paid_at date,

wave_invoice_id text,

notes text,

created_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- LIVE SESSIONS (Phase 3)

\-- Tracks the lifecycle of a live match (kick-off, half time, full time).

\-- ═══════════════════════════════════════════════════════════════════

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

\-- ═══════════════════════════════════════════════════════════════════

\-- PUSH SUBSCRIPTIONS (Phase 3)

\-- Web Push API subscriptions for fan notifications.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE push_subscriptions (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

user_id uuid REFERENCES auth.users(id),

endpoint text UNIQUE NOT NULL,

p256dh text NOT NULL,

auth_key text NOT NULL,

followed_team_ids uuid\[\],

created_at timestamptz DEFAULT now()

);

\-- RLS for Phase 3 tables

ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

\-- Ads: public can read active ads; Super Admin manages all

CREATE POLICY "Public read active ads" ON ads FOR SELECT

USING (status = 'active' AND start_date &lt;= CURRENT_DATE AND end_date &gt;= CURRENT_DATE);

CREATE POLICY "Super admin manage ads" ON ads FOR ALL TO authenticated

USING (is_super_admin());

\-- Subscriptions, invoices: Super Admin only

CREATE POLICY "Super admin manage subscriptions" ON subscriptions FOR ALL TO authenticated

USING (is_super_admin());

CREATE POLICY "Super admin manage invoices" ON invoices FOR ALL TO authenticated

USING (is_super_admin());

\-- Live sessions: admins and reporters for their league

CREATE POLICY "Public read live_sessions" ON live_sessions FOR SELECT USING (true);

\-- Push subscriptions: users manage their own

CREATE POLICY "User manage push_subscription" ON push_subscriptions FOR ALL TO authenticated

USING (user_id = auth.uid() OR is_super_admin());

# **Phase 4 - Additional Tables (Run when starting Phase 4)**

\-- ═══════════════════════════════════════════════════════════════════

\-- FAN PROFILES (Phase 4)

\-- Extended profile for registered fan accounts.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE fan_profiles (

id uuid REFERENCES auth.users(id) PRIMARY KEY,

display_name text NOT NULL,

avatar_url text,

bio text,

created_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- FOLLOWS (Phase 4)

\-- Which fans follow which teams.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE follows (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

fan_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,

created_at timestamptz DEFAULT now(),

UNIQUE (fan_id, team_id)

);

\-- ═══════════════════════════════════════════════════════════════════

\-- COMMENTS (Phase 4)

\-- Fan comments on articles. Moderated by admins.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE comments (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

article_id uuid REFERENCES articles(id) ON DELETE CASCADE NOT NULL,

author_id uuid REFERENCES auth.users(id) NOT NULL,

body text NOT NULL,

status text DEFAULT 'visible'

CHECK (status IN ('visible','hidden','flagged')),

flagged_at timestamptz,

created_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- API KEYS (Phase 4)

\-- Issued to developers for the public REST API.

\-- Raw keys are never stored - only SHA-256 hashes.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE api_keys (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

user_id uuid REFERENCES auth.users(id) NOT NULL,

key_hash text UNIQUE NOT NULL,

name text NOT NULL,

tier text DEFAULT 'free' CHECK (tier IN ('free','paid')),

requests_today integer DEFAULT 0,

status text DEFAULT 'active' CHECK (status IN ('active','revoked')),

last_used_at timestamptz,

created_at timestamptz DEFAULT now()

);

\-- ═══════════════════════════════════════════════════════════════════

\-- COACHES (Phase 4)

\-- Coaching staff linked to teams.

\-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE coaches (

id uuid DEFAULT gen_random_uuid() PRIMARY KEY,

team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,

name text NOT NULL,

role text NOT NULL CHECK (role IN (

'head_coach','assistant_coach','goalkeeper_coach',

'fitness_coach','other')),

biography text,

photo_url text,

joined_date date,

status text DEFAULT 'active' CHECK (status IN ('active','former')),

created_at timestamptz DEFAULT now()

);

\-- RLS for Phase 4 tables

ALTER TABLE fan_profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read coaches" ON coaches FOR SELECT USING (true);

CREATE POLICY "User manage fan_profile" ON fan_profiles FOR ALL TO authenticated

USING (id = auth.uid());

CREATE POLICY "User manage follows" ON follows FOR ALL TO authenticated

USING (fan_id = auth.uid());

CREATE POLICY "Public read comments" ON comments FOR SELECT

USING (status = 'visible');

CREATE POLICY "User manage api_keys" ON api_keys FOR ALL TO authenticated

USING (user_id = auth.uid() OR is_super_admin());

**PART 2 (continued)**

**Build Guide - Key Patterns**

_Architecture decisions, code structure, and the most important logic_

# **Project Architecture**

Before writing any code, read README.md in the repository. It documents what has already been built. Then check project_docs/ for the full specifications. The patterns below should guide how you structure everything you build.

## **The Three-Layer Architecture**

Every feature follows the same three layers:

| **Layer** | **Location**                 | **What goes here**                      | **Example**                           |
| --------- | ---------------------------- | --------------------------------------- | ------------------------------------- |
| Data      | src/lib/queries/             | All database queries as named functions | getMatchesForStandings()              |
| Logic     | src/lib/                     | Business logic, calculations, utilities | calculateStandings(), hasPermission() |
| UI        | src/components/ and src/app/ | Pages and components that display data  | StandingsTable, TeamProfile page      |

A page component should read almost like a summary: fetch some data, pass it to a component, render it. The complexity lives in the queries and logic layers, not the page.

// Example: a well-structured page

// src/app/(public)/standings/page.tsx

import { getLeagues, getActiveSeason, getMatchesForStandings } from '@/lib/queries'

import { calculateStandings } from '@/lib/standings'

import { StandingsTable } from '@/components/league/StandingsTable'

export default async function StandingsPage() {

const leagues = await getLeagues()

const season = await getActiveSeason(leagues\[0\].id)

const matches = await getMatchesForStandings(season.id)

const rows = calculateStandings(matches)

return &lt;StandingsTable rows={rows} leagueName={leagues\[0\].name} /&gt;

}

## **Server Components vs Client Components**

Next.js 16 renders pages on the server by default. This is fast and good for SEO. Only add 'use client' when you genuinely need browser interaction.

| **If the component needs...**      | **Use...**                      | **Example**                      |
| ---------------------------------- | ------------------------------- | -------------------------------- |
| Data from the database             | Server component (default)      | Standings page, team profile     |
| useState or useEffect              | Client component ('use client') | Score input form, modal dialog   |
| Event handlers (onClick, onChange) | Client component ('use client') | Nav hamburger, result entry form |
| Supabase Realtime updates          | Client component ('use client') | Live score component (Phase 3)   |

## **Standings Calculation - The Most Important Logic**

The standings algorithm is the heart of Phase 1. It must be correct. Create src/lib/standings/index.ts with this function:

// src/lib/standings/index.ts

/\*\*

\* Calculates a league standings table from an array of completed matches.

\* Tiebreaker order: Points → Goal Difference → Goals Scored → Alphabetical.

\* For group standings, pass only the matches belonging to that group.

\*/

export function calculateStandings(matches: MatchData\[\]): StandingRow\[\] {

const table: Record&lt;string, StandingRow&gt; = {}

for (const match of matches) {

const { home_team, away_team, home_score, away_score } = match

// Initialise a row for each team on first appearance

if (!table\[home_team.id\])

table\[home_team.id\] = { team: home_team, p:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0 }

if (!table\[away_team.id\])

table\[away_team.id\] = { team: away_team, p:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0 }

const home = table\[home_team.id\]

const away = table\[away_team.id\]

// Increment played, goals for, and goals against for both teams

home.p++; away.p++

home.gf += home_score; home.ga += away_score

away.gf += away_score; away.ga += home_score

// Assign points based on result

if (home_score > away_score) {

home.w++; home.pts += 3; away.l++

} else if (away_score > home_score) {

away.w++; away.pts += 3; home.l++

} else {

home.d++; home.pts += 1

away.d++; away.pts += 1

}

}

// Calculate goal difference for each team

for (const row of Object.values(table)) row.gd = row.gf - row.ga

// Sort: pts desc → gd desc → gf desc → name asc (alphabetical tiebreaker)

return Object.values(table).sort((a, b) => {

if (b.pts !== a.pts) return b.pts - a.pts

if (b.gd !== a.gd) return b.gd - a.gd

if (b.gf !== a.gf) return b.gf - a.gf

return a.team.name.localeCompare(b.team.name)

})

}

## **Phase Boundaries - Build in Order**

Do not build Phase 2 features while Phase 1 is incomplete. Each phase must be stable and in use before the next begins.

| **Phase**         | **When to start**                                                | **What it covers**                                                               |
| ----------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1 - Foundation    | Now                                                              | Public pages, admin dashboard, Nawetans tournament, user management              |
| 2 - News & Stats  | After Phase 1 is live and used by the pilot league for 2-3 weeks | Articles (Tiptap editor), match events, player stats, leaderboards, multi-league |
| 3 - Live Platform | After Phase 2 is stable                                          | Supabase Realtime live scores, reporter tool, advertisements, Paystack billing   |
| 4 - Full Product  | After Phase 3 is stable                                          | Fan accounts, analytics charts, public REST API, React Native Android app        |

## **What to Build in Phase 1 - Page Order**

Build pages in this order. Each page depends on the infrastructure built before it.

| **Order** | **What to build**                            | **Key files**                                     |
| --------- | -------------------------------------------- | ------------------------------------------------- |
| 1         | Root layout + navigation bar                 | src/app/layout.tsx, src/components/layout/Nav.tsx |
| 2         | All query functions                          | src/lib/queries/index.ts                          |
| 3         | Standings calculation                        | src/lib/standings/index.ts                        |
| 4         | Home page                                    | src/app/page.tsx                                  |
| 5         | Standings page                               | src/app/(public)/standings/page.tsx               |
| 6         | Fixtures and Results pages                   | src/app/(public)/fixtures/ and results/           |
| 7         | Teams list and team profile                  | src/app/(public)/teams/ and teams/\[slug\]/       |
| 8         | Player profile                               | src/app/(public)/players/\[id\]/                  |
| 9         | League profile                               | src/app/(public)/leagues/\[slug\]/                |
| 10        | Tournament pages (overview, groups, bracket) | src/app/(public)/tournaments/\[slug\]/            |
| 11        | Admin layout + sidebar                       | src/app/admin/layout.tsx                          |
| 12        | Admin login page                             | src/app/admin/login/                              |
| 13        | Admin dashboard                              | src/app/admin/page.tsx                            |
| 14        | Match result entry                           | src/app/admin/matches/\[id\]/                     |
| 15        | Fixture scheduling                           | src/app/admin/fixtures/new/                       |
| 16        | Team and player management (CRUD)            | src/app/admin/teams/ and players/                 |
| 17        | Tournament management (Nawetans flow)        | src/app/admin/tournaments/                        |
| 18        | User management + permission toggles         | src/app/admin/users/                              |

**ℹ NOTE**

For full specifications of what each page should contain, see SRS.md in project_docs/. For visual layout, see UIDesign.md. For code patterns, see CLAUDE.md.

**APPENDICES**

**Reference**

_Commands, troubleshooting, and quick reference_

# **Appendix A - Command Reference**

| **Command**                 | **What it does**                                    | **When to use**                                              |
| --------------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| npm run dev                 | Starts the local development server on port 3000    | Every time you start working                                 |
| npm run build               | Builds the production version locally               | Before submitting a Pull Request - catches TypeScript errors |
| npm run lint                | Checks code quality                                 | Periodically - fix any warnings before submitting            |
| npm install                 | Installs project dependencies                       | After cloning, and after syncing if packages changed         |
| git status                  | Shows which files have been changed                 | Before committing - check what you're about to save          |
| git add .                   | Stages all changed files for commit                 | Before every commit                                          |
| git commit -m "message"     | Saves a snapshot of your work                       | After completing a piece of work                             |
| git push origin branch-name | Uploads your branch to GitHub                       | After committing, to back up your work                       |
| git checkout main           | Switches to the main branch                         | At the start of each week before syncing                     |
| git fetch upstream          | Downloads latest changes from the original repo     | Step 2 of the weekly sync                                    |
| git merge upstream/main     | Applies the latest changes to your local main       | Step 3 of the weekly sync                                    |
| git checkout -b branch-name | Creates a new branch                                | At the start of each week's work                             |
| git merge main              | Brings main branch updates into your feature branch | If main has been updated while you are working               |

# **Appendix B - Pre-Pull-Request Checklist**

Run through this before every Pull Request submission:

| **#** | **Check**                          | **How to verify**                                                                      |
| ----- | ---------------------------------- | -------------------------------------------------------------------------------------- |
| 1     | npm run build passes               | Run it in your terminal. Zero errors required.                                         |
| 2     | All pages work on mobile (375px)   | Open browser dev tools → device toolbar → set to 375px. No horizontal scroll.          |
| 3     | Empty states are handled           | Remove test data and check that pages show friendly messages, not blank screens.       |
| 4     | Loading states on forms            | Submit a form slowly - does the button show a loading state?                           |
| 5     | Error states handled               | What happens if Supabase is slow? Server components should show a friendly error page. |
| 6     | All functions have JSDoc comments  | Check src/lib/queries/ - every function should have a comment above it.                |
| 7     | No any types in TypeScript         | Run: npx tsc --noEmit - should show zero errors.                                       |
| 8     | Description/history fields display | Add a description to a team and verify it shows on the public page.                    |
| 9     | Result confirmation step works     | Enter a result - does the confirmation dialog appear before saving?                    |
| 10    | README is updated                  | Does README.md reflect what you have built this week?                                  |

# **Appendix C - Environment Variables**

| **Variable**                  | **Where to get it**                          | **Phase** | **Notes**                                                      |
| ----------------------------- | -------------------------------------------- | --------- | -------------------------------------------------------------- |
| NEXT_PUBLIC_SUPABASE_URL      | Supabase → Settings → API → Project URL      | 1+        | Safe in browser code. Share with team via secure message.      |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase → Settings → API → Publishable key  | 1+        | Safe in browser code. Never commit to GitHub.                  |
| SUPABASE_SERVICE_ROLE_KEY     | Supabase → Settings → API → Service role key | 3+ only   | SECRET. Never expose to browser. Only Project Lead needs this. |
| PAYSTACK_SECRET_KEY           | Paystack dashboard → API Keys                | 3+        | SECRET. Server-side only.                                      |
| NEXT_PUBLIC_APP_URL           | Your domain, e.g. <https://gambiasports.gm>  | 3+        | Used for Paystack callback URLs.                               |
| UPSTASH_REDIS_REST_URL        | Upstash console → REST API                   | 4+        | For public API rate limiting.                                  |
| UPSTASH_REDIS_REST_TOKEN      | Upstash console → REST API                   | 4+        | SECRET. Server-side only.                                      |

_Tech Palz - Gambia Sports Platform | Team Implementation Guide v2.0 | May 2026_
