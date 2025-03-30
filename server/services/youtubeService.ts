import { YoutubeVideo } from "@shared/schema";

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
  try {
    // Check if YouTube API key is available
    if (!process.env.YOUTUBE_API_KEY) {
      console.error("YouTube API key is not set. Cannot fetch videos.");
      return [];
    }

    // Format the search query - add "recipe" to improve search relevance
    const searchQuery = encodeURIComponent(`${recipeName} recipe cooking tutorial`);
    
    // Build the YouTube Data API URL
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=${maxResults}&key=${process.env.YOUTUBE_API_KEY}`;
    
    // Make the API request
    console.log(`Searching YouTube for: ${recipeName}`);
    const response = await fetch(youtubeApiUrl);
    
    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API error:", errorData);
      
      // Check specifically for quota exceeded error
      if (response.status === 403 && errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
        console.error("YouTube API quota exceeded.");
      }
      
      return [];
    }
    
    // Parse the response
    const data = await response.json() as YouTubeSearchResponse;
    
    // Transform the YouTube response to our schema
    const videos: YoutubeVideo[] = data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium.url
    }));
    
    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}