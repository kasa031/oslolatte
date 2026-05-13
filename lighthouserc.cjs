/** Lighthouse CI — kjøres etter `npm run build` (statisk dist). */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:accessibility': ['warn', { minScore: 0.88 }],
        'categories:seo': ['warn', { minScore: 0.82 }],
        'categories:best-practices': ['warn', { minScore: 0.75 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
