// queries.js

// --- Basic CRUD Operations ---

// 1. Find all books
db.books.find({});

// 2. Find books by author "George Orwell"
db.books.find({ author: "George Orwell" });

// 3. Insert a new book into the collection
db.books.insertOne({
  title: "The Winds of Winter",
  author: "George R.R. Martin",
  year: 2024,
});

// 4. Update the publication year of "The Hobbit" to 1938
db.books.updateOne({ title: "The Hobbit" }, { $set: { year: 1938 } });

// 5. Delete the book titled "Animal Farm"
db.books.deleteOne({ title: "Animal Farm" });

// --- Advanced Queries ---

// 6. Find books published before 1950, show only title and author (exclude _id)
db.books.find({ year: { $lt: 1950 } }, { title: 1, author: 1, _id: 0 });

// 7. Find books by "J.R.R. Tolkien" sorted by year descending
db.books.find({ author: "J.R.R. Tolkien" }).sort({ year: -1 });

// 8. Find books with "The" in the title (case-insensitive)
db.books.find({ title: { $regex: /the/i } });

// --- Aggregation Pipelines ---

// 9. Count the number of books per author
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
]);

// 10. Calculate the average publication year of books by each author
db.books.aggregate([
  { $group: { _id: "$author", averageYear: { $avg: "$year" } } },
  { $sort: { averageYear: 1 } },
]);

// --- Indexing ---

// 11. Create an index on the 'author' field to improve query performance
db.books.createIndex({ author: 1 });

// 12. List all indexes on the 'books' collection
db.books.getIndexes();
