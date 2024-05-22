"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiFileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dbgrq28js',
    api_key: '173484379744282',
    api_secret: 'eHKsVTxIOLl5oaO_BHxBQWAK3GA',
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage }); // Define the type for upload object
const uploadToCloudinary = (files) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(files);
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload(file.path, (error, result) => {
                //     // deleting multiple images from uploads folder
                //     if (!!file.path &&fs.existsSync(file.path)) {
                //    return  fs.unlinkSync(file.path);
                //  }
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                    // console.log(result,"<------------------------------------");
                }
            });
        });
    });
    try {
        // Wait for all uploads to complete
        const results = yield Promise.all(uploadPromises);
        // Once all uploads are done, delete the files
        // files.forEach((file) => {
        //     if (!!file.path && fs.existsSync(file.path) && !(fs.unlinkSync(file.path))) {
        //         console.log('Deleting file:', file.path);
        //         fs.unlinkSync(file.path);
        //         console.log('File deleted:', file.path);
        //     } else {
        //         console.log('File not found:', file.path);
        //     }
        // });
        return results;
    }
    catch (error) {
        // Handle errors here
        console.error('Error uploading files:', error);
        throw error;
    }
});
exports.multiFileUploader = {
    upload,
    uploadToCloudinary,
};
