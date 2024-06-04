import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// user Routes
userRouter.get("/whoami",async (c) => {
    const header = c.req.header("authorization") || "";
    try {
        const user = await verify(header,c.env.JWT_SECRET)
        if (typeof user.id != "string") {
            return c.json({error : "Cannot get the userID!"})
        }
        const userId = user.id;
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());

          const whoami = await prisma.user.findUnique({
            where : { id : userId},
            select : {name : true}
          })

          if (!whoami) {
            return c.json({error : "User not found"},404)
          }

          return c.json(whoami)
    } catch (error) {
        return c.json({error : 'Cannot get the user!'})
    }
})