import { useState } from "react";
    import { useNavigate, useSearchParams } from "react-router-dom";
    import { supabase } from "@/integrations/supabase/client";
    import { toast } from "sonner";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    
    const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();
    
      const handleLogin = async () => {
        setLoading(true);
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          toast.success("Logged in successfully!");
          const redirectTo = searchParams.get("redirectTo") || "/";
          navigate(redirectTo);
        } catch (error) {
          console.error("Error logging in:", error);
          toast.error("Failed to log in. Please check your credentials.");
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className="container mx-auto py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
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
                onClick={handleLogin}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    };
    
    export default Login;
