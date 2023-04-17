import { prisma } from "@/config";

async function retrieveOrders() {
  const response = await prisma.orders.findMany({
    include: {
      User: true,
      Sender: true,
      Recipient: true,
      Driver: true,
    },
  });
  return response;
}

async function retrieveOrdersByDriver(driverId: number) {
  const response = await prisma.orders.findFirst({
    where: {
      driverId: driverId,
      driverFinishedService: false,
    },
  });
  return response;
}

async function retrieveOrderByOrderId(orderId: number) {
  const response = await prisma.orders.findFirst({
    where: {
      id: orderId,
    },
  });

  return response;
}

async function insertOrder(Ids: any, body: any) {
  const post = await prisma.orders.create({
    data: {
      userId: Ids.userId,
      senderId: Ids.senderId,
      recipientId: Ids.recipientId,
      driverId: Ids.driverId,
      freight: body.frete,
      weight: body.peso,
      toll: body.pedagio,
      taxes: body.imposto,
      advance: body.adiantamento,
      gas: body.abastecimento,
      cte: body.cte,
      cteValue: body.valorcte,
      notes: body.observacao,
      isPaid: false,
      driverFinishedService: false,
    },
  });
  return post;
}

async function finishTrip(orderId: number) {
  const update = await prisma.orders.update({
    where: {
      id: orderId,
    },
    data: {
      driverFinishedService: true,
    },
  });
  return update;
}

async function setPaidOrder(orderId: number) {
  const set = await prisma.orders.update({
    where: {
      id: orderId,
    },
    data: {
      isPaid: true,
    },
  });
  return set;
}

async function deleteOrder(orderId: number) {
  return await prisma.orders.delete({
    where: {
      id: orderId,
    },
  });
}

export const ordersRepository = {
  retrieveOrders,
  insertOrder,
  retrieveOrdersByDriver,
  finishTrip,
  retrieveOrderByOrderId,
  setPaidOrder,
  deleteOrder,
};
