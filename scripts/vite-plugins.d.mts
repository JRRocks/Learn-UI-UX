import type { Plugin } from 'vite';

/** Serves `virtual:content/index`, `virtual:content/rules` and `virtual:content/statements`, built from the lessons. */
export function contentIndex(): Plugin;

/** Writes dist/sw.js from src/sw.js with the build's file list and id. */
export function serviceWorker(): Plugin;

/** Preloads, from index.html, the chunk of the lesson, markets or catalog a deep link names. */
export function deepLinks(): Plugin;
