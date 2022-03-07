const { Router } = require("express");
const router = Router();
const screen = require("../models/screen");

// /test
router.get("/get-screen/:userId", async (req, res) => {
  try {
    const findScreen = await screen.findOne(req.query.userId);
    console.log(findScreen);
    res.status(201).json(findScreen);
  } catch (e) {
    res.status(500).json({ message: "Server error,try again..." });
    console.log(e);
  }
});
// /test/add-screen
router.post("/add-screen", async (req, res) => {
  try {
    const { id, userId, data } = req.body;
    const dateValue = `${Date.now()}`;
    const screenValue = { id, userId, date: dateValue, data };
    console.log(screenValue);

    screen
      .create(screenValue)
      .then((screenBase) => res.json(screenBase))
      .catch((err) => res.status(500).json(err));
  } catch (e) {
    res.status(500).json({ message: "Server error,try again..." });
    console.log(e);
  }
});

module.exports = router;
