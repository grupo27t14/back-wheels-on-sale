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
  ensureUuidIsValidMiddleware,
} from "../middlewares";
import { commentSchemaRequest } from "../schemas/comment.schema";

const commentRoutes = Router();

// commentRoutes.use(ensureUuidIsValidMiddleware)

commentRoutes.post(
  "/:id",
  ensureUuidIsValidMiddleware,
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentSchemaRequest),
  createCommentController
);
commentRoutes.get("/:id", ensureUuidIsValidMiddleware, listCommentsController);
commentRoutes.patch(
  "/:id",
  ensureUuidIsValidMiddleware,
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentSchemaRequest),
  updateCommentController
);
commentRoutes.delete("/:id", ensureUuidIsValidMiddleware, ensureAuthMiddleware, deleteCommentController);

export { commentRoutes };
