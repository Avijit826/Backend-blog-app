const express = require('express')
const auth = require('../config/auth')
const router = express.Router()

const {
  getPosts,
  createPost,
  updatePost,
  replacePost,
  deletePost,
} = require('../controllers/post.controller')

router.get('/', getPosts)
router.post('/', auth, createPost)
router.put('/:id', auth, updatePost)
router.put('/replace/:title', auth, replacePost)
router.delete('/:id', auth, deletePost)

module.exports = router
