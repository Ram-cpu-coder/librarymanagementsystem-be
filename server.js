import express from "express";
import cors from "cors";
import { connectMongoDB } from "./src/config/mongoConfig.js";
import morgan from "morgan";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import dotenv from "dotenv";
dotenv.config();
// Routers
import authRouter from "./src/routers/authRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import borrowRouter from "./src/routers/borrowRouter.js"
import reviewRouter from "./src/routers/reviewRouter.js"
import verifyEmailRouter from "./src/routers/verifyEmailRouter.js"

const PORT = process.env.PORT;

const app = express();

// log middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

const allowedOrigins = [
  "https://lms-823yigjtd-ram-cpu-coders-projects.vercel.app",
  "https://lms-hazel-mu.vercel.app",
  "https://lms-xi-jade.vercel.app",
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

//server status
app.get("/", (req, res, next) => {
  res.json({ message: "server is healthy" });
});


// /assets

app.use("/thumbnail", express.static("assets/images"));

// profilePic
app.use("/profilePic", express.static('assets/profilePics'))

// auth route
app.use("/api/v1/auth", authRouter);

// book route
app.use("/api/v1/books", bookRouter);

// borrow route
app.use("/api/v1/borrow", borrowRouter)

// review route
app.use("/api/v1/review", reviewRouter)

// verifying the account
app.use("/verify-user", verifyEmailRouter)


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
        ? console.log(error, "error")
        : console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // db conn error
    console.log(error);
    console.log("ERROR CONNECTING TO DB");
  });
