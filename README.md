# OCR H573 — A-Level Religious Studies Revision

A static website with revision notes for OCR A-Level Religious Studies (H573):
Philosophy of Religion, Religion & Ethics, and Developments in Christian Thought.

## Files

- `index.html` — page shell
- `styles.css` — styling
- `content.js` — all 30 topics (notes, theses, scholars, exam questions)
- `app.js` — tab switching, search, scroll-spy

No build step. No dependencies. Pure static site.

## Deploy

Since this is a plain static site, host it anywhere. Two easy options:

### Option A — GitHub Pages (free, works with this repo)

1. Push this branch to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: pick this branch (or merge to `main` first and pick `main`), folder `/ (root)`.
4. Save. GitHub gives you a URL like `https://<user>.github.io/<repo>/`.

**Connecting your own domain:**
1. In **Settings → Pages → Custom domain**, type your domain and save. This creates a `CNAME` file in the repo.
2. At your domain registrar, add DNS records:
   - For an **apex domain** (`example.com`): four A records to GitHub's IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
   - For a **subdomain** (`www.example.com` or `notes.example.com`): one CNAME record pointing to `<user>.github.io`.
3. Back in Settings → Pages, tick **Enforce HTTPS** once DNS resolves.

### Option B — Cloudflare Pages / Netlify / Vercel

Drag-and-drop the four files, or connect the repo. All three auto-detect static sites, deploy in seconds, and give you a one-click custom-domain flow.

## Keyboard shortcuts

- `/` or `Ctrl+K` — search
- `1` / `2` / `3` — switch papers
- `↑` / `↓` / `Enter` / `Esc` — navigate search results
