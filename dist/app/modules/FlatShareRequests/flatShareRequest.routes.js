"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatShareRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const flatShareRequest_controller_1 = require("./flatShareRequest.controller");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flatShareRequest_controller_1.FlatShareRequestController.createFlatRequest);
router.get('/getAllFlatRequest', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flatShareRequest_controller_1.FlatShareRequestController.getAllFlatRequestData);
router.get('/getAllFlatRequestForAdmin', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), flatShareRequest_controller_1.FlatShareRequestController.getAllFlatRequestDataForAdmin);
router.get('/getSingleFlatRequest/:id', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flatShareRequest_controller_1.FlatShareRequestController.getSingleFlatRequestData);
exports.FlatShareRequestRoutes = router;
