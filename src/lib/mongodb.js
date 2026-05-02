// src/lib/mongodb.js
// Singleton MongoDB connection to avoid creating multiple connections
// in Next.js development (hot-reload creates new module instances)
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve connection
  // across hot-reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a fresh client per module instance
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
