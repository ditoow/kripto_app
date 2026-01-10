import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";

/**
 * RSA Digital Signature Module
 * Uses MD5 for hashing and RSA for signing
 */

// Helper function to convert CryptoJS hasher to string output
const sha256Hasher = (str: string): string => {
  return CryptoJS.SHA256(str).toString();
};

export class RSAService {
  private rsa: JSEncrypt;

  constructor() {
    this.rsa = new JSEncrypt({ default_key_size: "1024" });
  }

  // Generate new keypair (for demo purposes, usually done once)
  public generateKeys(): { publicKey: string; privateKey: string } {
    this.rsa.getKey();
    return {
      publicKey: this.rsa.getPublicKey(),
      privateKey: this.rsa.getPrivateKey(),
    };
  }

  // 1. Hash Message (MD5)
  public hashMessage(message: string): string {
    return CryptoJS.MD5(message).toString();
  }

  // 2. Sign Hash (with Private Key)
  public sign(
    message: string,
    privateKey: string,
  ): { hash: string; signature: string } {
    this.rsa.setPrivateKey(privateKey);
    const hash = this.hashMessage(message);

    // RSA sign the hash using SHA256
    const signature = this.rsa.sign(hash, sha256Hasher, "sha256");

    return {
      hash,
      signature: signature || "SIGN_ERROR",
    };
  }

  // 3. Verify Signature (with Public Key)
  public verify(
    message: string,
    signature: string,
    publicKey: string,
  ): boolean {
    // Create new instance to avoid stale state
    const verifier = new JSEncrypt();
    verifier.setPublicKey(publicKey);
    const hash = this.hashMessage(message);

    // RSA verify: compare decrypted signature with recalculated hash
    try {
      return verifier.verify(hash, signature, sha256Hasher);
    } catch (e) {
      console.error("[RSA] Verify error:", e);
      return false;
    }
  }
}
