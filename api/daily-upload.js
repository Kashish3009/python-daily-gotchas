export default function handler(req, res) {
  const gotchas = [
    "Why does function return nothing?",
    "Why does this function create a shared list?",
    "Why does 0.1 + 0.2 != 0.3?",
    "Why can't I modify tuple elements?"
  ];
  
  const randomGotcha = gotchas[Math.floor(Math.random() * gotchas.length)];
  
  res.status(200).json({ 
    success: true,
    message: 'Daily Python Gotcha Generator',
    gotcha: randomGotcha,
    readyFor: 'YouTube automation',
    timestamp: new Date().toISOString()
  });
}
