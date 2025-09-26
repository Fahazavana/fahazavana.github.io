module.exports = {
    darkMode: 'class', // This enables toggling via `.dark` class on <html>
    content: [
      './layouts/**/*.html',   // HTML templates
      './content/**/*.md',     // Markdown content (optional)
      './data/**/*.yml',       // YAML data (optional for class extraction)
      './assets/js/**/*.js',   // JavaScript for dynamic class usage
    ],
    safelist: [
      // Token-based color utilities to ensure inclusion even before Hugo updates stats
      'bg-background', 'text-foreground', 'bg-card', 'border-border',
      'text-muted', 'bg-muted/20', 'text-primary', 'bg-primary',
      'text-primary-foreground', 'hover:bg-primary/90', 'ring-background'
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
