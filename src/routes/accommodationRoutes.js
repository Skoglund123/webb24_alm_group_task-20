const Accommodation = require("../models/accommodationModel");
const router = require("express").Router();

// Create a new accommodation
router.post("/", async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body);
    res.status(201).json(accommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all accommodations
router.get("/", async (req, res) => {
  try {
    const accommodations = await Accommodation.findAll();
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single accommodation by ID
router.get("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findByPk(req.params.id);
    if (accommodation) {
      res.json(accommodation);
    } else {
      res.status(404).json({ message: "Accommodation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an accommodation
router.put("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findByPk(req.params.id);
    if (accommodation) {
      await accommodation.update(req.body);
      res.json(accommodation);
    } else {
      res.status(404).json({ message: "Accommodation not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an accommodation
router.delete("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findByPk(req.params.id);
    if (accommodation) {
      await accommodation.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Accommodation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
