import { connectToDatabase } from '@/lib/db';

export async function isAuthorized(authHeader: string | null): Promise<boolean> {
  if (!authHeader) return false;
  
  const { db } = await connectToDatabase();
  const creds = await db.collection('admin_credentials').findOne({ key: 'admin_password' });
  
  const defaultPass = "Y@ntra202266109#aud";
  if (!creds) {
    // Seed default
    await db.collection('admin_credentials').insertOne({
      key: 'admin_password',
      password: defaultPass
    });
    return authHeader === defaultPass;
  }
  
  return authHeader === creds.password;
}
