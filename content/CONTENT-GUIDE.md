# Where the content lives

This file is a map. It does not contain any of the site's text — it tells you
which file to open to change a given piece of it.

Every editable string on the site sits inside an HTML comment fence that looks
like this:

```html
<!-- EDIT: HERO -->
```

If you can find the fence, you can change the text without knowing any HTML
beyond "don't delete the angle brackets."

---

## Why the text is in the HTML and not in a separate content file

This was a deliberate choice, and it is worth understanding before you change it.

A separate content file (JSON, YAML, Markdown) only works if something reads
that file and turns it into a page. That "something" is either a build step —
which this project deliberately does not have — or JavaScript running in the
visitor's browser.

Putting the text in JavaScript would cost real things:

- **Search engines** would see empty pages on first load.
- **Visitors on slow connections** would see the layout appear, then blink as
  the words arrived.
- **The site would break entirely** if that one JavaScript file failed to load.

So the text lives in the HTML, where it is fast, indexable, and works with
JavaScript switched off. The organising discipline is the comment fences, not a
second file that can drift out of step with the first.

**When a git-based CMS is added later** (Decap, Sveltia, or similar), the usual
path is to introduce a build step at that point: Markdown files become the
source, and these HTML pages become generated output. Nothing in the current
structure blocks that — each page is already one self-contained document with
its content in one place.

---

## Global content — appears on every page

These four blocks are repeated in all nine HTML files. If you change one, change
all of them. They are marked in every file.

| Fence | What it controls |
|---|---|
| `EDIT: DEMONSTRATION NOTICE` | The gold bar at the very top |
| `EDIT: WORDMARK` (header) | The author name in the top-left |
| `EDIT: MAIN NAVIGATION` | The four nav links |
| `EDIT: FOOTER` | Footer columns, tagline, and the demonstration disclaimer |

Nine files: `index.html`, `books.html`, `about.html`, `contact.html`,
`404.html`, and the four pages in `books/`.

---

## Per-page content

### `index.html` — Home

| Fence | What it controls |
|---|---|
| `EDIT: PAGE METADATA` | Browser tab title, search-result description, social sharing preview |
| `EDIT: HERO` | Author name, tagline, "Four novels · Literary suspense" |
| `EDIT: FEATURED BOOK` | The new-release panel: cover, title, series line, blurb, button |
| `EDIT: INTRODUCTION` | The dark centred section about the work as a whole |
| `EDIT: BOOK GRID` | The four small book cards. One `<li>` each |

### `books.html` — Books

| Fence | What it controls |
|---|---|
| `EDIT: PAGE METADATA` | Title, description, social preview |
| `EDIT: PAGE INTRODUCTION` | Heading and the line beneath it |
| `EDIT: BOOK LIST` | The four large book cards. One `<li>` each |

### `about.html` — About

| Fence | What it controls |
|---|---|
| `EDIT: PAGE METADATA` | Title, description, social preview |
| `EDIT: PAGE HEADING` | "About" / author name |
| `AUTHOR PORTRAIT` | The silhouette. Replace the whole `<figure>` with an `<img>` when a real photograph exists |
| `EDIT: BIOGRAPHY` | The bio, roughly 400 words |
| `EDIT: PERSONAL NOTE` | The boxed note from the author |

### `contact.html` — Contact

| Fence | What it controls |
|---|---|
| `EDIT: PAGE METADATA` | Title, description, social preview |
| `EDIT: PAGE HEADING` | "Contact" and the intro line |
| `EDIT: CONTACT DETAILS` | The four contact cards |
| `EDIT: SOCIAL PLACEHOLDERS` | The "Elsewhere" chips |

### `books/*.html` — One page per book

All four book pages have the same fences in the same order:

| Fence | What it controls |
|---|---|
| `EDIT: PAGE METADATA` | Title, description, social preview, cover image for sharing |
| `EDIT: COVER` | The cover image and its alt text |
| `EDIT: TITLE, SERIES, BLURB` | Title, series line, tagline, blurb paragraphs |
| `EDIT: BUY LINKS` | The retailer placeholder buttons |
| `EDIT: BOOK FACTS` | Publication date, publisher, length, formats, recognition |
| `EDIT: EXCERPT` | The sample chapter. Delete the whole `<section>` to remove it |
| `EDIT: PRAISE` | Review quotations |
| `EDIT: NEXT BOOK` | The "keep reading" link at the bottom |

---

## Images

All covers are in `assets/img/covers/`. Each book has two sizes:

- `<name>-300.jpg` — grid thumbnails
- `<name>-500.jpg` — book pages and social sharing previews

Both are referenced together in a `srcset`, so the browser picks the smaller
file on a phone and the larger one on a desktop. If you replace a cover, replace
**both sizes** and keep the filenames, or update every reference to it.

Every `<img>` carries a `width` and `height` so the page does not jump around
while images load, and an `alt` description for screen readers. If you swap a
cover, rewrite the alt text to describe the new one.

---

## Adding a fifth book

1. Copy any file in `books/` and rename it to the new title, all lowercase,
   words separated by hyphens.
2. Work down the fences and replace the content.
3. Add the two cover sizes to `assets/img/covers/`.
4. Add a card to the grid in `books.html` and, if it should appear there, to
   `index.html`.
5. Add the page to the footer list — remember, it is in all nine files.
6. Add a `<url>` block to `sitemap.xml`.
