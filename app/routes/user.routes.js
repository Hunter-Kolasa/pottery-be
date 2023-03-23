const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/role/all", controller.allAccess);

  app.get(
    "/api/role/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/role/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/role/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};