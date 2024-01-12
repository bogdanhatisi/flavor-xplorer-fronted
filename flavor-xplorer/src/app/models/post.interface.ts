export interface Post {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  cooking_time: number;
  servings: number;
  created_at: string; // Assuming this is a date in string format
  updated_at: string; // Assuming this is a date in string format
  rating_mean: number;
  rating_count: number;
  images: string[]; // Assuming images are represented by an array of URLs
  videos: string[]; // Assuming videos are represented by an array of URLs
}
