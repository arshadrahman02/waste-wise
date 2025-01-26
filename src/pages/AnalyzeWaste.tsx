import { useState } from "react";
    import { Upload, Loader2 } from "lucide-react";
    import { toast } from "sonner";
    import { supabase } from "@/integrations/supabase/client";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    
    interface WasteAnalysis {
      waste_name: string;
      estimated_weight: number;
      is_recyclable: boolean;
      is_biodegradable: boolean;
    }
    
    const AnalyzeWaste = () => {
      const [image, setImage] = useState<File | null>(null);
      const [preview, setPreview] = useState<string>("");
      const [loading, setLoading] = useState(false);
      const [location, setLocation] = useState("");
      const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);
    
      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImage(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };
    
      const analyzeWaste = async () => {
        if (!preview) {
          toast.error("Please upload an image first");
          return;
        }
    
        setLoading(true);
        try {
          const { data, error } = await supabase.functions.invoke("analyze-waste", {
            body: { imageBase64: preview },
          });
    
          if (error) throw error;
    
          setAnalysis(data);
          toast.success("Analysis completed successfully!");
        } catch (error) {
          console.error("Error analyzing waste:", error);
          toast.error("Failed to analyze waste. Please try again.");
        } finally {
          setLoading(false);
        }
      };
    
      const handleCollectWaste = async () => {
        if (!location) {
          toast.error("Please enter a location");
          return;
        }
        if (!analysis) {
          toast.error("Please analyze the waste first");
          return;
        }
    
        try {
          // Get the current user's ID
          const {
            data: { user },
          } = await supabase.auth.getUser();
    
          if (!user) {
            toast.error("You must be logged in to submit a collection request");
            return;
          }
    
          // Upload image to Supabase Storage
          let imageUrl = null;
          if (image) {
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from("waste-images")
              .upload(`${Date.now()}-${image.name}`, image);
    
            if (uploadError) throw uploadError;
            imageUrl = uploadData.path;
          }
    
          // Save analysis to database with user_id
          const { error: insertError } = await supabase
            .from("waste_analysis")
            .insert([
              {
                user_id: user.id,
                waste_name: analysis.waste_name,
                estimated_weight: analysis.estimated_weight,
                is_recyclable: analysis.is_recyclable,
                is_biodegradable: analysis.is_biodegradable,
                location,
                image_url: imageUrl,
                status: "pending",
              },
            ]);
    
          if (insertError) throw insertError;
    
          toast.success("Collection request submitted!");
    
          // Reset form
          setImage(null);
          setPreview("");
          setLocation("");
          setAnalysis(null);
        } catch (error) {
          console.error("Error saving collection:", error);
          toast.error("Failed to submit collection request");
        }
      };
    
      return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">
            Analyze Waste
          </h1>
    
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Upload Waste Image</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto mb-4"
                  />
                ) : (
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                >
                  Choose Image
                </label>
              </div>
    
              {image && (
                <Button
                  onClick={analyzeWaste}
                  disabled={loading}
                  className="w-full mb-6"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Analyze"
                  )}
                </Button>
              )}
    
              {analysis && (
                <div className="mb-6">
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-center">Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <div className="bg-green-100 p-4 rounded-md">
                        <p className="font-medium">Name:</p>
                        <p>{analysis.waste_name}</p>
                      </div>
                      <div className="bg-blue-100 p-4 rounded-md">
                        <p className="font-medium">Estimated Weight:</p>
                        <p>{analysis.estimated_weight} kg</p>
                      </div>
                      <div className="bg-yellow-100 p-4 rounded-md">
                        <p className="font-medium">Recyclable:</p>
                        <p>{analysis.is_recyclable ? "Yes" : "No"}</p>
                      </div>
                      <div className="bg-purple-100 p-4 rounded-md">
                        <p className="font-medium">Biodegradable:</p>
                        <p>{analysis.is_biodegradable ? "Yes" : "No"}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Location</label>
                    <Input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter waste location"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <Button
                    onClick={handleCollectWaste}
                    className="w-full"
                  >
                    Request Collection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    };
    
    export default AnalyzeWaste;
