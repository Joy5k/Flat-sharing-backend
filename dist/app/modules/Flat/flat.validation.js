"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatValidationSchemas = void 0;
const zod_1 = require("zod");
// Define the Zod schema for the flat
const createFlatSchema = zod_1.z.object({
    location: zod_1.z.string({
        required_error: "location is required!",
    }),
    description: zod_1.z.string({
        required_error: "Description is required!",
    }),
    rentAmount: zod_1.z.number({
        required_error: "Rent is required!",
    }),
    bedrooms: zod_1.z.number({
        required_error: "Bedrooms is required!",
    }),
    amenities: zod_1.z.array(zod_1.z.string({
        required_error: "Minimum 1 amenities is required!",
    })),
    photos: zod_1.z.array(zod_1.z.string({
        required_error: "Multiples Photos is need!",
    }).url()).optional(), // Ensuring the photo URLs are valid URLs
});
exports.flatValidationSchemas = {
    createFlatSchema
};
