"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const fileUploader_1 = require("../../../helpers/fileUploader");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.userController.getAllFromDB);
router.get("/me", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER), user_controller_1.userController.getMyProfile);
router.post("/create-admin", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.userController.createAdmin
// fileUploader.upload.single("file"),
// (req: Request, res: Response, next: NextFunction) => {
//   req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
//   return userController.createAdmin(req, res, next);
// }
);
router.post("/create-user", 
// fileUploader.upload.single("file"),
// (req: Request, res: Response, next: NextFunction) => {
//   req.body = userValidation.createUser.parse(JSON.parse(req.body.data));
//   return userController.createUser(req, res, next);
// }
user_controller_1.userController.createUser);
router.patch("/editProfile", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER), (0, validateRequest_1.default)(user_validation_1.userValidation.editProfile), user_controller_1.userController.editProfile);
router.patch("/:id/status", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.userValidation.updateStatus), user_controller_1.userController.changeProfileStatus);
router.patch("/:userId/role", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.userValidation.updateRole), user_controller_1.userController.changeUserRole);
router.patch("/update-my-profile", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER, client_1.UserRole.SELLER), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return user_controller_1.userController.updateMyProfile(req, res, next);
});
exports.userRoutes = router;
