import { Request } from "express";

import { ICloudinaryResponse, IFile } from "../../interfaces/file";
import { multiFileUploader } from "../../../helpers/multiFileUploader";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { Prisma, UserRole } from "@prisma/client";

const createFlatIntoDB = async (req: Request) => {
  const user = req.user as any;

  const files = req.files as IFile[];
  let flatPhotos: { imageUrl: string }[] = [];
  if (files && files.length > 0) {
    try {
      const uploadToCloudinary = await multiFileUploader.uploadToCloudinary(
        files
      );
      uploadToCloudinary.forEach((response: ICloudinaryResponse) => {
        if (response.secure_url) {
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
          imageUrl: photo.imageUrl,
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

const getFlatsFromDB = async (
  user: IAuthUser,
  filters:any,
  options: IPaginationOptions & { location?: string; priceMin?: number; priceMax?: number; bedrooms?: number }
) => {
  console.log(options,"--------------------------------",filters);
  const { limit,page, skip } = paginationHelper.calculatePagination(options);
  const { location, priceMin, priceMax, bedrooms } = filters;
  
  const andConditions: Prisma.FlatWhereInput[] = [];

  // Filter by user role
  if (user?.role === UserRole.USER || user?.role === UserRole.ADMIN) {
    andConditions.push({
      user: {
        email: user?.email,
      },
    });
  }

  // Filter by location
  if (location) {
    andConditions.push({
      location: {
        contains: location,
        mode: 'insensitive', // Case-insensitive search
      },
    });
  }

  // Filter by price range
  if (priceMin !== undefined || priceMax !== undefined) {
    andConditions.push({
      rentAmount: {
        gte: priceMin,
        lte: priceMax,
      },
    });
  }

  // Filter by number of bedrooms
  if (bedrooms !== undefined) {
    andConditions.push({
      bedrooms: Number(bedrooms),
    });
  }

  const whereConditions: Prisma.FlatWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.flat.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: 'desc' },
    include: {
      photos: true,
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          profilePhoto: true,
          role: true,
          needPasswordChange: true,
          status: true,
         
        },
      },
    },
  });

  const total = await prisma.flat.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};



export const FlatServices = {
  createFlatIntoDB,
  getFlatsFromDB,
};
