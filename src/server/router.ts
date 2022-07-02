import * as trpc from "@trpc/server";
import { hash } from "argon2";

import { Context } from "./context";
import { signUpSchema } from "../common/validation/auth";

export const serverRouter = trpc.router<Context>().mutation("signup", {
  input: signUpSchema,
  resolve: async ({ input, ctx }) => {
    const { username, email, password } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password);

    const result = await ctx.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
  },
});

export type ServerRouter = typeof serverRouter;
