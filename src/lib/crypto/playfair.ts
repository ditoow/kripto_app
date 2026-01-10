/**
 * Playfair Cipher Implementation
 * Classic block cipher using 5x5 matrix
 */

export class PlayfairCipher {
  private keyMatrix: string[][] = [];

  constructor(private keyword: string) {
    this.generateKeyMatrix();
  }

  private generateKeyMatrix() {
    // 1. Prepare alphabet (J merged with I usually, but here we omit J or merge it)
    // Standard Playfair: 25 letters, I/J merged.
    // We'll use: A-Z minus J. If J appears, treat as I.
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // No J
    const sanitizedKey = this.keyword
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");

    // 2. Create unique string from key + alphabet
    let uniqueChars = "";
    const seen = new Set<string>();

    // Add key chars
    for (const char of sanitizedKey) {
      if (!seen.has(char)) {
        uniqueChars += char;
        seen.add(char);
      }
    }

    // Add remaining alphabet
    for (const char of alphabet) {
      if (!seen.has(char)) {
        uniqueChars += char;
        seen.add(char);
      }
    }

    // 3. Fill 5x5 matrix
    this.keyMatrix = [];
    for (let i = 0; i < 5; i++) {
      this.keyMatrix.push(uniqueChars.slice(i * 5, (i + 1) * 5).split(""));
    }
  }

  // Find position of char in matrix
  private findPosition(char: string): { row: number; col: number } | null {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (this.keyMatrix[r][c] === char) {
          return { row: r, col: c };
        }
      }
    }
    return null;
  }

  // Helper to split text into bigrams
  private prepareText(text: string): string[] {
    let clean = text
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");
    const bigrams: string[] = [];

    let i = 0;
    while (i < clean.length) {
      let char1 = clean[i];
      let char2 = i + 1 < clean.length ? clean[i + 1] : "X"; // Padding if odd

      if (char1 === char2) {
        char2 = "X"; // Insert padding if duplicate
        i++; // Only advance 1 char from source
      } else {
        i += 2; // Advance 2 chars
      }

      bigrams.push(char1 + char2);
    }

    // If last bigram was incomplete (odd length original), padded already
    return bigrams;
  }

  public encrypt(plaintext: string): string {
    const bigrams = this.prepareText(plaintext);
    let ciphertext = "";

    for (const pair of bigrams) {
      const pos1 = this.findPosition(pair[0]);
      const pos2 = this.findPosition(pair[1]);

      if (!pos1 || !pos2) continue; // Should not happen

      let new1: string, new2: string;

      // Rule 1: Same Row -> Shift Right
      if (pos1.row === pos2.row) {
        new1 = this.keyMatrix[pos1.row][(pos1.col + 1) % 5];
        new2 = this.keyMatrix[pos2.row][(pos2.col + 1) % 5];
      }
      // Rule 2: Same Col -> Shift Down
      else if (pos1.col === pos2.col) {
        new1 = this.keyMatrix[(pos1.row + 1) % 5][pos1.col];
        new2 = this.keyMatrix[(pos2.row + 1) % 5][pos2.col];
      }
      // Rule 3: Rectangle -> Swap Cols
      else {
        new1 = this.keyMatrix[pos1.row][pos2.col];
        new2 = this.keyMatrix[pos2.row][pos1.col];
      }

      ciphertext += new1 + new2;
    }

    return ciphertext;
  }

  public decrypt(ciphertext: string): string {
    // Ciphertext should already be even length and uppercase from encrypt
    const bigrams: string[] = [];
    for (let i = 0; i < ciphertext.length; i += 2) {
      bigrams.push(ciphertext.slice(i, i + 2));
    }

    let plaintext = "";

    for (const pair of bigrams) {
      const pos1 = this.findPosition(pair[0]);
      const pos2 = this.findPosition(pair[1]);

      if (!pos1 || !pos2) continue;

      let new1: string, new2: string;

      // Rule 1: Same Row -> Shift Left
      if (pos1.row === pos2.row) {
        new1 = this.keyMatrix[pos1.row][(pos1.col - 1 + 5) % 5];
        new2 = this.keyMatrix[pos2.row][(pos2.col - 1 + 5) % 5];
      }
      // Rule 2: Same Col -> Shift Up
      else if (pos1.col === pos2.col) {
        new1 = this.keyMatrix[(pos1.row - 1 + 5) % 5][pos1.col];
        new2 = this.keyMatrix[(pos2.row - 1 + 5) % 5][pos2.col];
      }
      // Rule 3: Rectangle -> Swap Cols (Same as encrypt)
      else {
        new1 = this.keyMatrix[pos1.row][pos2.col];
        new2 = this.keyMatrix[pos2.row][pos1.col];
      }

      plaintext += new1 + new2;
    }

    // Remove trailing X padding (added during encryption for odd-length messages)
    if (plaintext.endsWith("X")) {
      plaintext = plaintext.slice(0, -1);
    }

    return plaintext;
  }

  // Helper for UI Debugging
  public getMatrix(): string[][] {
    return this.keyMatrix;
  }
}
