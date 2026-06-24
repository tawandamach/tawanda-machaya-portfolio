# Tawanda Machaya — Portfolio

A fast, single-page portfolio site for **Tawanda Machaya, Cybersecurity Analyst**.
Built as a zero-dependency static site (HTML + CSS + vanilla JS) so it runs anywhere
and is trivial to host on a custom domain.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Page content & sections (Hero, About, Skills, Experience, Projects, Credentials, Contact) |
| `styles.css` | Dark, security-themed design system, responsive layout |
| `script.js` | Typed tagline, count-up stats, scroll reveals, mobile nav, copy-email, matrix background |

## Run locally

It's a static site — just open `index.html`, or serve it:

```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (custom domain, like the reference site)

Any static host works. Easiest options:

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect a repo, then add your custom domain in the dashboard.
- **GitHub Pages** — push to a repo, enable Pages, point your domain's DNS (CNAME) at it.

## Editing content

All text lives in `index.html`. Update contact details in the Contact section
and in `script.js` (the `copy-email` handler) if the email changes.
Colors and fonts are CSS variables at the top of `styles.css` (`:root`).
