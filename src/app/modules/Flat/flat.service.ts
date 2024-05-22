import { Request } from "express";

import { ICloudinaryResponse, IFile } from "../../interfaces/file";
import { multiFileUploader } from "../../../helpers/multiFileUploader";

const createFlatIntoDB = async (req: Request) => { 
    const files = req.files as IFile[];
    let flatPhotos: {imageUrl:string}[] = [];
    if (files && files.length > 0) {
        try {
            const uploadToCloudinary = await multiFileUploader.uploadToCloudinary(files);
            uploadToCloudinary.forEach((response: ICloudinaryResponse) => {
                if (response.secure_url) {
                    // console.log(response.secure_url);
                    flatPhotos.push({ "imageUrl": response.secure_url });
                }
            });
            req.body.profilePhoto = flatPhotos;
            console.log(flatPhotos, 'flat photos');
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
        }
    }
};

export const FlatServices = {
    createFlatIntoDB
}