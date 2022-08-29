const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const middleware = require("../utils/middleware");
blogsRouter.get("/", async (_request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;
    try {
      const user = await User.findById(request.user);

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0,
        user: user._id,
      });

      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);

      await user.save();

      response.status(201).json(savedBlog);
    } catch (e) {
      console.log("can't create blog");
      next(e);
    }
  }
);

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id);
      if (request.user.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
      } else {
        return response.status(401).json({
          error: "invalid user",
        });
      }
    } catch (e) {
      next(e);
    }
  }
);

blogsRouter.put(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;

    const newBlog = {
      likes: body.likes,
    };
    try {
      const blog = await Blog.findById(request.params.id);
      if (request.user.toString() === blog.user.toString()) {
        const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
          new: true,
        });
        response.json(blog);
      } else {
        return response.status(401).json({
          error: "invalid user",
        });
      }
    } catch (e) {
      console.log("error updating blog");
      next(e);
    }
  }
);

module.exports = blogsRouter;
