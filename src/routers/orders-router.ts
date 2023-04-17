import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { showOrders, postOrder, finishTrip, payOrder, orderDelection } from "@/controllers/orders-controller";

const ordersRouter = Router();

ordersRouter
  .all("/*", authenticateToken)
  .get("/", showOrders)
  .post("/", postOrder)
  .put("/finish/:orderId", finishTrip)
  .put("/pay/:orderId", payOrder)
  .delete("/:orderId", orderDelection);

export { ordersRouter };
