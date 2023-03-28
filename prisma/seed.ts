import { PrismaClient } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Rodrimar",
        logoImageUrl: "https://logo.fretebras.com.br/1427742372/transporte-rodrimar-lavras-mg-ramo-transportadora-atividade-geral_g.jpg",
        backgroundImageUrl: "linear-gradient(to right, #0000FF, #87CEFA)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
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
