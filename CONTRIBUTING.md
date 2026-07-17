# Making & publishing changes

How to change the site safely — including how to **preview your work on a private URL
before it goes public**. Written for anyone, not just developers.

> New to editing the content itself? Start with
> [docs/editing-content.md](docs/editing-content.md). This page is about how to
> _publish_ what you've changed.

---

## The two ways to publish

**1. Small, confident change** → push straight to `main`. It goes live in ~1 minute.

**2. Anything you want a second look at first** → use a **branch + preview** (below).
You get a private URL to check (and share) before it touches the real site.

When in doubt, use the preview flow — it's only two extra commands and it's impossible
to break the live site.

---

## The safe flow: preview before publishing

Every branch you push gets its own **preview deployment** — a full copy of the site at
a private URL, built from exactly your changes. The live site at
`unique-engineers-website.vercel.app` is untouched until you merge to `main`.

### Step by step

```bash
# 1. Start from an up-to-date main
git checkout main
git pull

# 2. Make a branch for your change (name it anything descriptive)
git checkout -b update-foxconn-case-study

# 3. …edit files, check them at http://localhost:3000 with `pnpm dev`…

# 4. Save your work and push the branch
git add -A
git commit -m "Update the Foxconn case study copy and photo"
git push -u origin update-foxconn-case-study
```

**Now get your preview URL** (either works):

- **GitHub** — open the repo; GitHub shows a "Compare & pull request" button for your
  branch. Click it to open a pull request. Vercel automatically comments the **preview
  URL** on it within a minute.
- **Vercel** — the [project dashboard](https://vercel.com) lists a preview deployment
  for your branch; click it to open the preview URL.

Share that URL with anyone for review. Every new push to the branch updates the same
preview.

### When it's approved → publish

Merge the branch into `main` (this is what makes it live):

- **Easiest:** on the GitHub pull request, click **Merge pull request**.
- **From the terminal:**
  ```bash
  git checkout main
  git pull
  git merge update-foxconn-case-study
  git push
  ```

The moment `main` updates, the live site rebuilds and publishes automatically.

---

## Before you merge — a 20-second checklist

- [ ] The page looks right in your **preview URL** (not just on your laptop).
- [ ] Any new **photo** actually appears (right path, file committed).
- [ ] No made-up clients, projects, or numbers — everything is real.
- [ ] Copy is **third person** and mixed-case (see
      [the voice rules](docs/design-system.md#voice)).
- [ ] Optional but reassuring: `pnpm build` runs without errors.

---

## Writing good commit messages

A commit message is a short note about what you changed. Keep it plain:

- ✅ `Update Nalanda case study metrics`
- ✅ `Swap the healthcare sector hero photo`
- ✅ `Fix typo on the contact page`
- ❌ `changes` / `stuff` / `asdf`

---

## If something goes wrong

- **A page shows an error after an edit** — you almost certainly broke the JSON
  punctuation (a missing `"` or `,`). Undo your last edit and copy an existing entry
  as a template instead.
- **You want to throw away un-pushed changes** — `git checkout -- .` resets your files
  to the last commit.
- **The live site broke** — every deploy is saved. In the
  [Vercel dashboard](https://vercel.com), open the project → **Deployments**, find the
  last good one, and use **⋯ → Promote to Production** to roll back instantly. Then fix
  the branch and re-merge.

---

## Quick reference

| Command                              | What it does                          |
| ------------------------------------ | ------------------------------------- |
| `pnpm dev`                           | Run the site locally to preview edits |
| `git checkout -b my-change`          | Start a new branch                    |
| `git add -A && git commit -m "…"`    | Save your changes                     |
| `git push -u origin my-change`       | Push the branch → get a preview URL   |
| `git checkout main && git merge …`   | Publish (make it live)                |
| `pnpm build`                         | Confirm everything works              |
