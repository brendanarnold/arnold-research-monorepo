
import * as express from 'express'
import { AddressInfo } from 'net'
import * as pkg from '../package.json'

const app = express()

app.get('/info/version', (req, res) => {
  const version = pkg.version
  res.json({ version })
})

app.get('/info/status-check', (req, res) => {
  res.sendStatus(204)
})

const server = app.listen(8080, () => {
  const { address }  = server.address() as AddressInfo
  const { port } = server.address() as AddressInfo
  console.log("Example app listening at http://%s:%s", address, port)
})
