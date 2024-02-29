import { Pool } from "pg";
import { Request, Response } from 'express';
import { urlencoded } from "body-parser";

const Express = require('express')
const app = Express()
app.use(Express.json())
app.use(urlencoded({extended: true}))

const database = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lab2_testing',
    password: '103099',
    port: 5432
  })
  
app.post('/pogs', async (req:Request, res:Response) => {
    try {
      const {name, ticker_symbol, price, color} = req.body
      // const values = [req.body.name, req.body.ticker_symbol, req.body.price, req.body.color]
      const connect = await database.connect()
      const query = await connect.query('INSERT INTO pogs (name, ticker_symbol, price, color) VALUES ($1, $2, $3, $4) RETURNING *', 
      [name, ticker_symbol, price, color])
      res.status(201).json(query.rows);
    }catch (err){
      console.error(err);
      res.status(422).json({error:'An error occurred'});
    }
})


app.get('/pogs', async (req:Request, res:Response) => {
  try {
    const connect = await database.connect()
    const result = await connect.query('SELECT * FROM pogs');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/pogs/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const connect = await database.connect()
    const result = await connect.query('SELECT * FROM pogs WHERE id = $1', [id])
    if (result.rows.length !== 0) {
    res.status(200).json(result.rows);
    } else {
      res.status(404).send('404 not found.')
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/pogs/:id', async (req:Request, res:Response) => {
  try {
      const { id } = req.params;
      const { name, ticker_symbol, price, color } = req.body;
      const connect = await database.connect();
      
      // Prepare the update statement
      const query = `UPDATE pogs SET name = $1, ticker_symbol = $2, price = $3, color = $4 WHERE id = $5 RETURNING *`;
      const values = [name, ticker_symbol, price, color, id];
      
      const result = await connect.query(query, values);
      
      // Check if rowCount is not null before using it
      if (result.rowCount !== null && result.rowCount >  0) {
          res.status(200).json(result.rows[0]);
      } else {
          res.status(404).send('Record not found');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

app.delete('/pogs/:id', async (req:Request, res:Response) => {
  try {
     const { id } = req.params;
     const connect = await database.connect();
     const query = 'DELETE FROM pogs WHERE id = $1';
     const values = [id];
     const result = await connect.query(query, values);
  
     if (result.rowCount !== null && result.rowCount > 0) {
       res.status(200).json({ message: 'Record deletd' });
     } else {
       res.status(404).send('Record not found');
     }
  } catch (err) {
     console.error(err);
     res.status(500).send('Internal Server Error');
  }
 });
 
 




// app.patch('/pogs:id', (req, res) => {


// })

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Server started on localhost:${port}`)
})