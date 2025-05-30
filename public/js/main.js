document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  function setDarkMode(enableDark) {
    html.classList.toggle('dark', enableDark);
    localStorage.setItem('theme', enableDark ? 'dark' : 'light');

    const label = document.getElementById('theme-label');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (label) label.textContent = enableDark ? 'Luz apagada' : 'Luz encendida';
    if (sunIcon) sunIcon.classList.toggle('hidden', enableDark);
    if (moonIcon) moonIcon.classList.toggle('hidden', !enableDark);

    const icon = enableDark ? moonIcon : sunIcon;
    if (icon) {
      icon.classList.add('animate-spin');
      setTimeout(() => icon.classList.remove('animate-spin'), 500);
    }
  }

  // Tema inicial
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
  setDarkMode(isDark);

  // Botón de tema
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const currentlyDark = html.classList.contains('dark');
      setDarkMode(!currentlyDark);
    });
  }

  // Explosión de las skills
  document.querySelectorAll('.floating-skill').forEach(skill => {
    skill.addEventListener('click', () => {
      skill.classList.add('explode');
      setTimeout(() => skill.classList.remove('explode'), 1000);
    });
  });
});
