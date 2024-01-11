const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@emp-portal.hzccd3b.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Increase server selection timeout (in milliseconds)
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database successfully.');

    const db = client.db('empPortal');
    const Users = db.collection('Users');
    const jobsCollections = db.collection('JobFusion');

    return {db, Users, jobsCollections };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };

