const { Accommodation } = require("../test-setup");
const { sequelize } = require("../../src/config/database");
const User = require("../../src/models/userModel");

describe("Accommodation Model Validations", () => {
  it("should validate required fields", async () => {
    const invalidAccommodation = {};

    try {
      await Accommodation.create(invalidAccommodation);
      fail("Should have thrown validation error");
    } catch (error) {
      const errorMessages = error.errors.map((err) => err.path);

      expect(errorMessages).toContain("address");
      expect(errorMessages).toContain("city");
      expect(errorMessages).toContain("country");
      expect(errorMessages).toContain("postalCode");
      expect(errorMessages).toContain("rent");
      expect(errorMessages).toContain("rooms");
    }
  });
});

describe("Accommodation Model Associations", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should delete accommodations when user is deleted (CASCADE)", async () => {
    const user = await User.create({
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    await Accommodation.create({
      address: "Testgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 5000,
      rooms: 2,
      userId: user.id,
    });

    let accommodations = await Accommodation.findAll();
    expect(accommodations.length).toBe(1);

    await user.destroy();

    accommodations = await Accommodation.findAll();
    expect(accommodations.length).toBe(0);
  });
});
