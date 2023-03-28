import { init } from "@/app";
import { prisma } from "@/config";
import userService, { duplicatedUsernameError } from "@/services/users-service";
import faker from "@faker-js/faker";
import bcrypt from "bcrypt";
import { createUser as createUserSeed, createEvent as createEventSeed } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("createUser", () => {
  it("should throw duplicatedUserError if there is a user with given username", async () => {
    const existingUser = await createUserSeed();
    await createEventSeed();

    try {
      await userService.createUser({
        username: existingUser.username,
        password: faker.internet.password(6),
      });
      fail("should throw duplicatedUserError");
    } catch (error) {
      expect(error).toEqual(duplicatedUsernameError());
    }
  });

  it("should create user when given email is unique", async () => {
    const user = await userService.createUser({
      username: faker.internet.userName(),
      password: faker.internet.password(6),
    });

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(user).toEqual(
      expect.objectContaining({
        id: dbUser.id,
        username: dbUser.username,
      }),
    );
  });

  it("should hash user password", async () => {
    const rawPassword = faker.internet.password(6);
    const user = await userService.createUser({
      username: faker.internet.userName(),
      password: rawPassword,
    });

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(dbUser.password).not.toBe(rawPassword);
    expect(await bcrypt.compare(rawPassword, dbUser.password)).toBe(true);
  });
});
