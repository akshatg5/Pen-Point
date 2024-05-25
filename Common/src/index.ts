import z  from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  name: z.string().optional(),
});

export const signInSchema = z.object({
  email : z.string().email(),
  password : z.string()
})

export const addBlogInput = z.object({
  title : z.string(),
  content : z.string()
})

export const updateBlogInput = z.object({
  title : z.string().optional(),
  content : z.string().optional()
})

export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>
export type AddBlogSchema = z.infer<typeof addBlogInput>
export type UpdateBlogSchema = z.infer<typeof updateBlogInput>