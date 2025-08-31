"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
exports.validateUser = zod_1.z.object({
    name: zod_1.z.string().trim().optional(),
    email: zod_1.z.email().trim(),
    otp: zod_1.z.string().regex(/^\d{6}$/)
});
