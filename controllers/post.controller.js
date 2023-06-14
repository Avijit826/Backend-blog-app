const Post = require('../models/post.model')

const getPosts = (req, res) => {
  Post.find({})
    .sort({ updatedAt: -1 })
    .then((post) => {
      res.json(post)
      console.log(req.user)
    })
    .catch((err) =>
      res.status(404).json({ message: 'no post found', error: err.message })
    )
}
const createPost = (req, res) => {
  req.body.user = req.user.id
  Post.create(req.body)
    .then((data) => {
      res.json({ message: 'post added successfully', data })
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).json({
          message: 'Post already exists',
          error: err.message,
        })
      } else {
        res.status(400).json({
          message: 'unable to add new post',
          error: err.message,
          code: err.code,
        })
      }
    })
}
const updatePost = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body)
    .then((data) => {
      res.json({ message: 'updated successfully', data })
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: 'unable to update post', message: err.message })
    )
}

const replacePost = (req, res) => {
  req.body.user = req.user.id
  Post.findOneAndReplace(
    { title: req.params.title, user: req.user.id },
    req.body
  )
    .then((data) => {
      res.json({ message: 'updated successfully', data })
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: 'unable to update post', message: err.message })
    )
}

const deletePost = (req, res) => {
  Post.findOneAndRemove({ title: req.params.title, user: req.user.id })
    .then((data) =>
      data
        ? res.json({ message: 'post deleted successfully', data })
        : res
            .status(404)
            .json({ message: 'Post Not Found', error: 'No post on such id' })
    )
    .catch((err) =>
      res.status(400).json({ error: 'Bad Request', message: err.message })
    )
}

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  replacePost,
}
