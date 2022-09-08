const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const middleware = require("../utils/middleware");

//get all blogs
blogsRouter.get("/", async (_request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    }); //TODO: populate likes
    response.json(blogs);
  } catch (e) {
    next(e);
  }
});

//post new blog
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
        likes: [],
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

//delete the given blog
blogsRouter.delete("/:id", middleware.userExtractor, async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id);
      const user = await User.findById(request.user);
      if (request.user.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id);

        user.blogs = user.blogs.filter(b => b.toString() !== request.params.id.toString())
        
        
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

//update route is for updating likes on this blog
blogsRouter.put("/:id", middleware.userExtractor, async (request, response, next) => {
    const body = request.body;    

    try {
      let newLikes;
      const user = await User.findById(request.user);
      if (body.likes.includes(user._id.toString())) {
        newLikes = body.likes.filter((u) => u.toString() !== user._id.toString());
      } else {
        newLikes = body.likes;
        newLikes.push(user);
        console.log(newLikes)
      }

      const newBlog = {
        likes: newLikes,
      };
        const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
          new: true,
        });
        response.json(blog);
    } catch (e) {
      console.log("error updating blog");
      next(e);
    }
  }
);

module.exports = blogsRouter;
