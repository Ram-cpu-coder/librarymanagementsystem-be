import Joi from "joi";

const joiValidator = (schema, req, res, next) => {
  // const object = { email: "email", password: "password" };
  const { error } = schema.validate(req.body);
  error
    ? next({
      status: "error",
      message: error.message,
    })
    : next();
};

// login validator
export const loginValidator = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });

  joiValidator(loginSchema, req, res, next);
};

// register validator
export const registerValidator = (req, res, next) => {
  const registerSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
  });

  joiValidator(registerSchema, req, res, next);
};

// update user profile validation 
export const updateUserValidator = (req, res, next) => {
  const updateSchema = Joi.object({
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    phone: Joi.string().required(),
  });
  joiValidator(updateSchema, req, res, next)
}
// create book validator
export const createBookValidator = (req, res, next) => {
  console.log("TEST");
  console.log(req.body);
  const createBookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: Joi.number().required(),
    description: Joi.string(),
  });

  joiValidator(createBookSchema, req, res, next);
};


// update book validation 
export const updateBookValidator = (req, res, next) => {
  const updateBookSchema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    // thumbnail: Joi.string().required(),
    // isbn: Joi.string().required(),
    genre: Joi.string().required(),
    status: Joi.string().required(),
    publishedYear: Joi.number().required(),
    description: Joi.string(),
    isAvailable: Joi.boolean(),
    expectedAvailable: Joi.string().allow("", null),
  });

  joiValidator(updateBookSchema, req, res, next);
}

// export const createReviewValidator = (req, res, next) => {
//   const createReviewSchema = Joi.object({
//     status: Joi.string().required(),
//     bookId: Joi.string().required(),
//     userId: Joi.string().required(),
//     borrowId: Joi.string().required(),
//     thumbnail: Joi.string().required(),
//     title: Joi.string().required(),
//     ratings: Joi.number().required(),
//     userName: Joi.string().required(),
//     message: Joi.string().required(),
//   })
//   joiValidator(createReviewSchema, req, res, next)
// }