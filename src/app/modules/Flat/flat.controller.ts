import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { FlatServices } from "./flat.service";
import { TFlat } from "./flat.interface";

const createFlat = catchAsync(async (req: Request, res: Response) => {
    const result = await FlatServices.createFlatIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Flat created successfully",
        data: result
    })
})

export const FlatController = {
    createFlat
}