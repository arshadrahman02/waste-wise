import { Recycle, Scale, MapPin, Database } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Scale className="w-12 h-12 text-primary" />,
      title: "Accurate Analysis",
      description: "Get precise measurements of waste size and weight using AI technology",
    },
    {
      icon: <Recycle className="w-12 h-12 text-primary" />,
      title: "Waste Classification",
      description: "Identify whether waste is recyclable or biodegradable",
    },
    {
      icon: <MapPin className="w-12 h-12 text-primary" />,
      title: "Location Tracking",
      description: "Easy location marking for waste collection",
    },
    {
      icon: <Database className="w-12 h-12 text-primary" />,
      title: "Collection Management",
      description: "Track and manage waste collection requests",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
