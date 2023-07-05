import { Timestamp } from "firebase/firestore";
export interface ImageProps {
  prompt: string;
  negativePrompt: string;
}
export interface HomeProps {
  searchParams: ImageProps;
}

export interface DiffussionResponse {
  output: string;
  prompt: string;
  negativePrompt: string;
  model: string;
  error: string;
  id: number;
  status: string;
}

export interface PostProps {
  username: string;
  imageUrl: string;
  prompt: string;
  negativePrompt: string;
  model: string;
}

export interface PostModalProps {
  output: string;
  prompt: string;
  negativePrompt: string;
  model: string;
}

export interface ShowcaseProps {
  imageUrl: string;
  username: string;
  model: string;
  prompt: string;
  negativePrompt: string;
  uploadedAt: string;
}
