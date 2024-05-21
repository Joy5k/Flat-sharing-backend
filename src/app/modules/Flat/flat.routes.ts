import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { FlatController } from "./flat.controller";
import { flatValidationSchemas } from "./flat.validation";
import { multiFileUploader } from "../../../helpers/multiFileUploader";
import { IFile } from "../../interfaces/file";

const router = express.Router();

router.post(
  "/create-flat",
  multiFileUploader.upload.array("files", 3),
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as any;
    await multiFileUploader.uploadToCloudinary(files);
    req.body = flatValidationSchemas.createFlatSchema.parse(
      JSON.parse(req.body.data)
    );
    return FlatController.createFlat(req, res, next);
  }
);

export const FLatRoutes = router;
