const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name:'dh4ibyfyo',
    api_key:'275227698331637',
    api_secret:'joKweqlPQK6Tw9ytLyWiS_6PItE'

});

const storage =  multer.memoryStorage();
const ImageUploadUtil = async (fileData) => {
    try {
        console.log("Uploading file to Cloudinary...");
        const result = await cloudinary.uploader.upload(fileData, {
            resource_type: "auto", // Automatically detect file type
        });
        console.log("Cloudinary Response:", result);
        return result;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error.message || error);
        throw new Error(error.message || "Cloudinary upload failed");
    }
};



const upload = multer({storage});

module.exports = {upload,ImageUploadUtil,cloudinary} 