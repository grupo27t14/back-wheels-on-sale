import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const userSchemaRequest = userSchema.omit({
  id: true,
});

const userSchemaUpdate = userSchema
  .omit({
    id: true,
  })
  .partial();

const userSchemaResponse = userSchema.omit({
  password: true,
});

const usersManySchema = z.array(userSchema);

export {
  userSchema,
  userSchemaRequest,
  userSchemaUpdate,
  userSchemaResponse,
  usersManySchema,
};
