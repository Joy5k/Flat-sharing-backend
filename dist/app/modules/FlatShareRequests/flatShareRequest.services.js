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
exports.FlatShareRequestServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createFlatRequestIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyExistsFlatRequest = yield prisma_1.default.flatRequest.findFirst({
        where: {
            flatId: payload.flatId,
            userId: payload.userId
        }
    });
    if (alreadyExistsFlatRequest) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Already exists Flat Request");
    }
    const result = yield prisma_1.default.flatRequest.create({
        data: payload,
        include: {
            user: true,
            flat: true
        },
    });
    return result;
});
const getAllFlatRequestDataFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flatRequest.findMany({
        where: {
            userId
        }, include: {
            flat: true
        }
    });
    return result;
});
const getAllFlatRequestDataForAdminFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flatRequest.findMany({
        include: {
            user: true,
            flat: true,
        },
    });
    return result;
});
const getSingleFlatRequestDataFromDB = (flatId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flatRequest.findFirstOrThrow({
        where: {
            flatId
        }, include: {
            flat: true
        }
    });
    return result;
});
exports.FlatShareRequestServices = {
    createFlatRequestIntoDB,
    getAllFlatRequestDataFromDB,
    getSingleFlatRequestDataFromDB,
    getAllFlatRequestDataForAdminFromDB
};
