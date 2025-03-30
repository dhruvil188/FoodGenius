import { AnalyzeImageResponse, YoutubeVideo } from "@shared/schema";

// Sample YouTube videos for recipes
const pastaYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "D_2DBLAt57c",
    title: "Pasta Carbonara | Basics with Babish",
    channelTitle: "Babish Culinary Universe",
    description: "Learn how to make authentic pasta carbonara with this simple recipe.",
    publishedAt: "2022-04-15T12:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/D_2DBLAt57c/mqdefault.jpg"
  },
  {
    videoId: "6Oy5ITdDQ3o",
    title: "How To Make Carbonara | Jamie Oliver",
    channelTitle: "Jamie Oliver",
    description: "Jamie shows you his take on a classic carbonara with a few little tips and tricks.",
    publishedAt: "2021-09-22T14:30:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/6Oy5ITdDQ3o/mqdefault.jpg"
  }
];

const pizzaYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "sv3TXMSv6Lw",
    title: "The Best Homemade Pizza You'll Ever Eat",
    channelTitle: "Joshua Weissman",
    description: "Learn how to make pizza at home better than delivery.",
    publishedAt: "2020-04-24T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/sv3TXMSv6Lw/mqdefault.jpg"
  },
  {
    videoId: "5mIbyLKPZ8M",
    title: "The Pizza Show: Naples, The Birthplace of Pizza",
    channelTitle: "MUNCHIES",
    description: "Explore the origins of pizza in Naples, Italy.",
    publishedAt: "2016-09-28T15:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/5mIbyLKPZ8M/mqdefault.jpg"
  }
];

const curryYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "pCBcIN0YEhw",
    title: "Butter Chicken Recipe | Chicken Makhani | Murgh Makhani",
    channelTitle: "Get Curried",
    description: "Learn how to make the creamiest butter chicken at home.",
    publishedAt: "2021-03-12T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/pCBcIN0YEhw/mqdefault.jpg"
  },
  {
    videoId: "h_qsg8Gof4Q",
    title: "Indian Curry | Basics with Babish",
    channelTitle: "Babish Culinary Universe",
    description: "Learn the fundamentals of making a delicious Indian curry.",
    publishedAt: "2020-09-07T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/h_qsg8Gof4Q/mqdefault.jpg"
  }
];

// Generic YouTube videos for recipes without specific videos
const genericYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "EH9bZJMWCpU",
    title: "How to Read a Recipe",
    channelTitle: "Adam Ragusea",
    description: "Learn how to interpret and follow recipes properly.",
    publishedAt: "2020-02-10T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/EH9bZJMWCpU/mqdefault.jpg"
  },
  {
    videoId: "PqMkMkr_MKU",
    title: "25 Cooking Mistakes You Need to Stop Making",
    channelTitle: "Babish Culinary Universe",
    description: "Common cooking errors and how to fix them.",
    publishedAt: "2021-04-22T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/PqMkMkr_MKU/mqdefault.jpg"
  }
];

// Mexican Cuisine Videos
const mexicanYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "5tInaYJkKEY",
    title: "Authentic Mexican Guacamole",
    channelTitle: "Views on the Road",
    description: "Learn how to make proper Mexican guacamole from scratch.",
    publishedAt: "2020-08-12T15:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/5tInaYJkKEY/mqdefault.jpg"
  },
  {
    videoId: "qOw33I2N0O8",
    title: "How to Make Perfect Tacos Every Time",
    channelTitle: "Joshua Weissman",
    description: "The ultimate guide to making authentic Mexican tacos.",
    publishedAt: "2021-02-15T18:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/qOw33I2N0O8/mqdefault.jpg"
  }
];

// Japanese Cuisine Videos
const japaneseYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "1fDfSWiAg4E",
    title: "How To Make Sushi At Home",
    channelTitle: "Munchies",
    description: "A professional sushi chef shows you how to make restaurant-quality sushi at home.",
    publishedAt: "2019-06-20T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/1fDfSWiAg4E/mqdefault.jpg"
  },
  {
    videoId: "yyUjr6Xj9H4",
    title: "Authentic Japanese Ramen at Home",
    channelTitle: "Joshua Weissman",
    description: "Learn how to make traditional Japanese ramen from scratch.",
    publishedAt: "2020-11-03T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/yyUjr6Xj9H4/mqdefault.jpg"
  }
];

// French Cuisine Videos
const frenchYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "2JYub2JxoDo",
    title: "How To Make French Onion Soup",
    channelTitle: "Babish Culinary Universe",
    description: "Classic French onion soup with caramelized onions and melted cheese.",
    publishedAt: "2018-10-17T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/2JYub2JxoDo/mqdefault.jpg"
  },
  {
    videoId: "09H4NRC5FMs",
    title: "The Perfect Beef Bourguignon | French Classics",
    channelTitle: "Jamie Oliver",
    description: "Jamie's take on the classic French beef stew.",
    publishedAt: "2020-02-14T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/09H4NRC5FMs/mqdefault.jpg"
  }
];

// Chinese Cuisine Videos
const chineseYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "ZfsZwwrTFD4",
    title: "How to Make Perfect Fried Rice",
    channelTitle: "Chinese Cooking Demystified",
    description: "Learn the secrets to making authentic Chinese fried rice.",
    publishedAt: "2019-04-10T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/ZfsZwwrTFD4/mqdefault.jpg"
  },
  {
    videoId: "hF39e_CMXiw",
    title: "Authentic Sichuan Mapo Tofu",
    channelTitle: "Chinese Cooking Demystified",
    description: "Traditional spicy Sichuan mapo tofu recipe.",
    publishedAt: "2018-06-22T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/hF39e_CMXiw/mqdefault.jpg"
  }
];

// Thai Cuisine Videos
const thaiYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "hLj4qBRLQ8A",
    title: "Authentic Pad Thai Recipe",
    channelTitle: "Pailin's Kitchen",
    description: "Learn how to make restaurant-quality pad Thai at home.",
    publishedAt: "2019-08-15T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/hLj4qBRLQ8A/mqdefault.jpg"
  },
  {
    videoId: "LIbKVpBQKJI",
    title: "Thai Green Curry Recipe",
    channelTitle: "Pailin's Kitchen",
    description: "Authentic Thai green curry from scratch.",
    publishedAt: "2018-11-18T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/LIbKVpBQKJI/mqdefault.jpg"
  }
];

// Mediterranean Cuisine Videos
const mediterraneanYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "s9r-CxnCXkg",
    title: "How to Make Authentic Greek Tzatziki Sauce",
    channelTitle: "Dimitra's Dishes",
    description: "Learn how to make perfect Greek tzatziki every time.",
    publishedAt: "2019-05-28T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/s9r-CxnCXkg/mqdefault.jpg"
  },
  {
    videoId: "3AAdKl1UYZw",
    title: "Ultimate Homemade Hummus",
    channelTitle: "Middle Eats",
    description: "The secrets to making silky smooth hummus at home.",
    publishedAt: "2020-08-10T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/3AAdKl1UYZw/mqdefault.jpg"
  }
];

// Korean Cuisine Videos
const koreanYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "T9uI1-6Ac6U",
    title: "Authentic Korean Kimchi Recipe",
    channelTitle: "Maangchi",
    description: "Learn how to make traditional Korean kimchi at home.",
    publishedAt: "2019-11-05T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/T9uI1-6Ac6U/mqdefault.jpg"
  },
  {
    videoId: "eY1FF6SEggk",
    title: "How to Make Korean Bibimbap",
    channelTitle: "Maangchi",
    description: "Authentic Korean mixed rice bowl with vegetables and meat.",
    publishedAt: "2018-07-12T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/eY1FF6SEggk/mqdefault.jpg"
  }
];

// Brazilian Cuisine Videos
const brazilianYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "Ot-Y_qC0Hqc",
    title: "Brazilian Feijoada Recipe",
    channelTitle: "Cooking With Claudia",
    description: "Learn how to make Brazil's national dish, feijoada.",
    publishedAt: "2019-09-18T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/Ot-Y_qC0Hqc/mqdefault.jpg"
  },
  {
    videoId: "iHiGo6X7ezA",
    title: "How to Make Brazilian Cheese Bread (Pão de Queijo)",
    channelTitle: "Simply Recipes",
    description: "Easy recipe for gluten-free Brazilian cheese bread.",
    publishedAt: "2020-05-28T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/iHiGo6X7ezA/mqdefault.jpg"
  }
];

// Middle Eastern Cuisine Videos
const middleEasternYoutubeVideos: YoutubeVideo[] = [
  {
    videoId: "J_Y5A2CZJaQ",
    title: "Authentic Falafel Recipe",
    channelTitle: "Middle Eats",
    description: "Learn how to make perfect crispy falafel from scratch.",
    publishedAt: "2019-03-10T14:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/J_Y5A2CZJaQ/mqdefault.jpg"
  },
  {
    videoId: "3WuxJwe5hHI",
    title: "How to Make Homemade Shawarma",
    channelTitle: "Bon Appétit",
    description: "Restaurant-quality shawarma you can make at home.",
    publishedAt: "2020-01-15T16:00:00Z",
    thumbnailUrl: "https://i.ytimg.com/vi/3WuxJwe5hHI/mqdefault.jpg"
  }
];

// Export YouTubeVideo arrays for use in expandedRecipeLibrary
export {
  pastaYoutubeVideos,
  pizzaYoutubeVideos,
  curryYoutubeVideos,
  genericYoutubeVideos,
  mexicanYoutubeVideos,
  japaneseYoutubeVideos,
  frenchYoutubeVideos,
  chineseYoutubeVideos,
  thaiYoutubeVideos,
  mediterraneanYoutubeVideos,
  koreanYoutubeVideos,
  brazilianYoutubeVideos,
  middleEasternYoutubeVideos
};

