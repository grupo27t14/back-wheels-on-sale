import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  listCommentsController,
  updateCommentController,
} from "../controllers/comment.controller";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
} from "../middlewares";
import { commentSchemaRequest } from "../schemas/comment.schema";

const commentRoutes = Router();

commentRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentSchemaRequest),
  createCommentController
);
commentRoutes.get("", listCommentsController);
commentRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentSchemaRequest),
  updateCommentController
);
commentRoutes.delete("/:id", ensureAuthMiddleware, deleteCommentController);

export { commentRoutes };
