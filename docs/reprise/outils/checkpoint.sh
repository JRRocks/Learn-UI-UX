#!/bin/bash
# Commit and push in-progress content edits, file by file, only when each validates and typechecks.
# Usage : ATTRIBUTION="<lignes d'attribution de la session>" docs/reprise/outils/checkpoint.sh
cd /home/user/Learn-UI-UX || exit 1
changed=$(git status --porcelain | awk '{print $2}' | grep '^src/content/')
[ -z "$changed" ] && { echo "rien à commiter"; git status --short; exit 0; }
tsc_out=$(npx tsc --noEmit 2>&1)
ok_files=(); ok_ids=()
for f in $changed; do
  case "$f" in
    src/content/modules/*.ts) id=$(basename "$f" .ts) ;;
    src/content/cultures/*) id=cultures ;;
    src/content/antipatterns.ts) id=antipatterns ;;
    *) id="" ;;
  esac
  if echo "$tsc_out" | grep -q "$f"; then echo "$f : typage en échec"; continue; fi
  if [ -n "$id" ] && ONLY=$id npx vitest run src/content 2>&1 | grep -q "failed"; then echo "$f : validation en échec"; continue; fi
  ok_files+=("$f"); [ -n "$id" ] && ok_ids+=("$id")
done
[ ${#ok_files[@]} -eq 0 ] && { echo "aucun fichier cohérent"; exit 0; }
only=$(printf '%s\n' "${ok_ids[@]}" | sort -u | paste -sd, -)
git add "${ok_files[@]}" && git commit -q -m "content($only): review fixes in progress

Checkpoint of refute-or-fix passes still running; these files validate
and typecheck at this point.

$ATTRIBUTION" && git push -q 2>&1 | tail -1
git log --oneline -1; git status --short
