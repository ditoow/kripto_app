import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";

/**
 * Modul Tanda Tangan Digital RSA
 * Menggunakan MD5 untuk hashing dan RSA untuk penandatanganan
 */

// Fungsi helper untuk mengkonversi CryptoJS hasher ke output string
const sha256Hasher = (str: string): string => {
  return CryptoJS.SHA256(str).toString();
};

export class RSAService {
  private rsa: JSEncrypt;

  constructor() {
    this.rsa = new JSEncrypt({ default_key_size: "1024" });
  }

  // Buat keypair baru (untuk demo, biasanya hanya dilakukan sekali)
  public generateKeys(): { publicKey: string; privateKey: string } {
    this.rsa.getKey();
    return {
      publicKey: this.rsa.getPublicKey(),
      privateKey: this.rsa.getPrivateKey(),
    };
  }

  // 1. Hash Pesan (MD5)
  public hashMessage(message: string): string {
    return CryptoJS.MD5(message).toString();
  }

  // 2. Tanda Tangani Hash (dengan Private Key)
  public sign(
    message: string,
    privateKey: string,
  ): { hash: string; signature: string } {
    this.rsa.setPrivateKey(privateKey);
    const hash = this.hashMessage(message);

    // Tanda tangani hash menggunakan RSA dengan SHA256
    const signature = this.rsa.sign(hash, sha256Hasher, "sha256");

    return {
      hash,
      signature: signature || "SIGN_ERROR",
    };
  }

  // 3. Verifikasi Tanda Tangan (dengan Public Key)
  public verify(
    message: string,
    signature: string,
    publicKey: string,
  ): boolean {
    // Buat instance baru untuk menghindari state lama
    const verifier = new JSEncrypt();
    verifier.setPublicKey(publicKey);
    const hash = this.hashMessage(message);

    // Verifikasi RSA: bandingkan tanda tangan yang didekripsi dengan hash yang dihitung ulang
    try {
      return verifier.verify(hash, signature, sha256Hasher);
    } catch (e) {
      console.error("[RSA] Verify error:", e);
      return false;
    }
  }
}
