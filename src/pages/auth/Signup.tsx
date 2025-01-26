import { useState } from "react";
    import { useNavigate, useSearchParams } from "react-router-dom";
    import { supabase } from "@/integrations/supabase/client";
    import { toast } from "sonner";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    
    const Signup = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();
    
      const handleSignup = async () => {
        setLoading(true);
        try {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) throw error;
          toast.success("Signed up successfully! Please check your email to verify your account.");
          const redirectTo = searchParams.get("redirectTo") || "/";
          navigate(redirectTo);
        } catch (error) {
          console.error("Error signing up:", error);
          toast.error("Failed to sign up. Please try again.");
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className="container mx-auto py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <Button
                onClick={handleSignup}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    };
    
    export default Signup;
