import { SignInParams } from "@/services";
import Joi from "joi";

export const signInSchema = Joi.object<SignInParams>({
  username: Joi.string().required().min(5),
  password: Joi.string().required(),
});
