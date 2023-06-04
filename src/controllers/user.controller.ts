import { Request, Response } from "express";
import listUserService from "../services/user/listUser.service";
import { createUserService } from "../services/user/createUser.service";
import updateUserService from "../services/user/updateUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import findUserService from "../services/user/getUserById.service";
import listUserCarsService from "../services/user/listUserCars.service";

// async function listUserController(req: Request, res: Response) {
//   const user = await listUserService();

//   return res.status(200).json(user);
// }

async function listUserController(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5; // quantidade de elementos por página

  const { users, totalCount } = await listUserService(page, limit);

  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;
  
  const baseUrl = "http://localhost:3000/";
  const rota = "user";

  const nextPageUrl = nextPage ? `${baseUrl}${rota}?page=${nextPage}` : null;
  const previousPageUrl = previousPage ? `${baseUrl}${rota}?page=${previousPage}` : null;

  return res.status(200).json({
    users,
    totalCount,
    currentPage: page,
    totalPages,
    nextPage: nextPageUrl,
    previousPage: previousPageUrl,
  });
}

async function findUserController(req: Request, res: Response) {
  const userId = req.params.id;
  const user = await findUserService(userId);

  return res.status(200).json(user);
}

// async function listUserCarsController(req: Request, res: Response) {
//   const userId = req.params.id;
//   const user = await listUserCarsService(userId);

//   return res.status(200).json(user);
// }

async function listUserCarsController(req: Request, res: Response) {
  const userId = req.params.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 2;

  const { cars: userCars, totalCount } = await listUserCarsService(userId, page, limit);

  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  const baseUrl = "http://localhost:3000/";
  const rota = `user/${userId}/cars`;

  const nextPageUrl = nextPage ? `${baseUrl}${rota}?page=${nextPage}&limit=${limit}` : null;
  const previousPageUrl = previousPage ? `${baseUrl}${rota}?page=${previousPage}&limit=${limit}` : null;

  return res.status(200).json({
    userCars,
    totalCount,
    currentPage: page,
    totalPages,
    nextPage: nextPageUrl,
    previousPage: previousPageUrl,
  });
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
};
