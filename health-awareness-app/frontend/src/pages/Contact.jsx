import { useState } from 'react';
import axios from 'axios';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await axios.post('http://localhost:5000/api/subscribe', { email });
      setStatus({ type: 'success', message: res.data.message });
      setEmail('');
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Info Section */}
        <div className="md:w-5/12 bg-primary p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-blue-100 mb-8">
            Subscribe to our newsletter to receive the latest health tips, articles, and updates directly in your inbox.
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <Mail className="text-blue-200" />
            <span>newsletter@healthaware.com</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-7/12 p-10 flex border-t md:border-t-0 md:border-l border-gray-100 flex-col justify-center">
          <h3 className="text-2xl font-bold text-dark mb-6">Join Our Newsletter</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-dark hover:bg-gray-800'
              }`}
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>

          {status.message && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl flex items-center space-x-3 ${
                status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span>{status.message}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
