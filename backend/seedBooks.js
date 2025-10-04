const mongoose = require('mongoose');
const Book = require('./models/books');

const sampleBooks = [
  {
    title: "The Psychology of Harry Potter",
    author: "Neil Mulholland",
    description: "An exploration of the psychological themes in the Harry Potter series.",
    genre: "Psychology",
    year: 2006,
    image: "/assets/books/book-1.png",
    addedBy: new mongoose.Types.ObjectId()
  },
  {
    title: "Harry Potter and Philosophy",
    author: "David Baggett",
    description: "Philosophical discussions inspired by the Harry Potter books.",
    genre: "Philosophy",
    year: 2004,
    image: "/assets/books/book-2.png",
    addedBy: new mongoose.Types.ObjectId()
  },
  {
    title: "Harry Potter and the Cursed Child",
    author: "J.K. Rowling",
    description: "The eighth story in the Harry Potter series.",
    genre: "Fantasy",
    year: 2016,
    image: "/assets/books/book-3.png",
    addedBy: new mongoose.Types.ObjectId()
  }
  // Add more sample books as needed
];

async function seedBooks() {
  try {
    await mongoose.connect('mongodb+srv://seenusharma2022_db_user:E5TC5M7dNnvj88jJ@cluster0.njcexhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      // Removed deprecated options
    });
    console.log('MongoDB connected for seeding');

    await Book.deleteMany({});
    console.log('Existing books deleted');

    await Book.insertMany(sampleBooks);
    console.log('Sample books inserted');

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error seeding books:', error);
  }
}

seedBooks();
