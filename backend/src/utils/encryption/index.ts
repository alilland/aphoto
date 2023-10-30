import crypto from 'crypto'
import base64url from 'base64url'

export function encrypt (text: string, secret: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decrypt (text: string, secret: string): string {
  const textParts: string[] = text.split(':')
  const ivHex = textParts.shift()
  if (ivHex === undefined) {
    throw new Error('Input text is not in the expected format.')
  }
  const iv = Buffer.from(ivHex, 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export function encryptAndEncodeUrlSafe (text: string, secret: string): string {
  const encrypted = encrypt(text, secret)
  return base64url(encrypted)
}

export function decodeUrlSafeAndDecrypt (text: string, secret: string): string {
  const decoded = base64url.decode(text)
  return decrypt(decoded, secret)
}

console.log(Buffer.from(process.env.KEY_SECRET ?? '').length)
