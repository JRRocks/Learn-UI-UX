# Reprise — Learn-UI-UX (Épreuves)

Suivi terse. MAJ : 2026-11-07 ~15h UTC. Données : `docs/reprise/` (à supprimer en fin de travail, avec ce fichier).

## Règles session
- Branche unique `claude/charming-bell-vrm1id` (Learn-UI-UX + Library) ; `git push -u origin <branche>`, retry 4× (2/4/8/16 s) sur erreur réseau. Pas de PR.
- Commits : fin de message = lignes d'attribution imposées par la session ; aucun nom de modèle dans fichiers/code.
- Stop hook : arbre propre + poussé en fin de tour.
- Ultracode : travail substantiel via Workflow (fix → contradicteur → repair, worktrees isolés `scratchpad/wt/*`, node_modules en symlink).
- Communication : **aucun message chat** sauf demande de validation (PushNotification). Suivi = ce fichier.

## État
- HEAD poussé : `c333149` = `263f780` + merge `fix/final-text` (`3db409a`) + merge `fix/final-integ`. tsc OK, 193 tests, build OK. `check:overflow` sur `3db409a` : exit 0 (texte agrandi compris).
- Fait : app complète, contenu relu (26 cibles), cohérence (T/F 30/27), audits app (vagues 1-2, perf, final 31 constats), vague finale 4 groupes (`626de82`), « Ma malle » 11 px, texte agrandi (49 seuils px→em, césure, passe check:overflow), intégration (13 constats confirmés corrigés + 2 régressions réparées).
- Chiffres : 24 leçons, 408 épreuves (8 formats ; 115 choix visuels dont 103 duels), 307 fiches, 12 profils culturels, 8 paires, 43 épreuves culture, 62 règles détecteur.

## En cours
- Contrôles locaux sur `c333149` (bg) : `check:overflow` puis `check:mocks` → `scratchpad/final/overflow3.txt`, `mocks3.txt`.
- Workflow `wf_f04fc9a0-5a9` (`final-check`, args `{head:"c333149", base:"263f780"}`) : sweep `repairs` (tours de réparation non revus : final-text aa6feab..56608dd, final-integ e668e76 ec559e6) + sweep `combined` (texte agrandi × toasts/rail/bilan/Fiches/Défi/dialogues/chips/catalogue) → confirm → fix (`fix/final-check`, `wt/final-check`) → verify → repair. Worktrees lecture seule : `wt/final-head` (c333149), `wt/integ-head` (263f780).

## Reste à faire
1. Si `final-check` confirme des constats : merge `fix/final-check` (msg propre), tsc/vitest/build/check:overflow/check:mocks, push.
2. Nettoyage : `git rm -r REPRISE.md docs/reprise` ; worktrees/branches `fix/final-*`, `wt/integ-head`, `wt/base-e00241d`, `wt/final-head`, `wt/merge-test2` ; push ; CI verte.
3. Récap final FR en markdown (RECAP.md, scratchpad) : construit, relectures/corrections, outils (shots, check:mocks, check:overflow, validate), Library (proposer retrait), Pages (1re branche poussée = défaut ; déploiement sur `main`, Settings → Pages → Source : GitHub Actions), « Sources » (`docs/reprise/sources-web.md`). Puis PushNotification de demande de validation.

## Leçons orchestration
- Workflow : 2 agents max simultanés ; resume = plus long préfixe inchangé ; redémarrage conteneur tue les workflows → `resumeFromRunId`.
- Merges : résoudre imports en gardant les deux lignes ; `git commit -F msg` pour éviter `# Conflicts` dans le message.
