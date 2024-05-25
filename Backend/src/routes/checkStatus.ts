import { Hono } from "hono";

export const statusRouter = new Hono<{}>();

statusRouter.get('/',(c) => {
    return c.json({
        message : "Blog backend is up"
    })
})
  