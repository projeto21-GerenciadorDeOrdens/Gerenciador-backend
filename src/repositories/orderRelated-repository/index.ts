import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function retrieveSenders(name: string) {
  const nome = name.toUpperCase();
  return await prisma.senders.findFirst({
    where: {
      name: nome,
    },
  });
}

async function retrieveRecipients(name: string) {
  const nome = name.toUpperCase();
  return await prisma.recipients.findFirst({
    where: {
      name: nome,
    },
  });
}

async function retrieveDrivers(name: string) {
  const nome = name.toUpperCase();
  return await prisma.drivers.findFirst({
    where: {
      name: nome,
    },
  });
}

const orderRelatedRepository = {
  retrieveDrivers,
  retrieveRecipients,
  retrieveSenders,
};

export default orderRelatedRepository;
