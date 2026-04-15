import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import BMICalculator from './pages/BMICalculator';
import Contact from './pages/Contact';
import { Mail, HeartPulse } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-dark text-white py-8 mt-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <HeartPulse className="text-secondary" size={24} />
              <span className="text-xl font-bold">HealthAware</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} HealthAware. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
