
import * as express from 'express'
import * as gitHash from '../../../../../git-hash.json'
import * as pkg from '../../../../../package.json'


const router = express.Router()

router.get('/version', (req, res) => {
  const version = pkg.version
  res.json({
    version,
    gitHash
  })
})

router.get('/status-check', (req, res) => {
  res.sendStatus(204)
})

export default router
