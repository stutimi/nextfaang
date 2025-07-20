import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface SocialPlatformCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  badges: string[];
  memberCount: string;
  buttonText: string;
  buttonColor: string;
  hoverColor: string;
  borderColor: string;
  iconBgColor: string;
  url: string;
}

export const SocialPlatformCard = ({
  title,
  description,
  icon,
  badges,
  memberCount,
  buttonText,
  buttonColor,
  hoverColor,
  borderColor,
  iconBgColor,
  url
}: SocialPlatformCardProps) => {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-2 ${borderColor}`}>
      <CardHeader className="text-center">
        <div className={`p-3 ${iconBgColor} rounded-full w-fit mx-auto mb-3 group-hover:${iconBgColor.replace('/10', '/20')} transition-colors`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {badges.map((badge, index) => (
            <Badge key={index} variant="secondary">{badge}</Badge>
          ))}
        </div>
        <div className={`text-2xl font-bold ${buttonColor.includes('bg-') ? buttonColor.replace('bg-', 'text-') : buttonColor}`}>
          {memberCount}
        </div>
        <Button 
          className={`w-full ${buttonColor} ${hoverColor}`}
          onClick={() => window.open(url, '_blank')}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};