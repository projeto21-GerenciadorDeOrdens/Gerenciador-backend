import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { ordersService } from "@/services";

export async function showOrders(req: AuthenticatedRequest, res: Response) {
  try {
    const response = await ordersService.getOrders();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function postOrder(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  const body = req.body;
  try {
    const response = await ordersService.postOrder(userId, body);

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error);
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
