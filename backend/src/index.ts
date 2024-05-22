import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { authRouter } from "./routes/auth";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//middleware for all the blog endpoints
app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("authorization") || " ";
  const token = header.split(" ")[1]

  const response = await verify(token, c.env.JWT_SECRET);
  if (response.id) {
    next()
  } else {
    c.status(401)
    return c.json({Error : "Unauthroized"})
  }
});

app.route('/api/v1/auth',authRouter)
app.route('/api/v1/blog',blogRouter)


export default app;
