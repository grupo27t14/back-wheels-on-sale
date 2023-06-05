import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  imageSchema,
  imageSchemaReq,
  imageSchemaRes,
} from "../schemas/image.schema";

type TImage = z.infer<typeof imageSchema>;
type TImageRequest = z.infer<typeof imageSchemaReq>;
type TImageResponse = z.infer<typeof imageSchemaRes>;
type TImageMany = DeepPartial<TImageRequest>;

export { TImage, TImageRequest, TImageResponse, TImageMany };
