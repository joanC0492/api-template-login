/*
  Rutas de Usuarios / User
  host + api/v1/user
  http://localhost:4001/api/v1/user/["new"|"delete"|"update"]
*/
import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  listUsersPaginated,
  updateUser,
} from "../controllers/user.controller";
import { emailExist, idExist, isRoleValid } from "../helpers";
import { validateFields, validateJWT } from "../middlewares";
import { validateRoles } from "../middlewares/validateRoles";

const router: Router = Router();

// http://localhost:4001/api/v1/user/new
// Body -- raw - JSON
router.post(
  "/new",
  [
    check("name").notEmpty().withMessage("El nombre es obligatorio"),
    check("email").isEmail().withMessage("El email es obligatorio"),
    check("role").notEmpty().withMessage("El role es obligatorio"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
      .withMessage(
        "La contraseña debe contener al menos un número, una letra mayúscula, una letra minúscula y un carácter especial(!@#$%^&*)"
      ),
    check("role").custom(isRoleValid),
    check("email").custom(emailExist),
    validateFields,
  ],
  createUser
);

// http://localhost:4001/api/v1/user?limit=10&offset=3
// Params - Query Params
// req.query
router.get("/", [validateJWT, validateRoles.isAdminRole], listUsersPaginated);

// http://localhost:4001/api/v1/user/<:id>
// req.params
router.put(
  "/:id",
  [
    validateJWT,
    validateRoles.isAdminRole,
    check("id").isMongoId().withMessage("No es un ID valido"),
    check("id").custom(idExist),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  updateUser
);

// Eliminar usuario
// http://localhost:4001/api/v1/user/<:id>
// req.params
router.delete(
  "/:id",
  [validateJWT, validateRoles.hasRole(["ADMIN_ROLE", "SALE_ROLE"])],
  deleteUser
);

export default router;
