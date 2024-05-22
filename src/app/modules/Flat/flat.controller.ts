import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { FlatServices } from "./flat.service";
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
const getFlats = catchAsync(async (req: Request , res: Response) => {
    const user=req.user
    const filters = pick(req.query, flatFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await FlatServices.getFlatsFromDB(user,filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Flats retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
})

const getMyFlats = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.user
    const result = await FlatServices.getMyFlatsFromDB(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Flats retrieval successfully',
        data: result,
    });
})


const updateFlat = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FlatServices.updateFlatDataIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "FLat data updated!",
        data: result
    })
})

const deleteFlat = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await FlatServices.deleteFlatFromDB(id)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "FLat Deleted successfully!",
        data: result
    })

 })


export const FlatController = {
    createFlat,
    getFlats,
    getMyFlats,
    updateFlat,
    deleteFlat

}