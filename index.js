// PORT
const port = 8080;

// initiliasing express
const express = require("express");
const app = express();

// for fetching JSON req res
app.use(express.json());

// main route
const routes = require("./src/routes/routes.js");

// req res start from here
app.use("/", routes);

// Handling error cases
app.use((err,req, res, next)=>{
  console.log("Internal Server Error");
  res.status(500).json({status:"false", message: "Internal Server Error"});
})

//listen
app.listen(port, () => {
  console.log(`Bookstore server is running on port:${port}`);
});
