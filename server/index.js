// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { ObjectId } = require('mongodb');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { connectToDatabase } = require('./database');

// middleware
app.use(express.json());
app.use(cors());

async function run() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Routes for signup and login
    app.use('/api/users', userRoutes);
    app.use('/api/auth', authRoutes);

        // after posting a job
        app.post('/post-job', async (req, res) => {
          const body = req.body;
          body.createAt = new Date();
          const result = await jobsCollections.insertOne(body);
          if (result.insertedId) {
            return res.status(200).send(result);
          } else {
            return res.status(404).send({
              message: 'cannot insert try again later!',
              status: false,
            });
          }
        });
    
        // importing all jobs
        app.get('/all-jobs', async (req, res) => {
          const jobs = await jobsCollections.find({}).toArray();
          res.send(jobs);
        });
    
        // importing jobs by email.
        app.get('/myJobs/:email', async (req, res) => {
          const jobs = await jobsCollections.find({ postedBy: req.params.email }).toArray();
          res.send(jobs);
        });
    
        // deleting a job
        app.delete('/job/:id', async (req, res) => {
          const id = req.params.id;
          const filter = { _id: new ObjectId(id) };
    
          try {
            const result = await jobsCollections.deleteOne(filter);
            res.send(result);
          } catch (error) {
            console.error('Error deleting job:', error);
            res.status(500).send({
              message: 'Internal server error',
              status: false,
            });
          }
        });
    

    // Send a ping to confirm a successful connection
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}
// In your main application file (e.g., index.js)



run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Dev!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
