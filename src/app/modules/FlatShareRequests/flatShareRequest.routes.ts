import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { FlatShareRequestController } from './flatShareRequest.controller';

const router = express.Router();

router.post("/create",
    auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
    FlatShareRequestController.createFlatRequest
)
router.get('/getAllFlatRequest',
auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
FlatShareRequestController.getAllFlatRequestData
)
router.get('/getAllFlatRequestForAdmin',
    auth(UserRole.ADMIN,UserRole.SUPER_ADMIN),
    FlatShareRequestController.getAllFlatRequestDataForAdmin
)
router.get('/getSingleFlatRequest/:id',
auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
FlatShareRequestController.getSingleFlatRequestData
)

export const FlatShareRequestRoutes = router;