import StoryblokClient from 'storyblok-js-client';
import RichTextResolver from 'storyblok-js-client/richTextResolver';

const Storyblok = new StoryblokClient({
  accessToken: import.meta.env.VITE_STORY_BLOK_ACCESS_TOKEN,
});

document.addEventListener('keydown', function(event) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    alert('Command + K pressed');
  }
});

export default function app() {
  return {
    initTheme() {
      this.isLoading = true
      let groupedStoriesMap = {};

      Storyblok.get('cdn/stories', { cv: 'CURRENT_TIMESTAMP' }).then(({ data }) => {
        data.stories.forEach((element) => {
          const componentType = element.content.component;
          const excludedListContent = ['about', 'summary'];

          if (!groupedStoriesMap[componentType]) groupedStoriesMap[componentType] = [];

          if (excludedListContent.includes(componentType))
            groupedStoriesMap[componentType] = element;
          else groupedStoriesMap[componentType].push(element);
        });

        this.content = groupedStoriesMap;
        this.isLoading = false
      }).catch((err) => {
        console.log("there was an error")
        this.isLoading = false
      })

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

    isLoading: false,
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
