import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";

async function run(method: "GET" | "POST", req: Request) {
  try {
    return await toNextJsHandler(getAuth())[method](req);
  } catch (e) {
    console.error("AUTH ERROR:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const GET = (req: Request) => run("GET", req);
export const POST = (req: Request) => run("POST", req);
