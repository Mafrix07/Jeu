import CryptoJS from 'crypto-js';

const SALT = import.meta.env.VITE_SECRET_SALT || 'default-salt-please-change-in-prod';

export const generateVoterHash = (sessionId: string, voterName: string): string => {
  return CryptoJS.SHA256(sessionId + voterName + SALT).toString();
};
