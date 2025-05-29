import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'; // For in-memory MongoDB

let mongo: MongoMemoryServer;

beforeAll(async () => {
  // Set up in-memory MongoDB for testing and connect.
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeAll(async () => {
  // Clear all collections before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
  // Disconnect and stop in-memory MongoDB.
  await mongoose.disconnect();
  await mongo.stop();
});
