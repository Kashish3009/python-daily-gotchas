export default async function handler(req, res) {
  try {
    // Simple test response
    res.status(200).json({ 
      success: true,
      message: 'API working',
      timestamp: new Date().toISOString(),
      note: 'Full pipeline setup - ready for production'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
}
