import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function retrieveSenderByName(name: string) {
  return await prisma.senders.findFirst({
    where: {
      name,
    },
  });
}

async function retrieveSenders() {
  return await prisma.senders.findMany({});
}

async function retrieveRecipientByName(name: string) {
  return await prisma.recipients.findFirst({
    where: {
      name,
    },
  });
}

async function retrieveRecipients() {
  return await prisma.recipients.findMany({});
}

async function retrieveDriverByName(name: string) {
  const nome = name.replace("%", " ").toUpperCase();
  return await prisma.drivers.findFirst({
    where: {
      name: nome,
    },
  });
}

async function retrieveDriverByPlate(plate: string) {
  const placa = plate.toUpperCase();
  return await prisma.drivers.findFirst({
    where: {
      plate: placa,
    },
  });
}

async function retrieveDrivers() {
  return await prisma.drivers.findMany({});
}

async function insertSenders(name: string, city: string, state: string) {
  return await prisma.senders.create({
    data: {
      name: name.toUpperCase(),
      city,
      state,
    },
  });
}

async function insertRecipients(name: string, city: string, state: string) {
  return await prisma.recipients.create({
    data: {
      name: name.toUpperCase(),
      city,
      state,
    },
  });
}

async function insertDrivers(name: string, plate: string) {
  return await prisma.drivers.create({
    data: {
      name,
      plate,
    },
  });
}

const orderRelatedRepository = {
  retrieveDriverByName,
  retrieveRecipientByName,
  retrieveSenderByName,
  retrieveDrivers,
  retrieveSenders,
  retrieveRecipients,
  insertDrivers,
  insertRecipients,
  insertSenders,
  retrieveDriverByPlate,
};

export default orderRelatedRepository;
