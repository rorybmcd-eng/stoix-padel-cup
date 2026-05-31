# STOIX Padel Cup — Deployment Guide

## Files

- `index.html` — The signup page (self-contained, no build step required)
- `emails.md` — Three reminder email drafts
- `README.md` — This file

## Form Setup (Formspree)

The form uses Formspree for zero-backend form submissions.

**Steps:**
1. Go to https://formspree.io and sign in / create an account
2. Create a new form → set the destination to **contact@stoix.co.uk**
3. Copy the **Form ID** (it looks like `xpzgrbek`)
4. In `index.html`, replace `YOUR_FORM_ID` on this line:
   ```html
   <form id="signup-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
5. Free tier: 50 submissions/month. Paid ($10/mo) for more + custom redirect.

## GitHub + Cloudflare Pages Deployment

### Step 1 — Create GitHub repo
```bash
cd ~/.hermes/profiles/work/projects/stoix-padel-cup
git init
git add .
git commit -m "Initial: STOIX Padel Cup signup page"
gh repo create stoix-padel-cup --public --source=. --push
```

### Step 2 — Cloudflare Pages
1. Go to Cloudflare Dashboard → Pages → Create a project
2. Connect GitHub → select `stoix-padel-cup` repo
3. **Build settings:** None required (static HTML)
   - Build command: (leave blank)
   - Output directory: `/` (root)
4. Deploy → Cloudflare assigns a `*.pages.dev` URL instantly
5. Add a custom domain (e.g. `padel.stoix.co.uk`) via Pages → Custom Domains

### Step 3 — Custom domain (optional)
Add a CNAME record in Cloudflare DNS:
- Name: `padel`
- Target: `stoix-padel-cup.pages.dev`

This gives you: **https://padel.stoix.co.uk**

## Reminder Email Schedule

| Send date | Email | Subject |
|-----------|-------|---------|
| ~11 June 2026 | Email 1 | STOIX Padel Cup — 2 weeks away |
| ~18 June 2026 | Email 2 | STOIX Padel Cup — one week away. Here's everything you need. |
| 24 June 2026 | Email 3 | STOIX Padel Cup — tomorrow. Last details inside. |
