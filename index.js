
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zgfd4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('DB connected to doctors portal')

        // db collection 
        const serviceCollection = client.db("doctors_portal").collection("service");

        // get all service from DB and send to client 
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

    }
    finally {

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Doctors Portal Server is running')
})

app.listen(port, () => {
    console.log(`Doctors portal is running on port ${port}`)
})
