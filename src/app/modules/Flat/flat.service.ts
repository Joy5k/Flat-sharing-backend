import { Request } from "express";

import { ICloudinaryResponse, IFile } from "../../interfaces/file";
import { multiFileUploader } from "../../../helpers/multiFileUploader";
import prisma from "../../../shared/prisma";

const createFlatIntoDB = async (req: Request) => {
  const user = req.user as any

  const files = req.files as IFile[];
  let flatPhotos: { imageUrl: string }[] = [];
  if (files && files.length > 0) {
    try {
      const uploadToCloudinary = await multiFileUploader.uploadToCloudinary(
        files
      );
      uploadToCloudinary.forEach((response: ICloudinaryResponse) => {
        if (response.secure_url) {
          // console.log(response.secure_url);
          flatPhotos.push({ imageUrl: response.secure_url });
        }
      });
      req.body.photos = flatPhotos;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  }
  const flatData = req.body;
  console.log(flatData, "the flat data");

  const result = await prisma.flat.create({
    data: {
      ...flatData,
      photos: {
        create: flatData.photos.map((photo: { imageUrl: string }) => ({
          imageUrl: photo.imageUrl
        })),
      },
      userId: user.userId, 
    },
    include: {
      photos: true, 
    },
  });
  return result;
};

export const FlatServices = {
  createFlatIntoDB,
};
