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

  // Menú responsive toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Chatbot toggle
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('hidden');
    });
  }

  if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.add('hidden');
    });
  }

  // Estilos para cursor parpadeante
  if (!document.getElementById('chatbot-style')) {
    const style = document.createElement('style');
    style.id = 'chatbot-style';
    style.textContent = `
      .chat-cursor::after {
        content: '|';
        animation: blink 1s step-start infinite;
        margin-left: 2px;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Interactividad del chatbot con escritura y cursor real
  const questionButtons = document.querySelectorAll('.chat-question');
  const responseArea = document.getElementById('chat-response');
  let writingInterval;

  const respuestas = {
    '¿Qué hace esta web?':
      'Esta web es mi portfolio profesional donde muestro mis proyectos, tecnologías y experiencia como desarrolladora web.',
    '¿Qué tecnologías manejo?':
      'HTML, CSS, JavaScript, TypeScript, TailwindCSS, Bootstrap, React, Angular, PHP, Laravel, Vite, MySQL, MongoDB, Swift, Docker, Figma, Git y GitHub.',
    '¿Qué soft skills tengo?':
      'Soy autodidacta, constante, versátil, creativa y empática. Me encanta el aprendizaje continuo y trabajar en equipo. También tengo experiencia en comunicación, marketing y UX/UI.',
    '¿Cómo ver mis proyectos?':
      'Puedes ir a la sección "Proyectos" desde el menú o usando el botón morado que aparece en la portada.',
    '¿Cómo contactar conmigo?':
      'Puedes encontrar mis datos de contacto en la sección final del portfolio.'
  };

  questionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const texto = btn.innerText.trim();
      const respuesta = respuestas[texto] || 'Ups, aún no tengo una respuesta para eso.';

      clearInterval(writingInterval);

      // Reset contenido
      responseArea.innerHTML = '<span id="typed-text"></span>';
      responseArea.classList.add('chat-cursor');
      const typedText = document.getElementById('typed-text');
      let i = 0;

      writingInterval = setInterval(() => {
        if (i < respuesta.length) {
          typedText.textContent += respuesta.charAt(i);
          i++;
        } else {
          clearInterval(writingInterval);
          responseArea.classList.remove('chat-cursor');
        }
      }, 25);
    });
  });
});
