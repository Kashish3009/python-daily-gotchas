export default function handler(req, res) {
  res.status(200).json({ 
    success: true,
    message: 'Daily upload API ready',
    time: new Date().toISOString()
  });
}
