import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Auth Routes
authRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const secret = c.env.JWT_SECRET;

    // add zod validation in this
    const body = await c.req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      c.json({
        Error:
          "This user already exists, create a new User OR Try Signin into exisitng account.",
      });
      throw new Error("This user already exists!");
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const jwtToken = await sign({ id: user.id }, secret);

    return c.json({
      jwt: jwtToken,
    });
  } catch (error) {
    c.status(401);
    console.error(error);
    return c.json({ Error: "Internal Server error!" });
  }
});

authRouter.post("/signin", async (c) => {
  try {
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
  } catch (error) {
    console.error("");
  }
});
