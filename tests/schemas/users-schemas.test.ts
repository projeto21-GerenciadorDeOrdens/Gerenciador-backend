import { createUserSchema } from "@/schemas";
import faker from "@faker-js/faker";

describe("createUserSchema", () => {
  const generateValidInput = () => ({
    username: faker.internet.userName(),
    password: faker.internet.password(6),
  });

  describe("when username is not valid", () => {
    it("should return error if username is not present", () => {
      const input = generateValidInput();
      delete input.username;

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if username does not follow valid username format", () => {
      const input = generateValidInput();
      input.username = faker.lorem.word(4);

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when password is not valid", () => {
    it("should return error if password is not present", () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is shorter than 6 characters", () => {
      const input = generateValidInput();
      input.password = faker.lorem.word(4);

      const { error } = createUserSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = createUserSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
