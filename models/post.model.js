const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      default:
        'https://res.cloudinary.com/avicoder/image/upload/v1668321879/samples/food/dessert.jpg',
    },
    subTitle: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('post', PostSchema)

module.exports = Post
