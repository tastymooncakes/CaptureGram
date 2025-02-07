export interface Post {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    imageUrl: string;
    caption: string;
    likes: number;
    comments: {
      id: string;
      text: string;
    }[];
  }
  
  // Add API response types based on the numbersprotocol.io response
  export interface ApiPost {
    id: number;
    description?: string;
    media_files: Array<{
      file: string;
      // Add other media properties if needed
    }>;
    creator?: {
      profile_display_name?: string;
      profile_picture_thumbnail?: string;
    };
    like_count?: number;
    // Add other API fields as needed
  }