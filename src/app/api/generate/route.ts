import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function POST(request: NextRequest) {
  const { prompt, negativePrompt, model, seed, size } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "propmt is required" }, { status: 400 });
  }
  const width =
    size === "NORMAL"
      ? 512
      : size === "PORTRAIT"
      ? 512
      : size === "LANDSCAPE"
      ? 768
      : null;
  const height =
    size === "NORMAL"
      ? 512
      : size === "PORTRAIT"
      ? 768
      : size === "LANDSCAPE"
      ? 512
      : null;
  if (!width || !height) {
    return NextResponse.json({ error: "size is required" }, { status: 400 });
  }

  const diffusionRequest = {
    key: process.env.DIFFUSSION_API_SECRET,
    prompt,
    negative_prompt: negativePrompt,
    model_id: model,
    multi_lingual: null,
    panorama: null,
    self_attention: "yes",
    width: width,
    guidance: "7.5",
    height: height,
    samples: 1,
    safety_checker: null,
    use_karras_sigmas: true,
    upscale: 2,
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
