---
name: deploying-to-vercel
description: >
  Deploys a frontend project to Vercel. Use when the user asks to
  "deploy to Vercel", "publish to Vercel", or mentions Vercel hosting.
---

# Deploy to Vercel

## When to use this skill

- User asks to deploy or publish a project to Vercel
- User wants previews or production deployments on Vercel

## Workflow

- [ ] Confirm project root and framework
- [ ] Ensure `vercel.json` exists (create if missing)
- [ ] Run `npx vercel --prod` or `npx vercel` for preview
- [ ] Report the deployment URL to the user

## Instructions

### Prerequisites

- Node.js ≥ 18
- A Vercel account linked via `npx vercel login`

### Deploy Command

```bash
npx -y vercel --prod
```

If the user wants a preview deploy instead:

```bash
npx -y vercel
```

### Troubleshooting

- Run `npx vercel --help` for all available flags.
- If the build fails, check the framework detection output and ensure the correct build command is set in `vercel.json`.
