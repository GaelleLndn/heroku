const express = require('express')
const app = express()

app.use ('/', express.static(__dirname + '/herokulabapp/dist'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/herokulabapp/dist/index.html')
})



const port = process.env.PORT || 3000 

app.listen(port, () => console.log('Example app listening on port 3000!'))