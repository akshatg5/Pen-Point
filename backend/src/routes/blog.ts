import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("authorization") || "";

  try {
    const user = await verify(header, c.env.JWT_SECRET);
    if (user.id) {
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

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({ id: blog.id });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.update({
      where: { id: body.id},
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return c.json({blogDetails : blog})
  } catch (error) {
    c.status(400)
    return c.json({message : "Cannot edit the blog!"})
  }
});
blogRouter.get("/:id", async (c) => {
  const blogId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: { id: blogId },
    });

    if (blog) {
      return c.json(blog);
    } else {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }
  } catch (error: any) {
    c.status(500);
    return c.json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // ADD PAGINATION
    const allBlogs = await prisma.post.findMany({
      where: {},
      select: { title: true },
    });

    return c.json({
      allBlogs,
    });
  } catch (error: any) {
    c.status(error.status);
    return c.json({ message: error.message });
  }
});
