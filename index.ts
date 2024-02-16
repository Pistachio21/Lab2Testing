import { Pool } from "pg";

const express = require('express')
const app = express()

export const database = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lab2_testing',
    password: '103099',
    port: 5432
  })
  
app.post('/pogs', async (req, res, data) => {
    try{
      const query = await database.query('INSERT INTO pogs (name, ticker_symbol, price, color) VALUES ($1, $2, $3, $4)')
      const Values = [data.name, data.ticker_symbol, data.price, data.color]
    }catch (err){
      console.error(err);
      res.status(422).json({error:'An error occurred'});
    }
})


app.get('/pogs', async (req, res, data) => {
  try {
    const { id } = req.params;
    const result = await database.query('SELECT * FROM pogs');
    const result2 = await database.query('SELECT * FROM pogs WHERE id = $1', [id])
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.patch('/pogs', (req, res) => {

})

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Server started on localhost:${port}`)
})