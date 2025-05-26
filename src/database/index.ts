import mongoose, { Mongoose } from 'mongoose';
import config from '../config';

export async function connectMongoDb(): Promise<void> {
  try {
    const connection: Mongoose = await mongoose.connect(config.mongo.uri);
    console.log(`Connected to MongoDB server: ${connection.connection.host}`);
  } catch (error: any) {
    console.error('Error connecting to MongoDB:');
    console.error(error);
    process.exit(1);
  }
}
