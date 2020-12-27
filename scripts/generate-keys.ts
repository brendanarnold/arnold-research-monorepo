/**
 * Generates an RSA key pair for use with the app
 */


import * as crypto from 'crypto'

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
})

const hashKey = crypto.createHash('sha256')
  .update(crypto.randomBytes(16))
  .digest('base64');

console.log('')
console.log('Copy the following into .env or the environment for the install')
console.log('')
console.log(publicKey.replace(/\n/g, '\\n'))
console.log('')
console.log(privateKey.replace(/\n/g, '\\n'))
console.log('')
console.log(hashKey)
