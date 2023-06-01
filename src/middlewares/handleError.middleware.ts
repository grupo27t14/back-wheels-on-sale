import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppErrors";

export const handleErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: error.flatten().fieldErrors,
    });
  }

  console.error(error);
  return response.status(500).json({ message: "Internal server error" });
};
