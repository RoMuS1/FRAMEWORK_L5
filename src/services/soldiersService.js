const db = require('../db/db');

function getAllSoldiers() {
  const data = db.readDB();
  return data.soldiers || [];
}

function getSoldierById(id) {
  const soldiers = getAllSoldiers();
  return soldiers.find(s => s.id === id);
}

function addSoldier(soldier) {
  const data = db.readDB();
  if (!data.soldiers) {
    data.soldiers = [];
  }
  data.soldiers.push(soldier);
  db.writeDB(data);
  return soldier;
}

module.exports = {
  getAllSoldiers,
  getSoldierById,
  addSoldier,
};
