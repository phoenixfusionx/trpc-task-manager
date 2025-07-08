import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

export const createContext = (opts: CreateHTTPContextOptions) => {
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
