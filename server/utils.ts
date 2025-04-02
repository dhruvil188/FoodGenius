import { randomBytes, pbkdf2Sync } from 'crypto';

// Utility functions for authentication
export function hashPassword(password: string, salt?: string): { hash: string, salt: string } {
  const generatedSalt = salt || randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, generatedSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: generatedSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

export function generateToken(): string {
  return randomBytes(32).toString('hex');
}