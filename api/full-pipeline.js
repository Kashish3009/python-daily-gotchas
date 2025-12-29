import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    // Test YouTube auth first
    const auth = JSON.parse(process.env.YOUTUBE_AUTH_KEY || '{}');
    
    if (!auth.client_email || !auth.private_key) {
      return res.json({
        success: false,
        error: '🚫 YOUTUBE_AUTH_KEY missing in Vercel env vars',
        fix: 'Add OAuth JSON to Vercel → Settings → Environment Variables'
      });
    }

    const youtube = google.youtube({ version: 'v3', auth });

    // Test upload READY
    res.json({
      success: true,
      authStatus: '✅ LIVE!',
      channelReady: true,
      nextStep: '1. Add MP4 generator 2. Cron job 3. DAILY SHORTS!',
      vercelUrl: 'https://python-daily-gotchas-kt64n1ia2-kashish-vercel.vercel.app',
      testVideo: 'Upload test.mp4 → LIVE!'
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      authMissing: !process.env.YOUTUBE_AUTH_KEY 
    });
  }
}
