const { Router } = require('express');
const router = Router();
const album = require('../models/album');

// /album/add-album

router.post('/add-album', async (req, res) => {
  try {
    const { id, pageId, userId, data } = req.body;
    const dateValue = `${Date.now()}`;
    const albumValue = { id, userId, pageId, date: dateValue, data };
    album
      .create(albumValue)
      .then((albumBase) => res.json(albumBase))
      .catch((error) =>
        res.status(404).json({ message: `Error,try again...${error}` })
      );
  } catch (e) {
    res.status(500).json({ message: 'Server error,try again...' });
    console.log(e);
  }
});

// /album/get-album/:userId
router.get('/get-album/:userId', async (req, res) => {
  try {
    const findAlbum = await album.findOne(req.query.userId);
    console.log(findAlbum);
    res.status(201).json(findAlbum);
  } catch (e) {
    res.status(500).json({ message: 'Server error,try again...' });
    console.log(e);
  }
});

module.exports = router;
