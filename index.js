require('dotenv').config();
const { generateDailyGotcha } = require('./gotcha-generator');
const { generateVideoShort } = require('./video-generator');
const { uploadToYouTube, checkYouTubeAuth } = require('./youtube-uploader');

async function main() {
  try {
    console.log('\n🚀 PythonGotchasDaily Full Pipeline');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Step 1: Generate Script
    console.log('STEP 1: Script Generation');
    console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
    const script = generateDailyGotcha();
    
    if (!script) throw new Error('Script generation failed');
    
    // Step 2: Generate Video
    console.log('\nSTEP 2: Video Generation');
    console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
    const timestamp = new Date().toISOString().split('T')[0];
    const videoPath = `./videos/python-gotcha-${timestamp}.mp4`;
    const videoMetadata = await generateVideoShort(script, videoPath);
    
    // Step 3: Prepare for Upload
    console.log('\nSTEP 3: YouTube Upload Preparation');
    console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
    const uploadResult = await uploadToYouTube(videoPath, script);
    
    console.log('\n✅ FULL PIPELINE COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Summary:');
    console.log('  ✅ Script:', script.hook);
    console.log('  ✅ Video:', videoPath);
    console.log('  ✅ Upload Ready:', uploadResult.status);
    console.log('  📁 Metadata:', uploadResult.title);
    console.log('\n🎬 Status: Ready for YouTube!\n');
    
  } catch (error) {
    console.error('\n❌ Pipeline error:', error.message);
    process.exit(1);
  }
}

main();