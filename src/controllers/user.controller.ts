import { Request, Response } from "express";
import { userService } from "../services/user.service";
import {
  RequestCreateUser,
  RequestListUsers,
  RequestUpdateUser,
  RequestDeleteUser,
} from "../domain/user";

const createUser = async (req: Request, res: Response): Promise<void> => {
  const request = req.body as RequestCreateUser;
  const { status, ...restResult } = await userService.createUser(request);
  res.status(status).json(restResult);
};

const listUsersPaginated = async (
  req: Request,
  res: Response
): Promise<void> => {
  const request = req.query as RequestListUsers;
  const { status, ...restResult } = await userService.listUsersPaginated(
    request
  );
  res.status(status).json(restResult);
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const request = req.body as RequestUpdateUser;
  const { status, ...restResult } = await userService.updateUser(request, id);
  res.status(status).json(restResult);
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const request = req.body as RequestDeleteUser;
  const { status, ...restResult } = await userService.deleteUser(request, id);
  res.status(status).json(restResult);
};

export { createUser, listUsersPaginated, updateUser, deleteUser };
