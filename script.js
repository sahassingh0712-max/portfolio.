// 1. Theme Toggle Logic (Light / Dark mode persistence)
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggleBtn.textContent = '☀️';
} else {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleBtn.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
  const activeTheme = document.documentElement.getAttribute('data-theme');
  if (activeTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeToggleBtn.textContent = '☀️';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggleBtn.textContent = '🌙';
  }
});

// 2. Interactive Spotlight Glow on Project Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(88, 166, 255, 0.08), var(--card-bg))`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--card-bg)';
  });
});

// 3. Contact Form Submission (Directly opens Gmail client with pre-filled fields)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    // Pre-fills and opens default mail app directly to your Gmail
    window.location.href = `mailto:sahassingh0712@gmail.com?subject=${subject}&body=${body}`;

    formStatus.style.color = '#3fb950';
    formStatus.textContent = 'Redirecting to your email client to send...';
    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = '';
    }, 4500);
  } else {
    formStatus.style.color = '#f85149';
    formStatus.textContent = 'Please fill out all fields.';
  }
});