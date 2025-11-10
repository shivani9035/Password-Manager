

const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb')
const bodyParser = require('body-parser')

dotenv.config()

const url = process.env.MONGO_URI || 'mongodb://localhost:27017/'
const client = new MongoClient(url)
const dbName = 'passop'

const app = express()
const port = 3000

app.use(bodyParser.json())

async function run() {
  await client.connect()
  console.log("✅ Connected to MongoDB")

  const db = client.db(dbName)
  const collection = db.collection('passwords')

  // get all passwords
  app.get('/', async (req, res) => {
    const result = await collection.find({}).toArray()
    res.json(result)
  })

  // save a password
  app.post('/', async (req, res) => {
    const result = await collection.insertOne(req.body)
    res.send({ success: true, result })
  })

  // delete password by id
  app.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    res.send({ success: true, result })
  })

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
  })
}

run().catch(console.dir)

