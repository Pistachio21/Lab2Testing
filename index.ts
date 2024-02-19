import { Pool } from "pg";
import Express from 'express'
import { urlencoded } from "body-parser";


const app = Express()
app.use(Express.json)
app.use(urlencoded({extended: true}))

const database = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Lab2 (Testing)',
    password: 'shawn',
    port: 5433
  })
  
app.post('/pogs', async (req: Express.Request, res : Express.Response) => {
    try {
      const {name, ticker_symbol, price, color} = req.body
      // const values = [req.body.name, req.body.ticker_symbol, req.body.price, req.body.color]
      const connect = await database.connect()
      const query = await connect.query('INSERT INTO pogs (name, ticker_symbol, price, color) VALUES ($1, $2, $3, $4)', 
      [name, ticker_symbol, price, color])
      res.status(201).json(query.rows);
    }catch (err){
      console.error(err);
      res.status(422).json({error:'An error occurred'});
    }
})


app.get('/pogs', async (req : Express.Request, res: Express.Response) => {
  try {
    const connect = await database.connect()
    const result = await connect.query('SELECT * FROM pogs');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/pogs/:id', async (req, res) => {
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


app.patch('/pogs:id', (req, res) => {


})

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Server started on localhost:${port}`)
})