import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signUpSchema, signInSchema } from "@akshatgirdhar/blogmodules";

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
    const { success } = signUpSchema.safeParse(body);
    if (!success) {
      c.status(403);
      return c.json({
        message: "Invalid inputs.",
      });
    }
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
    const encoder = new TextEncoder();
    const hashedPassword = await crypto.subtle.digest(
      {
        name: "SHA-256",
      },
      encoder.encode(body.password)
    );

    const hashedPasswordString = Array.from(new Uint8Array(hashedPassword))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashedPasswordString,
        firstName: body.firstName,
        lastName: body.lastName,
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
    const success = signInSchema.safeParse(body);
    if (!success) {
      return c.json({ message: "Invalid inputs" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(401);
      return c.json({ error: "Unauthorized. Invalid credentials" });
    }

    const encoder = new TextEncoder();
    const hashedPassword = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(body.password)
    );

    const hashedPasswordString = Array.from(new Uint8Array(hashedPassword))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (hashedPasswordString !== user.password) {
      c.status(401);
      return c.json({
        error: "Invalid email or password.Try again!",
      });
    }

    const jwtToken = await sign({ id: user.id }, secret);
    return c.json({
      jwt: jwtToken,
    });
  } catch (error) {
    console.error("");
  }
});
