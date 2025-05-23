import mongoose from 'mongoose';

import {MONGO_URI} from './config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected');   
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


export default connectDB;

