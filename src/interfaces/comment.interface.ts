import { z } from "zod";
import {
  commentSchema,
  commentSchemaRequest,
  commentSchemaResponse,
} from "../schemas/comment.schema";
import { DeepPartial } from "typeorm";

type Tcomment = z.infer<typeof commentSchema>;
type TcommentReq = z.infer<typeof commentSchemaRequest>;
type TcommentRes = z.infer<typeof commentSchemaResponse>;
type TcommentUpdate = DeepPartial<Tcomment>;

export { Tcomment, TcommentReq, TcommentRes, TcommentUpdate };
