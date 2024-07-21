import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const likesRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

likesRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  try {
    const user = await verify(header, c.env.JWT_SECRET);
    if (typeof user.id == "string") {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(401);
      return c.json({ error: "Unauthorized!" });
    }
  } catch (error) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
});

likesRouter.post("/createLike", async (c) => {
  try {
    const likedBy = c.get("userId");
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postExists = await prisma.post.findFirst({
      where: { id: body.postId },
    });

    if (!postExists) {
      throw new Error("Invalid Post, try again!");
    }

    const checkIfLikeExists = await prisma.likes.findFirst({
      where: { postId: body.postId, likedByUserId: likedBy },
    });

    if (checkIfLikeExists) {
      throw new Error(`${likedBy} has already liked ${body.postId}`);
    }

    const likeObj = await prisma.likes.create({
      data: {
        likedByUserId: likedBy,
        postId: body.postId,
      },
    });

    return c.json({ message: `${likedBy} liked the ${body.postId}`, likeObj });
  } catch (error) {
    c.status(400);
    return c.json({ error: "Error in creating like" });
  }
});

likesRouter.get("/getLikesOnPost/:postId", async (c) => {
  const postId = c.req.param("postId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const getLikesOnPost = await prisma.post.findMany({
    where: { id: postId },
    select: { likes: true },
  });

  const getLikesCountOnPost = await prisma.likes.count({
    where: { postId: postId },
  });

  return c.json({
    message: "getLikesOnPost success!",
    getLikesOnPost,
    getLikesCountOnPost,
    status: 200,
  });
});

likesRouter.get('/userHasLikedPost/:postId',async (c) => {
  try {
    const userId = c.get("userId")
    const postId = c.req.param("postId")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const likedPost = await prisma.likes.findFirst({
      where : {likedByUserId : userId,postId:postId}
    })

    if (likedPost) {
      return c.json({
        liked : true,
        message : "user has liked the post",
        status : 200
      })
    } else {
      return c.json({
        liked: false,
        message : "user has not liked the post",
        status : 404
      })
    }
  } catch (error) {
    return c.json({
      liked : false,
      message : "Internal Server Error",
      status : 400
    })
  }
})

likesRouter.get("/getLikedPostsByUserId", async (c) => {
  try {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const likedPosts = await prisma.user.findMany({
      where: { id: userId },
      select: {
        likes: {
          select: {
            post: true,
          },
        },
      },
    });

    return c.json({
      message: "Fetched liked posts by userId",
      likedPosts,
      status: 200,
    });
  } catch (error) {
    return c.json({
      message: "Error in fetching liked posts",
      status: 400,
    });
  }
});
