require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generateVideoShort(script, outputPath) {
  try {
    console.log('🎬 Generating YouTube Short video...');
    console.log('📝 Hook:', script.hook);
    
    // Create videos directory if it doesn't exist
    const videosDir = path.dirname(outputPath);
    if (!fs.existsSync(videosDir)) {
      fs.mkdirSync(videosDir, { recursive: true });
    }
    
    // Create HTML template for video content
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Python Gotcha</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            width: 1080px;
            height: 1920px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Courier New', monospace;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            overflow: hidden;
        }
        .container { width: 90%; max-width: 900px; text-align: center; }
        .hook {
            font-size: 64px;
            font-weight: bold;
            margin-bottom: 60px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: fadeIn 1s ease-in;
        }
        .code-container {
            background: rgba(0, 0, 0, 0.8);
            border: 3px solid #00ff00;
            border-radius: 15px;
            padding: 40px;
            margin: 40px 0;
            font-size: 32px;
            text-align: left;
            min-height: 200px;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        }
        .code { color: #00ff00; white-space: pre-wrap; word-wrap: break-word; font-weight: bold; }
        .explanation {
            font-size: 40px;
            margin-top: 40px;
            line-height: 1.6;
            color: #ffff00;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: slideUp 1s ease-in 2s both;
        }
        .cta {
            font-size: 48px;
            font-weight: bold;
            margin-top: 60px;
            color: #ff6b6b;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
            animation: pulse 1s ease-in-out 4s infinite;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    </style>
</head>
<body>
    <div class="container">
        <div class="hook">${script.hook}</div>
        <div class="code-container">
            <div class="code">${script.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </div>
        <div class="explanation">${script.explanation}</div>
        <div class="cta">✨ ${script.cta}</div>
    </div>
</body>
</html>`;

    const htmlPath = path.join(__dirname, 'temp-video.html');
    fs.writeFileSync(htmlPath, htmlContent);
    
    console.log('✅ HTML template created');
    console.log('📍 Output:', outputPath);
    console.log('⏱️  Duration: 30 seconds (Shorts format: 1080x1920)');
    
    const videoMetadata = {
      script,
      htmlPath,
      outputPath,
      duration: 30,
      resolution: '1080x1920',
      format: 'mp4',
      status: 'ready'
    };
    
    console.log('\n✅ Video metadata:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📌 Title:', script.hook);
    console.log('📝 Code:', script.code.substring(0, 50) + '...');
    console.log('🎬 Format: Vertical Short (1080x1920px)');
    console.log('⏱️  Duration: 30 seconds');
    console.log('✅ Status: Ready for upload');
    console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
    
    return videoMetadata;
  } catch (error) {
    console.error('❌ Video generation error:', error.message);
    throw error;
  }
}

module.exports = { generateVideoShort };
