import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { orderRelatedService } from "@/services/orderRelated-service";

export async function allSenders(req: AuthenticatedRequest, res: Response) {
  try {
    const response = await orderRelatedService.findAllSenders();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.status === 404) {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function searchSender(req: AuthenticatedRequest, res: Response) {
  const { name } = req.params;

  try {
    const response = await orderRelatedService.selectSenders(name);
    res.status(httpStatus.OK).send(response);

    return;
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function searchRecipients(req: AuthenticatedRequest, res: Response) {
  const { name } = req.params;

  try {
    const response = await orderRelatedService.selectRecipients(name);
    res.status(httpStatus.OK).send(response);

    return;
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function searchDrivers(req: AuthenticatedRequest, res: Response) {
  const { name } = req.params;

  try {
    const response = await orderRelatedService.selectDrivers(name);
    res.status(httpStatus.OK).send(response);

    return;
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function searchDriversPlate(req: AuthenticatedRequest, res: Response) {
  const { plate } = req.params;

  try {
    const response = await orderRelatedService.selectDriversPlate(plate);
    res.status(httpStatus.OK).send(response);

    return;
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function postSender(req: AuthenticatedRequest, res: Response) {
  const body = req.body;

  try {
    const response = await orderRelatedService.createSender(body);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.status === 400) {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function postRecipient(req: AuthenticatedRequest, res: Response) {
  const body = req.body;

  console.log(body);

  try {
    const response = await orderRelatedService.createRecipient(body);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.status === 400) {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function postDriver(req: AuthenticatedRequest, res: Response) {
  const body = req.body;

  try {
    const response = await orderRelatedService.createDriver(body);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.status === 400) {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
