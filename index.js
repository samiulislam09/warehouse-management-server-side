const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ewdqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
        app.get('/myitem', async(req, res)=>{
            const email = req.query.email;
            const query = {email:email}
            const cursor = collection.find(query);
            const myproducts = await cursor.toArray();
            res.send(myproducts)
        })

        app.delete('/manageinventory/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result  = await collection.deleteOne(query);
            res.send(result)
        })

        app.delete('/myitem/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result  = await collection.deleteOne(query);
            res.send(result)
        })

        app.put('/update/:id', async(req, res)=>{
            const id = req.params.id;
            const updatedUser = req.body;
            const query = {_id:ObjectId(id)};
            const options = {upsert: true};
            const updateDoc = {
                $set:{
                    email:updatedUser.email,
                    name:updatedUser.name,
                    desc:updatedUser.desc,
                    price:updatedUser.price,
                    qty:updatedUser.qty,
                    supplier:updatedUser.supplier,
                    img:updatedUser.img
                }
            }
            const result = await collection.updateOne(query, updateDoc, options);
            res.send(result)

        })

    }catch(error){
        console.log(error)

    }
}
run().catch(console.dir)

app.get('/', (req, res)=>{
    res.send('running server')
})

app.listen(port, ()=>{
    console.log("hello guys im running in", port)
})