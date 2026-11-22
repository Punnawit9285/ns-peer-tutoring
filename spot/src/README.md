# Spot trainer source (NS I + RS I)

Builds the two checklist spot trainers published at `ns-peer-tutoring/spot/` and `rs-peer-tutoring/spot/`: every structure on the gross-lab attendance checklist (112-69 NS I, 114-69 RS I) shown on cadaver photos, as image-occlusion drills (every structure of a lab per round), quizzes and timed past spot stations.

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
   - Then on to its real end, since a straight walk stops early and the rest of the printed line would point from the arrow tip to the structure: round a bend (`bends`: a thin straight piece leaving the end at another angle, up to three), across a patch where it cannot be seen (`across`: a black line over a dark cavity, picked up where the same line comes out), and through a printed black arrowhead (`arrowhead`). A piece counts only when it is printed ink, near-black or near-white and grey (Rohen's leaders turn white over dark tissue), and looks the same on both sides (a white rim or a nerve beside the tip does not). The target keeps its bends in its path.
   - Where a line ends: its evidence ends there. Past a gap the walk goes on only into a solid stretch of printed ink (10+ px, strong, black or white); a weak blip, or a red / cream / brown stretch in line with the leader, is a crevice, a vessel or a nerve. (Taking those put several tips a few px past Rohen's line, on the structure next to it.)
   - `views.LEADS`: five hand-checked last pieces too short, faint or edge-hugging for the tracer, given as a heading per (page, figure, number); the tracer still snaps onto the printed line and walks it.
   - Every printed line is erased, not only those whose number was read: `margin_lines` also traces each line crossing the white number margin or, where the numbers sit off the image, the photo edge; fork branches are erased with their line; and after inpainting, `residue` erases thin straight ink stubs still touching an erased line, away from the arrow tips.
   - The white number margins are cropped and the traced lines inpainted.
   - A trace that ends near the photo edge, or is shorter than 7 % of the photo, is dropped.

## Content

- `targets.py`: checklist items → structures, with legend regexes, atlas page ranges, accepted typed answers and Anatomy 101 cards. Compound items are split, e.g. "Infrahyoid (strap) muscles" → four cards.
- `notes.py`: per structure, *how to find it* on the cadaver, *why it matters*, and a Thai line.
- `flows.py`: the connection map of every structure. `MAP` sends each structure to one or two flowcharts and names the box to light. Most are the Anatomy 101 deck's (`anatomy/src/content/flows.py`). `FLOWS` adds 25 maps in the same syntax for what those do not show (muscle layers and their nerves, joints and ligaments, meninges, the eye, the nasal and laryngeal walls, the trachea and pleura), with three more box kinds: muscle, bone / cartilage / joint, membrane. The build draws each map once with the deck's `flowsvg.py` and stops on a structure without a map or a box name that is not in its map.
- Lecture slides come from the Anatomy 101 cards (`anatomy/student.html`). NS lab 7 (eye) uses the main deck's eye-and-orbit slides.
- Past spot stations come from the Anatomy 101 banks, with the station photos, keys and explanations.
- `app/`: the page, CSS and JS (no dependencies). It has six modes:
  - Checklist (home)
  - Drill: every structure of the lab once per round (a miss comes back three cards later and does not count), four choices or typing, hints; after the answer the notes, the connection map (under the photo), other photos, neighbours on the photo, lecture slides, past stations
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

`W` sets the work folder for the atlas index and the raster cache (default `.work/`); put IBM Plex Sans TTFs in `W/ttf/plex400.ttf`, `plex500.ttf` and `plex600.ttf` to measure the flowchart text, as for the anatomy build. `FLOWSVG` points at another flowchart renderer (default `anatomy/src/flowsvg.py`), and `OUT` overrides the site folder. The first run indexes the atlas and cleans the raster figures, which takes a while; later runs reuse the cache.

The tracer samples a whole direction search (every angle and distance) at once with NumPy and batches the rays of each snap and bend search, about 10x faster than one pixel at a time, with bit-identical results: `_samp_v` keeps `samp`'s float32 / float64 arithmetic (NumPy 2 keeps float32 when a pixel meets a plain Python float), falls back to `samp` for any other input, and the per-ray smoothing and percentiles are unchanged. It was checked against the one-pixel-at-a-time version: exactly equal values on 2,400 rays and 150 direction searches, and the same paths and cleaned photos on all 204 figures (one figure differed only because Vision OCR read its numbers differently in that run; given the same numbers it was identical too). Per figure, tracing and cleaning went from 13–17 s to about 2 s; OCR takes about 2 s either way.
