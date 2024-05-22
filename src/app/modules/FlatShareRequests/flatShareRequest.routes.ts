import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { FlatShareRequestController } from './flatShareRequest.controller';

const router = express.Router();

router.post("/create",
    auth(UserRole.ADMIN, UserRole.USER, UserRole.SELLER, UserRole.SUPER_ADMIN),
    FlatShareRequestController.createFlatRequest
)


export const FlatShareRequestRoutes = router;