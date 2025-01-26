import Hero from "../components/Hero";
    import Features from "../components/Features";
    import { Button } from "@/components/ui/button";
    import { Link } from "react-router-dom";
    import { ArrowRight, Camera, Search, Truck, Brain, Layout, CheckCircle, Leaf, Mail, Twitter, Instagram, Facebook } from "lucide-react";
    
    const Index = () => {
      return (
        <div className="min-h-screen">
          <Hero />
          <Features />
          <div className="bg-muted py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Join the Waste Management Revolution
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Help create a cleaner, more sustainable future by properly managing and
                disposing of waste. Every small action counts towards a better
                environment.
              </p>
              <Link
                to="/analyze"
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                Start Analyzing
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
          <div className="py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg shadow-md bg-white">
                  <div className="flex justify-center mb-4">
                    <Camera className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
                  <p className="text-gray-600">
                    Take a picture of the waste you want to analyze.
                  </p>
                </div>
                <div className="p-6 rounded-lg shadow-md bg-white">
                  <div className="flex justify-center mb-4">
                    <Search className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get Analysis</h3>
                  <p className="text-gray-600">
                    Our AI will analyze the image and provide details.
                  </p>
                </div>
                <div className="p-6 rounded-lg shadow-md bg-white">
                  <div className="flex justify-center mb-4">
                    <Truck className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Request Collection</h3>
                  <p className="text-gray-600">
                    Submit a collection request with the location.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Why Choose Us?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-lg shadow-md bg-white">
                  <div className="flex justify-center mb-4">
                    <Brain className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
                  <p className="text-gray-600">
                    Accurate and fast waste analysis using advanced AI.
                  </p>
                </div>
                <div className="p-6 rounded-lg shadow-md bg-white">
                  <div className="flex justify-center mb-4">
                    <Layout className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                  <p className="text-gray-600">
                    Simple and intuitive interface for all users.
                  </p>
                </div>
                <div className="p-6 rounded-lg shadow-md bg-white">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Efficient Collection</h3>
                  <p className="text-gray-600">
                    Streamlined process for requesting waste collection.
                  </p>
                </div>
                <div className="p-6 rounded-lg shadow-md bg-white">
                  <div className="flex justify-center mb-4">
                    <Leaf className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sustainable Impact</h3>
                  <p className="text-gray-600">
                    Contribute to a cleaner environment with responsible waste management.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Join our community and start making a difference today.
              </p>
              <Link
                to="/analyze"
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                Analyze Now
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
          <footer className="bg-primary text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-semibold">EcoWaste</p>
                <p className="text-sm">
                  Making waste management smarter and easier.
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <a href="#" className="hover:text-muted transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-muted transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-muted transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-x-4 md:space-x-8">
                <div className="mb-4 md:mb-0">
                  <h4 className="text-md font-semibold mb-2">Quick Links</h4>
                  <div className="flex flex-col">
                    <Link
                      to="/"
                      className="hover:text-muted transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      to="/analyze"
                      className="hover:text-muted transition-colors"
                    >
                      Analyze Waste
                    </Link>
                    <Link
                      to="/collections"
                      className="hover:text-muted transition-colors"
                    >
                      Collections
                    </Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-2">Contact Us</h4>
                  <div className="flex flex-col">
                    <p className="text-sm">
                      Email: <a href="mailto:info@ecowaste.com" className="hover:text-muted transition-colors">info@ecowaste.com</a>
                    </p>
                    <p className="text-sm">
                      Phone: <a href="tel:+15551234567" className="hover:text-muted transition-colors">+1 (555) 123-4567</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <h4 className="text-md font-semibold mb-2">Newsletter</h4>
                <p className="text-sm">
                  Subscribe to our newsletter for updates.
                </p>
                <div className="mt-2 flex items-center">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-primary/20 text-white rounded-l-md px-3 py-2 focus:outline-none"
                  />
                  <button className="bg-secondary text-white px-3 py-2 rounded-r-md hover:bg-secondary/80 transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="container mx-auto mt-4 text-center text-sm text-white/70">
              <p>&copy; {new Date().getFullYear()} EcoWaste. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
    };
    
    export default Index;
