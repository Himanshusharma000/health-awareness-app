import { useState } from 'react';
import { motion } from 'framer-motion';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      
      let category = '';
      let colorClass = '';
      
      if (bmiValue < 18.5) {
        category = 'Underweight';
        colorClass = 'text-blue-500';
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        category = 'Normal weight';
        colorClass = 'text-emerald-500';
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        category = 'Overweight';
        colorClass = 'text-yellow-500';
      } else {
        category = 'Obese';
        colorClass = 'text-red-500';
      }

      setResult({ value: bmiValue, category, colorClass });
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark mb-4">BMI Calculator</h1>
        <p className="text-gray-600">Enter your height and weight to calculate your Body Mass Index (BMI).</p>
      </div>

      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden min-h-[400px]">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md"
            >
              Calculate BMI
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="w-full md:w-1/2 bg-slate-50 p-8 md:p-12 flex items-center justify-center border-l border-gray-100">
          {result ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <p className="text-gray-500 mb-2 font-medium">Your BMI is</p>
              <div className="text-6xl font-black text-dark mb-4">{result.value}</div>
              <div className={`text-2xl font-bold px-6 py-2 rounded-full bg-white shadow-sm inline-block ${result.colorClass}`}>
                {result.category}
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-400">
              <div className="text-6xl font-light mb-4">?</div>
              <p>Your result will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
