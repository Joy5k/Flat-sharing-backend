"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createAdmin = zod_1.z.object({
    password: zod_1.z.string(),
    admin: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .email(),
        username: zod_1.z.string({
            required_error: "Name is required!",
        }),
        contactNumber: zod_1.z
            .string({
            required_error: "Contact number is required!",
        })
            .optional(),
    }),
});
const createUser = zod_1.z.object({
    password: zod_1.z.string(),
    user: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .email(),
        username: zod_1.z.string({
            required_error: "Name is required!",
        }),
        contactNumber: zod_1.z
            .string({
            required_error: "Contact number is required!",
        })
            .optional(),
    }),
});
const updateStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.UserStatus.ACTIVE, client_1.UserStatus.BLOCKED, client_1.UserStatus.DELETED]),
    }),
});
exports.userValidation = {
    createAdmin,
    createUser,
    updateStatus,
};
