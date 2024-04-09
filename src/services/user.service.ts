import bcryptjs from "bcryptjs";
import { UserModel } from "../models/user";
import { generateJWT } from "../helpers";
import {
  RequestCreateUser,
  RequestDeleteUser,
  RequestListUsers,
  RequestUpdateUser,
  ResponseCreateUser,
  ResponseDeleteUser,
  ResponseListUsers,
  ResponseUpdateUser,
} from "../domain/user";

const createUser = async (
  request: RequestCreateUser
): Promise<ResponseCreateUser> => {
  const { password } = request;
  try {
    // Create new Model
    const userDoc = new UserModel(request);
    // Encrypt Password, default 10
    const salt = bcryptjs.genSaltSync(10);
    userDoc.password = bcryptjs.hashSync(password, salt);
    // Save in MongoDB
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
    let msg = "";
    if (error instanceof Error) msg += error.message;
    return {
      ok: false,
      status: 500,
      msg,
    };
  }
};

const listUsersPaginated = async ({
  limit = 5,
  offset = 0,
}: RequestListUsers): Promise<ResponseListUsers> => {
  const queryUsersValid = { state: true };
  try {
    const [users, totalUsers] = await Promise.all([
      UserModel.find(queryUsersValid).limit(limit).skip(offset),
      UserModel.countDocuments(queryUsersValid),
    ]);

    if (totalUsers === 0)
      return {
        ok: true,
        status: 200,
        msg: "No hay usuarios",
        data: {
          total: totalUsers,
          users,
        },
      };

    return {
      ok: true,
      status: 200,
      data: {
        total: totalUsers,
        users,
      },
    };
  } catch (error) {
    let msg = "";
    if (error instanceof Error) msg += error.message;
    return {
      ok: false,
      status: 500,
      msg,
    };
  }
};

const updateUser = async (
  {
    _id,
    uidAuthenticated,
    nameAuthenticated,
    userAuthenticated,
    password,
    email,
    ...rest
  }: RequestUpdateUser,
  id: string
): Promise<ResponseUpdateUser> => {
  try {
    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      rest.password = bcryptjs.hashSync(password, salt) as string;
    }
    const userFromDb = await UserModel.findByIdAndUpdate(id, rest);
    return {
      ok: true,
      status: 200,
      data: userFromDb!,
    };
  } catch (error) {
    let msg = "";
    if (error instanceof Error) msg += error.message;
    return {
      ok: false,
      status: 500,
      msg,
    };
  }
};

const deleteUser = async (
  { userAuthenticated }: RequestDeleteUser,
  idUpdateUser: string
): Promise<ResponseDeleteUser> => {
  try {
    const userFromDb = await UserModel.findByIdAndUpdate(idUpdateUser, {
      state: false,
    });
    return {
      ok: true,
      status: 200,
      data: {
        userUpdated: userFromDb!,
        userAuthenticated,
      },
    };
  } catch (error) {
    let msg = "";
    if (error instanceof Error) msg += error.message;
    return {
      ok: false,
      status: 500,
      msg,
    };
  }
};

export const userService = {
  createUser,
  listUsersPaginated,
  updateUser,
  deleteUser,
};

// https://mongoosejs.com/docs/api/model.html#Model()
