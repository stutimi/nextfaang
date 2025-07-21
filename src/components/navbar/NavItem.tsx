import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Home, Book, Code, BookOpen, Users, Phone, Info, Sword, Sparkles, Rocket, Star, Globe, Layout } from "lucide-react";
import { NavItem as NavItemType } from "./navigationData";

const iconMap = {
  Home: Home,
  Book: Book,
  Code: Code,
  BookOpen: BookOpen,
  Users: Users,
  Phone: Phone,
  Info: Info,
  Sword: Sword,
  Sparkles: Sparkles,
  Rocket: Rocket,
  Star: Star,
  Globe: Globe,
  Layout: Layout, // Added Layout icon
};

interface NavItemProps {
  item: NavItemType;
  index: number;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavItem = ({ item, index, isMobile = false, onItemClick }: NavItemProps) => {
  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
  
  // Add a fallback icon in case the icon is not found in the map
  const FallbackIcon = Home;
  const Icon = IconComponent || FallbackIcon;
  
  const baseClasses = isMobile
    ? "w-full flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-all duration-300 p-3 rounded-xl hover:bg-primary/5 active:bg-primary/10 group"
    : "relative flex items-center gap-2 text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/10 group overflow-hidden";

  const iconClasses = "group-hover:scale-110 transition-transform duration-300" + (isMobile ? "" : " relative z-10");
  const labelClasses = isMobile ? "" : "relative z-10";

  const badgeElement = item.badge && (
    <Badge
      variant="secondary"
      className={`text-xs px-2 py-0.5 ${isMobile ? "" : "ml-1 relative z-10"} ${
        item.badge === 'Hot'
          ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border-red-500/30 shadow-lg shadow-red-500/20'
          : 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30 shadow-lg shadow-green-500/20'
      }`}
    >
      {item.badge}
    </Badge>
  );

  const content = (
    <>
      {isMobile ? (
        <>
          <div className="p-2 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors duration-200">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <div className="inline-block ml-2">
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  item.badge === 'Hot' 
                    ? 'bg-orange-500/10 text-orange-500' 
                    : 'bg-green-500/10 text-green-500'
                }`}>
                  {item.badge}
                </span>
              </div>
            )}
          </div>
          <div className="text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </>
      ) : (
        <>
          <div className="contents">
            <span className={iconClasses}>
              <Icon className="h-4 w-4" />
            </span>
            <span className={labelClasses}>{item.label}</span>
          </div>
          {badgeElement}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 transition-colors duration-300" />
        </>
      )}
    </>
  );

  const motionProps = isMobile
    ? {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: index * 0.05 },
        whileTap: { scale: 0.98 }
      }
    : {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.1 },
        whileHover: { scale: 1.05, y: -2 },
        whileTap: { scale: 0.95 }
      };

  return (
    <motion.div
      key={item.label}
      {...motionProps}
      className={isMobile ? "" : "relative"}
    >
      {item.type === 'link' ? (
        <Link to={item.href!} onClick={onItemClick}>
          <motion.div
            className={baseClasses}
            {...(!isMobile && { whileHover: { scale: 1.05, y: -2 }, whileTap: { scale: 0.95 } })}
          >
            {content}
          </motion.div>
        </Link>
      ) : (
        <motion.button
          onClick={() => {
            item.action?.();
            onItemClick?.();
          }}
          className={baseClasses}
          {...(!isMobile && { whileHover: { scale: 1.05, y: -2 }, whileTap: { scale: 0.95 } })}
        >
          {content}
        </motion.button>
      )}
    </motion.div>
  );
};