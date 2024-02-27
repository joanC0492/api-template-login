import bcrypt from "bcryptjs";
import UserModel from "../models/user.model";
import { generateJWT } from "../helpers";
import { ResponseAuth } from "../domain/auth-response.interface";
import { RequestCreateNewUser } from "../domain/user-request.interface";

const createNewUser = async (
  request: RequestCreateNewUser
): Promise<ResponseAuth> => {
  const { email, password } = request;
  try {
    // Search user | return <object || null>    
    const userFromDb = await UserModel.findOne({ email });
    // If return object then user exist
    if (userFromDb) {
      return {
        ok: false,
        msg: `Ya existe un usuario con el correo ${email}`,
        status: 400,
      };
    }
    // Create new Model
    const userDoc = new UserModel(request);
    // Encrypt Password
    const salt = bcrypt.genSaltSync();
    userDoc.password = bcrypt.hashSync(password, salt);
    // Save in MongoDB
    console.log({ userDoc });
    await userDoc.save();
    // Generate JWT
    const token = await generateJWT(userDoc.id, userDoc.name);
    
    return {
      ok: true,
      status: 201,
      data: {
        uid: userDoc.id,
        name: userDoc.name,
        token,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: "Por favor hable con el administrador",
      status: 500,
    };
  }
};

export const authService = {
  createNewUser,
};

// https://mongoosejs.com/docs/api/model.html#Model()