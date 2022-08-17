/**adds up likes from all blogs */
const totalLikes = (blogs) => {
  let total = 0;
  for (i in blogs) {
    total += blogs[i].likes;
  }
  return total;
};

/**return blog with most likes */
const favoriteBlog = (blogs) => {
    let favorite;
    let high = 0;
    for (let i in blogs){
        if(blogs[i].likes > high){
            favorite = blogs[i]
            high = blogs[i].likes
        }
    }
    return favorite;
}

const getMostProlific = (authors) => {
    let result = {
        author: "",
        blogs: 0
    };
    for (let i in authors){
        if(authors[i] > result.blogs){
            result.author = i;
            result.blogs = authors[i]
        }
    }

    return result;
}

const mostBlogs = (blogs) => {
    const authors = {}
    for (let i in blogs){
        if (blogs[i].author in authors){
            authors[blogs[i].author] += 1;
        } else{
            authors[blogs[i].author] = 1;
        }
    }
    return getMostProlific(authors);
}



module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
};

