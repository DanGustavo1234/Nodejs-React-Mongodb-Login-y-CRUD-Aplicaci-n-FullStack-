import {z} from 'zod';


export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }).min(3).max(20),
    description: z.string({
        required_error: 'Description is required',
    }),
    date: z.string().date().optional()
})