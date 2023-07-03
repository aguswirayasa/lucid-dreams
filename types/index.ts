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
  links: string;
  error: string;
}

export interface PostProps {
  username: string;
  imageUrl: string;
  prompt: string;
  negativePrompt: string;
  model: string;
}
