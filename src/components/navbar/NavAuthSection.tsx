import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserProfile } from "@/components/UserProfile";

export const NavAuthSection = () => {
  const { user } = useAuthContext();

  if (user) {
    return <UserProfile />;
  }

  return (
    <AuthModal>
      <Button variant="default" size="sm">
        Sign In
      </Button>
    </AuthModal>
  );
};