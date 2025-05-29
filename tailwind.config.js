module.exports = {
  content: [
    './layouts/**/*.html',   // All HTML files in layouts and its subdirectories
    './content/**/*.md',    // Markdown files if any (might not be directly used for this theme)
    './data/**/*.yml',      // YAML data files, in case classes are ever embedded here
    './assets/js/**/*.js',  // JavaScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
