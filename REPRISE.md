# Reprise — Learn-UI-UX (Épreuves)

Suivi terse. MAJ : 2026-11-08. Données : `docs/reprise/` (à supprimer en fin de travail, avec ce fichier).

## Règles session
- Branche unique `claude/charming-bell-vrm1id` (Learn-UI-UX + Library) ; `git push -u origin <branche>`, retry 4× (2/4/8/16 s) sur erreur réseau. Pas de PR.
- Commits : fin de message = lignes d'attribution imposées par la session ; aucun nom de modèle dans fichiers/code.
- Stop hook : arbre propre + poussé en fin de tour.
- Ultracode : travail substantiel via Workflow (fix → contradicteur → repair, worktrees isolés `scratchpad/wt/*`, node_modules en symlink).
- Communication : **aucun message chat** sauf demande de validation (PushNotification). Suivi = ce fichier.

## État
- HEAD poussé : `af27f4a` = `263f780` + merges `fix/final-text`, `fix/final-integ`, `fix/final-check`. tsc OK, 200 tests, build OK. `c333149` : check:overflow exit 0, check:mocks 305.
- Fait : app complète, contenu relu (26 cibles), cohérence (T/F 30/27), audits app (vagues 1-2, perf, final 31), vague finale 4 groupes, « Ma malle » 11 px, texte agrandi (seuils em, césure, gardes check:overflow), intégration (13 + 2), final-check (9 + 3).
- Chiffres : 24 leçons, 408 épreuves (8 formats ; 115 choix visuels dont 103 duels), 307 fiches, 12 profils, 8 paires, 43 épreuves culture, 62 règles.

## En cours
- bg : `check:overflow` + `check:mocks` sur `af27f4a` → `scratchpad/final/overflow4.txt`, `mocks4.txt`.
- `wf_8db95d83-5ff` (`last-verify`, `{head:"af27f4a"}`) : contradicteur sur les 5 commits de réparation de final-check (7fa538d 7852a8c 4bb5f94 f7b3342 3878a3e) → 1 tour de réparation borné (`fix/final-last`, `wt/final-last`) si régression démontrée. Pas d'autre boucle : signaler les restes dans le récap.

## Reste à faire
1. Si `fix/final-last` : merge (msg propre), tsc/vitest/build/check:overflow/check:mocks, push.
2. Nettoyage : `git rm -r REPRISE.md docs/reprise` ; worktrees `wt/*` + branches `fix/final-*` ; push ; CI verte.
3. Récap final FR en markdown (`scratchpad/RECAP.md`) puis PushNotification de demande de validation.

## Leçons orchestration
- Workflow : 2 agents max simultanés ; resume = plus long préfixe inchangé ; redémarrage conteneur tue les workflows → `resumeFromRunId`.
- Merges : résoudre imports en gardant les deux lignes ; `git commit -F msg` pour éviter `# Conflicts` dans le message.
