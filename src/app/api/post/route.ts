import { NextRequest, NextResponse } from "next/server";

import { firestore } from "../../../../firebase/firebase";
import { cloudinary } from "../../../../cloudinary.config";
export const config = {
  runtime: "edge", // for Edge API Routes only
};
export async function POST(request: NextRequest) {
  const { postData } = await request.json();
  const { imageUrl, username, prompt, negativePrompt, model } = postData;
  try {
    // Upload the Base64 image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      resource_type: "auto",
    });

    // Access the uploaded image URL from Cloudinary
    const cloudinaryImageUrl = uploadResult.secure_url;

    // Save the cloudinaryImageUrl and other data to Firebase Firestore
    await firestore.collection("userImages").add({
      imageUrl: cloudinaryImageUrl,
      username,
      prompt,
      negativePrompt,
      model,
      uploadedAt: new Date(),
    });

    console.log("Image uploaded to Cloudinary:", cloudinaryImageUrl);
    return new NextResponse(
      "Success! Your image has been posted successfully. "
    );
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return new NextResponse(
      "Oops! There was an error while posting your image.",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
