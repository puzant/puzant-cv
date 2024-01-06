function initTheme() {
  const rootElement = document.documentElement;
  if (localStorage.getItem('theme') === 'light') {
    this.isDarkMode = false;
  } else {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    rootElement.setAttribute('data-theme', newTheme);
    this.isDarkMode = true;
  }
}

function toggleDarkMode() {
  const rootElement = document.documentElement;
  const currentTheme = rootElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  rootElement.setAttribute('data-theme', newTheme);
  this.isDarkMode = !this.isDarkMode;
  localStorage.setItem('theme', newTheme);
}

const navLinks = [
  { name: 'About', ref: '#about' },
  { name: 'Experience', ref: '#experience' },
  { name: 'Education', ref: '#education' },
  { name: 'Skills', ref: '#skills' },
  { name: 'Portfolio', ref: '#portfolio' },
];

const projects = [
  {
    name: 'Movie Tracker',
    link: 'https://react-app-movies-tracker.netlify.app/',
    description:
      'Simple application that allows users to track and manage their favorite movies, explore movie details.',
    src: './project-1.png',
    tech: ['React', 'React Query', 'React Router', 'TypeScript', 'TailwindCSS'],
  },
  {
    name: 'LOCUS',
    link: 'https://www.locus.eu/',
    description: 'Real Estate management platform',
    src: './project-4.png',
    tech: ['React', 'React Query', 'React Router', 'Formik', 'Axios', 'TailwindCSS'],
  },
  {
    name: 'Password Generator',
    link: 'https://complex-password-generator-app.netlify.app/',
    description:
      'generate passwords with various customization options, including capital letters, numbers, symbols,& pronounceable.',
    src: './project-2.jpeg',
    tech: ['React', 'TailwindCSS'],
  },
  {
    name: 'Ethtronomy',
    link: 'https://ethtronomy.com/',
    description: '',
    src: './project-3.jpeg',
    tech: ['React', 'React Router', 'CSS'],
  },
];
