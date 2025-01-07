'use client';

import { motion } from 'framer-motion';
import {
  SiReact,
  SiFigma,
  SiAdobexd,
  SiSketch,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiDjango,
  SiDocker,
  SiGit,
  SiAngular,
  SiVuedotjs,
  SiSass,
  SiWebpack,
  SiVite,
  SiRuby,
  SiRubyonrails,
  SiGo,
  SiKubernetes,
  SiTerraform,
  SiGraphql,
  SiLinux,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiPhp,
  SiLaravel,
  SiSpring,
  SiFlutter,
  SiKotlin,
  SiSwift,
  SiMysql,
  SiRedis,
  SiUbuntu,
  SiJest,
  SiEslint,
  SiPrettier,
  SiGooglecloud,
  SiServerless,
  SiSentry,
  SiStrapi,
  SiAuth0,
  SiNestjs,
  SiExpress,
  SiRedux,
  SiApollographql,
  SiJquery,
  SiSvelte,
  SiElectron,
  SiAlgolia,
  SiApachecouchdb,
  SiD3Dotjs,
  SiChartdotjs,
  SiVercel,
  SiNetlify,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiRabbitmq,
  SiNginx,
  SiCypress,
  SiMocha,
  SiCircleci,
  SiJenkins,
  SiPrisma,
  SiHasura,
  SiSalesforce,
  SiOpenai,
  SiShopify,
  SiWordpress,
  SiDigitalocean,
  SiContentful,
  SiSanity,
  SiAntdesign,
  SiBootstrap,
  SiChakraui,
  SiStorybook,
  SiPostman,
  SiSwagger,
  SiSonarqube,
  SiSelenium,
  SiTrello,
  SiJira,
  SiConfluence,
  SiSlack,
  SiWebstorm,
  SiIntellijidea,
  SiEclipseide,
  SiAndroidstudio,
  SiXcode,
  SiUnity,
  SiUnrealengine,
  SiBlender,
  SiFastapi,
  SiDotnet,
  SiRust,
  SiDart,
  SiApachekafka,
  SiElasticsearch,
  SiInfluxdb,
  SiGrafana,
  SiKibana,
  SiPrometheus,
  SiAnsible,
  SiVagrant,
  SiReactrouter,
  SiWebgl,
  SiThreedotjs,
  SiBabel,
  SiFramer,
  SiGreensock,
  SiGatsby,
  SiNuxtdotjs,
  SiRemix,
  SiStyledcomponents,
  SiZod,
  SiPostcss,
  SiRollupdotjs,
  SiWebassembly,
  SiDeno,
  SiVitest,
  SiTestinglibrary,
  SiPnpm,
  SiYarn,
  SiNpm,
  SiComposer,
  SiGradle,
  SiApachemaven,
  SiCockroachlabs,
  SiNeo4J,
  SiMariadb,
  SiSqlite,
  SiSupabase,
  SiPlanetscale,
  SiClickhouse,
  SiApachecassandra,
  SiMinutemailer,
  SiMailchimp,
  SiSendgrid,
  SiStripe,
  SiPaypal,
  SiSquare,
  SiLetsencrypt,
  SiCloudflare,
  SiAkamai,
  SiFastly,
  SiUml,
  SiMarkdown,
  SiAsana,
  SiNotion,
  SiLinear,
  SiClickup,
  SiCanva,
  SiInvision,
  SiMiro,
  SiFontawesome,
  SiInsomnia,
  SiSequelize,
  SiTypeorm,
  SiMongoose,
  SiReduxsaga,
  SiReacthookform,
  SiReactquery,
  SiVim,
  SiNeovim,
  SiSublimetext,
  SiGnuemacs
} from 'react-icons/si';

import { FaJava, FaAws } from 'react-icons/fa';

import { TbBrandCSharp } from 'react-icons/tb';

import { VscAzure, VscVscode, VscTerminalPowershell, VscTerminalBash } from 'react-icons/vsc';

const categories = {
  frontend: {
    name: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Vue.js',
      'Angular',
      'Svelte',
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React Router',
      'Gatsby',
      'Nuxt.js',
      'Remix',
      'Three.js',
      'WebGL'
    ]
  },
  styling: {
    name: 'Styling & UI',
    items: [
      'Tailwind',
      'SASS',
      'Bootstrap',
      'Material UI',
      'Chakra UI',
      'Ant Design',
      'Styled Components',
      'Windi CSS',
      'PostCSS'
    ]
  },
  state: {
    name: 'State Management',
    items: ['Redux', 'Redux Saga', 'React Query', 'Apollo', 'Zustand']
  },
  backend: {
    name: 'Backend',
    items: [
      'Node.js',
      'Express',
      'NestJS',
      'Django',
      'FastAPI',
      'Spring',
      '.NET',
      'Laravel',
      'Ruby on Rails',
      'Deno'
    ]
  },
  mobile: {
    name: 'Mobile Development',
    items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Android Studio', 'Xcode']
  },
  database: {
    name: 'Databases',
    items: [
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'Redis',
      'Elasticsearch',
      'InfluxDB',
      'CouchDB',
      'Cockroach DB',
      'Neo4j',
      'MariaDB',
      'SQLite',
      'Supabase',
      'PlanetScale',
      'ClickHouse',
      'Cassandra'
    ]
  },
  orm: {
    name: 'ORM & ODM',
    items: ['Prisma', 'Sequelize', 'TypeORM', 'Mongoose']
  },
  cloud: {
    name: 'Cloud & Hosting',
    items: [
      'AWS',
      'Azure',
      'Google Cloud',
      'DigitalOcean',
      'Vercel',
      'Netlify',
      'Heroku',
      'Firebase'
    ]
  },
  devops: {
    name: 'DevOps & CI/CD',
    items: ['Docker', 'Kubernetes', 'Jenkins', 'CircleCI', 'Terraform', 'Ansible', 'Vagrant']
  },
  testing: {
    name: 'Testing',
    items: [
      'Jest',
      'Cypress',
      'Selenium',
      'Karma',
      'Mocha',
      'SonarQube',
      'Vitest',
      'Playwright',
      'Testing Library'
    ]
  },
  tools: {
    name: 'Development Tools',
    items: [
      'Git',
      'GitHub',
      'GitLab',
      'Postman',
      'Swagger',
      'VSCode',
      'WebStorm',
      'IntelliJ IDEA',
      'Vim',
      'Neovim',
      'Atom',
      'Sublime Text',
      'Emacs'
    ]
  },
  packageManagers: {
    name: 'Package Managers',
    items: ['npm', 'Yarn', 'pnpm', 'Composer', 'Gradle', 'Maven']
  },
  cms: {
    name: 'CMS & Content',
    items: ['Strapi', 'Contentful', 'Sanity', 'WordPress', 'Shopify']
  },
  languages: {
    name: 'Programming Languages',
    items: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C++',
      'C#',
      'Go',
      'Rust',
      'Dart',
      'Ruby',
      'PHP',
      'WebAssembly'
    ]
  },
  monitoring: {
    name: 'Monitoring & Logging',
    items: ['Grafana', 'Kibana', 'Prometheus', 'Sentry']
  },
  messaging: {
    name: 'Message Queues',
    items: ['RabbitMQ', 'Kafka']
  },
  email: {
    name: 'Email Services',
    items: ['MinuteMailer', 'Mailchimp', 'SendGrid']
  },
  payment: {
    name: 'Payment Processing',
    items: ['Stripe', 'PayPal', 'Square']
  },
  security: {
    name: 'Security & SSL',
    items: ["Let's Encrypt", 'Cloudflare', 'Akamai', 'Fastly']
  },
  design: {
    name: 'Design & UI/UX',
    items: ['Figma', 'Adobe XD', 'Sketch', 'Storybook', 'Canva', 'InVision', 'Zeplin', 'Miro']
  },
  documentation: {
    name: 'Documentation',
    items: ['UML', 'Markdown', 'Font Awesome']
  },
  projectManagement: {
    name: 'Project Management',
    items: ['Jira', 'Trello', 'Confluence', 'Asana', 'Notion', 'Linear', 'ClickUp', 'Slack']
  },
  gamedev: {
    name: 'Game Development',
    items: ['Unity', 'Unreal Engine', 'Blender']
  },
  buildTools: {
    name: 'Build Tools',
    items: ['Webpack', 'Vite', 'Babel', 'Rollup']
  },
  animation: {
    name: 'Animation',
    items: ['Framer Motion', 'GSAP']
  }
};

const iconComponents = {
  React: SiReact,
  Figma: SiFigma,
  'Adobe XD': SiAdobexd,
  Sketch: SiSketch,
  'Next.js': SiNextdotjs,
  Tailwind: SiTailwindcss,
  Firebase: SiFirebase,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Node.js': SiNodedotjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  Django: SiDjango,
  Docker: SiDocker,
  Git: SiGit,
  Angular: SiAngular,
  'Vue.js': SiVuedotjs,
  SASS: SiSass,
  Webpack: SiWebpack,
  Vite: SiVite,
  Ruby: SiRuby,
  'Ruby on Rails': SiRubyonrails,
  Go: SiGo,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  GraphQL: SiGraphql,
  Linux: SiLinux,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  'C++': SiCplusplus,
  'C#': TbBrandCSharp,
  Java: FaJava,
  PHP: SiPhp,
  Laravel: SiLaravel,
  Spring: SiSpring,
  Flutter: SiFlutter,
  Kotlin: SiKotlin,
  Swift: SiSwift,
  MySQL: SiMysql,
  Redis: SiRedis,
  Ubuntu: SiUbuntu,
  Jest: SiJest,
  ESLint: SiEslint,
  Prettier: SiPrettier,
  Azure: VscAzure,
  AWS: FaAws,
  'Google Cloud': SiGooglecloud,
  Serverless: SiServerless,
  Sentry: SiSentry,
  Strapi: SiStrapi,
  Auth0: SiAuth0,
  NestJS: SiNestjs,
  Express: SiExpress,
  Redux: SiRedux,
  Apollo: SiApollographql,
  jQuery: SiJquery,
  Svelte: SiSvelte,
  Electron: SiElectron,
  Algolia: SiAlgolia,
  CouchDB: SiApachecouchdb,
  'D3.js': SiD3Dotjs,
  'Chart.js': SiChartdotjs,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Bitbucket: SiBitbucket,
  RabbitMQ: SiRabbitmq,
  Nginx: SiNginx,
  Cypress: SiCypress,
  Mocha: SiMocha,
  CircleCI: SiCircleci,
  Jenkins: SiJenkins,
  Prisma: SiPrisma,
  Hasura: SiHasura,
  Salesforce: SiSalesforce,
  OpenAI: SiOpenai,
  Shopify: SiShopify,
  WordPress: SiWordpress,
  DigitalOcean: SiDigitalocean,
  Contentful: SiContentful,
  Sanity: SiSanity,
  'Ant Design': SiAntdesign,
  Bootstrap: SiBootstrap,
  'Chakra UI': SiChakraui,
  Storybook: SiStorybook,
  Postman: SiPostman,
  Swagger: SiSwagger,
  SonarQube: SiSonarqube,
  Selenium: SiSelenium,
  Trello: SiTrello,
  Jira: SiJira,
  Confluence: SiConfluence,
  Slack: SiSlack,
  VSCode: VscVscode,
  WebStorm: SiWebstorm,
  'IntelliJ IDEA': SiIntellijidea,
  Eclipse: SiEclipseide,
  'Android Studio': SiAndroidstudio,
  Xcode: SiXcode,
  Unity: SiUnity,
  'Unreal Engine': SiUnrealengine,
  Blender: SiBlender,
  FastAPI: SiFastapi,
  '.NET': SiDotnet,
  Rust: SiRust,
  Dart: SiDart,
  Kafka: SiApachekafka,
  Elasticsearch: SiElasticsearch,
  InfluxDB: SiInfluxdb,
  Grafana: SiGrafana,
  Kibana: SiKibana,
  Prometheus: SiPrometheus,
  Ansible: SiAnsible,
  Vagrant: SiVagrant,
  PowerShell: VscTerminalPowershell,
  Bash: VscTerminalBash,
  'React Router': SiReactrouter,
  WebGL: SiWebgl,
  'Three.js': SiThreedotjs,
  Babel: SiBabel,
  'Framer Motion': SiFramer,
  GSAP: SiGreensock,
  Gatsby: SiGatsby,
  'Nuxt.js': SiNuxtdotjs,
  Remix: SiRemix,
  'Styled Components': SiStyledcomponents,
  Zod: SiZod,
  PostCSS: SiPostcss,
  Rollup: SiRollupdotjs,
  WebAssembly: SiWebassembly,
  Deno: SiDeno,
  Vitest: SiVitest,
  'Testing Library': SiTestinglibrary,
  pnpm: SiPnpm,
  Yarn: SiYarn,
  npm: SiNpm,
  Composer: SiComposer,
  Gradle: SiGradle,
  Maven: SiApachemaven,
  'Cockroach DB': SiCockroachlabs,
  Neo4j: SiNeo4J,
  MariaDB: SiMariadb,
  SQLite: SiSqlite,
  Supabase: SiSupabase,
  PlanetScale: SiPlanetscale,
  ClickHouse: SiClickhouse,
  Cassandra: SiApachecassandra,
  MinuteMailer: SiMinutemailer,
  Mailchimp: SiMailchimp,
  SendGrid: SiSendgrid,
  Stripe: SiStripe,
  PayPal: SiPaypal,
  Square: SiSquare,
  "Let's Encrypt": SiLetsencrypt,
  Cloudflare: SiCloudflare,
  Akamai: SiAkamai,
  Fastly: SiFastly,
  UML: SiUml,
  Markdown: SiMarkdown,
  Asana: SiAsana,
  Notion: SiNotion,
  Linear: SiLinear,
  ClickUp: SiClickup,
  Canva: SiCanva,
  InVision: SiInvision,
  Miro: SiMiro,
  'Font Awesome': SiFontawesome,
  Insomnia: SiInsomnia,
  Sequelize: SiSequelize,
  TypeORM: SiTypeorm,
  Mongoose: SiMongoose,
  'Redux Saga': SiReduxsaga,
  'React Hook Form': SiReacthookform,
  'React Query': SiReactquery,
  Vim: SiVim,
  Neovim: SiNeovim,
  'Sublime Text': SiSublimetext,
  Emacs: SiGnuemacs
};

const iconColors = {
  React: 'text-cyan-400',
  'Next.js': 'text-black dark:text-white',
  'Vue.js': 'text-emerald-500',
  Angular: 'text-red-600',
  Svelte: 'text-orange-500',
  TypeScript: 'text-blue-500',
  JavaScript: 'text-yellow-400',
  Python: 'text-blue-500',
  Java: 'text-red-500',
  Go: 'text-cyan-500',
  Rust: 'text-orange-600',
  'Node.js': 'text-green-500',
  Deno: 'text-black dark:text-white',
  MongoDB: 'text-green-500',
  PostgreSQL: 'text-blue-400',
  MySQL: 'text-blue-500',
  Redis: 'text-red-500',
  Docker: 'text-blue-500',
  Kubernetes: 'text-blue-500',
  AWS: 'text-orange-500',
  Azure: 'text-blue-500',
  'Google Cloud': 'text-red-400',
  Firebase: 'text-amber-500',
  Vercel: 'text-black dark:text-white',
  Netlify: 'text-cyan-500',
  DigitalOcean: 'text-blue-500',
  GraphQL: 'text-pink-500',
  REST: 'text-green-500',
  Tailwind: 'text-cyan-400',
  SASS: 'text-pink-500',
  CSS3: 'text-blue-500',
  HTML5: 'text-orange-500',
  Git: 'text-orange-500',
  GitHub: 'text-gray-900 dark:text-white',
  GitLab: 'text-orange-600',
  Bitbucket: 'text-blue-500',
  Jest: 'text-red-600',
  Cypress: 'text-green-600',
  'Testing Library': 'text-red-500',
  Storybook: 'text-pink-500',
  Figma: 'text-purple-500',
  'Adobe XD': 'text-pink-500',
  Sketch: 'text-amber-500',
  VSCode: 'text-blue-500',
  WebStorm: 'text-blue-500',
  'IntelliJ IDEA': 'text-pink-500',
  Vim: 'text-green-500',
  Neovim: 'text-green-400',
  Emacs: 'text-purple-500',
  Linux: 'text-yellow-500',
  Ubuntu: 'text-orange-500',
  Windows: 'text-blue-500',
  macOS: 'text-gray-500',
  Android: 'text-green-500',
  iOS: 'text-gray-500',
  Flutter: 'text-blue-400',
  'React Native': 'text-blue-500',
  Electron: 'text-blue-500',
  Unity: 'text-gray-800 dark:text-white',
  'Unreal Engine': 'text-gray-800',
  'Three.js': 'text-black dark:text-white',
  WebGL: 'text-red-500',
  Stripe: 'text-purple-500',
  PayPal: 'text-blue-600',
  Cloudflare: 'text-orange-500',
  Nginx: 'text-green-500',
  Apache: 'text-red-500',
  Jenkins: 'text-red-500',
  CircleCI: 'text-gray-800 dark:text-gray-200',
  'GitHub Actions': 'text-gray-800 dark:text-gray-200',
  Ansible: 'text-red-500',
  Terraform: 'text-purple-500',
  Prometheus: 'text-orange-500',
  Grafana: 'text-orange-500',
  Elasticsearch: 'text-green-500',
  Kibana: 'text-pink-500',
  Logstash: 'text-green-500',
  Kafka: 'text-black dark:text-white',
  RabbitMQ: 'text-orange-500',
  MariaDB: 'text-orange-600',
  SQLite: 'text-blue-400',
  Oracle: 'text-red-600',
  'MS SQL': 'text-red-500',
  Cassandra: 'text-blue-500',
  DynamoDB: 'text-blue-500',
  Prisma: 'text-blue-500',
  TypeORM: 'text-red-500',
  Sequelize: 'text-blue-500',
  Mongoose: 'text-green-500',
  Django: 'text-green-600',
  FastAPI: 'text-teal-500',
  Spring: 'text-green-500',
  '.NET': 'text-purple-600',
  Laravel: 'text-red-500',
  'Ruby on Rails': 'text-red-600',
  Ruby: 'text-red-600',
  PHP: 'text-indigo-500',
  'C++': 'text-blue-600',
  'C#': 'text-purple-600',
  Dart: 'text-blue-500',
  Express: 'text-gray-500',
  NestJS: 'text-red-600',
  Webpack: 'text-blue-500',
  Vite: 'text-purple-600',
  Babel: 'text-yellow-500',
  Bootstrap: 'text-purple-600',
  'Chakra UI': 'text-teal-500',
  'Material UI': 'text-blue-500',
  'Ant Design': 'text-red-500',
  'Styled Components': 'text-pink-500',
  'Windi CSS': 'text-blue-400',
  PostCSS: 'text-red-500',
  Redux: 'text-purple-500',
  'Redux Saga': 'text-purple-600',
  'React Query': 'text-red-600',
  Apollo: 'text-purple-600',
  Zustand: 'text-purple-500',
  jQuery: 'text-blue-500',
  'D3.js': 'text-orange-500',
  'Chart.js': 'text-pink-500',
  Mocha: 'text-yellow-800',
  Karma: 'text-green-500',
  SonarQube: 'text-blue-500',
  Selenium: 'text-green-600',
  Vitest: 'text-green-500',
  Playwright: 'text-green-600',
  Rollup: 'text-red-500',
  WebAssembly: 'text-purple-600',
  pnpm: 'text-yellow-500',
  Yarn: 'text-blue-500',
  npm: 'text-red-500',
  Composer: 'text-yellow-600',
  Gradle: 'text-blue-500',
  Maven: 'text-orange-600',
  'Cockroach DB': 'text-blue-500',
  Neo4j: 'text-blue-600',
  PlanetScale: 'text-indigo-500',
  ClickHouse: 'text-yellow-500',
  MinuteMailer: 'text-blue-500',
  Mailchimp: 'text-yellow-500',
  SendGrid: 'text-blue-500',
  Square: 'text-black dark:text-white',
  "Let's Encrypt": 'text-blue-500',
  Akamai: 'text-blue-600',
  Fastly: 'text-red-500',
  UML: 'text-blue-500',
  Markdown: 'text-blue-500',
  Asana: 'text-red-500',
  Notion: 'text-black dark:text-white',
  Linear: 'text-indigo-500',
  ClickUp: 'text-purple-500',
  Canva: 'text-blue-500',
  InVision: 'text-red-500',
  Zeplin: 'text-yellow-500',
  Miro: 'text-yellow-500',
  'Font Awesome': 'text-blue-500',
  Insomnia: 'text-purple-600',
  Atom: 'text-green-500',
  'Sublime Text': 'text-orange-500',
  'Framer Motion': 'text-purple-500',
  GSAP: 'text-green-500',
  Gatsby: 'text-purple-600',
  'Nuxt.js': 'text-green-500',
  Remix: 'text-indigo-600',
  Zod: 'text-blue-600',
  Hasura: 'text-green-500',
  Salesforce: 'text-blue-500',
  OpenAI: 'text-teal-500',
  Shopify: 'text-green-500',
  WordPress: 'text-blue-500',
  Contentful: 'text-blue-500',
  Sanity: 'text-red-500',
  Blender: 'text-orange-500',
  PowerShell: 'text-blue-500',
  Bash: 'text-gray-200',
  'React Router': 'text-red-500',
  Trello: 'text-blue-500',
  Jira: 'text-blue-500',
  Confluence: 'text-blue-500',
  Slack: 'text-purple-500',
  Eclipse: 'text-purple-500',
  'Android Studio': 'text-green-500',
  Xcode: 'text-blue-500',
  'React Hook Form': 'text-pink-500',
  Supabase: 'text-green-500',
  Heroku: 'text-purple-600',
  CouchDB: 'text-red-500',
  InfluxDB: 'text-blue-500',
  Swift: 'text-orange-500',
  Kotlin: 'text-purple-500',
  Vagrant: 'text-blue-500',
  Postman: 'text-orange-500',
  Swagger: 'text-green-500',
  Strapi: 'text-blue-500'
};

interface TechStackProps {
  technologies: string[];
  showAll?: boolean;
  category?: string;
  className?: string;
  showCategories?: boolean;
  columns?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'detailed';
  animated?: boolean;
}

export default function TechStack({
  technologies,
  showAll = false,
  category,
  className = '',
  showCategories = false,
  columns = 1,
  size = 'md',
  variant = 'default',
  animated = true
}: TechStackProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const variants = {
    default: 'px-3 py-2',
    compact: 'px-2 py-1',
    detailed: 'px-4 py-3'
  };

  const getTechnologiesByCategory = () => {
    if (!showCategories) return { All: technologies };

    return Object.entries(categories).reduce((acc, [key, value]) => {
      const techs = technologies.filter((tech) => value.items.includes(tech));
      if (techs.length > 0) {
        acc[value.name] = techs;
      }
      return acc;
    }, {});
  };

  const filteredTechnologies = category
    ? technologies.filter((tech) => categories[category]?.items.includes(tech))
    : technologies;

  const groupedTechnologies = getTechnologiesByCategory();

  return (
    <div
      className={`grid gap-6 ${columns > 1 ? `grid-cols-1 md:grid-cols-${columns}` : ''} ${className}`}
    >
      {Object.entries(groupedTechnologies).map(([categoryName, techs]) => (
        <div key={categoryName} className="space-y-3">
          {showCategories && (
            <h3 className="text-lg font-semibold text-gray-200">{categoryName}</h3>
          )}
          <div className="flex flex-wrap gap-2">
            {(techs as string[]).map((tech, index) => {
              const Icon = iconComponents[tech];
              const color = iconColors[tech] || 'text-gray-400';

              if (!Icon) return null;

              return (
                <motion.div
                  key={tech}
                  initial={animated ? { opacity: 0, scale: 0.8 } : false}
                  animate={animated ? { opacity: 1, scale: 1 } : false}
                  whileHover={animated ? { scale: 1.1 } : false}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-2 ${variants[variant]} 
                             rounded-full bg-white/5 backdrop-blur-sm ${color}
                             hover:bg-white/10 transition-all duration-300`}
                >
                  <Icon className={sizes[size]} />
                  <span className={`text-sm font-medium ${variant === 'compact' ? 'text-xs' : ''}`}>
                    {tech}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
