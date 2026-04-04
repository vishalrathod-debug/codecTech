const router = require('express').Router();
const Post = require('../models/Post');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'username');
  res.json(posts);
});

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.json(post);
});

router.post('/', protect, adminOnly, async (req, res) => {
  const post = new Post({
    ...req.body,
    author: req.user.id
  });
  await post.save();
  res.json(post);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
