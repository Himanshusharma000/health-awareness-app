import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/articles');
        setArticles(res.data);
      } catch (error) {
        console.error('Error fetching articles', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark mb-4">Health Articles</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Read the latest insights and tips to keep your mind and body healthy.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={article._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.imageUrl || `https://source.unsplash.com/random/400x300/?health,${idx}`} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-sm font-bold px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-dark mb-3 leading-tight">{article.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{article.content}</p>
                <div className="text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                  Published on {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
