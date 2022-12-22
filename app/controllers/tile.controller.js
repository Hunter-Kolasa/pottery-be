const db = require("../models");
const Tile = db.tiles;
const Op = db.Sequelize.Op;

// Create and Save a new Tile
exports.create = (req, res) => {
  console.log('post something: ')
  console.log(req.body)
  if (!req.body.tile_name) {
    res.status(400).send({
      message: "tile_name cannot be empty!"
  })
  return;
  };
  const tile = {
    tile_name: req.body.tile_name,
    title: req.body.title ? req.body.title : '',
    subtitle: req.body.subtitle ? req.body.subtitle : '',
    tile_description: req.body.tile_description ? req.body.tile_description : '',
    specs: req.body.specs ? req.body.specs : '',
    image_url: req.body.image_url ? req.body.image_url : '',
    price: req.body.price ? req.body.price : '',
    public: req.body.public ? req.body.public : 0
  };

  Tile.create(tile)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while creating tile"
      })
    })
}

// Retrieve all Tiles from the database.
exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Tile.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tiles."
        });
      });
};

// Find a single Tile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tile.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Error retrieving Tile with id=" + id
        });
      };
    });
};

// Update a Tile by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tile.update(req.body, {
    where: { id: id}
  })
    .then(num => {
      if (num ==1) {
        res.send({
          message: "Tile update successful."
        })
      } else {
        res.send({
          message: `Cannot update tile with id=${id}. Check Tile and/or req.body`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tile with id=" + id
      })
    })
};

// Delete a Tile with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tile.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tile successfully obliterated!"
        });
      } else {
        res.send({
          message: `Cannot snuff out tile with id=${id}. Check Tile and/or req.body`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error while committing attempted murder on Tile with id=" + id
      })
    })
};

// Delete all Tiles from the database.
exports.deleteAll = (req, res) => {
  Tile.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Tiles were successfully wiped out!`});
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while attmempting mass deletion of tiles."
    })
  })
};

// Find all published Tiles
exports.findAllPublic = (req, res) => {
  Tile.findAll ({ where: { public:true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send ({
        message:
          err.message || "Some error while grabbing tiles."
      })
    })
};