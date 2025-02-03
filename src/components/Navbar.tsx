import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { LogIn, LogOut, UserPlus, Menu } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  return (
    <nav className="bg-primary py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold flex items-center"
        >
          <img
            className="w-20 h-20"
            src="/public/Screenshot_2025-02-03_135733-removebg-preview.png"
            alt=""
          />
          <span className="mt-2">EcoWaste</span>
        </Link>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              ref={sheetRef}
              side="top"
              className="flex flex-col gap-4 p-4 bg-muted text-foreground"
            >
              <Link
                to="/"
                className="block py-2 px-4 rounded-md hover:bg-muted/50 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/analyze"
                className="block py-2 px-4 rounded-md hover:bg-muted/50 transition-colors"
              >
                Analyze Waste
              </Link>
              <Link
                to="/collections"
                className="block py-2 px-4 rounded-md hover:bg-muted/50 transition-colors"
              >
                Collections
              </Link>
              {user ? (
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full justify-start rounded-md hover:bg-muted/50 transition-colors"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Link
                      to="/auth/login"
                      className="flex items-center space-x-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="default"
                    className="w-full justify-start rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Link
                      to="/auth/signup"
                      className="flex items-center space-x-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-muted transition-colors"
            >
              Home
            </Link>
            <Link
              to="/analyze"
              className="text-white hover:text-muted transition-colors"
            >
              Analyze Waste
            </Link>
            <Link
              to="/collections"
              className="text-white hover:text-muted transition-colors"
            >
              Collections
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 text-white hover:text-muted transition-colors">
                    <Avatar className="h-8 w-8">
                      {user.user_metadata?.avatar_url ? (
                        <AvatarImage
                          src={user.user_metadata.avatar_url as string}
                          alt="User Avatar"
                        />
                      ) : (
                        <AvatarFallback>
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline" size="sm">
                  <Link
                    to="/auth/login"
                    className="flex items-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link
                    to="/auth/signup"
                    className="flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
