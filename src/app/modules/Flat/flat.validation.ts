import { z } from 'zod';

// Define the Zod schema for the flat
const createFlatSchema = z.object({
  location: z.string({
    required_error: "location is required!",
  }),
  description: z.string({
    required_error: "Description is required!",
  }),
  rentAmount: z.number({
    required_error: "Rent is required!",
  }),
  bedrooms: z.number({
    required_error: "Bedrooms is required!",
  }),
  amenities: z.array(z.string({
    required_error: "Minimum 1 amenities is required!",
  })),
  photos: z.array(z.string({
    required_error: "Multiples Photos is need!",
  }).url()).optional(), // Ensuring the photo URLs are valid URLs
});

export const flatValidationSchemas = {
    createFlatSchema
}