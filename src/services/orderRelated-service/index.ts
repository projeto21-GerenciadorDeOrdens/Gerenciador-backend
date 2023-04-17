import { notFoundError, requestError } from "@/errors";
import orderRelatedRepository from "@/repositories/orderRelated-repository";

async function findAllSenders(){
  const response = await orderRelatedRepository.retrieveSenders();

  if(!response){
    throw notFoundError();
  }
 
  return response
}

async function selectSenders(name: string) {
  const response = await orderRelatedRepository.retrieveSenderByName(name);

  if (!response) {
    throw notFoundError();
  }

  return response;
}

async function selectRecipients(name: string) {
  const response = await orderRelatedRepository.retrieveRecipientByName(name);

  if (!response) {
    throw notFoundError();
  }

  return response;
}

async function selectDrivers(name: string) {
  const response = await orderRelatedRepository.retrieveDriverByName(name);

  if (!response) {
    throw notFoundError();
  }

  return response;
}

async function selectDriversPlate(plate: string) {
  const response = await orderRelatedRepository.retrieveDriverByPlate(plate);

  if (!response) {
    throw notFoundError();
  }

  return response;
}

async function createSender(body: any) {
  const verifySender = await orderRelatedRepository.retrieveSenderByName(body.remetente);
  if (!verifySender) {
    const response = await orderRelatedRepository.insertSenders(body.remetente, body.cidaderemetente, body.ufremetente);

    if (!response) {
      throw requestError(400, "Impossível realizar esta requisição");
    }

    return response;
  }
}

async function createRecipient(body: any) {
  const verifyRecipient = await orderRelatedRepository.retrieveRecipientByName(body.destinatario);
  if (!verifyRecipient) {
    const response = await orderRelatedRepository.insertRecipients(
      body.destinatario,
      body.cidadedestinatario,
      body.ufdestinatario,
    );

    if (!response) {
      throw requestError(400, "Impossível realizar esta requisição");
    }
    return response;
  }
}

async function createDriver(body: any) {
  const verifyDriver = await orderRelatedRepository.retrieveDriverByName(body.motorista);
  if (!verifyDriver) {
    const response = await orderRelatedRepository.insertDrivers(body.motorista, body.placa);

    if (!response) {
      throw requestError(400, "Impossível realizar esta requisição");
    }

    return response;
  }
}

export const orderRelatedService = {
  selectRecipients,
  selectSenders,
  createSender,
  createRecipient,
  createDriver,
  selectDrivers,
  selectDriversPlate,
  findAllSenders
};
