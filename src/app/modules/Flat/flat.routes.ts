import express, { NextFunction, Request, Response } from "express";
import { FlatController } from "./flat.controller";
import { flatValidationSchemas } from "./flat.validation";
import { multiFileUploader } from "../../../helpers/multiFileUploader";
import { ICloudinaryResponse, IFile } from "../../interfaces/file";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-flat",
  auth(UserRole.ADMIN,UserRole.USER,UserRole.SELLER,UserRole.SUPER_ADMIN),
  multiFileUploader.upload.array("files", 10),
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = flatValidationSchemas.createFlatSchema.parse(
      JSON.parse(req.body.data)
    );
    return FlatController.createFlat(req, res, next);
  }
);
router.get('/get-all-flats',
  auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
  FlatController.getFlats
)
router.get('/get-my-flats',
  auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
  FlatController.getFlats
)

router.patch("/updateFLat",
  auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
  FlatController.updateFlat
)

export const FLatRoutes = router;
