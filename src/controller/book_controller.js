const fs = require("fs").promises;
const {v4:uuidv4} = require('uuid');
const path = require('path');
const bookDbPath = path.join(__dirname, "../data/book.json");



module.exports.addBooks = async (req, res) => {
  try {
    const {title, author, genre, publishedYear, userId} = req.body;
    
    // Validating book fields
    if (
            !title || typeof title !== 'string' || title.trim() === '' ||
            !author || typeof author !== 'string' || author.trim() === '' ||
            !genre || typeof genre !== 'string' || genre.trim() === '' ||
            !publishedYear || typeof publishedYear !== 'string' || publishedYear.trim() === '' ||
            !userId || typeof userId !== 'string' || userId.trim() === ''
        ) {
            
        return res.status(400).json({
            message: "Missing or invalid book details",
            data: req.body
        });
    }
     
    // creating new book data
    const newBookData = {
      id: uuidv4(),
      ...req.body
    }

    // fetching book_data from local db
    const bookDataStringified = await fs.readFile(bookDbPath,'utf-8');
    const bookData = JSON.parse(bookDataStringified);

     // pushing in bookdata
    bookData.push(newBookData);

    // adding the updated bookdata json in local db
    await fs.writeFile(bookDbPath,JSON.stringify(bookData));
    
    // finally returning success response
    return res.status(200).json({
        message:"new book added successfully",
        data:newBookData
    });

  }catch (error) {
      console.log("Error in adding books : " + error);
      return res.status(500).json({
         message:"Error in adding books"
      });
  }
}

module.exports.getAllBooks = async (req, res) => {

  try {
    // fetching book_data from local db
    const bookDataStringified = await fs.readFile(bookDbPath,'utf-8');
    const bookData = JSON.parse(bookDataStringified);

    // finally returning success response
    return res.status(200).json({
        message:"successfully fetched all books",
        data:bookData
    });

  }catch (error) {
      console.log("Error in fetching all books : " + error);
      return res.status(500).json({
         message:"Error in fetching all books"
      });
  }
  
}