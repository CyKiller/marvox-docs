# Marvox Documentation Deployment Guide

## Overview
The Marvox documentation site can be deployed in several ways depending on your infrastructure and preferences.

## Deployment Options

### 1. Subdomain Deployment (Recommended)
**URL Structure**: `https://docs.marvox.com`

**Pros:**
- Clean separation of concerns
- Independent scaling and updates
- Better SEO organization
- Easy to manage different tech stacks

**Setup:**
\`\`\`bash
# Vercel deployment
vercel --prod --alias docs.marvox.com

# Netlify deployment
netlify deploy --prod --alias docs.marvox.com
\`\`\`

### 2. Subdirectory Deployment
**URL Structure**: `https://marvox.com/docs`

**Pros:**
- Single domain management
- Unified analytics
- Shared authentication context

**Setup:**
- Requires reverse proxy configuration
- Next.js basePath configuration needed

### 3. Separate Domain
**URL Structure**: `https://marvox-docs.com`

**Pros:**
- Complete independence
- Dedicated branding
- Separate analytics and monitoring

## Recommended Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐
│   Main App      │    │   Docs Site     │
│   marvox.com    │    │ docs.marvox.com │
│                 │    │                 │
│ - Dashboard     │    │ - User Guide    │
│ - Studio        │    │ - API Docs      │
│ - Character AI  │    │ - Examples      │
│ - Projects      │    │ - Support       │
└─────────────────┘    └─────────────────┘
\`\`\`

## Cross-Site Integration

### Navigation Links
\`\`\`typescript
// In main app header
<Button asChild>
  <Link href="https://docs.marvox.com">Documentation</Link>
</Button>

// In docs site header
<Button asChild>
  <Link href="https://marvox.com">Back to App</Link>
</Button>
\`\`\`

### Shared Authentication (Optional)
\`\`\`typescript
// Shared JWT tokens across subdomains
// Cookie domain: .marvox.com
\`\`\`

## SEO Considerations

### Sitemap Integration
\`\`\`xml
<!-- Main sitemap.xml -->
<sitemap>
  <loc>https://marvox.com/sitemap.xml</loc>
</sitemap>
<sitemap>
  <loc>https://docs.marvox.com/sitemap.xml</loc>
</sitemap>
\`\`\`

### Cross-linking Strategy
- Main app links to relevant docs sections
- Docs site includes "Try in App" CTAs
- Consistent branding and messaging
