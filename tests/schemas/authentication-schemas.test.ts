import { signInSchema } from "@/schemas";
import faker from "@faker-js/faker";

describe("signInSchema", () => {
  const generateValidInput = () => ({
    username: faker.internet.userName(),
    password: faker.internet.password(6),
  });

  describe("when username is not valid", () => {
    it("should return error if username is not present", () => {
      const input = generateValidInput();
      delete input.username;

      const { error } = signInSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if username does not follow valid username format", () => {
      const input = generateValidInput();
      input.username = faker.lorem.word(4);

      const { error } = signInSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when password is not valid", () => {
    it("should return error if password is not present", () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = signInSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is not a string", () => {
      const input = generateValidInput();

      const { error } = signInSchema.validate({ ...input, password: faker.datatype.number() });

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = signInSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
