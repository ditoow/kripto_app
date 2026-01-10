declare module "jsencrypt" {
  export default class JSEncrypt {
    constructor(options?: any);
    setPublicKey(pubkey: string): void;
    setPrivateKey(privkey: string): void;
    encrypt(str: string): string | false;
    decrypt(str: string): string | false;
    sign(
      str: string,
      digestMethod: (str: string) => string,
      digestName: string,
    ): string | false;
    verify(
      str: string,
      signature: string,
      digestMethod: (str: string) => string,
    ): boolean;
    getKey(): any;
    getPublicKey(): string;
    getPrivateKey(): string;
  }
}
