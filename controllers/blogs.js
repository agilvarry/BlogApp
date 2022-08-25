const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require('../models/User')

blogsRouter.get("/", async (_request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch(e) {
    next(e);
  }
  
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    const user = await User.findById(body.userId)
    console.log(body)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: user._id
    });
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)  
    await user.save()
    response.status(201).json(savedBlog);
  }
  catch (e){
    console.log("can't create blog")
    next(e);
  }
  

 
  try{
    
  } catch(e){
    next(e);
  }
   
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const req = request.body;
  const newBlog = {
    likes: req.likes,
  };

  const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });

  response.json(blog);
});


module.exports = blogsRouter;
