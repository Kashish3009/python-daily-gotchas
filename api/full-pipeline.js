export default async function handler(req, res) {
  const gotchas = [
    {
      hook: "Why does function return nothing?",
      code: "def greet():\n    print('Hello')\n\ngreet()  # Prints but returns None",
      explanation: "Functions without explicit return statement return None by default",
      cta: "Subscribe for daily Python gotchas! 👇"
    },
    {
      hook: "Why shared list in functions?",
      code: "def func(x=[]):\n    x.append(1)\n    return x\nfunc()  # [1]\nfunc()  # [1,1]",
      explanation: "Mutable default args created ONCE at function definition time. Use None instead!",
      cta: "Fix: def func(x=None): if x is None: x = []"
    }
  ];
  
  const script = gotchas[Math.floor(Math.random() * gotchas.length)];
  const timestamp = new Date().toISOString().split('T')[0];
  const videoId = `gotcha-${timestamp}-${Math.random().toString(36).slice(2, 8)}`;
  
  const youtubeMetadata = {
    title: script.hook,
    description: `${script.explanation}\n\n💡 Quick fix: ${script.cta}\n\n#Python #Coding #Gotchas #Shorts`,
    tags: ['python', 'programming', 'gotchas', 'coding', 'python3', 'shorts']
  };
  
  res.status(200).json({
    success: true,
    message: '✅ FULL PIPELINE LIVE!',
    script: script,
    videoId: videoId,
    youtube: youtubeMetadata,
    timestamp: new Date().toISOString()
  });
}
