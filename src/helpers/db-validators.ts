import { RoleModel } from "../models/role";
import { UserModel } from "../models/user";

// Da error si el rol no existe en la coleeciones roles
export const isRoleValid = async (rol = ""): Promise<void> => {
  const hasRole = await RoleModel.findOne({ rol });
  if (!hasRole) throw new Error(`El rol '${rol}' no esta registrado en la BD`);
};

// Da error si el email existe en la coleccion users
export const emailExist = async (email = ""): Promise<void> => {
  const hasEmail = await UserModel.findOne({ email });
  if (!!hasEmail)
    throw new Error(`El email '${email}' ya esta registrado en la BD`);
};

// Da error si el email No existe en la coleccion users
export const emailNotExist = async (email = ""): Promise<void> => {
  const hasEmail = await UserModel.findOne({ email });
  if (!hasEmail)
    throw new Error(`El usuario ${email} no se encuentra registrado`);
};

// Da error si el id no existe
export const idExist = async (id = ""): Promise<void> => {
  const hasId = await UserModel.findById(id);
  if (!hasId) throw new Error(`El id '${id}' no esta registrado en la BD`);
};
