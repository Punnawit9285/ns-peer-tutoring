#!/bin/sh
# Build the student handout PDF: node print.js -> dist/print.html -> student.pdf (two passes for page numbers).
# CHROME can point at any Chrome/Chromium binary; defaults to the usual macOS and Linux locations.
# Runs on macOS (swift PDFKit text, sips) and on Linux (poppler pdftotext, ImageMagick or Pillow).
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-}"
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$HOME/Desktop/Google Chrome.app/Contents/MacOS/Google Chrome" "$HOME/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
         "$(command -v google-chrome || true)" "$(command -v chromium || true)" "$(command -v chromium-browser || true)"; do
  [ -z "$CHROME" ] && [ -x "$c" ] && CHROME="$c"
done
[ -x "$CHROME" ] || { echo "Chrome not found: set CHROME=/path/to/chrome" >&2; exit 1; }
# page text, one line per page: PDFKit (swift) on macOS, poppler's pdftotext elsewhere
if command -v swiftc >/dev/null; then
  [ tools/pdftext -nt tools/pdftext.swift ] || swiftc -O -o tools/pdftext tools/pdftext.swift
  pdftext() { tools/pdftext "$1"; }
else
  command -v pdftotext >/dev/null || { echo "need swiftc (macOS) or poppler's pdftotext" >&2; exit 1; }
  pdftext() { n=$(pdfinfo "$1" | awk '/^Pages:/{print $2}'); i=1
    while [ "$i" -le "$n" ]; do printf '%s\t%s\n' "$i" "$(pdftotext -raw -q -f $i -l $i "$1" - | tr -s ' \t\n\r\f' ' ' | sed 's/^ //; s/ $//')"; i=$((i + 1)); done; }
fi
sha() { if command -v shasum >/dev/null; then shasum "$@"; else sha1sum "$@"; fi; }
# shrink a JPEG in place to at most $2 px on its long side, quality 75
shrink() {
  if command -v sips >/dev/null; then
    m=$(sips -g pixelWidth -g pixelHeight "$1" | awk '/pixel/{if($2>m)m=$2} END{print m}')
    [ "$m" -gt "$2" ] && sips -Z "$2" "$1" >/dev/null
    sips -s formatOptions 75 "$1" >/dev/null
  elif command -v convert >/dev/null; then convert "$1" -resize "$2x$2>" -quality 75 "$1"
  else python3 -c "import sys; from PIL import Image; im=Image.open(sys.argv[1]); im.thumbnail((int(sys.argv[2]),)*2); im.save(sys.argv[1], quality=75)" "$1" "$2"; fi
}
TMP="${TMPDIR:-/tmp}/nspeer-print.$$"; mkdir -p "$TMP"
NOSANDBOX=""; [ "$(id -u)" = 0 ] && NOSANDBOX="--no-sandbox"   # Chrome refuses to run as root with its sandbox
print() {
  "$CHROME" --headless=new $NOSANDBOX --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 \
    --print-to-pdf="$1" "file://$PWD/dist/print.html" 2>/dev/null
}
tools/fonts.sh
# print-sized figure copies for the PDF (dist/pimg/, git-ignored): 900 px
mkdir -p dist/pimg
for f in img/*.jpg; do
  o="dist/pimg/${f#img/}"
  [ "$o" -nt "$f" ] && continue
  cp "$f" "$o"; shrink "$o" 900
done
node print.js
print "$TMP/pass1.pdf"
pdftext "$TMP/pass1.pdf" > "$TMP/pass1.txt"
node tools/pages.js "$TMP/pass1.txt" > "$TMP/pages.json"
# print with the found page numbers; real numbers can be wider than the placeholders and push a part onto the
# next page, so take the new positions and print again until no cross-reference moves (at most 4 rounds)
ok=""
for round in 1 2 3 4; do
  node print.js "$TMP/pages.json"
  print student.pdf
  pdftext student.pdf > "$TMP/final.txt"
  if node tools/pages.js "$TMP/final.txt" --check "$TMP/pages.json"; then ok=1; break; fi
  node tools/pages.js "$TMP/final.txt" > "$TMP/pages.json"
done
[ -n "$ok" ] || { echo "page numbers did not settle" >&2; exit 2; }
# tables must fit their column: list the concept pages where print.js stacked or shrank a table; fail if one is still cut off
"$CHROME" --headless=new $NOSANDBOX --disable-gpu --virtual-time-budget=15000 --dump-dom "file://$PWD/dist/print.html" 2>/dev/null > "$TMP/dom.html"
grep -q 'data-fitted="1"' "$TMP/dom.html" || { echo "print.html fit script did not run" >&2; exit 5; }
perl -ne 'while (/<section class="cpage" ([^>]*)>/g) { my $a = $1; my ($id) = $a =~ /data-id="([^"]+)"/; my $r = "";
  $r .= " stacked" if $a =~ /data-tstack/; $r .= " shrunk to $1" if $a =~ /data-tscale="([^"]+)"/; $r .= " STILL CUT OFF" if $a =~ /data-tclip/;
  print "table too wide for its column, $id:$r\n" if $r }' "$TMP/dom.html"
if grep -q 'data-tclip="' "$TMP/dom.html"; then echo "a table is still cut off in print.html" >&2; exit 5; fi
# the PDF must embed the real fonts, not system fallbacks
for f in BaiJamjuree IBMPlexSans IBMPlexSansThai IBMPlexMono; do
  strings -n 6 student.pdf | grep -q "/BaseFont */[A-Z]*+$f" || { echo "font $f not embedded: web fonts failed to load" >&2; exit 4; }
done
# stamp the live link with the PDF hash so browsers fetch the new file instead of a cached one
V=$(sha student.pdf | cut -c1-8)
perl -pi -e "s#(ns-peer-tutoring/student\.pdf)(\?v=[0-9a-f]+)?#\$1?v=$V#g" README.md
echo "student.pdf version $V"
rm -rf "$TMP"
