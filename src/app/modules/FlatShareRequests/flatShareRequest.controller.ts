import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { FlatShareRequestServices } from "./flatShareRequest.services";

const createFlatRequest = catchAsync(async (req: Request, res: Response) => {
    const {flatId} = req.body
    const { userId } = req.user
    const flatRequestData = {
        flatId,
        userId
    }
    const result = await FlatShareRequestServices.createFlatRequestIntoDB(flatRequestData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Flat Share Request created successfully',
        data: result
    })
})


export const FlatShareRequestController = {
    createFlatRequest
}