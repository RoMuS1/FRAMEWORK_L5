const db = require('../db/db');

function getAllUnits() {
  const data = db.readDB();
  return data.units || [];
}

function getUnitById(id) {
  const units = getAllUnits();
  return units.find(u => u.id === id);
}

function addUnit(unit) {
  const data = db.readDB();
  if (!data.units) {
    data.units = [];
  }
  data.units.push(unit);
  db.writeDB(data);
  return unit;
}

module.exports = {
  getAllUnits,
  getUnitById,
  addUnit,
};
