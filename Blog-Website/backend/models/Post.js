const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

PostSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Post', PostSchema);
