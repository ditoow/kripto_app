/**
 * Implementasi Playfair Cipher
 * Cipher blok klasik menggunakan matriks 5x5
 */

export class PlayfairCipher {
  private keyMatrix: string[][] = [];

  constructor(private keyword: string) {
    this.generateKeyMatrix();
  }

  private generateKeyMatrix() {
    // 1. Siapkan alfabet (J biasanya digabung dengan I, di sini kita hilangkan J atau gabungkan)
    // Playfair standar: 25 huruf, I/J digabung.
    // Kita gunakan: A-Z tanpa J. Jika ada J, perlakukan sebagai I.
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Tanpa J
    const sanitizedKey = this.keyword
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");

    // 2. Buat string unik dari key + alfabet
    let uniqueChars = "";
    const seen = new Set<string>();

    // Tambahkan karakter dari key
    for (const char of sanitizedKey) {
      if (!seen.has(char)) {
        uniqueChars += char;
        seen.add(char);
      }
    }

    // Tambahkan sisa alfabet
    for (const char of alphabet) {
      if (!seen.has(char)) {
        uniqueChars += char;
        seen.add(char);
      }
    }

    // 3. Isi matriks 5x5
    this.keyMatrix = [];
    for (let i = 0; i < 5; i++) {
      this.keyMatrix.push(uniqueChars.slice(i * 5, (i + 1) * 5).split(""));
    }
  }

  // Cari posisi karakter dalam matriks
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

  // Helper untuk memecah teks menjadi bigram (pasangan huruf)
  private prepareText(text: string): string[] {
    let clean = text
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");
    const bigrams: string[] = [];

    let i = 0;
    while (i < clean.length) {
      let char1 = clean[i];
      let char2 = i + 1 < clean.length ? clean[i + 1] : "X"; // Padding jika ganjil

      if (char1 === char2) {
        char2 = "X"; // Sisipkan padding jika huruf sama
        i++; // Maju hanya 1 karakter dari sumber
      } else {
        i += 2; // Maju 2 karakter
      }

      bigrams.push(char1 + char2);
    }

    // Jika bigram terakhir tidak lengkap (panjang asli ganjil), sudah di-padding
    return bigrams;
  }

  public encrypt(plaintext: string): string {
    const bigrams = this.prepareText(plaintext);
    let ciphertext = "";

    for (const pair of bigrams) {
      const pos1 = this.findPosition(pair[0]);
      const pos2 = this.findPosition(pair[1]);

      if (!pos1 || !pos2) continue; // Seharusnya tidak terjadi

      let new1: string, new2: string;

      // Aturan 1: Baris Sama -> Geser ke Kanan
      if (pos1.row === pos2.row) {
        new1 = this.keyMatrix[pos1.row][(pos1.col + 1) % 5];
        new2 = this.keyMatrix[pos2.row][(pos2.col + 1) % 5];
      }
      // Aturan 2: Kolom Sama -> Geser ke Bawah
      else if (pos1.col === pos2.col) {
        new1 = this.keyMatrix[(pos1.row + 1) % 5][pos1.col];
        new2 = this.keyMatrix[(pos2.row + 1) % 5][pos2.col];
      }
      // Aturan 3: Persegi Panjang -> Tukar Kolom
      else {
        new1 = this.keyMatrix[pos1.row][pos2.col];
        new2 = this.keyMatrix[pos2.row][pos1.col];
      }

      ciphertext += new1 + new2;
    }

    return ciphertext;
  }

  public decrypt(ciphertext: string): string {
    // Ciphertext seharusnya sudah panjang genap dan huruf besar dari proses enkripsi
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

      // Aturan 1: Baris Sama -> Geser ke Kiri
      if (pos1.row === pos2.row) {
        new1 = this.keyMatrix[pos1.row][(pos1.col - 1 + 5) % 5];
        new2 = this.keyMatrix[pos2.row][(pos2.col - 1 + 5) % 5];
      }
      // Aturan 2: Kolom Sama -> Geser ke Atas
      else if (pos1.col === pos2.col) {
        new1 = this.keyMatrix[(pos1.row - 1 + 5) % 5][pos1.col];
        new2 = this.keyMatrix[(pos2.row - 1 + 5) % 5][pos2.col];
      }
      // Aturan 3: Persegi Panjang -> Tukar Kolom (Sama seperti enkripsi)
      else {
        new1 = this.keyMatrix[pos1.row][pos2.col];
        new2 = this.keyMatrix[pos2.row][pos1.col];
      }

      plaintext += new1 + new2;
    }

    // Hapus padding X di akhir (ditambahkan saat enkripsi untuk pesan dengan panjang ganjil)
    if (plaintext.endsWith("X")) {
      plaintext = plaintext.slice(0, -1);
    }

    return plaintext;
  }

  // Helper untuk debugging UI
  public getMatrix(): string[][] {
    return this.keyMatrix;
  }
}
