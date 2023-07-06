import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function POST(request: NextRequest) {
  const { id } = await request.json();
  console.log(id);

  try {
    const response = await fetch(
      `https://stablediffusionapi.com/api/v3/fetch/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          key: process.env.DIFFUSSION_API_SECRET,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    const result = {
      status: responseData?.status || "",
      id: responseData?.id || "",
      output: responseData?.output?.[0] || "",
    };
    return new NextResponse(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    const errorMessage = "An error occurred while fetching the data.";
    const result = {
      status: "",
      id: "",
      output: "",
      error: errorMessage,
    };
    return new NextResponse(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
