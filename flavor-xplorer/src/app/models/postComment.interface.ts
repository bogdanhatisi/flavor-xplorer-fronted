export interface postComment {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: {
    user_id: number;
    username: string;
    avatar: string | null;
  };
  replies_count: number;
}

interface CommentResponse {
  comments: postComment[];
  pages_left: number;
}
