# André Esperidião — Portfolio

Personal portfolio website for André Esperidião, fashion and lifestyle photographer based in Dublin, Ireland.

**Live site:** [veckdev.github.io/andre-esperidiao](https://veckdev.github.io/andre-esperidiao)

---

## Structure

```
├── index.html        # Homepage
├── work.html         # Project grid
├── project.html      # Project detail page
├── about.html        # About page
├── contact.html      # Contact form
├── 404.html          # Not found page
├── style.css         # Global styles
└── main.js           # Project data + UI logic
```

## Adding or editing projects

All project data lives in `main.js`. Each project follows this shape:

```js
{
  id: 'project-id',           // used in the URL: project.html?id=project-id
  title: 'Project Title',
  subtitle: 'Conceptual subtitle in editorial tone',
  year: '2024',
  category: 'Editorial',
  cover: 'images/project/cover.jpg',
  heroImage: 'images/project/hero.jpg',  // optional, falls back to cover
  images: [
    'images/project/01.jpg',
    'images/project/02.jpg',
  ]
}
```

## Adding images

Place images inside `images/` following the existing folder structure. Recommended format: JPG, optimized for web (ideally under 500kb per image).

## Contact form

Handled via [Formspree](https://formspree.io). The endpoint is configured in `contact.html`. No backend required.

## Deployment

The site is hosted on **GitHub Pages** from the `main` branch. Any push to `main` reflects on the live site automatically.

## Design

- **Typefaces:** Cormorant Garamond (display) + DM Sans (UI)
- **Background:** Warm off-white `#fafaf8`
- **Style:** Minimalist editorial, luxury fashion aesthetic