import { Schema, model } from "mongoose";
import { User } from "../../domain/user";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El correo es obligatorio"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN_ROLE", "USER_ROLE", "SALE_ROLE"],
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  {
    // add "createdAt" "updatedAt"
    timestamps: true,
    // Delete "__v" in the document
    versionKey: false,
  }
);

// Esto no lo cambia en la BD
// Cambia en el retorno
UserSchema.methods.toJSON = function () {
  // Seleccionamos lo que no queremos mostrar
  // y al ...user le agregamos uid
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

// Name colection "users"
export const UserModel = model("user", UserSchema);
