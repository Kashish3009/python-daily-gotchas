export default function handler(req, res) {
  res.status(200).json({ 
    success: true,
    message: '✅ API IS WORKING!',
    gotcha: 'Why does function return nothing?',
    timestamp: new Date().toISOString()
  });
}
