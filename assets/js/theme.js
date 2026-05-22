(function () {
  const html = document.documentElement;
  const themeButtons = [
    document.getElementById("theme-toggle"),
    document.getElementById("theme-toggle-2"),
  ].filter(Boolean);
  const themeIcons = [
    document.getElementById("theme-icon"),
    document.getElementById("theme-icon-2"),
  ].filter(Boolean);

  if (!themeButtons.length && !themeIcons.length) {
    return;
  }

  const setTheme = (theme) => {
    const isDark = theme === "dark";
    html.classList.toggle("dark", isDark);

    themeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
    });

    themeIcons.forEach((icon) => {
      if (!icon) return;
      icon.classList.toggle("fa-moon", isDark);
      icon.classList.toggle("fa-sun", !isDark);
    });
  };

  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const toggleTheme = () => {
    const nextTheme = html.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  setTheme(getPreferredTheme());
  themeButtons.forEach((button) => button.addEventListener("click", toggleTheme));
})();
