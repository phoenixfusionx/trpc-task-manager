import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/router.js";

export const trpc = createTRPCReact<AppRouter>();
