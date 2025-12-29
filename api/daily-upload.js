const { execSync } = require('child_process');

export default function handler(req, res) {
  try {
    console.log('🚀 Cron job triggered at:', new Date().toISOString());
    
    // Run the full pipeline
    const output = execSync('npm run upload', { encoding: 'utf-8' });
    
    console.log(output);
    
    res.status(200).json({ 
      success: true, 
      message: 'Daily upload completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Cron job failed:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
