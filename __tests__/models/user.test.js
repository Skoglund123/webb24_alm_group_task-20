const { User } = require("../test-setup");


describe("User Model Validations", () => {
  it("should validate email format", async () => {
    const user = { username: "testuser1", email: "invalid-email" };
    try {
      await User.create(user);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors[0].path).toBe("email");
    }
  });

  it("should enforce unique username", async () => {
    const user1 = { username: "uniqueuser", email: "u1@example.com" };
    const user2 = { username: "uniqueuser", email: "u2@example.com" };
    await User.create(user1);

    try {
      await User.create(user2);
      fail("Should have thrown unique constraint error");
    } catch (error) {
      expect(error.name).toBe("SequelizeUniqueConstraintError");
      expect(error.errors[0].path).toBe("username");
    }
  });

  it("should enforce unique email", async () => {
    const user1 = { username: "userone", email: "duplicate@example.com" };
    const user2 = { username: "usertwo", email: "duplicate@example.com" };
    await User.create(user1);

    try {
      await User.create(user2);
      fail("Should have thrown unique constraint error");
    } catch (error) {
      expect(error.name).toBe("SequelizeUniqueConstraintError");
      expect(error.errors[0].path).toBe("email");
    }
  });

  it("should validate profileImage as a valid URL", async () => {
  const user = {
    username: "imageuser",
    email: "image@example.com",
    profileImage: "not-a-valid-url",
  };

  try {
    await User.create(user);
    fail("Should have thrown URL validation error");
  } catch (error) {
    expect(error.errors[0].path).toBe("profileImage");
    expect(error.errors[0].message).toMatch(/Validation isUrl/i);
  }
  });
});