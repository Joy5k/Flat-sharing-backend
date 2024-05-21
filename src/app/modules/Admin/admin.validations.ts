import { z } from "zod";

const update = z.object({
    body: z.object({
        username: z.string().optional(),
        contactNumber: z.string().optional()
    })
});


export const adminValidationSchemas = {
    update
}