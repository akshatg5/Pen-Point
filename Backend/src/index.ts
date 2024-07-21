import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { authRouter } from "./routes/auth";
import { blogRouter } from "./routes/blogs";
import { statusRouter } from "./routes/checkStatus";
import { cors } from "hono/cors"
import { userRouter } from "./routes/user";
import { likesRouter } from "./routes/likes";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  cors({
    origin: ["http://localhost:5173","https://penpoint.vercel.app"], // Specify the allowed origin(s)
    allowMethods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Specify the allowed HTTP methods
    allowHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
  })
);

app.route('/',statusRouter)
app.route('/api/v1/auth',authRouter)
app.route('/api/v1/blog',blogRouter)
app.route('/api/v1/user',userRouter)
app.route('/api/v1/like',likesRouter)

export default app;
