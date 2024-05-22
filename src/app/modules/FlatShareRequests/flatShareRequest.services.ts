import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TFlatShareRequest } from "./flatShareRequest.interface";

const createFlatRequestIntoDB = async (payload: TFlatShareRequest) => {
 
    const alreadyExistsFlatRequest = await prisma.flatRequest.findFirst({
        where: {
            flatId: payload.flatId
        }
    })
    if (alreadyExistsFlatRequest) {
   throw new ApiError(httpStatus.CONFLICT,"Already exists Flat Request")
    }
    const result = await prisma.flatRequest.create({
        data: payload,
        include: {
            user: true,
            flat: true
          },
    },
       
    )
    return result
}

export const FlatShareRequestServices = {
    createFlatRequestIntoDB
}