import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { Payload } from "../domain/types";
import { UserModel } from "../models/user";
import { UserFromDb } from "../domain/user";

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // x-token en HEADERS
  const token = req.header("x-token");
  // No mandaron token
  if (!token)
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });

  try {
    const payload = jwt.verify(token, config.secretJwtSeed) as Payload;

    const userAuthenticated: UserFromDb | null = await UserModel.findById(
      payload.uid
    );
    if (!userAuthenticated)
      return res.status(401).json({
        msg: "Usuario no registrado",
      });
    if (userAuthenticated.state === false)
      return res.status(401).json({
        msg: "Usuario no habilitado",
      });

    // userAuthenticated
    // req.body.uid = payload.uid;
    // req.body.name = payload.name;
    req.body.uidAuthenticated = payload.uid;
    req.body.nameAuthenticated = payload.name;
    req.body.userAuthenticated = userAuthenticated;
  } catch (error) {
    let msg = "";
    if (error instanceof Error) msg += error.message;
    return res.status(500).json({
      ok: false,
      msg: `Token no valido | ${msg}`,
    });
  }
  next();
};
