import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function usersPost(req: Request, res: Response) {
  
  const { username, password } = req.body;

  try {
    const user = await userService.createUser({ username, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
