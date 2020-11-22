
import * as express from 'express';
import * as pkg from '../../../package.json';

const router = express.Router()

router.get('/version', (req, res) => {
  const version = pkg.version
  res.json({ version })
})

router.get('/status-check', (req, res) => {
  res.sendStatus(204)
})

export default router
