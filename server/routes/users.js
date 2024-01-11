// routes/users.js
const router = require('express').Router();
const { Seeker, Recruiter, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const { connectToDatabase } = require('../database');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.error('Validation Error:', error);
      return res.status(400).send({ message: error.details[0].message });
    }

    const { email, password, Role } = req.body;

    // Determine the user model based on the role
    const userModel = Role === 'seeker' ? Seeker : Recruiter;

    // Connect to the databases 
    const { Users } = await connectToDatabase();

    // Check if the user with the given email already exists
    // const user = await userModel.findOne({ email });
    const user = await Users.findOne({ email});
    if (user) {
      return res.status(409).send({ message: 'User with given email already exists' });
    } else {
      console.error('User not found or error during findOne:', email);
    }

    // If the user does not exist, proceed with creating the user
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user object before saving
    const userToSave = new userModel({ ...req.body, password: hashPassword });

    // Save the user to the user collection using Mongoose save method
    await userToSave.save();

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
