// import * as crypto from 'crypto'

// export const encryptAes = (value: string, masterAesKey: string) => {
//   const iv = crypto.randomBytes(16)
//   const encryptionMethod = 'aes-256-ctr'
//   const cipher = crypto.createCipheriv(encryptionMethod, masterAesKey, iv)
//   // cipher.update(value, 'utf8', 'binary')
//   const encryptedValue = cipher.final('binary')

//   return {
//     iv,
//     encryptedValue,
//     encryptionMethod
//   }
// }

// export const decryptAes = (encryptedValue: Uint8Array, iv: Uint8Array, encryptionMethod: string, masterAesKey: string) => {
//   const decipher = crypto.createDecipheriv(encryptionMethod, masterAesKey, iv)
//   // decipher.update(encryptedValue, 'binary', 'utf8')
//   const value = decipher.final('utf8')

//   return { value }
// }
