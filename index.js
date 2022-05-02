const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())


const uri = "mongodb+srv://book-warehouse:3hUs0OxIAkoMSHxj@cluster0.mrq9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res)=>{
    res.send("hello guys");
});
app.listen(port, ()=>{
    console.log("hello guys im running in", port)
})