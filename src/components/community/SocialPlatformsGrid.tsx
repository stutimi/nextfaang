import { MessageCircle, Send, Twitter, Phone, Linkedin } from "lucide-react";
import { SocialPlatformCard } from "./SocialPlatformCard";

export const SocialPlatformsGrid = () => {
  const platforms = [
    {
      title: "Discord Server",
      description: "Real-time discussions, voice channels, and study groups",
      icon: <MessageCircle className="h-8 w-8 text-[#5865F2]" />,
      badges: ["Live Chat", "Voice Rooms", "Study Groups"],
      memberCount: "850+ Members",
      buttonText: "Join Discord",
      buttonColor: "bg-[#5865F2]",
      hoverColor: "hover:bg-[#4752C4]",
      borderColor: "hover:border-[#5865F2]/20",
      iconBgColor: "bg-[#5865F2]/10",
      url: "https://discord.gg/EvJRUDZG"
    },
    {
      title: "Telegram Group",
      description: "Quick updates, contest notifications, and daily discussions",
      icon: <Send className="h-8 w-8 text-[#0088CC]" />,
      badges: ["Instant Updates", "Contest Alerts", "Resources"],
      memberCount: "650+ Members",
      buttonText: "Join Telegram",
      buttonColor: "bg-[#0088CC]",
      hoverColor: "hover:bg-[#006699]",
      borderColor: "hover:border-[#0088CC]/20",
      iconBgColor: "bg-[#0088CC]/10",
      url: "https://t.me/+ESH0q0W9-1A2Nzdl"
    },
    {
      title: "Twitter/X",
      description: "Latest updates, CP tips, and community highlights",
      icon: <Twitter className="h-8 w-8 text-blue-400" />,
      badges: ["Updates", "Tips", "News"],
      memberCount: "2.5K+ Followers",
      buttonText: "Follow on X",
      buttonColor: "bg-blue-400",
      hoverColor: "hover:bg-blue-500",
      borderColor: "hover:border-blue-400/20",
      iconBgColor: "bg-blue-400/10",
      url: "https://x.com/Stutimishra9451?t=639oGTHn8YLhLdsKorcNsA&s=09"
    },
    {
      title: "WhatsApp Group",
      description: "Personal support and quick doubt resolution",
      icon: <Phone className="h-8 w-8 text-[#25D366]" />,
      badges: ["Support", "Doubts", "Quick Help"],
      memberCount: "200+ Members",
      buttonText: "Join WhatsApp",
      buttonColor: "bg-[#25D366]",
      hoverColor: "hover:bg-[#1DA851]",
      borderColor: "hover:border-[#25D366]/20",
      iconBgColor: "bg-[#25D366]/10",
      url: "https://chat.whatsapp.com/E9ijb3svQ9PC75ugH03dGN"
    },
    {
      title: "LinkedIn",
      description: "Professional networking and career updates",
      icon: <Linkedin className="h-8 w-8 text-[#0077B5]" />,
      badges: ["Professional", "Networking", "Career"],
      memberCount: "Connect",
      buttonText: "Follow on LinkedIn",
      buttonColor: "bg-[#0077B5]",
      hoverColor: "hover:bg-[#005885]",
      borderColor: "hover:border-[#0077B5]/20",
      iconBgColor: "bg-[#0077B5]/10",
      url: "https://www.linkedin.com/in/next-fang-7b514a376/"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {platforms.map((platform, index) => (
        <SocialPlatformCard
          key={index}
          {...platform}
        />
      ))}
    </div>
  );
};