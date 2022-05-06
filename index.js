const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.port || 5000;

const app = express();
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://bookwarehouse:X1b9ZYpVMQWH3Zhc@cluster0.ewdqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async ()=>{
    try{
        await client.connect()
        const collection = client.db('book-warehouse').collection('products')
        
        app.get("/product", async (req, res)=>{
            const query = {}
            const cursor = collection.find(query)
            const products = await cursor.toArray();
            res.send(products)
            
        })
        app.get("/product/:id", async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const product = await collection.findOne(query);
            res.send(product)
        })
        app.post('/product', async(req, res)=>{
            const newProduct = req.body;
            const result = await collection.insertOne(newProduct);
            res.send(result)
        })
    }catch(error){
        console.log(error)

    }
}
run().catch(console.dir)

app.listen(port, ()=>{
    console.log("hello guys im running in", port)
})