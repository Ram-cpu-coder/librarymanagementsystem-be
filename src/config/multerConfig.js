
import multer from "multer";
import path from "path";


// define the storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cd(null, "assets/thumbnails")
    },
    filename: function (req, file, cb) {
        cd(null, Date.now() + "-" + path.extname(file.originalname))
    }
})


// filtering the images types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimeType)) {
        cb(null, true) //accepting the file
    } else {
        cb(new Error("Only images are allowed!"), false) //rejecting the file
    }
}


// limiting the size of the images uploaded
const imageSize = {
    fileSize: 1 * 1024 * 1024 //this is 1 MB
};


export const upload = multer({
    storage,
    fileFilter,
    imageSize
})