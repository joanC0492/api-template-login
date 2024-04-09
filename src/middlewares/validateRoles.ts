import { NextFunction, Request, Response } from "express";
import { User } from "../domain/user";
import { typeRole } from "../domain/role";

const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const { userAuthenticated } = req.body as {
    userAuthenticated: User;
  };
  // No podemos usarlo sin antes tener el usuario que conseguimos con el token
  // En otras palabras se debe usar esta funcion despues de validar el JWT
  if (!userAuthenticated)
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });

  const { role, name } = userAuthenticated;
  if (role !== "ADMIN_ROLE")
    return res.status(401).json({
      msg: `${name} no es administrador - No puede hacer esto`,
    });
    
  next();
};

const hasRole = (roles: Array<typeRole>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { userAuthenticated } = req.body as {
      userAuthenticated: User;
    };

    if (!userAuthenticated)
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });

    const { role, name } = userAuthenticated;
    if (!roles.includes(role))
      res.status(401).json({
        msg: `${name} debe pertenecer a estos roles [${roles}]`,
      });

    next();
  };
};

export const validateRoles = {
  isAdminRole,
  hasRole,
};
