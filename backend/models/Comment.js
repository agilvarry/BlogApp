const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    date: Date,
    content: {type: String, minlength: 1, required: true},
    blog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });

  blogSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
  
  module.exports = mongoose.model("Comment", commentSchema);