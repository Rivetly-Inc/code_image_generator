const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const codegen = require('./codegen')

const app = express()

// middleware
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: true
}))
app.use(morgan('tiny'))
app.disable('x-powered-by')

// routes
app.use('/', codegen)
// app.use('/codegen/v1/', codegen)
// app.use('/', function(req, res) {
//     res.json({status: 'ok'})

app.use(function (req, res, next) {
	    res.setHeader('Access-Control-Allow-Origin', '*')
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	    res.setHeader('Access-Control-Allow-Credentials', true)

	    if (req.method === "OPTIONS") {
		            return res.status(200).end()
		        }

	    next()
})

// error handler
app.use((err, req, res, next) => {
    if (err) {
        console.error(err.message)
        console.error(err.stack)
        return res.status(err.output.statusCode || 500).json(err.output.payload)
    }
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
