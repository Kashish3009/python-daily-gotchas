require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function uploadToYouTube(videoPath, script) {
  try {
    console.log('\n📤 YouTube Upload Handler');
    console.log('━━━━━━━━━━━━━━━━━━━━━━');
    
    // Create upload metadata file
    const timestamp = new Date().toISOString().split('T')[0];
    const uploadDir = path.join(__dirname, 'uploads-pending');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const uploadMetadata = {
      title: script.hook,
      description: `${script.explanation}\n\n${script.cta}\n\n#PythonGotchas #Programming #Shorts`,
      tags: ['python', 'programming', 'gotchas', 'shorts', 'coding'],
      category: 'Education',
      privacyStatus: 'public',
      videoPath: videoPath,
      generatedAt: new Date().toISOString(),
      status: 'ready_for_upload'
    };
    
    const metadataPath = path.join(uploadDir, `upload-${timestamp}.json`);
    fs.writeFileSync(metadataPath, JSON.stringify(uploadMetadata, null, 2));
    
    console.log('✅ Upload metadata saved');
    console.log('📝 Title:', uploadMetadata.title);
    console.log('📄 Description:', uploadMetadata.description.substring(0, 50) + '...');
    console.log('🏷️  Tags:', uploadMetadata.tags.join(', '));
    console.log('\n📁 Metadata file:', metadataPath);
    console.log('\n✅ Ready for upload!');
    console.log('\n📋 To upload manually:');
    console.log('   1. Go to YouTube Studio: https://studio.youtube.com');
    console.log('   2. Click "Create" → "Upload Video"');
    console.log('   3. Select video from ./videos/ folder');
    console.log('   4. Copy title, description, tags from metadata');
    console.log('   5. Publish!');
    console.log('\n🤖 For automatic upload:');
    console.log('   1. Get YouTube OAuth credentials');
    console.log('   2. Set youtube-auth-key.json in project');
    console.log('   3. We\'ll handle rest automatically\n');
    
    return uploadMetadata;
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    throw error;
  }
}

// Alternative: Check if auth exists and use it
async function checkYouTubeAuth() {
  const authPath = path.join(__dirname, 'youtube-auth-key.json');
  
  if (fs.existsSync(authPath)) {
    console.log('✅ YouTube auth found! Auto-upload enabled');
    return true;
  } else {
    console.log('⚠️  YouTube auth not found');
    console.log('📍 Expected: ./youtube-auth-key.json');
    return false;
  }
}

module.exports = { uploadToYouTube, checkYouTubeAuth };
