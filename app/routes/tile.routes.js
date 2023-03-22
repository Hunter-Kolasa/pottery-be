module.exports = app => {
    const tiles = require("../controllers/tile.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", tiles.create)
  
    router.get("/", tiles.findAll);
  
    router.get("/public", tiles.findAllPublic);

    router.get("/:id", tiles.findOne);

    router.put("/:id", tiles.update);
  
    router.delete("/:id", tiles.delete);
  
    router.delete("/", tiles.deleteAll);
  
    app.use('/api/tiles', router);
  };