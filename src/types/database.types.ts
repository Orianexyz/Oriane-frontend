export interface ProtectedUser {
  id: string;
  username: string;
  platform: string;
  is_verified: boolean;
  description: string | null;
  profile_pic: string | null;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface WatchedUser {
  id: string;
  username: string;
  platform: string;
  is_verified: boolean;
  description: string | null;
  profile_pic: string | null;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface ProtectedContent {
  id: string;
  user_id: string;
  url: string;
  caption: string | null;
  created_at: string;
  updated_at: string;
  engagement_rate: number;
  likes_count: number;
  comments_count: number;
  views_count: number;
}

export interface WatchedContent {
  id: string;
  user_id: string;
  url: string;
  caption: string | null;
  created_at: string;
  updated_at: string;
  engagement_rate: number;
  likes_count: number;
  comments_count: number;
  views_count: number;
}

export interface MatchedContent {
  id: string;
  protected_content_id: string;
  watched_content_id: string;
  value_estimate: number;
  status: string;
  created_at: string;
}
