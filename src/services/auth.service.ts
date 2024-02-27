import bcrypt from "bcryptjs";
import UserModel from "../models/user.model";
import { generateJWT } from "../helpers";
import {
  ResponseAuth,
  ResponseValidateToken,
} from "../domain/auth-response.interface";
import {
  RequestLoginUser,
  RequestValidateToken,
} from "../domain/auth-request.interface";

const loginUser = async (request: RequestLoginUser): Promise<ResponseAuth> => {
  const { email, password } = request;
  try {
    // En caso no encuentre nada el findOne retorna null
    // Return the first "doc" that has the email sent for "req"
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        status: 400, // solicitud incorrecta
        ok: false,
        msg: `El usuario ${email} no se encuentra registrado`,
      };
    }
    // Validate password
    const validPassword = bcrypt.compareSync(password, user.password);
    // If not exist then the password is invalid
    if (!validPassword) {
      return {
        status: 400, // solicitud incorrecta
        ok: false,
        msg: `El password es incorrecto`,
      };
    }
    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    // return data from login
    return {
      status: 200, // ok
      ok: true,
      data: {
        uid: user.id,
        name: user.name,
        token,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500, // Error interno del servidor
      ok: false,
      msg: "Por favor hable con el administrador",
    };
  }
};
// ResponseAuth
const validateToken = async (
  request: RequestValidateToken
): Promise<ResponseValidateToken> => {
  const { uid, name } = request;
  try {
    // Generate new JWT
    const token = await generateJWT(uid, name);
    // return data from validateToken
    return {
      status: 200,
      ok: true,
      data: {
        uid,
        name,
        token,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      ok: false,
      msg: "No se pudo generar el token",
    };
  }
};

export const authService = {
  loginUser,
  validateToken,
};
