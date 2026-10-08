// callbackUrl শুধু নিজের সাইটের পথ হতে পারবে (বাইরের সাইটে রিডাইরেক্ট ঠেকাতে)
export function safeCallback(url: string | null | undefined): string {
  if (!url || !url.startsWith("/") || url.startsWith("//")) return "/";
  return url;
}
