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
exports.FLatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flat_controller_1 = require("./flat.controller");
const flat_validation_1 = require("./flat.validation");
const multiFileUploader_1 = require("../../../helpers/multiFileUploader");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create-flat", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), multiFileUploader_1.multiFileUploader.upload.array("files", 10), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body = flat_validation_1.flatValidationSchemas.createFlatSchema.parse(JSON.parse(req.body.data));
    return flat_controller_1.FlatController.createFlat(req, res, next);
}));
router.get('/get-all-flats', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.getFlats);
router.get('/get-my-flats', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.getFlats);
router.get("/getSingleFlat/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.getSingleFlat);
router.patch("/updateFLat/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.updateFlat);
router.delete("/deleteFlat/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.deleteFlat);
exports.FLatRoutes = router;
