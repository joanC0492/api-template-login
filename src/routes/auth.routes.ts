/*
  Rutas de Usuarios / Auth
  host + api/v1/auth
  http://localhost:4001/api/v1/auth/[""|"renew"]
*/
import { Router } from "express";
import { check } from "express-validator";
import { loginUser, validateToken } from "../controllers/auth.controller";
import { fieldsValidate, jwtValidate } from "../middlewares";

const router: Router = Router();

// login
router.post(
  "/",
  [
    check("email").isEmail().withMessage("El email es obligatorio"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres"),
    fieldsValidate,
  ],
  loginUser
);

// Saber si estoy autenticado para ellos validamos el token
router.get("/renew", jwtValidate, validateToken);

export default router;