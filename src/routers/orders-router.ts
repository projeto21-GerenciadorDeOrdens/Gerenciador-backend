import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { showOrders, postOrder } from "@/controllers/orders-controller";

const ordersRouter = Router();

ordersRouter
    .all("/*", authenticateToken)
    .get("/", showOrders)
    .post("/", postOrder)

export {ordersRouter}