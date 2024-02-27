import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

// const payload = { uid, name };
interface Ipayload {
  // Lo que recibimos al generar
  uid: string;
  name: string;
  // Siempre
  iat: number;
  exp: number;
}

export const jwtValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // x-token en HEADERS
  // Estamos atrapando lo que viene por cabecera con el nombre x-token
  const token = req.header("x-token");
  console.log("x-token: ", token);
  // No mandaron token
  if (!token) {
    // 401 no esta autenticado
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }
  try {
    const payload = jwt.verify(token, config.secretJwtSeed!) as Ipayload;
    console.log({ payload });
    req.body.uid = payload.uid;
    req.body.name = payload.name;    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "token no valido",
    });
  }
  next();
};
