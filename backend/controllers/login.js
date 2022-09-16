const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/User");

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      // expiresIn: 60 * 60,
    });

    response
      .status(200)
      .send({ token, username: user.username, name: user.name, id: user._id });
  } catch (e) {
    console.log("login error");
    next(e);
  }
});

module.exports = loginRouter;
