import { MongoClient, Db, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your MONGODB_URI to .env');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export interface Booking {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  matterType?: string;
  method?: string;
  description?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (e.g. "09:30")
  duration: number; // minutes
  status: 'PENDING_APPROVAL' | 'CONFIRMED';
  googleEventId?: string;
  createdAt: Date;
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const connectedClient = await clientPromise;
  const db = connectedClient.db();
  return { client: connectedClient, db };
}
