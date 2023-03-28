import { cannotEnrollBeforeStartDateError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import eventsService from "../events-service";
import { duplicatedUsernameError } from "./errors";

export async function createUser({ username, password }: CreateUserParams): Promise<User> {
  
  await canEnrollOrFail();
  
  await validateUniqueUsernameOrFail(username);
  
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const posting = await userRepository.create({
    username,
    password: hashedPassword,
  });

  

  return posting 
}

async function validateUniqueUsernameOrFail(username: string) {
  const userWithSameUsername = await userRepository.findByUsername(username);
  if (userWithSameUsername) {
    throw duplicatedUsernameError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

export type CreateUserParams = Pick<User, "username" | "password">;

const userService = {
  createUser,
};

export * from "./errors";
export default userService;
