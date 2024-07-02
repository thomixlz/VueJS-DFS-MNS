const express = require('express');
const cors = require('cors');

const facturesRoutes = require('./routes/factures.js');


const app = express();
app.use(express.json());
const port = 3000;

app.use(cors({
  origin:'http://localhost:5173'
}))

app.use('/factures', facturesRoutes)

app.get('/', (req, res) => { 
  res.send({
    api: 'Factures app API',
    version: '0.1.0'
  })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})