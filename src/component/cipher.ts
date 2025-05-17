const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !@#$%^&*()_+-=[]{}|;:',.<>/?`~\"\\";

function getCharIndex(char: string): number {
  return CHARSET.indexOf(char);
}

export function vigenereEncrypt(plaintext: string, key: string): string {
  let result = "";
  let keyIndex = 0;

  for (const char of plaintext) {
    const charPos = getCharIndex(char);
    if (charPos === -1) {
      result += char;
      continue;
    }

    const keyChar = key[keyIndex % key.length];
    const keyPos = getCharIndex(keyChar);
    if (keyPos === -1) {
      continue;
    }

    const newPos = (charPos + keyPos) % CHARSET.length;
    result += CHARSET[newPos];
    keyIndex++;
  }

  return result;
}

export function vigenereDecrypt(ciphertext: string, key: string): string {
  let result = "";
  let keyIndex = 0;

  for (const char of ciphertext) {
    const charPos = getCharIndex(char);
    if (charPos === -1) {
      result += char;
      continue;
    }

    const keyChar = key[keyIndex % key.length];
    const keyPos = getCharIndex(keyChar);
    if (keyPos === -1) {
      continue;
    }

    const newPos = (charPos - keyPos + CHARSET.length) % CHARSET.length;
    result += CHARSET[newPos];
    keyIndex++;
  }

  return result;
}


// Helper for Columnar Transposition
function createOrder(keyword: string): number[] {
  const pairs = keyword.split("").map((char, i) => [char, i] as [string, number]);
  pairs.sort(([a], [b]) => a.localeCompare(b));
  return pairs.map(([, i]) => i);
}

// Standard Columnar Transposition Cipher
export function columnarEncrypt(plaintext: string, keyword: string): string {
  const cleaned = plaintext.replace(/[^a-zA-Z]/g, "").toUpperCase();
  const cols = keyword.length;
  const rows = Math.ceil(cleaned.length / cols);
  const padded = cleaned.padEnd(cols * rows, "X");

  const grid = Array.from({ length: rows }, (_, i) => padded.slice(i * cols, (i + 1) * cols));
  const order = createOrder(keyword.toUpperCase());

  let result = "";
  for (const colIndex of order) {
    for (let row = 0; row < rows; row++) {
      result += grid[row][colIndex];
    }
  }

  return result;
}

export function columnarDecrypt(ciphertext: string, keyword: string): string {
  const cols = keyword.length;
  const rows = Math.ceil(ciphertext.length / cols);
  const order = createOrder(keyword.toUpperCase());

  const grid: string[][] = Array.from({ length: rows }, () => Array(cols).fill(""));

  let i = 0;
  for (const colIndex of order) {
    for (let row = 0; row < rows; row++) {
      if (i < ciphertext.length) {
        grid[row][colIndex] = ciphertext[i++];
      }
    }
  }

  return grid.map((row) => row.join("")).join("").replace(/X+$/, "");
}