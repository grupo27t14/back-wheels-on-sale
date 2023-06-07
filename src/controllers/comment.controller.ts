import { Request, Response } from "express";
import { createCommentService } from "../services/comment/createComment.service";
import { deleteCommentService } from "../services/comment/deleteComment.service";
import { listCommentsService } from "../services/comment/listComments.service";
import { updateCommentService } from "../services/comment/updateComment.service";

const createCommentController = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const carId = req.params.id;
  const comment = req.body;

  const newComment = await createCommentService(comment, carId, userId);

  return res.status(201).json(newComment);
};

const listCommentsController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const list = await listCommentsService(carId);

  return res.status(200).json(list);
};
const updateCommentController = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const commentData = req.body;
  const updated = await updateCommentService(commentId, commentData);

  return res.status(200).json(updated);
};

const deleteCommentController = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const deleted = await deleteCommentService(commentId);

  return res.status(204).send();
};
export {
  createCommentController,
  listCommentsController,
  updateCommentController,
  deleteCommentController,
};
