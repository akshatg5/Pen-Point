import { Hono } from "hono";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();
  
blogRouter.use('/*',(c) => {
    next()
    c.json({"msg" : "Processing"})
})  

blogRouter.post("/blog", (c) => {
    return c.text("Post Blog Route");
  });
  blogRouter.put("/blog", (c) => {
    return c.text("Put Blog Route");
  });
  
  blogRouter.get("/blog/:id", (c) => {
    return c.text("Show using the blog id");
  });
  
  blogRouter.get("/bulk", (c) => {
    return c.text("All blogs");
  });