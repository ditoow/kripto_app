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
   * Full Secure Send Flow:
   * 1. Integrity: Hash (MD5)
   * 2. Auth: Sign (RSA Private Key)
   * 3. Confidentiality: Encrypt (Playfair)
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

    // Step 1: Original Message
    logs.push({
      stage: "1. PLAINTEXT",
      output: payload,
      details: `Input message (${payload.length} characters)`,
    });

    // Step 2: Playfair Key Info
    logs.push({
      stage: "2. PLAYFAIR KEY",
      output: this.playfairKey.toUpperCase(),
      details: "Room encryption key for Playfair Cipher",
    });

    // Step 3: Hashing (MD5)
    const hash = this.rsa.hashMessage(payload);
    logs.push({
      stage: "3. MD5 HASH",
      output: hash,
      details: "128-bit message digest for integrity verification",
    });

    // Step 4: RSA Private Key Preview
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

    // Step 5: Playfair Encryption Process (BEFORE signing!)
    const cipher = this.playfair.encrypt(payload);
    logs.push({
      stage: "5. PLAYFAIR ENCRYPT",
      output: cipher,
      details: `Digraph substitution cipher (${cipher.length} chars)`,
      isEncrypted: true,
    });

    // Step 6: Digital Signature (RSA) - Sign the CIPHERTEXT for consistency
    const { signature } = this.rsa.sign(cipher, privateKey);
    logs.push({
      stage: "6. DIGITAL SIGNATURE",
      output: signature ? signature.substring(0, 64) + "..." : "Error signing",
      details: "RSA signature of ciphertext (not plaintext)",
      isEncrypted: true,
    });

    // Step 7: Final Packet Summary
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
   * Simple decrypt without verification (for own messages)
   */
  public decryptOnly(cipher: string): string {
    return this.playfair.decrypt(cipher);
  }

  /**
   * Full Secure Receive Flow:
   * 1. Confidentiality: Decrypt (Playfair)
   * 2. IntegrityCheck: Hash Decrypted Payload
   * 3. AuthCheck: Verify Signature (RSA Public Key)
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

    // Step 1: Received Ciphertext
    logs.push({
      stage: "1. RECEIVED CIPHER",
      output: cipher,
      details: `Encrypted message (${cipher.length} chars)`,
      isEncrypted: true,
    });

    // Step 2: Playfair Key Info
    logs.push({
      stage: "2. PLAYFAIR KEY",
      output: this.playfairKey.toUpperCase(),
      details: "Room decryption key",
    });

    // Step 3: Decryption (Playfair)
    const plaintext = this.playfair.decrypt(cipher);
    logs.push({
      stage: "3. PLAYFAIR DECRYPT",
      output: plaintext,
      details: "Reversed digraph substitution",
    });

    // Step 4: Recalculate Hash
    const recalculatedHash = this.rsa.hashMessage(plaintext);
    logs.push({
      stage: "4. RECALC MD5 HASH",
      output: recalculatedHash,
      details: "Hash of decrypted message for comparison",
    });

    // Step 5: Signature Preview
    logs.push({
      stage: "5. RECEIVED SIGNATURE",
      output: signature ? signature.substring(0, 64) + "..." : "No signature",
      details: "Sender's RSA-encrypted hash",
      isEncrypted: true,
    });

    // Step 6: SENDER PUBLIC KEY Preview
    const publicKeyClean = publicKey
      .replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----/g, "")
      .replace(/\n/g, "")
      .trim();
    logs.push({
      stage: "6. SENDER PUBLIC KEY",
      output: `PUBLIC ${publicKeyClean.substring(0, 40)}...`,
      details: "Used to verify sender identity",
    });

    // Step 7: Verification Result - Verify the CIPHERTEXT (what was signed)
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
