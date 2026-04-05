import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${slug}`);
        setPost(data);
      } catch (error) {
        console.error("Post not found");
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) return <div className="text-center py-20 text-2xl text-gray-500 animate-pulse">Loading...</div>;

  return (
    <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mt-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{post.title}</h1>
      <div className="flex items-center text-gray-500 text-sm mb-10 border-b pb-6">
        <span className="font-semibold text-gray-700 mr-2">{post.author?.username}</span>
        <span>• Published on {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="prose prose-lg prose-indigo max-w-none text-gray-800 leading-relaxed">
        {post.content}
      </div>
    </article>
  );
};

export default PostDetail;
