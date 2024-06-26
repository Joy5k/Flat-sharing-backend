import { Admin, Prisma, User, UserRole, UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import { Request } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { userSearchAbleFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";
const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    username: req.body.admin.username,
    profilePhoto: req?.body.admin.profilePhoto,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

const createUser = async (req: Request): Promise<User> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    req.body.user.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.user.email,
    username: req.body.user.username,
    profilePhoto: req?.body.user.profilePhoto,
    password: hashedPassword,
    role: UserRole.USER,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const createUserData = await transactionClient.user.create({
      data: userData,
    });
    return createUserData;
  });

  return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      email: true,
      username:true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const editProfileIntoDB = async (email: string, payload: { username?: string, email?: string }) => {
  const isExistInUser = await prisma.user.findUnique({
      where: {
          email,
      },
      select: {
          username: true,
          email: true,
          profilePhoto: true,
      },
  });

  if (!isExistInUser) {
      throw new Error("User not found");
  }

  const updateUserPayload = {} as any;

  // Check if payload contains username and it's not empty
  if (payload.username) {
      updateUserPayload.username = payload.username;
  }
  if (payload.email) {
       updateUserPayload.email = payload.email;

  }

  // if (payload.email) {
  //     if (payload.email !== email) {
  //         // Check if the new email already exists in the database
  //         const existingUserWithEmail = await prisma.user.findUnique({
  //             where: {
  //                 email: payload.email,
  //             },
  //         });

  //         if (existingUserWithEmail) {
  //             throw new Error("Email already exists");
  //         }
  //     }
  //     updateUserPayload.email = payload.email;
  // }

  // Update user details
  const updateUser = await prisma.user.update({
      where: {
          email,
      },
      data: updateUserPayload,
      select: {
          id: true,
          username: true,
          email: true,
          profilePhoto: true,
          role: true,
          needPasswordChange: true,
          status: true,
          createdAt: true,
          updatedAt: true,
      },
  });

  return updateUser;
};


const changeUserRole = async (id: any, status: {role:string}) => {
  console.log(id,status.role)
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
      profilePhoto: true,
    },
  });
  return await prisma.$transaction(async (transactionClient) => {
    const updateUser = await transactionClient.user.update({
      where: {
        id,
      },
        data: {
        role: status.role as UserRole, // Ensuring role is of type UserRole
      },
      select: {
        id: true,
        username: true,
        email: true,
        profilePhoto: true,
        role: true,
        needPasswordChange: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const isExistInAdmin = await prisma.admin.findFirst({
      where: {
        email:result.email,
      },
      select: {
        username: true,
        email: true,
        profilePhoto: true,
      },
    });
  
    if (!isExistInAdmin) {
      await transactionClient.admin.create({
        data: result,
      });
  
    } else if(isExistInAdmin&&status.role==="USER"){
      await transactionClient.admin.delete({
        where: {
          email:result.email,
        }
      })
    } 
    return updateUser;
  });
};

const changeProfileStatus = async (id: any, status: UserRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });

  return updateUserStatus;
};

const getMyProfile = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      username: true,
      profilePhoto: true,
      needPasswordChange: true,
      role: true,
      status: true,
    },
  });

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        id: userInfo.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        profilePhoto: true,
      },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        id: userInfo.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        profilePhoto: true,
      },
    });
  } else if (userInfo.role === UserRole.USER) {
    profileInfo = await prisma.user.findUnique({
      where: {
        id: userInfo.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        needPasswordChange: true,
        profilePhoto: true,
        role: true,
        status: true,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

const updateMyProfile = async (user: IAuthUser, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }

  return { ...profileInfo };
};

export const userService = {
  createAdmin,
  createUser,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
  changeUserRole,
  editProfileIntoDB
};
