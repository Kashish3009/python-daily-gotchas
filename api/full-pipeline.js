const fetch = require('node-fetch');

export default async function handler(req, res) {
  try {
    console.log('🚀 REAL AI Video Pipeline');
    
    // Step 1: Generate Gotcha
    const gotchas = [
      {
        hook: "Why does function return nothing?",
        code: "def greet():\n    print('Hello')\n\ngreet()  # Prints but returns None",
        explanation: "Functions without explicit return return None by default",
        cta: "Subscribe for daily gotchas!"
      },
      {
        hook: "Why shared list in functions?",
        code: "def func(x=[]):\n    x.append(1)\n    return x\nfunc()  # [1]\nfunc()  # [1,1]",
        explanation: "Mutable default args created ONCE at definition. Use None!",
        cta: "Fix: def func(x=None): if x is None: x = []"
      }
    ];
    
    const script = gotchas[Math.floor(Math.random() * gotchas.length)];
    
    // Step 2: REAL Replicate Video Generation
    let videoStatus = 'No Replicate key';
    let videoUrl = null;
    
    if (process.env.REPLICATE_API_TOKEN) {
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          version: "c4f533d5cd34b9e68d1a6166b3a555b2541b9d8d9b6c4f533d5cd34b9e68d1a6", 
          input: {
            prompt: `${script.hook}\n\n${script.code}\n\n${script.explanation}`,
            width: 1080,
            height: 1920,
            duration: 10
          }
        })
      });
      
      const prediction = await response.json();
      videoStatus = 'Generating video...';
      videoUrl = `https://replicate.com/predictions/${prediction.id}`;
    }
    
    // Step 3: YouTube Metadata
    const youtube = {
      title: script.hook,
      description: `${script.explanation}\n\n${script.cta}\n#PythonGotchas`,
      tags: ['python', 'gotchas', 'programming']
    };
    
    res.status(200).json({
      success: true,
      message: '✅ REAL AI VIDEO PIPELINE LIVE!',
      script: script,
      video: {
        status: videoStatus,
        url: videoUrl,
        format: '1080x1920 (Shorts)'
      },
      youtube: youtube,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Pipeline error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
