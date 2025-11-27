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
const getAllFlatsBySuperAdmin = catchAsync(async (req: Request, res: Response) => {
    
    const user=req.user as any
    const filters = pick(req.query, flatFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await FlatServices.getFlatsBySuperAdminFromDB(user,filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Flats retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
})


const getFlats = catchAsync(async (req: Request, res: Response) => {
    
    const user=req.user as any
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

const getSingleFlat = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FlatServices.getSingleFlatFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Flat retrieval successfully',
        data: result
    })
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
const updateMyFlat = catchAsync(async (req: Request, res: Response) => {
    const {userId}=req.user
    const { id } = req.params;
    const result = await FlatServices.updateMyFlatDataIntoDB(id,userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "FLat data updated!",
        data: result
    })
})

// activate all deactivated flat by super admin
const activeFlat=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params;
    const result=await FlatServices.acivateFlatIntoDB(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Flat activated successfully",
        data:result
    })
})
// retrive deleted flat by super admin
const retriveDeletedFlat=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    const result=await FlatServices.retriveDeletedFlatBySuperAdminFromDB(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Flat retrived successfully",
        data:result
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
    getAllFlatsBySuperAdmin,
    getMyFlats,
    getSingleFlat,
    updateFlat,
    updateMyFlat,
    activeFlat,
    retriveDeletedFlat,
    deleteFlat

}