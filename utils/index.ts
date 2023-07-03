import axios from "axios";
import { PostProps } from "../types";

export const postImage = async (postData: PostProps) => {
  const response = await axios.post(
    "/api/post",
    { postData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = response.data;
  return data;
};

export const convertToBase64 = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();

  // Convert the Blob to a base64 string
  const reader = new FileReader();
  const base64String = await new Promise<string>((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(imageBlob);
  });
  return base64String;
};
