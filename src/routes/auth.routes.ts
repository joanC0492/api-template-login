/*
  Rutas de Usuarios / Auth
  host + api/v1/auth
  http://localhost:4001/api/v1/auth/[""|"renew"]
*/
import { Router } from "express";
import { check } from "express-validator";
import { loginUser, validateToken } from "../controllers/auth.controller";
import { validateFields, validateJWT } from "../middlewares";

const router: Router = Router();

// http://localhost:4001/api/v1/auth
// Body - raw - JSON
router.post(
  "/",
  [
    check("email").isEmail().withMessage("El email es obligatorio"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres"),
    validateFields,
  ],
  loginUser
);

// http://localhost:4001/api/v1/auth/renew
// Saber si estoy autenticado para ellos validamos el token
router.get("/renew", validateJWT, validateToken);

export default router;
