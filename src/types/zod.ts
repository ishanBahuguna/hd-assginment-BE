import {z} from 'zod';

export const validateUser = z.object({
    name:z.string().trim().optional(),
    email:z.email().trim(),
    otp:z.string().regex(/^\d{6}$/)
})