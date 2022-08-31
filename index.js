// Setup
// https://docs.deta.sh/docs/common_issues/#nodejs-micros-cannot-serve-binary-files
// echo 'BINARY_CONTENT_TYPES=image/*,audio/*,video/*,font/*,application/*' >> .env
// echo 'KEY=xxxxxxxxxxx' >> .env
// deta update -e .env


const fetch = require('node-fetch')
// install deta with `npm install deta` 
const { Deta } = require('deta');
const deta = Deta(process.env.KEY);
const db = deta.Base('simpleDB');
// install express with `npm install express` 
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.get('/:project_id/:drive_name/:name([^/]*)', async (req, res) => {
    const url = `https://drive.deta.sh/v1/${req.params.project_id}/${req.params.drive_name}/files/download?name=${req.params.name}`
    let key = req.query.key
    if (key) {
        await db.put({ key: req.params.project_id, value: key })
    } else {
        const r = await db.get(req.params.project_id)
        if (!r) return res.status(400).send('?key=PROJECT_KEY required')
        key = r.value
    }
    fetch(url, { headers: { 'X-Api-Key': key } }).then(actual => {
        actual.headers.forEach((v, n) => res.setHeader(n, v));
        actual.body.pipe(res);
    })
})

app.get('/', async (req, res) => {
    if (req.query.project_id && req.query.key) {
        await db.put({ key: req.query.project_id, value: req.query.key })
        return res.send('Hello World')
    }
    res.redirect('https://github.com/GitHub30/deta-drive-proxy')
})

// export 'app'
module.exports = app
