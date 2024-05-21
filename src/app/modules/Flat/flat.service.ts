import { Request } from "express";

import { ICloudinaryResponse, IFile } from "../../interfaces/file";
import { multiFileUploader } from "../../../helpers/multiFileUploader";

const createFlatIntoDB = async (req: Request) => { 
    const files = req.files as IFile[];
    let flatPhotos: string[] = [];
    if (files) {
        const uploadToCloudinary = await multiFileUploader.uploadToCloudinary(files);
        uploadToCloudinary.forEach((response: ICloudinaryResponse) => {
            if (response.secure_url) {
                flatPhotos.push(response.secure_url);
            }
        });
        req.body.admin.profilePhoto = flatPhotos;
        console.log(flatPhotos,'flat photos');
    }
};

export const FlatServices = {
    createFlatIntoDB
}