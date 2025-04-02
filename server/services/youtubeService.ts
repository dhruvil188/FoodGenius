import axios from "axios";
import { ValidationError } from "../middleware/errorHandler";
import type { YoutubeVideo } from "@shared/schema";

interface YouTubeSearchResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      channelTitle: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
  }>;
}

/**
 * Fetches YouTube videos related to a given recipe name
 * @param recipeName The name of the recipe to search for
 * @param maxResults Maximum number of results to return (default 5)
 * @returns Array of YouTube video objects
 */
export async function searchYouTubeVideos(recipeName: string, maxResults: number = 5): Promise<YoutubeVideo[]> {
  if (!recipeName) {
    throw new ValidationError("Recipe name is required to search for videos");
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey) {
    console.warn("YOUTUBE_API_KEY not found. YouTube video search will not work.");
    return [];
  }
  
  try {
    const searchQuery = encodeURIComponent(`${recipeName} recipe how to cook`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=${maxResults}&type=video&key=${apiKey}`;
    
    const response = await axios.get<YouTubeSearchResponse>(url);
    
    if (!response.data.items || response.data.items.length === 0) {
      return [];
    }
    
    return response.data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error) {
    console.error("YouTube API Error:", error);
    // Return empty array instead of throwing so recipe analysis still works
    return [];
  }
}