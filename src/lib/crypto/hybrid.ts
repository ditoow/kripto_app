import { PlayfairCipher } from "./playfair";
import { RSAService } from "./rsa";

export interface CryptoLog {
  stage: string;
  output: string;
  details?: string;
  isEncrypted?: boolean;
}

export class HybridCryptoSystem {
  private playfair: PlayfairCipher;
  private rsa: RSAService;
  private playfairKey: string;

  constructor(playfairKey: string) {
    this.playfairKey = playfairKey;
    this.playfair = new PlayfairCipher(playfairKey);
    this.rsa = new RSAService();
  }

  /**
   * Alur Lengkap Pengiriman Aman:
   * 1. Integritas: Hash (MD5)
   * 2. Autentikasi: Tanda tangan (RSA Private Key)
   * 3. Kerahasiaan: Enkripsi (Playfair)
   */
  public secureSend(
    payload: string,
    privateKey: string,
  ): {
    finalCipher: string;
    signature: string;
    hash: string;
    logs: CryptoLog[];
  } {
    const logs: CryptoLog[] = [];

    // Langkah 1: Pesan Asli
    logs.push({
      stage: "1. PLAINTEXT",
      output: payload,
      details: `Input message (${payload.length} characters)`,
    });

    // Langkah 2: Info Kunci Playfair
    logs.push({
      stage: "2. PLAYFAIR KEY",
      output: this.playfairKey.toUpperCase(),
      details: "Room encryption key for Playfair Cipher",
    });

    // Langkah 3: Hashing (MD5)
    const hash = this.rsa.hashMessage(payload);
    logs.push({
      stage: "3. MD5 HASH",
      output: hash,
      details: "128-bit message digest for integrity verification",
    });

    // Langkah 4: Preview RSA Private Key
    const privateKeyClean = privateKey
      .replace(
        /-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----/g,
        "",
      )
      .replace(/\n/g, "")
      .trim();
    logs.push({
      stage: "4. RSA PRIVATE KEY",
      output: `PRIVATE ${privateKeyClean.substring(0, 40)}...`,
      details: "Used for digital signature (kept secret)",
      isEncrypted: true,
    });

    // Langkah 5: Proses Enkripsi Playfair (SEBELUM penandatanganan!)
    const cipher = this.playfair.encrypt(payload);
    logs.push({
      stage: "5. PLAYFAIR ENCRYPT",
      output: cipher,
      details: `Digraph substitution cipher (${cipher.length} chars)`,
      isEncrypted: true,
    });

    // Langkah 6: Tanda Tangan Digital (RSA) - Tanda tangani CIPHERTEXT untuk konsistensi
    const { signature } = this.rsa.sign(cipher, privateKey);
    logs.push({
      stage: "6. DIGITAL SIGNATURE",
      output: signature ? signature.substring(0, 64) + "..." : "Error signing",
      details: "RSA signature of ciphertext (not plaintext)",
      isEncrypted: true,
    });

    // Langkah 7: Ringkasan Paket Akhir
    logs.push({
      stage: "7. SENT PACKET",
      output: `Cipher: ${cipher.substring(0, 20)}... | Sig: ${(signature || "").substring(0, 20)}...`,
      details: "Network payload: { ciphertext, signature, publicKey }",
      isEncrypted: true,
    });

    return {
      finalCipher: cipher,
      signature: signature as string,
      hash,
      logs,
    };
  }

  /**
   * Dekripsi sederhana tanpa verifikasi (untuk pesan sendiri)
   */
  public decryptOnly(cipher: string): string {
    return this.playfair.decrypt(cipher);
  }

  /**
   * Alur Lengkap Penerimaan Aman:
   * 1. Kerahasiaan: Dekripsi (Playfair)
   * 2. Cek Integritas: Hash Payload yang Didekripsi
   * 3. Cek Autentikasi: Verifikasi Tanda Tangan (RSA Public Key)
   */
  public secureReceive(
    cipher: string,
    signature: string,
    publicKey: string,
  ): {
    plaintext: string;
    isVerified: boolean;
    logs: CryptoLog[];
  } {
    const logs: CryptoLog[] = [];

    // Langkah 1: Ciphertext yang Diterima
    logs.push({
      stage: "1. RECEIVED CIPHER",
      output: cipher,
      details: `Encrypted message (${cipher.length} chars)`,
      isEncrypted: true,
    });

    // Langkah 2: Info Kunci Playfair
    logs.push({
      stage: "2. PLAYFAIR KEY",
      output: this.playfairKey.toUpperCase(),
      details: "Room decryption key",
    });

    // Langkah 3: Dekripsi (Playfair)
    const plaintext = this.playfair.decrypt(cipher);
    logs.push({
      stage: "3. PLAYFAIR DECRYPT",
      output: plaintext,
      details: "Reversed digraph substitution",
    });

    // Langkah 4: Hitung Ulang Hash
    const recalculatedHash = this.rsa.hashMessage(plaintext);
    logs.push({
      stage: "4. RECALC MD5 HASH",
      output: recalculatedHash,
      details: "Hash of decrypted message for comparison",
    });

    // Langkah 5: Preview Tanda Tangan
    logs.push({
      stage: "5. RECEIVED SIGNATURE",
      output: signature ? signature.substring(0, 64) + "..." : "No signature",
      details: "Sender's RSA-encrypted hash",
      isEncrypted: true,
    });

    // Langkah 6: Preview PUBLIC KEY PENGIRIM
    const publicKeyClean = publicKey
      .replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----/g, "")
      .replace(/\n/g, "")
      .trim();
    logs.push({
      stage: "6. SENDER PUBLIC KEY",
      output: `PUBLIC ${publicKeyClean.substring(0, 40)}...`,
      details: "Used to verify sender identity",
    });

    // Langkah 7: Hasil Verifikasi - Verifikasi CIPHERTEXT (yang ditandatangani)
    const isVerified = this.rsa.verify(cipher, signature, publicKey);
    logs.push({
      stage: "7. VERIFICATION RESULT",
      output: isVerified ? "✓ VALID" : "✗ INVALID",
      details: isVerified
        ? "Message authentic & unmodified"
        : "WARNING: Signature mismatch - possible tampering!",
    });

    return {
      plaintext,
      isVerified,
      logs,
    };
  }
}
