import {UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
    password: z.string({
        required_error: "Password is required"
    }),
    admin: z.object({
        username: z.string({
            required_error: "Name is required!"
        }),
        email: z.string({
            required_error: "Email is required!"
        }),
        contactNumber: z.string({
            required_error: "Contact Number is required!"
        })
    })
});


const createUser = z.object({
    password: z.string(),
    user: z.object({
        email: z.string({
            required_error: "Email is required!"
        }).email(),
        username: z.string({
            required_error: "Name is required!"
        }),
        contactNumber: z.string({
            required_error: "Contact number is required!"
        }).optional(),
       
    })
});

const updateStatus = z.object({
    body: z.object({
        status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
    })
})

export const userValidation = {
    createAdmin,
    createUser,
    updateStatus
}