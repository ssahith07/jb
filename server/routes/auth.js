const router = require("express").Router();
const { Seeker, Recruiter } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");

// Validate function declaration
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    // Use the validate function
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { email, password } = req.body;

    // Checks if the user is a Seeker
    const seeker = await Seeker.findOne({ email });

    // Check if the user is a Recruiter
    const recruiter = await Recruiter.findOne({ email });

    if (!seeker && !recruiter) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    // Determines the user model based on the role
    const userModel = seeker || recruiter;

    const validPassword = await bcrypt.compare(password, userModel.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    const token = userModel.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;