import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Cloudflare Workers e ek request er connection onno request e reuse kora jay na,
// tai prottek request e notun client/auth toiri hoy (kono global cache nai).
export function getAuth() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI missing");

  const client = new MongoClient(uri);
  const siteUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";

  return betterAuth({
    baseURL: siteUrl,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [siteUrl, process.env.NEXT_PUBLIC_APP_URL].filter(
      Boolean,
    ) as string[],
    database: mongodbAdapter(client.db()),
   emailAndPassword: { enabled: true, autoSignIn: true },
    account: {
      accountLinking: { enabled: true, trustedProviders: ["google"] },
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        prompt: "select_account",
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
    },
  });
}
