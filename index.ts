const express = require('express')
const app = express()

app.post('/', (req, res) => {
    res.send('Hello World')
})


app.get('/', (req, res) => {

})


app.patch('/', (req, res) => {

})

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Server started on localhost:${port}`)
})