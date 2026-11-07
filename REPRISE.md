# Reprise — Learn-UI-UX (Épreuves)

Suivi terse. MAJ : 2026-11-07 ~11h UTC. Données : `docs/reprise/` (à supprimer en fin de travail, avec ce fichier).

## Règles session
- Branche unique `claude/charming-bell-vrm1id` (Learn-UI-UX + Library) ; `git push -u origin <branche>`, retry 4× (2/4/8/16 s) sur erreur réseau. Pas de PR.
- Commits : fin de message = lignes d'attribution imposées par la session ; aucun nom de modèle dans fichiers/code.
- Stop hook : arbre propre + poussé en fin de tour.
- Ultracode : travail substantiel via Workflow (fix → contradicteur → repair, worktrees isolés `scratchpad/wt/*`, node_modules en symlink).
- Communication : **aucun message chat** sauf demande de validation (PushNotification). Suivi = ce fichier.

## État
- HEAD poussé : `e8dd4a3` (base vague courante `263f780`). CI verte.
- Fait : app complète, contenu relu (26 cibles), cohérence (T/F 30/27), audits app (vagues 1-2, perf, final 31 constats), vague finale 4 groupes fusionnée (`626de82`), « Ma malle » 11 px (`263f780`).
- Chiffres : 24 leçons, 408 épreuves (8 formats ; 115 choix visuels dont 103 duels), 307 fiches, 12 profils culturels, 8 paires, 43 épreuves culture, 62 règles détecteur.

## En cours (workflows)
| Run | Script | Branche/worktree | Étape |
|---|---|---|---|
| `wf_e1c8cbc7-5d2` | `docs/reprise/workflows/fix-app-final.js`, args `{base:"263f780", groups:[{key:"final-text"}]}` | `fix/final-text` / `wt/final-text` | verify → repair |
| `wf_ca36b996-589` | `docs/reprise/workflows/final-integration.js`, args `{head:"263f780", base:"e00241d"}` | `fix/final-integ` / `wt/final-integ` | fix (13 constats confirmés : 1 P2 rail écran court, 12 P3) → verify → repair |

- final-text : seuils `@media` px→em (49), césure FR < 20em, passe « texte agrandi » dans `check:overflow` (20/24/32 px × 320/360/390/768), test `src/styles/styles.test.ts` (seuils en em obligatoires).
- Fusion d'essai final-text + final-integ : 0 conflit, tsc OK, 178 tests OK.

## Reste à faire
1. Attendre fin des 2 workflows (repair éventuel).
2. `git merge --no-ff fix/final-text` puis `fix/final-integ` (messages propres, sans `# Conflicts`) ; seuils px éventuels → em.
3. tsc, vitest, build, `check:overflow` (~13 min), `check:mocks` (attendu ≈ 307, écart seulement ap-marquee) ; push ; CI verte.
4. Nettoyage : `git rm -r REPRISE.md docs/reprise` ; supprimer worktrees/branches `fix/final-*`, `wt/integ-head`, `wt/base-e00241d`, `wt/merge-test2` ; push.
5. Récap final FR en markdown (`RECAP.md` dans le scratchpad ou dépôt ?) : construit, relectures/corrections, outils (shots, check:mocks, check:overflow, validate), dépôt Library (proposer de le retirer), Pages : dépôt vide au départ → 1re branche poussée = défaut ; déploiement sur `main` (Settings → Pages → Source : GitHub Actions) ; liste « Sources » (`docs/reprise/sources-web.md`). Puis PushNotification de demande de validation.

## Leçons orchestration
- Workflow : 2 agents max simultanés ; resume = plus long préfixe inchangé ; redémarrage conteneur tue les workflows → `resumeFromRunId`.
- Merges : résoudre imports en gardant les deux lignes ; `git commit -F msg` pour éviter `# Conflicts` dans le message.
