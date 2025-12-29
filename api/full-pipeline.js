export default async function handler(req, res) {
  // TEST ENV VAR DIRECTLY
  const authKey = process.env.YOUTUBE_AUTH_KEY ? '✅ FOUND!' : '❌ MISSING';
  const authLength = process.env.YOUTUBE_AUTH_KEY ? process.env.YOUTUBE_AUTH_KEY.length : 0;
  
  res.json({
    success: true,
    envVarStatus: authKey,
    keyLength: authLength + ' chars',
    vercelUrl: 'https://python-daily-gotchas-4mwflopgf-kashish-vercel.vercel.app',
    fix: authKey === '✅ FOUND!' ? 'AUTH READY → ADD UPLOAD!' : 'Check Vercel env vars',
    environments: 'Did you select Production + Preview?'
  });
}
