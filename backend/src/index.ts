import { Hono } from "hono";
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

app.route('/api/v1/auth',authRouter)
app.route('/api/v1/blog',blogRouter)

export default app;
