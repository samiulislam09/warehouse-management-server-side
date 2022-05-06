const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.port || 5000;

const app = express();
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://bookwarehouse:X1b9ZYpVMQWH3Zhc@cluster0.ewdqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res)=>{
    res.send("hello guys");
});

const run = async ()=>{
    try{
        await client.connect()
        console.log('connected')
    }catch(error){
        console.log(error)

    }
}
run()

app.listen(port, ()=>{
    console.log("hello guys im running in", port)
})