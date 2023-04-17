import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { ordersService } from "@/services";

export async function showOrders(req: AuthenticatedRequest, res: Response) {
  try {
    const response = await ordersService.getOrders();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error, "caindo catch");
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
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if(error.status === 409){
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function finishTrip(req: AuthenticatedRequest, res: Response) {
  const { orderId } = req.params;

  try {
    const response = await ordersService.setFinishedTrip(Number(orderId));
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    
    if (error.status === 404) {
      return res.status(httpStatus.NOT_FOUND).send(error.statusText);
    }
    return res.status(httpStatus.CONFLICT).send(error.statusText);
  }
}

export async function payOrder(req: AuthenticatedRequest, res: Response) {
  const { orderId } = req.params;
  try {
    const response = await ordersService.setOrderAsPaid(Number(orderId));
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    
    if (error.status === 404) {
      return res.status(httpStatus.NOT_FOUND).send(error.statusText);
    }
    return res.status(httpStatus.CONFLICT).send(error.statusText);
  }
}

export async function orderDelection(req: AuthenticatedRequest, res: Response) {
  const { orderId } = req.params;
  //fazer o retorno do erro 500 em todos os controllers;
  try {
    const response = ordersService.removeOrder(Number(orderId));
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error);
    if (error.status === 400) {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }
}
