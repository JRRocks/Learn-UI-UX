// Modules written by the build from the content (scripts/vite-plugins.mjs, data from src/content/all.ts).

declare module 'virtual:content/index' {
  const index: import('./derive').ContentIndex;
  export default index;
}

declare module 'virtual:content/rules' {
  const rules: import('./derive').RuleCard[];
  export default rules;
}

declare module 'virtual:content/statements' {
  const statements: import('../engine/types').TrueFalseExercise[];
  export default statements;
}
