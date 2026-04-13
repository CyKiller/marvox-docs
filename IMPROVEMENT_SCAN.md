# Marvox Docs Site — Improvement Scan Report
**Date**: April 12, 2026  
**Status**: Phase 7 Complete, Phase 8 Planning

---

## Current State: What's Deployed ✅

### Pages (14 total)
1. **Start Here** (START_HERE.md) — Canonical onboarding
2. **Overview** (README.md) — Project intro
3. **User Guide** (USER_GUIDE.md) — Studio walkthrough
4. **API Reference** (API.md) — 3900+ lines, raw OpenAPI
5. **Development Guide** (DEVELOPMENT.md) — Local setup
6. **Architecture** (ARCHITECTURE.md) — System design
7. **Deployment** (DEPLOYMENT.md) — Railway/Vercel
8. **Contributing** (CONTRIBUTING.md) — PR workflow
9. **Agent Network** (AGENTS.md) — 25+ agent reference
10. **Workflows** (workflows-page.tsx) — 8 interactive flows with walk-through animations
11. **Studio Layout** (studio-layout-diagram.tsx) — 3-panel animated wireframe
12. **Roadmap** (ROADMAP.md) — Product phases
13. **Security** (SECURITY.md) — Policies and posture
14. **Changelog** (CHANGELOG.md) — Release notes

### Interactive Components ✅
- **Table of Contents** — Right-rail sticky TOC with IntersectionObserver active-section tracking
- **Theme Toggle** — Sun/Moon button with hydration-safe mount guard
- **Breadcrumb Navigation** — Docs › Section › Page title
- **Search Provider** — Client-side full-text search
- **Workflows Page** — 8 walk-through animations (build, chat, scene, audio, reflection, collab, API keys, RAG)
- **Studio Layout Diagram** — Animated 3-panel interface wireframe
- **Architecture Page** — Expandable ProductionPipeline and SceneOrchestration sections with glow dots
- **Mobile Navigation** — Hamburger menu with responsive drawer

### SEO & Analytics ✅
- **robots.txt** — Generated, allows all crawlers
- **sitemap.xml** — 20 URLs, auto-generated from DOC_PAGES, priority-weighted
- **Open Graph Image** — /og-image.svg (1200×630 branded SVG)
- **Twitter Card** — summary_large_image with image
- **GA4 Integration** — Script guard on NEXT_PUBLIC_GA_ID env var
- **MetadataBase** — https://marvox-docs.netlify.app
- **Per-Page OG Metadata** — Unique title/description per page
- **Skip Link** — Keyboard/screen reader accessible

### UX & Accessibility ✅
- Dark mode by default
- Light mode with full CSS variables (HSL tokens)
- Theme toggle with hydration guard
- Sticky TOC with active-section highlighting (cyan border + font-weight)
- Smooth scroll on TOC click with offset
- Keyboard-friendly navigation (Tab, Enter, Space)
- Skip-to-content link (sr-only, focus:not-sr-only)
- Edit on GitHub links throughout
- Good color contrast (dark bg, light text, cyan accents)

---

## Gap Analysis: What's Missing ❌

### 1. Interactive Diagrams/Visualizations (Highest Priority)

**Main Project Has (Not In Docs):**
- `components/characteros/story-graph-visualization.tsx` (200+ lines)
  - ReactFlow-based graph visualization
  - Node types: character, location, event
  - Edge types: follows, conflicts_with, allies_with, mentions, located_at
  - Filters, zoom controls, custom styling
  
- `components/dashboard/character-network-visualization.tsx`
  - Placeholder for character relationship network
  - Ready for D3.js or ReactFlow implementation

**Needed in Docs:**
- [ ] **Story Graph Diagram** — Interactive visualization of character relationships, conflicts, alliances, location mentions. Can port from main project.
- [ ] **Agent Network Diagram** — 25+ agents organized by family (Text, QA, Voice, Supporting, Evolution) with data flow edges
- [ ] **Build Pipeline Diagram** — Upload → Validation → Character Extraction → Profile Building → Memory Indexing
- [ ] **Audio Pipeline Diagram** — Scene Parsing → Voice Selection → Voice Configuration → TTS → Audio QA → Mixing
- [ ] **Vector RAG Pipeline Diagram** — Query → Top-K Retrieval → Re-ranking → Safety Filter → Context Assembly

### 2. Code Examples (Major Gap)
- **Current**: 0 copy-paste examples
- **Target**: 40+ examples (curl, Python, TypeScript)
- **Common Workflows to Document**:
  1. Authenticate + create API key
  2. Upload manuscript (DOCX/PDF/TXT)
  3. Create/configure character from canon
  4. Chat with character in CANON mode
  5. Generate multi-character scene
  6. Start character reflection
  7. Generate multi-voice audio
  8. Query storyworld with reader agent

### 3. Expanded Agent Documentation
- Current AGENTS.md: ~355 lines (incomplete agent family breakdown)
- Main project AGENTS.md: More detailed with implementation notes
- **Missing Details**:
  - Voice DNA cloning mechanics (DNALearningEngine, VoiceVault)
  - Consensus analysis between writers (ConsensusAnalyzerAgent)
  - Emotional arc evolution tracking (EmotionalArcEvolverAgent)
  - Better agent family hierarchy (Core Text, QA, Voice, Supporting, Evolution)

### 4. API Reference Enhancements
- Raw OpenAPI reference is 3900+ lines (hard to skim)
- **Needed**:
  - Organized by resource (Projects, Characters, Scenes, Audio, Billing)
  - Expandable request/response examples
  - Copy-paste curl commands
  - Language-specific code generation (curl, Python, JS)
  - Webhook event schema documentation

### 5. Enhanced Home Page
- [ ] Feature cards with icons (Character AI, Scene Gen, Voice, RAG, etc.)
- [ ] Call-to-action buttons (Get Started, View Docs, GitHub)
- [ ] Animated hero section / gradient background
- [ ] Quick links to top pages

### 6. Better Cross-Linking
- Agent page doesn't link to specific agent sub-pages
- API examples don't cross-link to workflow docs
- Architecture page could highlight which service powers which feature
- Roadmap items could link to related feature docs

---

## Quality Metrics: Current vs. Target

| Aspect | Current | Target | Gap | Priority |
|--------|---------|--------|-----|----------|
| **Pages** | 14 | 14-16 | +2 sub-pages | Low |
| **Interactive Diagrams** | 2 | 7 | **+5** | **HIGH** |
| **Code Examples** | 0 | 40+ | **Major** | **HIGH** |
| **Visualizations** | 2 | 7 | **+5** | **HIGH** |
| **API Organization** | Basic | Enhanced | Better structure | Medium |
| **SEO/Analytics** | ✅ Full | ✅ Full | — | Complete |
| **Accessibility** | ~85% | 95%+ | Minor improvements | Low |
| **Mobile Responsive** | Yes | Enhanced (edge cases) | Polishing | Low |

---

## Recommended Implementation Priority

### Phase 8A — High Impact, Medium Effort 🎯
**Estimated**: 2-3 days

1. **Story Graph Diagram** (~300 lines, port from main project)
   - Create `components/story-graph-interactive.tsx`
   - Wire into Architecture page or new interactive page
   - Implement search/filter for 25+ agents

2. **API Code Examples** (~400 lines)
   - Create `lib/code-examples.ts` with 8 common workflows
   - Update API Reference page with filterable code browser
   - Add curl + Python examples for each endpoint family

3. **Agent Network Diagram** (~250 lines, custom SVG or Mermaid)
   - Create `components/agent-network-diagram.tsx`
   - Show agent families: Core Text, QA, Voice, Supporting, Evolution
   - Add hover tooltips with agent descriptions

### Phase 8B — High Polish, Lower Priority 📊
**Estimated**: 1-2 days

4. **Build Pipeline Diagram** (~100 lines, Mermaid)
   - ASCII or Mermaid diagram showing upload → analysis → indexing
   - Can be static (no interaction required)

5. **Audio Pipeline Diagram** (~120 lines, Mermaid)
   - Mermaid flow with expandable sections
   - Voice selection → TTS → QA → Output

6. **Roadmap Timeline** (~200 lines, custom React component)
   - Interactive timeline showing Phase 1-9 with status badges
   - Link to feature pages

### Phase 8C — Polish / Nice-to-Have ✨
**Estimated**: 1-2 days

7. Home page feature cards (motion, icons, typography)
8. Better API example browser with syntax highlighting
9. Mobile TOC drawer (toggle button for small screens)
10. Advanced search with filters (type: agent/page/example)

---

## Files to Create/Modify

### New Components
```
components/
├── story-graph-interactive.tsx       # ReactFlow-based graph
├── agent-network-diagram.tsx         # SVG/Mermaid circle diagram
├── build-pipeline-diagram.tsx        # ASCII/Mermaid flow
├── audio-pipeline-diagram.tsx        # ASCII/Mermaid flow
├── code-example-browser.tsx          # Filterable code snippets
└── roadmap-timeline.tsx              # Interactive phase timeline

lib/
├── code-examples.ts                  # 8 workflows × 2 languages
└── diagrams.ts                       # Diagram data structures

content/
└── CODE_EXAMPLES.md                  # Example library (optional)
```

### File Updates
```
app/
├── page.tsx                          # Add feature cards, CTA
└── [...slug]/page.tsx                # Wire examples for API page

lib/
└── docs-data.ts                      # Add sub-page concept (future)
```

---

## Migration Checklist

### From Main Project to Docs
- [ ] Port `components/characteros/story-graph-visualization.tsx`
  - Remove project-specific auth/state management
  - Make demo-friendly with sample data
  - Add to Architecture page or new Interactive page

- [ ] Review `AGENTS.md` in main project for more details
  - Voice DNA cloning section
  - Consensus analysis mechanics
  - Emotional arc evolution

- [ ] Extract API workflow examples from `backend/characteros_routes.py`
  - Character chat request/response
  - Scene generation request/response
  - Audio generation request/response

---

## Technical Notes

### ReactFlow Import (Already Available)
- Main project already imports `reactflow` in `components/characteros/story-graph-visualization.tsx`
- Docs site can reuse same import + styling pattern

### Mermaid Diagrams
- Could add `react-mermaid` or `mermaid` package
- Or keep as ASCII art for simplicity (no extra dependencies)

### Code Highlighting
- `highlight.js` already installed (used for markdown code blocks)
- Can use for example browser

### Mobile Optimization
- TOC already hidden below `xl:` breakpoint
- Could add drawer toggle on mobile for better UX

---

## Decision Matrix for User

| If priority is… | Do Phase | Why |
|---|---|---|
| **"Make docs look pro"** | 8A + 8B | Diagrams have highest visual impact |
| **"Help developers ship faster"** | 8A (Examples focus) | Code examples reduce integration time |
| **"Perfect the docs"** | 8A + 8B + 8C | Full completeness in 4-5 days |
| **"Quick wins first"** | 8A only | Highest ROI, shippable in 2-3 days |

---

## Next Action

**User Decision Needed:**
1. Which diagrams matter most? (Story graph, Agents, Pipeline, Audio, All?)
2. How many code examples? (Essential 8, or comprehensive 40+?)
3. Timeline preference? (Quick wins in Phase 8A, or full perfection?)
4. Should we port existing main-project components or build doc-specific ones?

Once decided, implementation can begin immediately.
