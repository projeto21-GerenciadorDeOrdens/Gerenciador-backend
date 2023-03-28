import { ApplicationError } from "@/protocols";

export function duplicatedUsernameError(): ApplicationError {
  return {
    name: "username",
    message: "There is already an user with given username",
  };
}
