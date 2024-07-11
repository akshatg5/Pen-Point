import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { addBlogInput,updateBlogInput } from '@akshatgirdhar/blogmodules'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";

  try {
    const user = await verify(header, c.env.JWT_SECRET);
    if (typeof user.id == "string") {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
  } catch (error) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
});

userRouter.get('/whoami',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorization = c.req.header('authorization');

  if (!authorization) {
    c.status(401)
    return c.json({error : "Unauthorized!"})
  }

  try {
    const user = await verify(authorization,c.env.JWT_SECRET)

    if (typeof user.id !== 'string') {
      c.status(401);
      return c.json({error : "Unauthorized!"})
    }

    const userId = user.id;
    const userDetails = await prisma.user.findFirst({
      where : {id : userId},
      select : {id:true,firstName:true,lastName:true,username:true,email:true}
    })

    if (!userDetails) {
      c.status(404);
      return c.json({ error: "User not found" });
    }

    return c.json(userDetails);
  } catch (error) {
    c.status(401);
    return c.json({error : "unauthorized!"})
  }  
})