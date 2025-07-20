export type NavItemType = 'link' | 'scroll';

export interface NavItem {
  label: string;
  icon: string;
  href?: string;
  action?: () => void;
  badge?: string | null;
  type: NavItemType;
}

export interface ToolItem {
  label: string;
  href: string;
  icon: string;
  description: string;
  badge?: string;
}

export const getNavItems = (location: { pathname: string }, scrollToSection: (id: string) => void, navigate: (path: string) => void): NavItem[] => [
  { 
    label: "Home", 
    icon: "Home", 
    action: location.pathname === '/' ? () => scrollToSection('#hero') : () => navigate('/'),
    href: location.pathname === '/' ? undefined : "/",
    badge: null, 
    type: location.pathname === '/' ? 'scroll' as const : 'link' as const
  },
  { label: "DSA", icon: "Book", href: "/dsa", badge: "New", type: 'link' as const },
  { label: "Competitive Programming", icon: "Code", href: "/competitive-programming", badge: "Hot", type: 'link' as const },
  { label: "Resources", icon: "BookOpen", href: "/resources", badge: null, type: 'link' as const },
  { label: "Community", icon: "Users", href: "/community", badge: null, type: 'link' as const },
  { label: "About Us", icon: "Info", href: "/about", badge: null, type: 'link' as const }
];

export const toolsItems: ToolItem[] = [
  { label: "CP Arena", href: "/cp-arena", icon: "Sword", description: "Compete in coding battles", badge: "New" },
  { label: "Contest Analyzer", href: "/contest-analyzer", icon: "Sparkles", description: "Analyze your contest performance" },
  { label: "CP Dictionary", href: "/cp-dictionary", icon: "Book", description: "Learn competitive programming terms" },
  { label: "Language Translator", href: "/language-translation", icon: "Globe", description: "Translate code between programming languages", badge: "Live" },
  { label: "Tricks & Tips", href: "/cp-tricks-tips", icon: "Rocket", description: "Master advanced techniques" },
  { label: "DSA Mastery", href: "/dsa", icon: "Star", description: "Complete data structures guide" }
];
