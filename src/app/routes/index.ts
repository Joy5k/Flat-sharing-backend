import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { FLatRoutes } from '../modules/Flat/flat.routes';
import { FlatShareRequestRoutes } from '../modules/FlatShareRequests/flatShareRequest.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/flat',
        route: FLatRoutes
    },
   
    {
        path: '/flat-share-request',
        route: FlatShareRequestRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;