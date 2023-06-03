import { Request, Response } from "express";
import listUserService from "../services/user/listUser.service";
import { createUserService } from "../services/user/createUser.service";
import updateUserService from "../services/user/updateUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import findUserService from "../services/user/getUserById.service";
import listUserCarsService from "../services/user/listUserCars.service";

// Controller para listar todos os Users
async function listUserController(req: Request, res: Response) {
  const user = await listUserService();

  return res.status(200).json(user);
}

//Controller para buscar usuário por id
async function findUserController(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await findUserService(userId);

    return res.status(200).json(user);
}

//Controller para buscar usuário por id
async function listUserCarsController(req: Request, res: Response) {
  const userId = req.params.id;
  const user = await listUserCarsService(userId);

  return res.status(200).json(user);
}

// Controller para criar um novo Users
async function createUserController(req: Request, res: Response) {
  const userData = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
}

// Controller para atualizar um User existente
async function updateUserController(req: Request, res: Response) {
  const userData = req.body;
  const idUser = req.params.id;
  const updatedUser = await updateUserService(userData, idUser);

  return res.json(updatedUser);
}

// Controller para excluir um User
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
};
