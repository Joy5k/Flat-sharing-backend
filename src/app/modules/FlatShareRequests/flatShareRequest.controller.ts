import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { FlatShareRequestServices } from "./flatShareRequest.services";
import { JwtPayload } from "jsonwebtoken";

const createFlatRequest = catchAsync(async (req: Request, res: Response) => {
  const { flatId } = req.body;
  const { userId } = req.user;
  console.log({flatId},req.user)
  const flatRequestData = {
    flatId,
    userId,
  };
  const result = await FlatShareRequestServices.createFlatRequestIntoDB(
    flatRequestData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flat Share Request created successfully",
    data: result,
  });
});

const getAllFlatRequestData = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    const result = await FlatShareRequestServices.getAllFlatRequestDataFromDB(
      userId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Flat Share Request retrieved successfully",
      data: result,
    });
  }
);
const getSingleFlatRequestData = catchAsync(
  async (req: Request, res: Response) => {
    const { flatId } = req.params;
    const result = await FlatShareRequestServices.getSingleFlatRequestDataFromDB(
      flatId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Flat Share Request retrieved successfully",
      data: result,
    });
  }
);

export const FlatShareRequestController = {
  createFlatRequest,
  getAllFlatRequestData,
  getSingleFlatRequestData,
};
