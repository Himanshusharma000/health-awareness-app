import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

const Home = () => {
  const [tip, setTip] = useState('');

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/health-tips');
        setTip(res.data.tip);
      } catch (error) {
        console.error('Failed to fetch daily tip');
      }
    };
    fetchTip();
  }, []);

  const stats = [
    { title: 'Global Health Index', value: '72%', icon: <Activity className="text-primary w-10 h-10 mb-4" /> },
    { title: 'Active Lifestyles', value: '450M+', icon: <Heart className="text-red-500 w-10 h-10 mb-4" /> },
    { title: 'Preventable Diseases', value: 'Down 15%', icon: <ShieldCheck className="text-secondary w-10 h-10 mb-4" /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-emerald-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0 space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-dark leading-tight">
              Taking Control of Your <span className="text-primary">Health</span> Today
            </h1>
            <p className="text-lg text-gray-600">
              Discover tips, read articles, and calculate your BMI to start your journey towards a healthier lifestyle.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link to="/articles" className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition shadow-lg shadow-blue-200">
                Read Articles
              </Link>
              <Link to="/bmi" className="bg-white border-2 border-primary text-primary hover:bg-blue-50 px-6 py-3 rounded-full font-medium transition">
                Check BMI
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-5/12"
          >
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Healthy lifestyle" 
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Daily Tip Section */}
      {tip && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto bg-green-50 border border-green-100 p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold text-secondary mb-4 flex justify-center items-center gap-2">
                🌟 Health Tip of the Day
              </h2>
              <p className="text-xl italic text-gray-700">"{tip}"</p>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark">Health Awareness Impact</h2>
            <p className="text-gray-500 mt-2">Together, we can build a healthier tomorrow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow text-center flex flex-col items-center"
              >
                {stat.icon}
                <h3 className="text-4xl font-bold text-dark mb-2">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
