const unitsController = require('../../controllers/unitsController');

const unitsRoutes = {
  "/units": {
    "GET": unitsController.getAllUnits,
    "POST": unitsController.createUnit
  },
  "/units/:id": {
    "GET": unitsController.getUnitById
  }
};

module.exports = unitsRoutes;
