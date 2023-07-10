import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function POST(request: NextRequest) {
  const { prompt, negativePrompt, model, seed } = await request.json();

  if (!prompt) {
    const images = {
      prompt: "",
      negativePrompt: "",
      output: "",
      model: "",
      links: "",
      error: "Prompt is empty", // Set 'error' to undefined in the success case
      id: 0, // Set 'error' to undefined in the success case
      status: "error", // Set 'error' to undefined in the success case
      seed: 0,
    };
    return new NextResponse(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const diffusionRequest = {
    key: process.env.DIFFUSSION_API_SECRET,
    prompt,
    negative_prompt: negativePrompt,
    model_id: model,
    multi_lingual: null,
    panorama: null,
    self_attention: "yes",
    width: "512",
    guidance: "7.5",
    height: "512",
    samples: 1,
    safety_checker: null,
    steps: 20,
    seed: seed ? parseInt(seed) : null,
    enhance_prompt: "no",
    lora_model: "more_details",
    lora_strength: 0.5,
    webhook: null,
    track_id: null,
    scheduler: "DDIMScheduler",
  };

  try {
    const response = await fetch(
      "https://stablediffusionapi.com/api/v4/dreambooth",
      {
        method: "POST",
        body: JSON.stringify(diffusionRequest),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    // Adjust the following lines based on the actual response structure
    const images = {
      prompt: responseData?.meta?.prompt || "",
      negativePrompt: responseData?.meta?.negative_prompt || "",
      output: responseData?.output?.[0] || "",
      model: responseData?.meta?.model_id || "",
      error: responseData?.message || "", // Set 'error' to undefined in the success case
      id: responseData?.id || "",
      status: responseData?.status || "",
      seed: responseData?.meta?.seed || 0,
    };

    return new NextResponse(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const images = {
      prompt: "",
      negativePrompt: "",
      output: "",
      model: "",
      error: "An error occurred while making the API request", // Set 'error' to undefined in the success case
      id: "",
      status: "error",
      seed: 0,
    };
    return new NextResponse(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
