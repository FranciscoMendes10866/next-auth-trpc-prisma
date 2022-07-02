import * as trpcNext from "@trpc/server/adapters/next";

import { serverRouter } from "../../../server/router";
import { createContext } from "../../../server/context";

export default trpcNext.createNextApiHandler({
  router: serverRouter,
  createContext,
});
