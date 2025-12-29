require('dotenv').config();

console.log('🔑 Using Local Script Generator (FREE, no API needed)');

const gotchas = [
  { q: "Why does [1, 2] * 3 create [1, 2, 1, 2, 1, 2] but [[]] * 3 creates [[ref], [ref], [ref]]?", hook: "Why does list multiplication create different results?", code: "[1, 2] * 3  # Repeats values\n[[]] * 3  # References same list", explanation: "Immutable vs mutable: * repeats immutable values, but creates references to the SAME mutable object", cta: "Subscribe for more!" },
  { q: "Why is 257 is 257 False but 256 is 256 True?", hook: "Why does integer identity behave weirdly?", code: "a = 256; b = 256\nprint(a is b)  # True\na = 257; b = 257\nprint(a is b)  # False", explanation: "Python caches small integers (-5 to 256). Beyond 256, new objects are created", cta: "Subscribe!" },
  { q: "Why do mutable default arguments break functions?", hook: "Why does this function create a shared list?", code: "def func(x=[]):\n    x.append(1)\n    return x\nfunc()  # [1]\nfunc()  # [1,1]", explanation: "Default args evaluated ONCE at definition, not per call. Use None instead", cta: "Subscribe!" },
  { q: "Why does this print None?", hook: "Why does function return nothing?", code: "def func():\n    pass\nprint(func())  # None", explanation: "Functions without return statement return None by default", cta: "Subscribe!" },
  { q: "== vs is difference?", hook: "Which should you use?", code: "a = [1,2]; b = [1,2]\na == b  # True (value)\na is b  # False (identity)", explanation: "== compares values. is compares memory location (identity)", cta: "Subscribe!" }
];

function generateDailyGotcha() {
  const script = gotchas[Math.floor(Math.random() * gotchas.length)];
  
  console.log('\n🔍 Selected gotcha:', script.q);
  console.log('📡 Generating script...');
  console.log('\n✅ Script generated:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📌 Hook:', script.hook);
  console.log('💻 Code:', script.code);
  console.log('📝 Explanation:', script.explanation);
  console.log('🎯 CTA:', script.cta);
  console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
  
  return script;
}

generateDailyGotcha();
