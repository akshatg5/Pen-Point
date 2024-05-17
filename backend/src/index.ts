import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

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

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const secret = c.env.JWT_SECRET;

  const body = await c.req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    throw new Error("This user already exists!");
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  const jwtToken = await sign({ id: user.id }, secret);

  return c.json({
    jwt: jwtToken,
  });
});

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const secret = c.env.JWT_SECRET;
  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(401);
    return c.json({ error: "Unauthorized. Invalid credentials" });
  }

  const jwtToken = await sign({ id: user.id }, secret);
  return c.json({
    jwt: jwtToken,
  });
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("SignIn Route");
});

app.post("/api/v1/blog", (c) => {
  return c.text("Post Blog Route");
});
app.put("/api/v1/blog", (c) => {
  return c.text("Put Blog Route");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Show using the blog id");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("All blogs");
});

export default app;
