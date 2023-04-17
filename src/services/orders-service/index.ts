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

async function postOrder(userId: number, body: any){
  const senderVerify = await orderRelatedRepository.retrieveSenderByName(body.remetente.nome);
  if (!senderVerify) {
    throw requestError(404, "Remetente não encontrado no banco de dados");
  }

  const recipientVerify = await orderRelatedRepository.retrieveRecipientByName(body.destinatario.nome);
  if (!recipientVerify) {
    throw requestError(404, "Destinatário não encontrado no banco de dados");
  }

  const driverVerify1 = await orderRelatedRepository.retrieveDriverByName(body.motorista.nome);
  if (!driverVerify1) {
    throw requestError(404, "Motorista não encontrado no banco de dados");
  }

  const driverVerify2 = await ordersRepository.retrieveOrdersByDriver(driverVerify1.id);
  if (driverVerify2) {
    if (driverVerify2.driverFinishedService === false) {
      throw requestError(409, "Motorista ainda não finalizou sua viagem anterior");
    }
  }

  const Ids = {
    userId: userId,
    senderId: senderVerify.id,
    recipientId: recipientVerify.id,
    driverId: driverVerify1.id,
  };

  const post = await ordersRepository.insertOrder(Ids, body);
  if (!post) {
    throw requestError(400, "Request failed");
  }

  return post;
}

async function setFinishedTrip(orderId: number) {
  const verifyOrder = await ordersRepository.retrieveOrderByOrderId(orderId);
  if (!verifyOrder) {
    throw requestError(404, "Ordem não encontrada no banco de dados");
  }

  if (verifyOrder.driverFinishedService === true) {
    throw requestError(409, "O motorista já finalizou esta viagem");
  }

  const response = await ordersRepository.finishTrip(orderId);

  if (!response) {
    throw requestError(404, "Não foi possível finalizar a viagem");
  }

  return response;
}

async function setOrderAsPaid(orderId: number) {
  const verifyOrder = await ordersRepository.retrieveOrderByOrderId(orderId);

  if (!verifyOrder) {
    throw requestError(404, "Ordem não encontrada no banco de dados");
  }

  if (verifyOrder.isPaid === true) {
    throw requestError(409, "Ordem já foi paga");
  }

  const response = await ordersRepository.setPaidOrder(orderId);

  if (!response) {
    throw requestError(404, "Não foi possível marcar a ordem como paga");
  }

  return response;
}

async function removeOrder(orderId: number) {
  const verifyOrder = await ordersRepository.retrieveOrderByOrderId(orderId);
  if (!verifyOrder) {
    throw notFoundError();
  }

  const remove = await ordersRepository.deleteOrder(orderId);
  if (!remove) {
    throw requestError(400, "Não foi possível fazer a deleção da ordem");
  }

  return remove;
}

export const ordersService = {
  getOrders,
  postOrder,
  setFinishedTrip,
  setOrderAsPaid,
  removeOrder,
};
