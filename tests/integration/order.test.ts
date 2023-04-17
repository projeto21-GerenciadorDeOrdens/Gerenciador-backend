import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { prisma } from "@/config";
import redis from "@/config/databaseCache";
import faker from "@faker-js/faker";
import * as jwt from "jsonwebtoken";
import { cleanDb, generateValidToken } from "../helpers";
import { createUser } from "../factories";
import {
  generateDriver,
  generateNotPaidOrder,
  generateOrderWithFinishedTrip,
  generateOrderWithUnfinishedTrip,
  generatePaidOrder,
  generateRecipient,
  generateSender,
} from "../factories/orders-factory";
import { sensitiveHeaders } from "http2";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
  await redis.flushDb();
});

const server = supertest(app);

describe("GET /orders", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/orders");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/orders").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/orders").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with an empty array if there is no orders", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/orders").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);

      expect(response.body).toEqual([]);
    });
  });
});

describe("POST /orders", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/orders");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/orders").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/orders").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 401 if there is no body", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post("/orders").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 404 if there is no sender with given name", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const body = {
        remetente: {
          nome: faker.name.findName(),
        },
      };

      const response = await server.post("/orders").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 if there is no recipient with given name", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const sender = await generateSender();

      const body = {
        remetente: {
          nome: sender.name,
        },
        destinatario: {
          nome: faker.company.companyName(),
        },
      };

      const response = await server.post("/orders").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 if there is no driver with given name", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const sender = await generateSender();
      const recipient = await generateRecipient();

      const body = {
        remetente: {
          nome: sender.name,
        },
        destinatario: {
          nome: recipient.name,
        },
        motorista: {
          nome: faker.name.findName(),
        },
      };

      const response = await server.post("/orders").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 409 if driver has not finished previous trip", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const sender = await generateSender();
      const recipient = await generateRecipient();
      const driver = await generateDriver();
      await generateOrderWithUnfinishedTrip(user.id, sender.id, recipient.id, driver.id);

      const body = {
        remetente: {
          nome: sender.name,
        },
        destinatario: {
          nome: recipient.name,
        },
        motorista: {
          nome: driver.name,
        },
      };

      const response = await server.post("/orders").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 if there is no order with given id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.put(`/orders/finish/${0}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 409 if driver already finished trip", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const sender = await generateSender();
      const recipient = await generateRecipient();
      const driver = await generateDriver();
      const order = await generateOrderWithFinishedTrip(user.id, sender.id, recipient.id, driver.id);

      const response = await server.put(`/orders/finish/${order.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 200 trip is finished", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const sender = await generateSender();
        const recipient = await generateRecipient();
        const driver = await generateDriver();
        const order = await generateOrderWithUnfinishedTrip(user.id, sender.id, recipient.id, driver.id);
  
        const response = await server.put(`/orders/finish/${order.id}`).set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toBe(httpStatus.OK);
      });

      it("should respond with status 404 if there is no order with given id", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
  
        const response = await server.put(`/orders/pay/${0}`).set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it("should respond with status 409 if order is already paid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const sender = await generateSender();
        const recipient = await generateRecipient();
        const driver = await generateDriver();
        const order = await generatePaidOrder(user.id, sender.id, recipient.id, driver.id);
  
        const response = await server.put(`/orders/pay/${order.id}`).set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toBe(httpStatus.CONFLICT);
      });

      it("should respond with status 200 if order was paid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const sender = await generateSender();
        const recipient = await generateRecipient();
        const driver = await generateDriver();
        const order = await generateNotPaidOrder(user.id, sender.id, recipient.id, driver.id);
  
        const response = await server.put(`/orders/pay/${order.id}`).set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toBe(httpStatus.OK);
      });
  });
});
