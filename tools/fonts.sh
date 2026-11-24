#!/bin/sh
# Download the web fonts once into dist/fonts/ so the PDF build does not depend on headless Chrome reaching Google Fonts.
# Writes dist/fonts/fonts.css with local url()s. Fonts: Bai Jamjuree, IBM Plex Sans / Sans Thai / Mono (SIL OFL).
# Tries Google Fonts first; where that is blocked, takes the same fonts from the npm @fontsource packages.
set -e
cd "$(dirname "$0")/.."
[ -s dist/fonts/fonts.css ] && exit 0
mkdir -p dist/fonts
sha() { if command -v shasum >/dev/null; then shasum; else sha1sum; fi; }
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
CSS="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Thai:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
if curl -fsS -A "$UA" "$CSS" -o dist/fonts/remote.css 2>/dev/null; then
  grep -o 'https://fonts.gstatic.com/[^)]*\.woff2' dist/fonts/remote.css | sort -u | while read -r u; do
    f="f$(printf '%s' "$u" | sha | cut -c1-12).woff2"
    [ -s "dist/fonts/$f" ] || curl -fsS "$u" -o "dist/fonts/$f"
    printf 's#%s#%s#g\n' "$u" "$f"
  done > dist/fonts/rewrite.sed
  sed -f dist/fonts/rewrite.sed dist/fonts/remote.css > dist/fonts/fonts.css
  rm dist/fonts/remote.css dist/fonts/rewrite.sed
else
  echo "Google Fonts unreachable: using the npm @fontsource packages" >&2
  T="$(mktemp -d)"
  : > "$T/fonts.css"
  # package  weights  (an "i" suffix = italic)
  for spec in "bai-jamjuree 500 600 700" "ibm-plex-mono 400 500 600" "ibm-plex-sans-thai 400 500 600" "ibm-plex-sans 400 500 600 400i"; do
    set -- $spec; p="$1"; shift
    (cd "$T" && tgz=$(npm pack -q "@fontsource/$p" | tail -1) && mkdir -p "$p" && tar xzf "$tgz" -C "$p")
    for w in "$@"; do
      case "$w" in *i) css="${w%i}-italic.css" ;; *) css="$w.css" ;; esac
      # keep the latin, latin-ext and thai subsets; copy their woff2 files next to fonts.css
      awk 'BEGIN{RS="}"} /latin-[0-9]|latin-ext-[0-9]|thai-[0-9]/ {print $0 "}"}' "$T/$p/package/$css" |
        sed -E 's#url\(\./files/([^)]*\.woff2)\) format\(.woff2.\), url\([^)]*\) format\(.woff.\)#url(\1) format("woff2")#' >> "$T/fonts.css"
    done
    cp "$T/$p"/package/files/*-latin-*.woff2 "$T/$p"/package/files/*-thai-*.woff2 dist/fonts/ 2>/dev/null || true
  done
  mv "$T/fonts.css" dist/fonts/fonts.css; rm -rf "$T"
fi
echo "fonts: $(ls dist/fonts/*.woff2 | wc -l | tr -d ' ') files, $(du -sh dist/fonts | cut -f1)"
