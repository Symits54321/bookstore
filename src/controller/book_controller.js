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
    await fs.writeFile(bookDbPath,JSON.stringify(bookData, null, 2));
    
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

module.exports.getBookById = async (req, res) => {

  try {

    const id = req.params.id

    if(!id || id == ""){
        return res.status(500).json({
          message:"Book id is required in params"
        }); 
    }

    // fetching book_data from local db
    const bookDataStringified = await fs.readFile(bookDbPath,'utf-8');
    const bookData = JSON.parse(bookDataStringified);

    // getting book by id
    const requiredBook = bookData.find(book => book.id === id);
    
    if (!requiredBook) {
         return res.status(500).json({ message: 'no book present by this id' });
    }
    // finally returning success response
    return res.status(200).json({
        message:"successfully fetched book by id",
        data:requiredBook
    });

  }catch (error) {
      console.log("Error in fetching all books : " + error);
      return res.status(500).json({
         message:"Error in fetching all books"
      });
  }
  
}

module.exports.updateBookById = async (req, res) => {

  try {
    
    // fetching id from params
    const id = req.params.id
    
    // validating id
    if(!id || id == ""){
        return res.status(500).json({
          message:"Book id is required in params"
        }); 
    }

    const {title, author, genre, publishedYear, userId} = req.body;

    if(!title && !author && !genre && !publishedYear){
        return res.status(400).json({
             message: "Atleast one field is required to update book" 
        }); 
    }
    
    function isValidString(val) {
      return typeof val === 'string' && val.trim() !== '';
    }
    
    // Verifying StringType of each value of req.body
    for (const key in req.body) {
        if (Object.hasOwnProperty.call(req.body, key)) {
            const value = req.body[key];
             if (!isValidString(value)){
                return res.status(400).json({ 
                    message: `Invalid ${key} / is not a valid String`,
                    data: req.body 
                });
             }
        }
    }

    // fetching book_data from local db
    const bookDataStringified = await fs.readFile(bookDbPath,'utf-8');
    const bookData = JSON.parse(bookDataStringified);

    // getting book by id
    const requiredBookToUpdate = bookData.find(book => book.id === id);
    
    // if book not present
    if (!requiredBookToUpdate) {
         return res.status(500).json({ message: 'No book present by this id' });
    }

    // getting index of the book
     const bookIndex = bookData.findIndex(book => book.id === id);
    
    // updating on that index 
     bookData[bookIndex] = {
        ...bookData[bookIndex],
        title,
        author,
        genre,
        publishedYear
     };
    
    // updating the updated book in local db
    await fs.writeFile(bookDbPath, JSON.stringify(bookData, null, 2)); 

    // finally returning success response
    return res.status(200).json({
        message:"Successfully Updated book by id",
        data:bookData[bookIndex]
    });

  }catch (error) {
      console.log("Error updating books : " + error);
      return res.status(500).json({
         message:"Error updating books"
      });
  }
  
}

module.exports.deleteBookById = async (req, res) => {

  try {
    
    // fetching id from params
    const id = req.params.id
    
    // validating id
    if(!id || id == ""){
        return res.status(500).json({
          message:"Book id is required in params"
        }); 
    }

    // fetching book_data from local db
    const bookDataStringified = await fs.readFile(bookDbPath,'utf-8');
    const bookData = JSON.parse(bookDataStringified);

    // getting book by id
    const requiredBookToDelete = bookData.find(book => book.id === id);
    
    // if book not present
    if (!requiredBookToDelete) {
         return res.status(500).json({ message: 'No book present by this id' });
    }

    // getting index of the book
    const bookIndex = bookData.findIndex(book => book.id === id);
    
    // deleting book by Id 
    bookData.splice(bookIndex, 1); 
    
    // updating the updated bookdata in local db
    await fs.writeFile(bookDbPath, JSON.stringify(bookData, null, 2)); 

    // finally returning success response
    return res.status(200).json({
        message:"Successfully deleted book by id",
        data: bookData
    });

  }catch (error) {
      console.log("Error deleting books : " + error);
      return res.status(500).json({
         message:"Error deleting books"
      });
  }
  
}