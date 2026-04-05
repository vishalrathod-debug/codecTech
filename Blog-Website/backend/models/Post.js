const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  slug: { type: String, unique: true },
  content: { type: String, required: [true, 'Content is required'] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Auto-create slug from title
PostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
