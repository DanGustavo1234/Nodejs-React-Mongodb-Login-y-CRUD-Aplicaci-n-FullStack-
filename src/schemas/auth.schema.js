import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
    }).min(3).max(20),
    email: z.string({
        required_error: 'Email is required',
    }).email(),
    password: z.string({
        required_error: 'Password is required',
    }).min(6,{
        message: 'Password should be at least 6 characters long',
    }).max(20,{
        message: 'Password should be at most 20 characters long',
    }),
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email(),
    password: z.string({
        required_error: 'Password is required',
    }).min(6,{
        message: 'Password should be at least 6 characters long',
    }).max(20,{
        message: 'Password should be at most 20 characters long',
    }),
})