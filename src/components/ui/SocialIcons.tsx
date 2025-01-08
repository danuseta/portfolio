import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Facebook,
  Twitter,
  Youtube,
  Twitch,
  Discord,
  Mail,
  Globe,
  Rss,
  BookOpen,
  Hash,
  Share2,
  Link,
  AtSign,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

import {
  FaTiktok,
  FaWhatsapp,
  FaSnapchat,
  FaPinterest,
  FaTelegram,
  FaReddit,
  FaMedium,
  FaDev,
  FaPatreon,
  FaBehance,
  FaDribbble,
  FaSpotify,
  FaVimeo,
  FaFlickr,
  FaWeibo,
  FaLine,
  FaSlack,
  FaStackOverflow,
  FaGitlab,
  FaBitbucket
} from 'react-icons/fa';

export const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  tiktok: FaTiktok,
  youtube: Youtube,
  twitch: Twitch,
  discord: Discord,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,

  snapchat: FaSnapchat,
  pinterest: FaPinterest,
  reddit: FaReddit,
  medium: FaMedium,
  dev: FaDev,
  patreon: FaPatreon,
  behance: FaBehance,
  dribbble: FaDribbble,

  // Tambahan social icons baru
  spotify: FaSpotify,
  vimeo: FaVimeo,
  flickr: FaFlickr,
  weibo: FaWeibo,
  line: FaLine,
  slack: FaSlack,
  stackoverflow: FaStackOverflow,
  gitlab: FaGitlab,
  bitbucket: FaBitbucket,

  // Utility icons
  email: Mail,
  phone: Phone,
  website: Globe,
  location: MapPin,
  calendar: Calendar,
  blog: BookOpen,
  rss: Rss,
  hashtag: Hash,
  share: Share2,
  link: Link,
  atSign: AtSign,
  message: MessageCircle
};

export type SocialPlatform = keyof typeof socialIcons;

export const getSocialIcon = (platform: string) => {
  return socialIcons[platform.toLowerCase() as SocialPlatform] || Link;
};

export const SocialIcon = ({
  platform,
  className = '',
  size = 24
}: {
  platform: string;
  className?: string;
  size?: number;
}) => {
  const IconComponent = getSocialIcon(platform);

  return <IconComponent size={size} className={className} />;
};

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string;
}

export const supportedPlatforms = Object.keys(socialIcons) as SocialPlatform[];

export default socialIcons;
