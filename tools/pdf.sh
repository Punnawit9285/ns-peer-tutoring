#!/bin/sh
# Build BOTH PDFs:
#   ns1-anatomy-physiology-physics-ac-based-learning.pdf  (AC-based learning, blanks empty, all lecture slides open)
#   ns1-anatomy-physiology-physics-tutor.pdf              (Tutor guide, all blanks/answers/SAY/notes revealed)
# CHROME can point at any Chrome/Chromium binary; defaults to the usual macOS and Linux locations.
# Runs on macOS (swift PDFKit text, sips) and on Linux (poppler pdftotext, ImageMagick or Pillow).
set -e
cd "$(dirname "$0")/.."
AC_PDF="ns1-anatomy-physiology-physics-ac-based-learning.pdf"
TUTOR_PDF="ns1-anatomy-physiology-physics-tutor.pdf"
CHROME="${CHROME:-}"
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$HOME/Desktop/Google Chrome.app/Contents/MacOS/Google Chrome" "$HOME/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
         "$(command -v google-chrome || true)" "$(command -v chromium || true)" "$(command -v chromium-browser || true)"; do
  [ -z "$CHROME" ] && [ -x "$c" ] && CHROME="$c"
done
[ -x "$CHROME" ] || { echo "Chrome not found: set CHROME=/path/to/chrome" >&2; exit 1; }
if command -v swiftc >/dev/null; then
  [ tools/pdftext -nt tools/pdftext.swift ] || swiftc -O -o tools/pdftext tools/pdftext.swift
  pdftext() { tools/pdftext "$1"; }
else
  command -v pdftotext >/dev/null || { echo "need swiftc (macOS) or poppler's pdftotext" >&2; exit 1; }
  pdftext() { n=$(pdfinfo "$1" | awk '/^Pages:/{print $2}'); i=1
    while [ "$i" -le "$n" ]; do printf '%s\t%s\n' "$i" "$(pdftotext -raw -q -f $i -l $i "$1" - | tr -s ' \t\n\r\f' ' ' | sed 's/^ //; s/ $//')"; i=$((i + 1)); done; }
fi
sha() { if command -v shasum >/dev/null; then shasum "$@"; else sha1sum "$@"; fi; }
shrink() {
  if command -v sips >/dev/null; then
    m=$(sips -g pixelWidth -g pixelHeight "$1" | awk '/pixel/{if($2>m)m=$2} END{print m}')
    [ "$m" -gt "$2" ] && sips -Z "$2" "$1" >/dev/null
    sips -s formatOptions 75 "$1" >/dev/null
  elif command -v convert >/dev/null; then convert "$1" -resize "$2x$2>" -quality 75 "$1"
  else python3 -c "import sys; from PIL import Image; im=Image.open(sys.argv[1]); im.thumbnail((int(sys.argv[2]),)*2); im.save(sys.argv[1], quality=75)" "$1" "$2"; fi
}
TMP="${TMPDIR:-/tmp}/nspeer-print.$$"; mkdir -p "$TMP"
NOSANDBOX=""; [ "$(id -u)" = 0 ] && NOSANDBOX="--no-sandbox"
tools/fonts.sh
mkdir -p dist/pimg
for f in img/*.jpg; do
  o="dist/pimg/${f#img/}"
  [ "$o" -nt "$f" ] && continue
  cp "$f" "$o"; shrink "$o" 900
done

build_one() {
  PDF="$1"; HTML="$2"; FLAG="$3"
  node print.js $FLAG
  "$CHROME" --headless=new $NOSANDBOX --disable-gpu --no-pdf-header-footer --virtual-time-budget=25000 --print-to-pdf="$TMP/pass1.pdf" "file://$PWD/$HTML" 2>/dev/null
  pdftext "$TMP/pass1.pdf" > "$TMP/pass1.txt"
  node tools/pages.js "$TMP/pass1.txt" $FLAG > "$TMP/pages.json"
  ok=""
  for round in 1 2 3 4; do
    node print.js $FLAG "$TMP/pages.json"
    "$CHROME" --headless=new $NOSANDBOX --disable-gpu --no-pdf-header-footer --virtual-time-budget=25000 --print-to-pdf="$PDF" "file://$PWD/$HTML" 2>/dev/null
    pdftext "$PDF" > "$TMP/final.txt"
    if node tools/pages.js "$TMP/final.txt" $FLAG --check "$TMP/pages.json"; then ok=1; break; fi
    node tools/pages.js "$TMP/final.txt" $FLAG > "$TMP/pages.json"
  done
  [ -n "$ok" ] || { echo "$PDF: page numbers did not settle" >&2; exit 2; }
  "$CHROME" --headless=new $NOSANDBOX --disable-gpu --virtual-time-budget=25000 --dump-dom "file://$PWD/$HTML" 2>/dev/null > "$TMP/dom.html"
  grep -q 'data-fitted="1"' "$TMP/dom.html" || { echo "$HTML fit script did not run" >&2; exit 5; }
  if grep -q 'data-tclip="' "$TMP/dom.html"; then echo "a table is still cut off in $HTML" >&2; exit 5; fi
  for f in BaiJamjuree IBMPlexSans IBMPlexSansThai IBMPlexMono; do
    strings -n 6 "$PDF" | grep -q "/BaseFont */[A-Z]*+$f" || { echo "font $f not embedded in $PDF" >&2; exit 4; }
  done
  V=$(sha "$PDF" | cut -c1-8)
  perl -pi -e "s#(ns-peer-tutoring/$PDF)(\?v=[0-9a-f]+)?#\$1?v=$V#g" README.md
  echo "$PDF version $V"
}

build_one "$AC_PDF" "dist/print.html" ""
build_one "$TUTOR_PDF" "dist/print-tutor.html" "--tutor"
rm -rf "$TMP"
