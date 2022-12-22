module.exports = app => {
    const tiles = require("../controllers/tile.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tile
    router.post("/", tiles.create)
  
    // Retrieve all tiles
    router.get("/", tiles.findAll);
  
    // Retrieve all public tiles
    router.get("/public", tiles.findAllPublic);
  
    // Retrieve a single tile with id
    router.get("/:id", tiles.findOne);
  
    // Update a tile with id
    router.put("/:id", tiles.update);
  
    // Delete a tile with id
    router.delete("/:id", tiles.delete);
  
    // Delete all tiles
    router.delete("/", tiles.deleteAll);
  
    app.use('/api/tiles', router);
  };