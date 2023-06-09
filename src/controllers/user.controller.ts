import { Request, Response } from "express";
import listUserService from "../services/user/listUser.service";
import { createUserService } from "../services/user/createUser.service";
import updateUserService from "../services/user/updateUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import findUserService from "../services/user/getUserById.service";
import listUserCarsService from "../services/user/listUserCars.service";
import getMyDataService from "../services/user/getMyData.service";


async function listUserController(req: Request, res: Response) {
  const users = await listUserService();

  return res.status(200).json(users);
}

async function findUserController(req: Request, res: Response) {
  const userId = req.params.id;
  const user = await findUserService(userId);

  return res.status(200).json(user);
}

async function getMyDataController(req: Request, res: Response) {
  const idUser = req.params.id;
  const user = await getMyDataService(idUser)

  return res.status(200).json(user);
}

async function listUserCarsController(req: Request, res: Response) {
  const userId = req.params.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 2;
  const baseUrl = req.get('host') as string;
  const userCars = await listUserCarsService(userId, page, limit, baseUrl);

  return res.status(200).json(userCars);
}

async function createUserController(req: Request, res: Response) {
  const userData = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
}

async function updateUserController(req: Request, res: Response) {
  const userData = req.body;
  const idUser = req.params.id;
  const updatedUser = await updateUserService(userData, idUser);

  return res.json(updatedUser);
}

async function deleteUserController(req: Request, res: Response) {
  await deleteUserService(req.params.id);

  return res.status(204).send();
}

export {
  listUserController,
  findUserController,
  listUserCarsController,
  createUserController,
  updateUserController,
  deleteUserController,
  getMyDataController
};
