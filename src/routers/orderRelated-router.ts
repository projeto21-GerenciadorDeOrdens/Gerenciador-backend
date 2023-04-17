import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  searchSender,
  postSender,
  searchDrivers,
  searchRecipients,
  postDriver,
  postRecipient,
  searchDriversPlate,
  allSenders,
} from "@/controllers/orderRelated-controller";

const orderRelatedRouter = Router();

orderRelatedRouter
  .all("/*", authenticateToken)
  .get("/sender", allSenders)
  .get("/sender/:name", searchSender)
  .get("/recipient/:name", searchRecipients)
  .get("/driver/:name", searchDrivers)
  .get("/plate/:plate", searchDriversPlate)
  .post("/sender", postSender)
  .post("/recipient", postRecipient)
  .post("/driver", postDriver);

export { orderRelatedRouter };
