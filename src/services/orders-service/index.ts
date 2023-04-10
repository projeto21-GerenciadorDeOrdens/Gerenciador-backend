import { ordersRepository } from "@/repositories/orders-repository";
import { notFoundError, requestError } from "@/errors";
import orderRelatedRepository from "@/repositories/orderRelated-repository";

async function getOrders(): Promise<any[]> {
  const response = await ordersRepository.retrieveOrders();

  if (!response) {
    return [];
  }

  return response;
}

async function postOrder(userId: number, body: any) {
  const senderVerify = await orderRelatedRepository.retrieveSenders(body.remetente.nome);
  if (!senderVerify) {
    throw notFoundError();
  }

  const recipientVerify = await orderRelatedRepository.retrieveRecipients(body.destinatario.nome);
  if (!recipientVerify) {
    throw notFoundError();
  }

  const driverVerify = await orderRelatedRepository.retrieveDrivers(body.motorista.nome);
  if (!driverVerify) {
    throw notFoundError();
  }
  const Ids = {
    userId: userId,
    senderId: senderVerify.id,
    recipientId: recipientVerify.id,
    driverId: driverVerify.id,
  };

  const post = await ordersRepository.insertOrder(Ids, body);
  if (!post) {
    throw requestError(400, "Request failed");
  }

  return post;
}

export const ordersService = {
  getOrders,
  postOrder,
};
