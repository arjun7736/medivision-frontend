import CryptoJS from "crypto-js";

export const encrypt = (value: string): string => {
  const secretKey = import.meta.env.VITE_CRYPT_SECRET;
  return CryptoJS.AES.encrypt(value, secretKey).toString();
};

export const decrypt = (encryptedValue: string): string => {
  const secretKey = import.meta.env.VITE_CRYPT_SECRET;
  const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
