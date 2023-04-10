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
    },
  });
  return post;
}

export const ordersRepository = {
  retrieveOrders,
  insertOrder,
};
