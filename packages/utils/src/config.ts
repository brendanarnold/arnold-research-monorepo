
import { config } from 'dotenv'
config()

export default {
  // Certs
  MASTER_RSA_PUBLIC_KEY: process.env.MASTER_RSA_PUBLIC_KEY,
  MASTER_RSA_PRIVATE_KEY: process.env.MASTER_RSA_PUBLIC_KEY,
  MASTER_AES_KEY: process.env.MASTER_AES_KEY,

  // // Postgres
  // POSTGRES_CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING

}
