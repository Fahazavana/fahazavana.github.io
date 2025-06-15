module.exports = {
    darkMode: 'class', // This enables toggling via `.dark` class on <html>
    content: [
      './layouts/**/*.html',   // HTML templates
      './content/**/*.md',     // Markdown content (optional)
      './data/**/*.yml',       // YAML data (optional for class extraction)
      './assets/js/**/*.js',   // JavaScript for dynamic class usage
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  