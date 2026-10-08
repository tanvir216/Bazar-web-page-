import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

export function getAuth() {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  const db = client.db();

  return betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: { enabled: true, autoSignIn: false },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      },
    },
  });
}