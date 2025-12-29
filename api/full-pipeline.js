import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: JSON.parse(process.env.YOUTUBE_AUTH_KEY)
    });

    // Your LIVE gotcha
    const videoMetadata = {
      snippet: {
        title: "Why Python functions return NOTHING? 🤯",
        description: "Functions without 'return' ALWAYS return None!\n\nSubscribe for daily gotchas! 👇\n#PythonGotchas #Shorts",
        tags: ["python", "gotchas", "programming", "shorts"],
        categoryId: 27
      },
      status: {
        privacyStatus: 'public'
      }
    };

    // UPLOAD YOUR MP4 (replace with real file)
    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: videoMetadata,
      media: {
        body: 'path/to/your-generated-short.mp4' // ← Your Remotion MP4!
      }
    });

    res.json({
      success: true,
      videoId: response.data.id,
      url: `https://youtube.com/watch?v=${response.data.id}`,
      message: '🎬 YOUR FIRST SHORT IS LIVE ON YOUTUBE!',
      channel: response.data.snippet.channelTitle
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data 
    });
  }
}
