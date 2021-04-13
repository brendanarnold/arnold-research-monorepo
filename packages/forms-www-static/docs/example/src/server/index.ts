import * as express from 'express'
import * as path from 'path'
import { FormModule } from '@tngbl/forms'
import { StaticPageRendererPlugin } from '../../../../src/server'
import { form } from '../shared/example-form'

const forms = new FormModule().withPlugin(new StaticPageRendererPlugin())

const app = express()

app.get('/', async (req, res) => {
  const html = forms.plugin['static-page-renderer'].renderHtml(form)
  res.send(html)
})

app.use('/assets', express.static(path.join(__dirname, '../../dist')))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
