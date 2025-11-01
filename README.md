# Rushikesh Gadekar — Portfolio

This is a minimal personal portfolio website (single-page) built with plain HTML, CSS and a small JS file.

Contents
- `index.html` — main single-page portfolio (Navbar, Hero, About, Projects, Achievements, Gallery, Contact)
- `phoenix.html` — optional creative/artistic add-on (Rising Phoenix concept)
- `style.css` — site styles
- `script.js` — smooth scroll, reveal on scroll, mobile nav toggle, contact form handler
- `images/` — placeholder images

Quick local preview

1. Open `index.html` directly in your browser (double-click) for a static preview.
2. Or serve locally (recommended) from the site root folder:

```powershell
# from the project root (e:\Website)
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Deployment (GitHub Pages)

- Create a public repository named `rushikeshgadekar.github.io` and push the files to the `main` branch.
- GitHub Pages will serve the site at `https://rushikeshgadekar.github.io`.

Placeholders & customization
- Replace links (GitHub, LinkedIn, Instagram, email) in `index.html` with your real profiles.
- Add your profile photo to `images/profile.svg` (or `profile.jpg`) and update the filename if needed.
- Replace the Formspree endpoint in `script.js` (the `FORMSPREE_ENDPOINT` constant) with your Formspree form ID or configure an alternative endpoint.
- Add project screenshots to `images/` and update project cards in `index.html`.

Notes
- The contact form is configured to POST to Formspree (placeholder). If you prefer mailto only, users can use the email link in the Quick contact box.
- `phoenix.html` is a creative page and can be expanded into a canvas/WebGL demo for more advanced visuals.