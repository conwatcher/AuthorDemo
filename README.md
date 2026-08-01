# T.R. Dailey — author site

A static author website, and the reusable base template that future client
sites are cloned from.

**T.R. Dailey is a fictional author.** Every book, review quotation, publication
date, agent and address on this site was written to demonstrate the design and
structure of an author website. Nothing is for sale and no link leaves the site.
A notice saying so appears at the top of every page and again in every footer.

---

## Running it

Plain HTML, CSS and about forty lines of JavaScript. There is no build step, no
framework, and nothing to install.

Double-click `index.html` and it runs. That is the whole development
environment. Edit a file, save it, refresh the browser.

---

## File structure

```
AuthorDemo/
├─ index.html                  Home
├─ books.html                  All four titles
├─ about.html                  Biography and personal note
├─ contact.html                Agent, press, events, reader mail
├─ 404.html                    Not-found page
│
├─ books/                      One page per title
│  ├─ the-unraveling-of-august-finch.html
│  ├─ a-short-history-of-the-duplicate.html
│  ├─ the-guest-list-for-the-end-of-the-world.html
│  └─ the-weight-of-unspoken-tides.html
│
├─ assets/
│  ├─ css/site.css             All styling. Design tokens at the top
│  ├─ js/site.js               Mobile menu toggle. Nothing else
│  └─ img/covers/              Cover images, two sizes each
│
├─ content/
│  └─ CONTENT-GUIDE.md         Map of where every piece of text lives
│
├─ favicon.svg                 Browser tab icon
├─ robots.txt                  Search crawler instructions
├─ sitemap.xml                 Page list for search engines
└─ .nojekyll                   Tells GitHub Pages to serve files as-is
```

---

## Where the content lives

Every editable string sits inside a marked region in the HTML:

```html
<!-- EDIT: HERO -->
```

`content/CONTENT-GUIDE.md` lists every one of those markers and what it
controls, page by page. Start there.

Four blocks repeat across all nine HTML files — the demonstration notice, the
wordmark, the navigation, and the footer. Change one, change all nine. The guide
says which files.

**Why the text is in the HTML rather than a separate content file:** without a
build step, a separate content file can only be read by JavaScript in the
visitor's browser, which would leave the pages empty for search engines, make
them flicker on slow connections, and break them entirely if that one script
failed. The text is therefore in the HTML, kept organised by the comment fences
rather than by a second file that can drift out of step. The full reasoning, and
the upgrade path to a git-based CMS, is in the content guide.

---

## Theming

**Everything that gives this site its look is in one block** at the top of
`assets/css/site.css`, under the heading `1. DESIGN TOKENS`. Nothing below that
block hardcodes a colour, a typeface or a spacing value — it all refers back to
a token by name.

To re-skin for a different author or genre, edit that block and nothing else.

### Typefaces

| Token | Controls |
|---|---|
| `--font-display` | Headings, author name, excerpts, pull quotes |
| `--font-body` | Body text, navigation, buttons, labels |

Both are system font stacks, so nothing is downloaded and no font request
blocks the page from rendering. To use a webfont later, add its `@font-face`
rule and change the stack here only.

### Colour

| Token | Controls |
|---|---|
| `--color-paper` | Page background |
| `--color-paper-sunk` | Recessed panels — the excerpt section, note cards |
| `--color-ink` | Dark sections: header, hero, footer |
| `--color-ink-soft` | Panels inside dark sections |
| `--color-text` | Body text on the light background |
| `--color-text-muted` | Secondary text on light — captions, metadata |
| `--color-text-on-ink` | Body text on dark |
| `--color-text-on-ink-muted` | Secondary text on dark |
| `--color-accent` | The gold. Ornaments, rules, accents on dark |
| `--color-accent-bright` | Gold on hover |
| `--color-accent-ink` | A darker gold, used where gold must be *text* on the light background |
| `--color-accent-wash` | Transparent gold for washes |
| `--color-rule` | Hairline dividers on light |
| `--color-rule-on-ink` | Hairline dividers on dark |

Two notes on colour, if you change it:

- **`--color-accent` and `--color-accent-ink` are two shades of the same gold
  for a reason.** The bright gold is legible on the dark background but not on
  the light one. The darker gold is the version used for text on paper. Keep the
  pair, or text will fail contrast requirements.
- The current palette meets WCAG AA contrast throughout. Measured in the
  browser: body text on paper 14.5:1, muted text on paper 5.4:1, dark gold text
  on paper 5.3:1, body text on ink 15.7:1, muted text on ink 7.3:1, gold on ink
  7.6:1, and the demonstration bar 7.6:1. Every pair clears the 4.5:1 minimum
  for normal-size text. If you swap colours, check the pairs again.

### Spacing, type scale, layout

| Token group | Controls |
|---|---|
| `--space-3xs` … `--space-2xl` | Every margin and gap on the site |
| `--text-xs` … `--text-3xl` | Every font size. The larger sizes use `clamp()` so they scale smoothly with the viewport |
| `--leading-*`, `--tracking-*` | Line height and letter spacing |
| `--wrap`, `--wrap-narrow` | Content width, and the narrower measure used for long-form reading |
| `--radius`, `--shadow-*` | Corner rounding and the depth on cover images |

There is one more mechanism worth knowing. Any section given the class `on-ink`
becomes a dark section, and it **redefines the text and rule tokens for
everything inside it**. That is why no component needs to know whether it is on
a light or dark background — put it inside `.on-ink` and it adapts. If you add a
dark section, use that class rather than restyling components.

---

## Accessibility

- Semantic HTML throughout: one `<h1>` per page, headings in order, real
  `<nav>`, `<main>`, `<footer>` landmarks
- "Skip to content" link as the first focusable element
- Alt text on every image, describing what is actually shown
- Visible focus ring on every interactive element, in a two-part design that
  stays visible on both the light and dark backgrounds
- Touch targets at least 44 pixels tall
- Menu closes on `Escape` and returns focus to the button
- `prefers-reduced-motion` respected — all transitions are disabled for visitors
  who ask for that
- Retailer buttons are genuinely disabled `<button>` elements, not links dressed
  up to look inert

## Performance

- No webfonts, no icon fonts, no external requests of any kind
- One stylesheet, one small deferred script
- Covers served at two sizes via `srcset`; the browser downloads the smaller
  file on a phone
- `width` and `height` on every image, so nothing shifts as the page loads
- Below-the-fold images use `loading="lazy"`
- The hero background and the About page silhouette are drawn in CSS and inline
  SVG rather than loaded as image files

## SEO

Each page has its own title, meta description, canonical URL and Open Graph
tags. `sitemap.xml` lists all eight public pages; `robots.txt` points to it.

---

## Publishing to GitHub Pages

> **Before publishing, check one thing.** Absolute URLs throughout this project
> assume the site will live at `https://conwatcher.github.io/AuthorDemo/`. They
> appear in the `canonical` and `og:` tags of every page, in `sitemap.xml`, in
> `robots.txt`, and as the `/AuthorDemo/` prefix in `404.html`.
>
> If your GitHub username is not `conwatcher`, or you name the repository
> something other than `AuthorDemo`, run this from the project folder in
> PowerShell to correct them all at once:
>
> ```powershell
> Get-ChildItem -Recurse -Include *.html,*.xml,*.txt | ForEach-Object { (Get-Content $_.FullName -Raw) -replace 'conwatcher\.github\.io/AuthorDemo', 'YOURNAME.github.io/YOURREPO' -replace '/AuthorDemo/', '/YOURREPO/' | Set-Content $_.FullName -Encoding utf8 }
> ```
>
> The site itself works regardless — every link between pages is relative. Only
> the search and social-sharing metadata depends on this.

The repository is already initialised and committed locally. To publish:

1. Create a new **public** repository named `AuthorDemo` on GitHub. Do not add a
   README, licence or `.gitignore` — this folder already has what it needs.
2. Connect and push:

   ```bash
   git remote add origin https://github.com/conwatcher/AuthorDemo.git
   git branch -M main
   git push -u origin main
   ```

3. In the repository on GitHub, open **Settings → Pages**. Under **Source**,
   choose **Deploy from a branch**, set the branch to `main` and the folder to
   `/ (root)`, and save.
4. Wait a minute or two, then load
   `https://conwatcher.github.io/AuthorDemo/`.

The repository must be public for GitHub Pages to serve it on a free account.

---

## Using this as a base template

The point of this build is the next one. To start a client site:

1. Copy the folder.
2. Edit the design token block in `assets/css/site.css` — colours and fonts for
   the new author's genre.
3. Work through the `EDIT:` fences using `content/CONTENT-GUIDE.md`.
4. Replace the covers in `assets/img/covers/`, at both sizes.
5. Add or remove book pages in `books/`, following the instructions at the end
   of the content guide.
6. Update `sitemap.xml`, `robots.txt`, and the absolute URLs, per the note above.
7. Delete the demonstration notice from all nine files, and the fictional-author
   disclaimer from every footer.

Step 7 matters. Do not ship a client site carrying a notice that its author does
not exist.
