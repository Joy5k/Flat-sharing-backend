"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flat_controller_1 = require("./flat.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create-flat", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), 
// multiFileUploader.upload.array("files", 10),
// async (req: Request, res: Response, next: NextFunction) => {
//   req.body = flatValidationSchemas.createFlatSchema.parse(
//     JSON.parse(req.body.data)
//   );
// return FlatController.createFlat(req, res, next);
// }
flat_controller_1.FlatController.createFlat);
router.get('/get-all-flats', flat_controller_1.FlatController.getFlats);
router.get('/get-my-flats', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.getFlats);
router.get("/getSingleFlat/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.getSingleFlat);
router.patch("/updateFLat/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.updateFlat);
router.patch("/updateMyFLat/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER), flat_controller_1.FlatController.updateMyFlat);
router.delete("/deleteFlat/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER, client_1.UserRole.SUPER_ADMIN), flat_controller_1.FlatController.deleteFlat);
exports.FLatRoutes = router;
