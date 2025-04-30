const soldiersController = require('../../controllers/soldiersController');

const soldiersRoutes = {
  "/soldiers": {
    "GET": soldiersController.getAllSoldiers,
    "POST": soldiersController.createSoldier
  },
  "/soldiers/:id": {
    "GET": soldiersController.getSoldierById
  }
};

module.exports = soldiersRoutes;
