import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-muted py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-primary mb-6 animate-fadeIn">
          Smart Waste Management
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fadeIn">
          Upload, analyze, and manage waste efficiently. Our AI-powered system helps you identify and properly dispose of waste materials.
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
  );
};

export default Hero;
