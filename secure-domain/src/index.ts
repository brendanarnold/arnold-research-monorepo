
import * as express from 'express'
import { AddressInfo } from 'net'
import infoRouter from './common/routes/info'
import { Monitor } from './monitor'


const monitor = new Monitor()

const app = express()

app.use('/info', infoRouter)

const server = app.listen(8080, () => {
  const { address }  = server.address() as AddressInfo
  const { port } = server.address() as AddressInfo
  monitor.trace({ message: `Example app listening at http://${address}:${port}` })
})
