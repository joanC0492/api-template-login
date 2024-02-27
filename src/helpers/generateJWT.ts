import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateJWT = (uid: string, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // grabamos uid y name en el token
    const payload = { uid, name };
    // Permite saber al backend si el token es el que yo genere o no
    jwt.sign(
      payload,
      // Firmamos nuestro token
      config.secretJwtSeed,
      {
        // El token expira en 2 horas
        expiresIn: "2h",
        // expiresIn: "20s",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token!);
      }
    );
  });
};
