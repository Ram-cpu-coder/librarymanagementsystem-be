export const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";

  if (message.includes("E11000")) {
    statusCode = 400;
    message = "DUPLICATE USER";
  }

  return res.status(statusCode).send({
    message: message,
    status: "error",
  });
};
