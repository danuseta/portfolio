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
    LinkedinIcon,
    GithubIcon,
    TwitterIcon,
    YoutubeIcon,
    InstagramIcon,
    FacebookIcon,
    TwitchIcon,
    DiscordIcon,
    GlobeIcon,
    MailIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarIcon,
    BookOpenIcon,
    HashIcon,
    Share2Icon,
    LinkIcon,
    AtSignIcon
  } from 'lucide-react';
  
  import { FaTiktok, FaWhatsapp, FaSnapchat, FaPinterest, FaTelegram, FaReddit, FaMedium, FaDev, FaPatreon, FaBehance, FaDribbble } from 'react-icons/fa';
  
  export const socialIcons = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    instagram: InstagramIcon,
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    tiktok: FaTiktok,
    youtube: YoutubeIcon,
    twitch: TwitchIcon,
    discord: DiscordIcon,
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
    
    email: MailIcon,
    phone: PhoneIcon,
    website: GlobeIcon,
    location: MapPinIcon,
    calendar: CalendarIcon,
    blog: BookOpenIcon,
    rss: Rss,
    hashtag: HashIcon,
    share: Share2Icon,
    link: LinkIcon,
    atSign: AtSignIcon
  };
  
  export type SocialPlatform = keyof typeof socialIcons;
  
  export const getSocialIcon = (platform: string) => {
    return socialIcons[platform.toLowerCase() as SocialPlatform] || LinkIcon;
  };
  
  export const SocialIcon = ({ 
    platform, 
    className = "", 
    size = 24 
  }: { 
    platform: string;
    className?: string;
    size?: number;
  }) => {
    const IconComponent = getSocialIcon(platform);
    
    return (
      <IconComponent
        size={size}
        className={className}
      />
    );
  };
  
  export interface SocialLink {
    platform: SocialPlatform;
    url: string;
    label?: string;
  }
  
  // Example list of supported platforms
  export const supportedPlatforms = Object.keys(socialIcons) as SocialPlatform[];
  
  export default socialIcons;