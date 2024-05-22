import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { ICloudinaryResponse, IFile } from '../app/interfaces/file';

cloudinary.config({
    cloud_name: 'dbgrq28js',
    api_key: '173484379744282',
    api_secret: 'eHKsVTxIOLl5oaO_BHxBQWAK3GA',
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload: Multer = multer({ storage: storage }); // Define the type for upload object

const uploadToCloudinary = async (files: IFile[]): Promise<ICloudinaryResponse[]> => {
    console.log(files);
    const uploadPromises = files.map((file) => {
        return new Promise<ICloudinaryResponse>((resolve, reject) => {
            cloudinary.uploader.upload(file.path, (error: Error, result: ICloudinaryResponse) => {
              
            //     // deleting multiple images from uploads folder
            //     if (!!file.path &&fs.existsSync(file.path)) {
            //    return  fs.unlinkSync(file.path);
            //  }
                   
               


                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                   
                    // console.log(result,"<------------------------------------");
                }
            });
        });
    });
    
    try {
        // Wait for all uploads to complete
        const results = await Promise.all(uploadPromises);

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
    } catch (error) {
        // Handle errors here
        console.error('Error uploading files:', error);
        throw error;
    }
};

export const multiFileUploader = {
    upload,
    uploadToCloudinary,
};
