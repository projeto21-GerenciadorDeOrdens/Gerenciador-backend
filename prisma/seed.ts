import { PrismaClient } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Rodrimar",
        logoImageUrl:
          "https://logo.fretebras.com.br/1427742372/transporte-rodrimar-lavras-mg-ramo-transportadora-atividade-geral_g.jpg",
        backgroundImageUrl: "linear-gradient(to right, #0000FF, #87CEFA)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let sender = await prisma.senders.findFirst();
  let senders = {};
  if (!sender) {
    senders = await prisma.senders.createMany({
      data: [
        {
          name: "SN",
          city: "Ijaci",
          state: "MG",
        },
        {
          name: "INTERCEMENT",
          city: "Ijaci",
          state: "MG",
        },
      ],
    });
  }

  let recipient = await prisma.recipients.findFirst();
  let recipients = {};
  if (!recipient) {
    recipients = await prisma.recipients.createMany({
      data: [
        {
          name: "METALCORE",
          city: "Sao Paulo",
          state: "SP",
        },
        {
          name: "CHEMICAL",
          city: "Pinheiros",
          state: "PR",
        },
      ],
    });
  }

  let driver = await prisma.drivers.findFirst();
  let drivers = {};
  if (!driver) {
    drivers = await prisma.drivers.createMany({
      data: [
        {
          name: "MARIO LUCIO DA SILVA",
          plate: "AAA-0A00",
        },
        {
          name: "JOAO DA SILVA RIBEIRO",
          plate: "OOO-1O11",
        },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
