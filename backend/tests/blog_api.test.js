// const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/Blog");
const helper = require("./test_helper");
let token;

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.listOfBlogs);
const user = {
  "username": "root",
  "password": "salainen"
}
  const login = await api.post('/api/login').send(user);
  token = `bearer ${login.body.token}`;
  console.log(login)

});

describe("API calls", () => {
  test("blogs are returned as JSON", async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
  });

  test("return all blogs", async () => {

    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.listOfBlogs.length)
  });

  test('return a specific blog', async () => {
    const res = await api.get('/api/blogs');

    const blogTitles = res.body.map(t => t.title)

    expect(blogTitles).toContain('First class tests');
  });

  test('can add a valid new blog', async () => {
    const newBlog = {
      title: "Stardew Valley Beginner Tips",
      author: "Clever Ape",
      url: "https://polygon.com/",
      userId: "6307daff4d9aa036d12271eb"
    }
    await api.post('/api/blogs').set('Authorization', token).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(helper.listOfBlogs.length + 1);

  });
  
  // TODO: broke with changed likes

  // test('new blogs have 0 likes', async () => {
  //   const newBlog = {
  //     title: "No Likes",
  //     author: "No Author",
  //     url: "https://nowebsite.com/",
  //     userId: "6307daff4d9aa036d12271eb"
  //   }

  //   const res = await api.post('/api/blogs').set('Authorization', token).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  //   expect(res.body.likes).toBe(0);

  // });


  test("can't add a blog with incomplete content", async () => {
    const badBlog = {
      url: "https://polygon.com/"
    }
    await api.post('/api/blogs').set('Authorization', token).send(badBlog).expect(500)

    // const res = await api.get('/api/blogs');

    // expect(res.body).toHaveLength(helper.listOfBlogs.length);
  })

  test ("add and delete a blog", async () => {

    const newBlog = {
      title: "To Delete",
      author: "Delete Me",
      url: "https://pleasedelete.com/",
      userId: "6307daff4d9aa036d12271eb"
    }

    const res = await api.post('/api/blogs').set('Authorization', token).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    console.log(res.body.id)
    await api.delete(`/api/blogs/${res.body.id}`).set('Authorization', token).expect(204)

  })

  //TODO: add test to check deleting a blog user doesn't own failsgit

  test ("can't add a blog without a token", async () => {

    const newBlog = {
      title: "will fail",
      author: "will fail",
      url: "https://pleaseupdate.com/",
      userId: "6307daff4d9aa036d12271eb"
    }

    const res = await api.post('/api/blogs').set('Authorization', "token bad").send(newBlog).expect(401)

  })
 // TODO: broke with changed likes
  // test ("add and update a blog", async () => {

  //   const newBlog = {
  //     title: "To Update",
  //     author: "Update Me",
  //     url: "https://pleaseupdate.com/",
  //     userId: "6307daff4d9aa036d12271eb"
  //   }

  //   const res = await api.post('/api/blogs').set('Authorization', token).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  //   const addLike = {...res.body, likes: res.body.likes +1}
  //   const updatedRes = await api.put(`/api/blogs/${res.body.id}`).set('Authorization', token).send(addLike)

  //   expect(updatedRes.body).toStrictEqual(addLike)

  // })
});
