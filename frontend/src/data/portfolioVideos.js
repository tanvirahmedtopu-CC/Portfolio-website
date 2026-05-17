// Portfolio Videos organized by category
// Videos from Google Drive and Dropbox

export const portfolioVideos = {
  // Category 1: Short Form Content (Reels & TikToks)
  shortForm: {
    title: "Short Form Content",
    description: "Viral-ready content for TikTok, Reels & Shorts",
    thumbnail: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&q=80",
    videos: [
      {
        id: "sf1",
        title: "Viral Instagram Reel",
        source: "dropbox",
        url: "https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h/Viral%20Instagram%20Reels/Final%20Edits_1.mp4?rlkey=g5rymfh0hon8e1s73v1e9up6l&raw=1"
      },
      {
        id: "sf2",
        title: "TikTok Style Edit",
        source: "dropbox",
        url: "https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h/Tiktoks/account2-tiktok_1.mp4?rlkey=g5rymfh0hon8e1s73v1e9up6l&raw=1"
      },
      {
        id: "sf3",
        title: "Ecom Product Ad",
        source: "dropbox",
        url: "https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h/Tiktoks/Ecom%201.mp4?rlkey=g5rymfh0hon8e1s73v1e9up6l&raw=1"
      },
      {
        id: "sf4",
        title: "Podcast Viral Style",
        source: "dropbox",
        url: "https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h/Tiktoks/Podcast%20Viral%20Video%20Like%20alex%20hormozi.mp4?rlkey=g5rymfh0hon8e1s73v1e9up6l&raw=1"
      }
    ]
  },

  // Category 2: AI Generated Videos
  aiGenerated: {
    title: "AI Generated Videos",
    description: "Cutting-edge AI-powered visual productions",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    videos: [
      {
        id: "ai1",
        title: "AI Product AD (UGC)",
        source: "gdrive",
        fileId: "1MwIFRFtv1z4P43IohW4jMdSsobFwogVg",
        directUrl: "https://drive.google.com/file/d/1-AI-PRODUCT-AD/preview"
      },
      {
        id: "ai2",
        title: "AI Commercial Video",
        source: "gdrive",
        directUrl: "https://drive.google.com/file/d/1-AI-COMMERCIAL/preview"
      },
      {
        id: "ai3",
        title: "Descript AI Edit",
        source: "gdrive",
        directUrl: "https://drive.google.com/file/d/1-DESCRIPT-AI/preview"
      },
      {
        id: "ai4",
        title: "Product TikTok AD",
        source: "gdrive",
        directUrl: "https://drive.google.com/file/d/1-PRODUCT-TIKTOK/preview"
      }
    ]
  },

  // Category 3: Commercial Edits
  commercial: {
    title: "Commercial Edits",
    description: "High-impact brand commercials and product showcases",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    folders: [
      { name: "Fitness Brand & Influencers", source: "gdrive" },
      { name: "Sports Brands", source: "gdrive" },
      { name: "Food", source: "gdrive" }
    ],
    externalLink: "https://drive.google.com/drive/folders/1rpsEctlFC1fhBX-n28FU6CuWxGXqFOSh"
  },

  // Category 4: Brand Storytelling
  brandStorytelling: {
    title: "Brand Storytelling",
    description: "Narrative-driven content that connects emotionally",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
    folders: [
      { name: "Food and Travel", source: "gdrive" },
      { name: "Educational And Learning", source: "gdrive" }
    ],
    externalLink: "https://drive.google.com/drive/folders/1rpsEctlFC1fhBX-n28FU6CuWxGXqFOSh"
  },

  // Category 5: Performance Marketing
  performanceMarketing: {
    title: "Performance Marketing",
    description: "Data-driven creatives optimized for conversions",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    videos: [
      {
        id: "pm1",
        title: "Gello Ad",
        source: "dropbox",
        url: "https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h/Tiktoks/Gello%20Ad%203.mp4?rlkey=g5rymfh0hon8e1s73v1e9up6l&raw=1"
      },
      {
        id: "pm2",
        title: "Ecom Ad 2",
        source: "dropbox",
        url: "https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h/Tiktoks/Ecom%202.mp4?rlkey=g5rymfh0hon8e1s73v1e9up6l&raw=1"
      }
    ],
    externalLink: "https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h/Instagram%20Ads%20%7C%7C%20Product%20ads?rlkey=g5rymfh0hon8e1s73v1e9up6l&dl=0"
  }
};

// Folder links for "View All" functionality
export const folderLinks = {
  shortFormEdits: "https://drive.google.com/drive/folders/1rpsEctlFC1fhBX-n28FU6CuWxGXqFOSh",
  reelsTiktoks: "https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h?rlkey=g5rymfh0hon8e1s73v1e9up6l&dl=0",
  aiGenerated: "https://drive.google.com/drive/folders/1MwIFRFtv1z4P43IohW4jMdSsobFwogVg"
};
