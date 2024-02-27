import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import {
  RequestLoginUser,
  RequestValidateToken,
} from "../domain/auth-request.interface";

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const request = req.body as RequestLoginUser;
  try {
    const { status, ...data } = await authService.loginUser(request);
    res.status(status).json(data);
  } catch (error) {
    console.log(error);
  }
};

const validateToken = async (req: Request, res: Response): Promise<void> => {
  const request = req.body as RequestValidateToken;
  try {
    const { status, ...data } = await authService.validateToken(request);
    res.status(status).json(data);
  } catch (error) {
    console.log(error);
  }
};

export { loginUser, validateToken };
