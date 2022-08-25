const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/User");

//TODO: error handling and password validation
//We could check that the username is long enough, that the username only consists of permitted characters, or that the password is strong enough.
usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: "username must be unique",
      });
    }
  } catch (e) {
    console.log("error finding existing user");
    console.log(e)
    next(e);
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    name: name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (e) {
    console.log("error saving user");
    next(e);
  }
});

usersRouter.get("/", async (_request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {username: 1, author: 1, url: 1, likes: 1});
    response.json(users);
  } catch (e) {
    console.log("error getting user");
    next(e);
  }
});

module.exports = usersRouter;
