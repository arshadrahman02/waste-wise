import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Collection {
  id: string;
  waste_name: string;
  estimated_weight: number;
  is_recyclable: boolean;
  is_biodegradable: boolean;
  location: string | null;
  created_at: string | null;
  status: string | null;
  image_url: string | null;
}

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          toast.error("You must be logged in to view collections.");
          navigate("/auth/login");
          return;
        }

        const { data, error } = await supabase
          .from("waste_analysis")
          .select("*, image_url")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching collections:", error);
        } else {
          setCollections(data || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center text-gray-600">Loading collections...</div>
    );
  }

  return (
    <div className="container mx-auto py-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Waste Collections
      </h1>

      {collections.length === 0 ? (
        <div className="text-center text-gray-600">
          No collection requests yet.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {collections.map((collection) => (
            <Card key={collection.id}>
              <CardHeader>
                <CardTitle className="text-center">
                  {collection.waste_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {collection.image_url && (
                  <div className="w-full flex justify-center mb-4">
                    {collection.image_url ? (
                      <img
                        src={collection.image_url}
                        alt="Waste Image"
                        className="max-h-48 rounded-md"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    ) : (
                      <img
                        src="/placeholder.svg"
                        alt="Placeholder"
                        className="max-h-48 rounded-md"
                      />
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-green-100 p-4 rounded-md">
                    <p className="font-medium">Estimated Weight:</p>
                    <p>{collection.estimated_weight} kg</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-md">
                    <p className="font-medium">Recyclable:</p>
                    <p>{collection.is_recyclable ? "Yes" : "No"}</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-md">
                    <p className="font-medium">Biodegradable:</p>
                    <p>{collection.is_biodegradable ? "Yes" : "No"}</p>
                  </div>
                  {collection.location && (
                    <div className="bg-purple-100 p-4 rounded-md">
                      <p className="font-medium">Location:</p>
                      <p>{collection.location}</p>
                    </div>
                  )}
                  {collection.created_at && (
                    <div className="bg-gray-100 p-4 rounded-md">
                      <p className="font-medium">Date:</p>
                      <p>
                        {new Date(collection.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {collection.status && (
                    <div className="bg-pink-100 p-4 rounded-md">
                      <p className="font-medium">Status:</p>
                      <p>{collection.status}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
