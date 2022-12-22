module.exports = (sequelize, Sequelize) => {
    const Tile = sequelize.define("tile", {
      tile_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      tile_description: {
        type: Sequelize.STRING
      },
      specs: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(6,2)
      },
      public: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Tile;
  };