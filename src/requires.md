You are a senior JavaScript engineer, creative technologist, and UI/UX designer.

Your task is to design and build a modern web application called "Jetty DevCard".

You MAY use any modern JavaScript framework or library, including but not limited to:
- React / Next.js
- Three.js / React Three Fiber
- Framer Motion
- Tailwind CSS
- Vite

DO NOT use:
- Backend servers
- Databases
- Authentication systems

This must be a frontend-only project powered by public APIs.

====================================
CORE IDEA
====================================
Jetty DevCard is a next-generation Developer Identity Card that turns a GitHub profile into a visually rich, interactive experience.

It should feel:
- Premium
- Calm
- Futuristic
- Minimal
- 2026-ready

====================================
FUNCTIONAL REQUIREMENTS
====================================
1. Accept a GitHub username (input or URL param).
2. Fetch GitHub public profile data and repositories.
3. Extract and compute:
   - Avatar
   - Name
   - Bio
   - Public repo count
   - Followers
   - Last activity date
   - Top programming languages
4. Calculate an "Activity Score" (0–100) based on:
   - Recent commits
   - Repository activity
   - Language diversity
5. Generate a shareable URL:
   ?u=username
6. Handle errors gracefully:
   - User not found
   - API rate limit
   - Network errors

====================================
UI / VISUAL REQUIREMENTS
====================================
The DevCard must be visually striking.

Choose ONE creative direction:
A) Glassmorphism DevCard (2D)
B) 3D Floating Card using Three.js
C) Interactive animated card using Framer Motion

Design rules:
- Smooth micro-animations
- Subtle motion (hover, load, scroll)
- Dark / Light mode
- Mobile-first
- No clutter
- Soft gradients
- High readability

Optional but encouraged:
- 3D tilt on mouse move
- Floating particles or light reflections
- Animated activity score ring
- Ambient background animation

====================================
STRUCTURE & CODE QUALITY
====================================
- Clean, modular code
- Proper separation of logic and UI
- Use async/await
- Avoid global state pollution
- Comment important logic
- Performance conscious

====================================
SIGNATURE (IMPORTANT)
====================================
Include a very subtle footer or hidden signature:
"Built with care. Happy Birthday."

This should not look promotional or emotional.

====================================
OUTPUT EXPECTATIONS
====================================
- Recommend the best framework choice and explain briefly why
- Provide project folder structure
- Provide complete implementation (components, hooks, utilities)
- Provide clear run & deploy steps (Vercel / Netlify / GitHub Pages)

Do NOT waste time on theory.
Focus on shipping a real, elegant product.

Begin by choosing the visual direction and framework, then build the project step by step.
