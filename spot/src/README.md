# Spot trainer source (NS I + RS I)

Builds the two checklist spot trainers published at `ns-peer-tutoring/spot/` and `rs-peer-tutoring/spot/`: every structure on the gross-lab attendance checklist (112-69 NS I, 114-69 RS I) shown on cadaver photos, as image-occlusion flashcards with spaced repetition, quizzes and timed past spot stations.

## How the photos are made

The photos come from Rohen, *Anatomy: A Photographic Atlas* 8e. The atlas PDF is read locally and never committed.

1. `atlas.py` indexes every page: photos, legend (number → name, merged across a two-page spread), label numbers and their leader lines. Where the labels are vector overlays, the leader line is followed from its number to its tip: collinear pieces are joined (the dark margin part and the white photo part overlap), and elbows and forks are followed.
2. `views.py` picks up to four photos per structure:
   - Photo-only: drawings, MRI/CT and angiograms are left out (white-background and colour tests, plus `BLOCK`).
   - Legend names that point at only this structure are preferred, as are the plates used in the Anatomy 101 deck.
   - Tips on the photo border are rejected, because they mean the line was lost.
   - The exported photo is the raw atlas image, so it carries **no printed numbers or lines**. The app draws its own thin arrow along the original leader path.
3. `raster.py` handles figures whose numbers and lines are part of the photo. It is used only for structures with fewer than two clean views.
   - Numbers are found by Vision OCR (`ocr.swift`) on upscaled edge strips and single blobs. Sequence-filled numbers are never used for a target.
   - Each line is followed from its number: the start and angle snap onto the line, the walk re-snaps every 60 px, and short gaps are bridged.
   - The white number margins are cropped and the traced lines inpainted.
   - A trace that ends near the photo edge, or is shorter than 7 % of the photo, is dropped.

## Content

- `targets.py`: checklist items → structures, with legend regexes, atlas page ranges, accepted typed answers and Anatomy 101 cards. Compound items are split, e.g. "Infrahyoid (strap) muscles" → four cards.
- `notes.py`: per structure, *how to find it* on the cadaver, *why it matters*, and a Thai line.
- Lecture slides come from the Anatomy 101 cards (`anatomy/student.html`). NS lab 7 (eye) uses the main deck's eye-and-orbit slides.
- Past spot stations come from the Anatomy 101 banks, with the station photos, keys and explanations.
- `app/`: the page, CSS and JS (no dependencies). It has six modes:
  - Checklist (home)
  - Drill: SM-2-style spaced repetition, typed or self-graded, hints, other photos, neighbours on the photo, lecture slides, past stations
  - Quiz: distractors from the same photo; a miss shows where your choice really is
  - Find it: four lettered arrows
  - Spot exam: timed past stations, auto-marked with override
  - Atlas: every label on a photo, with a hide-names self-test

  Progress lives in `localStorage`.

## Build

```bash
# Python 3.12 with pymupdf, pillow, opencv-python-headless, numpy; macOS swiftc for ocr.swift
export ATLAS="/path/to/Anatomy A Photographic Atlas Rohen (8th Edition).pdf"
COURSE=NS python3 build.py     # -> ns-peer-tutoring/spot/
COURSE=RS python3 build.py     # -> rs-peer-tutoring/spot/ (the rs repo checked out next to this one)
```

`W` sets the work folder for the atlas index and the raster cache (default `.work/`), and `OUT` overrides the site folder. The first run indexes the atlas and cleans the raster figures, which takes a while; later runs reuse the cache.
