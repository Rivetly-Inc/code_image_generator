const express = require('express')
const router = express.Router()
const path = require('path')
const bwipjs = require('bwip-js')

router.get('/ui', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'))
})

router.get('/', function (req, res) {
    let type = req.query.type
    let data = req.query.data
    let textcolor = req.query.textcolor
    let scale = req.query.scale
    let includeText = req.query.includeText === 'false' ? false : true
    let barcolor = req.query.barcolor
    let backgroundcolor = req.query.backgroundcolor

    let params = {
        bcid: type,
        text: data,
        includetext: includeText
    }

    if (textcolor) params.textcolor = textcolor
    if (barcolor) params.barcolor = barcolor
    if (backgroundcolor) params.backgroundcolor = backgroundcolor
    if (scale) params.scale = scale

    console.log(params)

    bwipjs.toBuffer(params)
        .then(png => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': png.length
            })
            res.end(Buffer.from(png, 'binary'))
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router