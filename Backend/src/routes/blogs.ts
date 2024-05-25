import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { addBlogInput,updateBlogInput } from '@akshatgirdhar/blogmodules'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
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

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {success} = addBlogInput.safeParse(body)
  if (!success) {
    return c.json({message : 'invalid inputs'})
  }
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

blogRouter.put("/:id", async (c) => {
  const blogId = c.req.param("id");
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body)
  if (!success) {
    return c.json({message : "Invalid inputs"})
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.update({
      where: { id: blogId },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ blogDetails: blog });
  } catch (error) {
    c.status(400);
    return c.json({ message: "Cannot edit the blog!" });
  }
});

// direcly /:id should not be used bec then the code will take any other routes /anything as /"
blogRouter.get("/page/:id", async (c) => {
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
      const page = parseInt(c.req.query("page") || "1");
      const pageSize = parseInt(c.req.query("pageSize") || "10");
  
      if (isNaN(page) || isNaN(pageSize) || page <= 0 || pageSize <= 0) {
        c.status(400);
        return c.json({ message: "Invalid page number or page Size." });
      }
  
      const skip = (page - 1) * pageSize;
  
      const allBlogs = await prisma.post.findMany({
        skip: skip,
        take: pageSize,
        select: { title: true },
      });
  
      const totalBlogs = await prisma.post.count();
      const totalPages = Math.ceil(totalBlogs / pageSize);
  
      return c.json({
        page,
        pageSize,
        totalPages,
        totalBlogs,
        allBlogs,
      });
    } catch (error: any) {
      c.status(error.status || 500);
      console.log(error);
      return c.json({ message: error.message });
    } finally {
      await prisma.$disconnect();
    }
  });
