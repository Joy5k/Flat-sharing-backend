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
exports.FlatShareRequestController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const flatShareRequest_services_1 = require("./flatShareRequest.services");
const createFlatRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { flatId } = req.body;
    const { userId } = req.user;
    console.log({ flatId }, req.user);
    const flatRequestData = {
        flatId,
        userId,
    };
    const result = yield flatShareRequest_services_1.FlatShareRequestServices.createFlatRequestIntoDB(flatRequestData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Flat Share Request created successfully",
        data: result,
    });
}));
const getAllFlatRequestData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield flatShareRequest_services_1.FlatShareRequestServices.getAllFlatRequestDataFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Flat Share Request retrieved successfully",
        data: result,
    });
}));
const getSingleFlatRequestData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { flatId } = req.params;
    const result = yield flatShareRequest_services_1.FlatShareRequestServices.getSingleFlatRequestDataFromDB(flatId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Flat Share Request retrieved successfully",
        data: result,
    });
}));
exports.FlatShareRequestController = {
    createFlatRequest,
    getAllFlatRequestData,
    getSingleFlatRequestData,
};
