import multer from "multer";
import path from "path";

// define the storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = "assets/images"; // this is the default 
        if (file.fieldname === "profilePic") {
            uploadPath = "assets/profilePics"
        }
        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename based on timestamp  },
    },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Only image files are allowed!"), false); // Reject the file
    }
};

const limits = {
    fileSize: 20 * 1024 * 1024, //file limit to 20 MB
};

export const upload = multer({
    storage,
    limits,
    fileFilter,
});
