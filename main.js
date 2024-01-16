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
    navLinks: [
      { name: 'About', ref: '#about' },
      { name: 'Experience', ref: '#experience' },
      { name: 'Education', ref: '#education' },
      { name: 'Skills', ref: '#skills' },
      { name: 'Portfolio', ref: '#portfolio' },
    ],
  };
}
