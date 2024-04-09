import { Schema, model } from "mongoose";
import { Role } from "../../domain/role";

const RoleSchema = new Schema<Role>({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

export const RoleModel = model("roles", RoleSchema);
