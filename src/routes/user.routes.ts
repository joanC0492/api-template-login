/*
  Rutas de Usuarios / User
  host + api/v1/user
  http://localhost:4001/api/v1/user/["new"|"delete"|"update"]
*/
import { Router } from "express";
import { createNewUser } from "../controllers/user.controller";
import { fieldsValidate } from "../middlewares";
import { check } from "express-validator";

const router: Router = Router();

// Crear usuario
router.post(
  "/new",
  [
    check("name").notEmpty().withMessage("El nombre es obligatorio"),
    check("email").isEmail().withMessage("El email es obligatorio"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
      .withMessage(
        "La contraseña debe contener al menos un número, una letra mayúscula, una letra minúscula y un carácter especial(!@#$%^&*)"
      ),
    fieldsValidate,
  ],
  createNewUser
);

// Eliminar usuario
// router.put("/:id", deleteUser);

// Modificar usuario
// router.put("/:id", changeUser);

export default router;
