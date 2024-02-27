import { Request, Response } from "express";
import { authService } from "../services/user.service";
import { RequestCreateNewUser } from "../domain/user-request.interface";
import { ResponseAuth } from "../domain/auth-response.interface";

const createNewUser = async (req: Request, res: Response) => {
  const request = req.body as RequestCreateNewUser;
  try {
    const { status, ...data }: ResponseAuth = await authService.createNewUser(
      request
    );
    res.status(status).json(data);
  } catch (error) {
    console.log(error);
  }
};

export { createNewUser };
