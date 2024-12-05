import StoryblokClient from 'storyblok-js-client';
import RichTextResolver from 'storyblok-js-client/richTextResolver';

const Storyblok = new StoryblokClient({
  accessToken: import.meta.env.VITE_STORY_BLOK_ACCESS_TOKEN,
});

export default function app() {
  return {
    overlayOn: false,
    isLoading: false,
    isCommandDialogOpen: false,
    resolver: new RichTextResolver(),
    content: [],
    isDarkMode: false,
    isOpen: false,
    body: document.body,
    searchQuery: '',

    initTheme() {
      this.isLoading = true
      let groupedStoriesMap = {};

      document.addEventListener('keydown', function(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault()
          this.isCommandDialogOpen = true
        }
      });

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

    get filteredLinks() {
      if (this.searchQuery.trim() === '') return this.items.links
      
      return this.items.links.filter(link =>
        link.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    get filteredActions() {
      if (this.searchQuery.trim() === '') {
        return this.items.actions;
      }
      return this.items.actions.filter(action =>
        action.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    handleAction(item) {
      if (item.action === 'download') {
        const link = document.createElement('a');
        link.href = item.url;
        link.download = true;
        link.click();
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

    toggleMobileNavigationMenu() {
      this.isOpen = !this.isOpen
      this.overlayOn = !this.overlayOn
      if (this.isOpen) this.body.classList.add('no-scroll');
      else this.body.classList.remove('no-scroll')
    },

    toggleCommandDialog() {
      this.isCommandDialogOpen = !this.isCommandDialogOpen
      this.overlayOn = !this.overlayOn
      if (this.isCommandDialogOpen) this.body.classList.add('no-scroll');
      else this.body.classList.remove('no-scroll')
    },

    addKeyboardListner(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        this.body.classList.add('no-scroll');
        e.preventDefault()
        this.isCommandDialogOpen = true
        this.overlayOn = true
      }
    },
  
    printCV() {
      window.print()
    },

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
    items: {
      actions: [
        { name: 'Download CV', url: 'assets/pdf/resume.pdf', action: 'download' },
      ],
      links: [
        {name: 'Linkedin', url: 'https://www.linkedin.com/in/puzant-b-006426108/'},
        {name: 'Github', url: 'https://github.com/puzant'},
        {name: 'X', url: 'https://x.com/puzantBakjejian'},
      ]
    },
  };
}
