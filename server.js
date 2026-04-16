const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./src/routes/route')

const app = express()
app.use( express.json() )
app.use( cors() )
app.use( express.urlencoded() )

app.use( '/api/shorturl' , router );

const PORT = process.env.PORT || 5000;

app.listen( PORT , ()=>
{
    console.log(`server started on the port:${PORT}`);
})