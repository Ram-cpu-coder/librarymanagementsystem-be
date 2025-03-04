import express from "express";
import cors from "cors";
import { connectMongoDB } from "./src/config/mongoConfig.js";
import morgan from "morgan";
import { errorHandler } from "./src/middlewares/errorHandler.js";

// Routers
import authRouter from "./src/routers/authRouter.js";
import bookRouter from "./src/routers/bookRouter.js";

const PORT = process.env.PORT;
const app = express();

// log middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// request body parser
app.use(cors());
app.use(express.json());

//server status
app.get("/", (req, res, next) => {
  res.json({ message: "server is healthy" });
});

// auth route
app.use("/api/v1/auth", authRouter);

// book route
app.use("/api/v1/books", bookRouter);

// error handler middle ware
app.use(errorHandler);

// database connection
connectMongoDB()
  .then(() => {
    // db con successful
    console.log("Connected to Database");
    // start server
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // db conn error
    console.log(error);
    console.log("ERROR CONNECTING TO DB");
  });
