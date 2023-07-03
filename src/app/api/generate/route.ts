import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { prompt, negativePrompt } = await request.json();

  if (!prompt) {
    const images = {
      prompt: "",
      negativePrompt: "",
      output: "",
      model: "",
      links: "",
      error: "Prompt is empty", // Set 'error' to undefined in the success case
    };
    return new NextResponse(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const diffusionRequest = {
    key: "8wj7V62AZwcmgjoi94rEFMAh3OxNd22hyHo75vHrGoRIL2DOy2MwXZiAGM0o",
    prompt,
    negative_prompt: negativePrompt,
    model_id: "anything-v4",
    multi_lingual: null,
    panorama: null,
    self_attention: "yes",
    width: "512",
    guidance: "7.5",
    height: "512",
    samples: 1,
    safety_checker: null,
    steps: 20,
    seed: 0,
    enhance_prompt: "no",
    webhook: null,
    track_id: null,
    scheduler: "UniPCMultistepScheduler",
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

    if (!response.ok) {
      throw new Error("An error occurred while making the API request");
    }

    const responseData = await response.json();

    // Check the actual structure of the responseData object
    console.log(responseData);

    // Adjust the following lines based on the actual response structure
    const images = {
      prompt: responseData?.meta?.prompt || "",
      negativePrompt: responseData?.meta?.negative_prompt || "",
      output: responseData?.output?.[0] || "",
      model: responseData?.meta?.model_id || "",
      links: responseData?.future_links?.[0] || "",
      error: responseData?.message || "", // Set 'error' to undefined in the success case
    };

    console.log(images);
    return new NextResponse(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    const images = {
      prompt: "",
      negativePrompt: "",
      output: "",
      model: "",
      links: "",
      error: "An error occurred while making the API request", // Set 'error' to undefined in the success case
    };
    return new NextResponse(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
