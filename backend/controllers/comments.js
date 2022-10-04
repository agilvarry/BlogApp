const commentsRouter = require("express").Router();
const Comment = require("../models/Comment");
const User = require("../models/User");
const middleware = require("../utils/middleware");