import * as express from 'express'
import * as fs from 'fs/promises'
import * as path from 'path'
import { makeFormBuilder, core } from '@tngbl/forms'
import { nunjucksRenderer } from '../../../../src/server'

const builder = makeFormBuilder()
  .with(core)
  .with(
    nunjucksRenderer({ templateDirs: [path.join(__dirname, '../templates')] })
  )

const app = express()

app.get('/', async (req, res) => {
  const formJson =
    '' +
    (await fs.readFile(path.join(__dirname, '../shared/example-form.json')))

  const form = builder.fromJson(JSON.parse(formJson))

  const formHtml = form.toHtml()

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<header>
  <h1>Example dynamic form</h1>
</header>
<section id="form-section">
  ${formHtml}
</section>
</body>
</html>`

  res.send(html)
})

app.use('/assets', express.static(path.join(__dirname, '../../dist')))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
