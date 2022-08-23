const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", async (_request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch(e) {
    next(e);
  }
  
});

blogsRouter.post("/", async (request, response, next) => {
  const body = new Blog(request.body);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
  });
  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog);
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
