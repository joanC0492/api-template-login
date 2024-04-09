import bcrypt from "bcryptjs";
import { UserModel } from "../models/user";
import { generateJWT } from "../helpers";
import {
  RequestLoginUser,
  RequestValidateToken,
  ResponseLoginUser,
  ResponseValidateToken,
} from "../domain/auth";

const loginUser = async ({
  email,
  password,
}: RequestLoginUser): Promise<ResponseLoginUser> => {
  try {
    // user exist validate in middleware "emailNotExist"
    const userFromDb = await UserModel.findOne({ email });
    if (!userFromDb)
      return {
        ok: false,
        status: 400,
        msg: `Usuario / Password no son correctos - correo`,
      };

    if (userFromDb.state === false)
      return {
        ok: false,
        status: 400,
        msg: `Usuario / Password no son correctos - state`,
      };

    // Validate password
    // If not exist then the password is invalid
    const validPassword = bcrypt.compareSync(password, userFromDb.password);
    if (!validPassword)
      return {
        ok: false,
        status: 400,
        msg: `Usuario / Password no son correctos - password`,
      };

    // Generate JWT
    const token = await generateJWT(userFromDb.id, userFromDb.name);

    // return data from login
    return {
      ok: true,
      status: 200,
      data: {
        uid: userFromDb.id,
        name: userFromDb.name,
        token,
      },
    };
  } catch (error) {
    let msg = "";
    if (error instanceof Error) msg += error.message;
    return {
      ok: false,
      status: 500,
      msg: `Por favor hable con el administrador | ${msg}`,
    };
  }
};

const validateToken = async ({
  uidAuthenticated,
  nameAuthenticated,
}: RequestValidateToken): Promise<ResponseValidateToken> => {
  try {
    // Generate new JWT
    const token = await generateJWT(uidAuthenticated, nameAuthenticated);
    // return data from validateToken
    return {
      ok: true,
      status: 200,
      data: {
        uid: uidAuthenticated,
        name: nameAuthenticated,
        token,
      },
    };
  } catch (error) {
    let msg = "";
    if (error instanceof Error) msg += error.message;
    return {
      ok: false,
      status: 500,
      msg: `No se pudo generar el token | ${msg}`,
    };
  }
};

export const authService = {
  loginUser,
  validateToken,
};
