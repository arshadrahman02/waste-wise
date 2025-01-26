import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      throw new Error("Missing Gemini API key");
    }

    // Remove data URL prefix if present
    const base64Image = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    console.log("Calling Gemini API with image...");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-exp:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Analyze this waste image and provide the following information in JSON format: waste_name (string), estimated_weight (number in kg), is_recyclable (boolean), is_biodegradable (boolean). Be accurate but concise.",
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error response:", errorData);
      throw new Error(
        `Gemini API error: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    console.log("Gemini API response:", data);

    // Extract the text response
    const textResponse = data.candidates[0].content.parts[0].text;

    // Parse the JSON from the text response
    // The response might be wrapped in ```json ``` or just be plain JSON
    const jsonStr = textResponse.replace(/```json\n|\n```/g, "").trim();
    const analysis = JSON.parse(jsonStr);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-waste function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
