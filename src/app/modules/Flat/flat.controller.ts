import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { FlatServices } from "./flat.service";
import { TFlat } from "./flat.interface";
import pick from "../../../shared/pick";
import { flatFilterableFields } from "./flat.constant";

const createFlat = catchAsync(async (req: Request, res: Response) => {
    const result = await FlatServices.createFlatIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Flat created successfully",
        data: result
    })
})
const getFlats = catchAsync(async (req: Request, res: Response) => {
    const user=req.user
    const filters = pick(req.query, flatFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await FlatServices.getFlatsFromDB(user,filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appointment retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
})
export const FlatController = {
    createFlat,
    getFlats

}