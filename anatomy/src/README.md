# Anatomy 101 deck source (NS I + RS I)

Builds the two cadaver-to-lecture decks published at `ns-peer-tutoring/anatomy/` and `rs-peer-tutoring/anatomy/`.

- `content/sec_*.py`: one file per section. `SEC` (title, handout, objectives), `CARDS` (concept cards: lecture figures, cloze points, Thai notes, SAY line) and `STEPS` (cadaver steps: atlas plate, numbered labels, instructions, lecture comparison figure).
  - NS order: B S K F T O N C
  - RS order: U L W P
- `content/flows.py`: the nerve, artery and vein connection maps (indented-tree text) and the cards they attach to (`ATTACH`).
- `content/thai_tutor.py`: Thai SAY lines and Thai tutor notes.
- `bank/*.py`: past-paper items (spot tests, lecture quizzes, MCQ recalls).
- `flowsvg.py`: lays out each connection map as SVG (layered DAG, elbow edges, dashed anastomoses).
- `app/`: deck CSS and `app.js` (Present/Browse, cloze, labels quiz, flow tracing, tutor follow mode).
- `build.py`: `COURSE=NS|RS python3 build.py` writes `site/<course>/` with `student.html`, `tutor.html` and `img/`. Set `PUBLIC=1` to leave out the atlas photos (`site_pub/`): the public decks show a "Rohen p.X, open your atlas" box with the same label numbers.
- `printpdf.py`: the A4 `student.pdf` (headless Chrome via Playwright).
- `jscheck.py`: opens every card in both modes and reports JS errors.
- `tbcrop.py`: cuts the NS I tidbits board PDF into `tb/ns_*.jpg` tiles (each photo with its handwritten labels); cards use them as `('tb', 'ns_…')` figures. `printpdf.py` collects each section's tiles on a *Tidbits board* page.

Images (handout crops, atlas crops, lab-clip frames) and the reference PDFs are not in this folder. The build reads them from its working folder (paths at the top of `build.py`). Outside the original build machine, point the scripts at your own folders with `W` (working folder), `FONTS` (`@fontsource` packages), `REPOS` (the peer-tutoring repos, for past-paper images), `CHROME` (Chrome binary for `printpdf.py` / `jscheck.py`) and `DECKS` (`jscheck.py`: `ns`, `rs` or both). `flowsvg.py` measures text with `W/ttf/plex{400,500,600}.ttf` (IBM Plex Sans) and Pillow's Raqm layout; without Raqm the map boxes come out a few pixels different.
