import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                <Link to={`/post/${post.slug}`} className="text-gray-900 hover:text-indigo-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-4 font-medium">
                By {post.author?.username || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
              <Link to={`/post/${post.slug}`} className="text-indigo-600 font-semibold hover:underline">
                Read full article &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
