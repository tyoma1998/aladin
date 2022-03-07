const { Router } = require("express");
const router = Router();
const event = require("../models/event");

router.post("/event-add", async (req, res) => {
  try {
    const { id, number, question, data } = req.body;
    const eventValue = { id, number, question, data };
    event
      .create(eventValue)
      .then((eventBase) => res.json(eventBase))
      .catch((error) =>
        res.status(404).json({ message: `Error,try again...${error}` })
      );
  } catch (e) {
    res.status(500).json({ message: "Server error,try again..." });
    console.log(e);
  }
});

router.get("/get-event/:id", async (req, res) => {
  try {
    const findEvent = await event.findOne({ number: req.params.id });
    console.log(findEvent);
    res.status(201).json(findEvent);
  } catch (e) {
    res.status(500).json({ message: "Server error,try again..." });
    console.log(e);
  }
});

router.put("/change-event/:id", async (req, res) => {
  try {
    const { value } = req.body;
    const findEvent = await event.findOne({ id: req.params.id });
    await event.updateOne(
      { id: req.params.id },
      {
        data: [...(findEvent?.data || []), value],
      }
    );

    res.send("Item Updated!");
  } catch (e) {
    res.status(500).json({ message: "Server error,try again..." });
    console.log(e);
  }
});

router.get("/get-event-all", async (req, res) => {
  try {
    console.log("----------");
    const findEvent = await event.find();
    console.log(findEvent);
    res.status(201).json(findEvent);
  } catch (e) {
    res.status(500).json({ message: "Server error,try again..." });
    console.log(e);
  }
});

module.exports = router;
