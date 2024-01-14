import StoryblokClient from 'storyblok-js-client';
import RichTextResolver from 'storyblok-js-client/richTextResolver';

const Storyblok = new StoryblokClient({
  accessToken: 'vOKS6Nimy3ejWiiSHvog4gtt',
});

export default function app() {
  return {
    initTheme() {
      /**
       * projects parent_id: 426739925
       * experiences parent_id: 426739827
       * education parent_id: 426817313
       */
      Storyblok.get('cdn/stories', { cv: 'CURRENT_TIMESTAMP' }).then(({ data }) => {
        const groupedStories = data.stories.reduce(
          (acc, story) => {
            if (story.parent_id === 426739925) acc['projects'].push(story);
            else if (story.parent_id === 426739827) acc['experiences'].push(story);
            else if (story.parent_id === 426817313) acc['education'].push(story);
            return acc;
          },
          { projects: [], experiences: [], education: [] },
        );
        console.log('🚀 ~ Storyblok.get ~ groupedStories;:', groupedStories);

        this.content = groupedStories;
      });

      const rootElement = document.documentElement;

      if (localStorage.getItem('theme') === 'light') {
        this.isDarkMode = false;
      } else {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        rootElement.setAttribute('data-theme', newTheme);
        this.isDarkMode = true;
      }
    },

    toggleDarkMode() {
      const rootElement = document.documentElement;
      const currentTheme = rootElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      rootElement.setAttribute('data-theme', newTheme);
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('theme', newTheme);
    },

    resolver: new RichTextResolver(),
    content: [],
    isDarkMode: false,
    isOpen: false,
    skills: [
      'React',
      'Vue',
      'CSS',
      'TailwindCSS',
      'Redux',
      'JavaScript/TypeScript',
      'NodeJs',
      'Express',
      'MySQL',
    ],
    projects: [
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
    ],
    navLinks: [
      { name: 'About', ref: '#about' },
      { name: 'Experience', ref: '#experience' },
      { name: 'Education', ref: '#education' },
      { name: 'Skills', ref: '#skills' },
      { name: 'Portfolio', ref: '#portfolio' },
    ],
  };
}
