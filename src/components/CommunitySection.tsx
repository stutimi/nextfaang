import { CommunityHeader } from "./community/CommunityHeader";
import { SocialPlatformsGrid } from "./community/SocialPlatformsGrid";
import { GitHubSection } from "./community/GitHubSection";

export const CommunitySection = () => {
  return (
    <section id="community" className="py-16">
      <CommunityHeader />
      <SocialPlatformsGrid />
      <GitHubSection />
    </section>
  );
};