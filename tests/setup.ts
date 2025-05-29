import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'; // For in-memory MongoDB

let mongo: MongoMemoryServer;

beforeAll(async () => {
  // Set up in-memory MongoDB for testing and connect.
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  // Clear all collections before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Disconnect and stop in-memory MongoDB.
  await mongoose.disconnect();
  await mongo.stop();
});
