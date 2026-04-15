const Article = require('./models/Article');

const seedData = [
  {
    title: 'The Benefits of Cardiovascular Exercise',
    content: 'Regular cardiovascular exercise can improve your heart health, lower blood pressure, and boost your overall mood.',
    category: 'Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Understanding Macronutrients',
    content: 'Proteins, carbohydrates, and fats are the building blocks of a healthy diet. Learn how to balance them for optimal health.',
    category: 'Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mental Health in the Modern World',
    content: 'With increasing daily stressors, prioritizing mental health through mindfulness and disconnecting from screens is crucial.',
    category: 'Mental Health',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Why Sleep Matters',
    content: 'Adequate sleep is vital for immune function, cognitive performance, and emotional well-being.',
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Preventative Screening Guidelines',
    content: 'Regular check-ups and screenings can catch health issues early when they are most treatable.',
    category: 'Medical',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

const seedDatabase = async () => {
  try {
    const existingCount = await Article.countDocuments();
    if (existingCount === 0) {
      await Article.insertMany(seedData);
      console.log('Database seeded with sample articles.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
