import { Toaster } from "@/components/ui/toaster";
    import { Toaster as Sonner } from "@/components/ui/sonner";
    import { TooltipProvider } from "@/components/ui/tooltip";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { BrowserRouter, Routes, Route } from "react-router-dom";
    import Navbar from "./components/Navbar";
    import Index from "./pages/Index";
    import AnalyzeWaste from "./pages/AnalyzeWaste";
    import Collections from "./pages/Collections";
    import Login from "./pages/auth/Login";
    import Signup from "./pages/auth/Signup";
    
    const queryClient = new QueryClient();
    
    const App = () => (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/analyze" element={<AnalyzeWaste />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
    
    export default App;
