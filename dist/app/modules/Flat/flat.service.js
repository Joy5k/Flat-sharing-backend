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
exports.FlatServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const client_1 = require("@prisma/client");
const createFlatIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // const files = req.files as IFile[];
    // let flatPhotos: { imageUrl: string }[] = [];
    // if (files && files.length > 0) {
    //   try {
    //     const uploadToCloudinary = await multiFileUploader.uploadToCloudinary(
    //       files
    //     );
    //     uploadToCloudinary.forEach((response: ICloudinaryResponse) => {
    //       if (response.secure_url) {
    //         flatPhotos.push({ imageUrl: response.secure_url });
    //       }
    //     });
    //     req.body.photos = flatPhotos;
    //   } catch (error) {
    //     console.error("Error uploading to Cloudinary:", error);
    //   }
    // }
    const flatData = req.body;
    const result = yield prisma_1.default.flat.create({
        data: Object.assign(Object.assign({}, flatData), { photos: {
                create: flatData.photos.map((photo) => ({
                    imageUrl: photo.imageUrl,
                })),
            }, userId: user.userId }),
        include: {
            photos: true,
        },
    });
    return result;
});
const getFlatsFromDB = (user, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { location, priceMin, priceMax, bedrooms } = filters;
    const andConditions = [];
    // Filter by user role
    if ((user === null || user === void 0 ? void 0 : user.role) === client_1.UserRole.USER || (user === null || user === void 0 ? void 0 : user.role) === client_1.UserRole.ADMIN) {
        andConditions.push({
            user: {
                email: user === null || user === void 0 ? void 0 : user.email,
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
                gte: Number(priceMin),
                lte: Number(priceMax),
            },
        });
    }
    // Filter by number of bedrooms
    if (bedrooms) {
        andConditions.push({
            bedrooms: Number(bedrooms),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.flat.findMany({
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
    const total = yield prisma_1.default.flat.count({
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
});
const getMyFlatsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.findMany({
        where: {
            userId
        }
    });
    return result;
});
const getSingleFlatFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.findFirstOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            location: true,
            description: true,
            photos: true,
            rentAmount: true,
            bedrooms: true,
            amenities: true,
            userId: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
const updateFlatDataIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.update({
        where: {
            id
        },
        data: payload
    });
    return result;
});
const updateMyFlatDataIntoDB = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.flat.findFirstOrThrow({
        where: {
            id,
            userId
        }
    });
    const result = yield prisma_1.default.flat.update({
        where: {
            id,
            userId
        },
        data: payload
    });
    return result;
});
const deleteFlatFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteFlat = yield transactionClient.photo.deleteMany({
            where: {
                flatId: id,
            },
        });
        yield transactionClient.flat.delete({
            where: {
                id
            },
        });
        return deleteFlat;
    }));
});
exports.FlatServices = {
    createFlatIntoDB,
    getFlatsFromDB,
    getMyFlatsFromDB,
    getSingleFlatFromDB,
    updateFlatDataIntoDB,
    updateMyFlatDataIntoDB,
    deleteFlatFromDB
};
