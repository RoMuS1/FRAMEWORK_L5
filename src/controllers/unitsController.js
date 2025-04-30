const unitsService = require('../services/unitsService');
const crypto = require('crypto');

function getAllUnits(req, res) {
  const units = unitsService.getAllUnits();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(units));
}

function getUnitById(req, res) {
  const id = req.params.id;
  const unit = unitsService.getUnitById(id);
  if (unit) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(unit));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unit not found' }));
  }
}

function createUnit(req, res) {
  const newUnit = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    name: req.body.name || 'Default Unit',
    headCount: req.body.headCount || 100,
    isDeployed: req.body.isDeployed !== undefined ? req.body.isDeployed : false,
    formationDate: req.body.formationDate || new Date().toLocaleString(),
    operations: req.body.operations || []
  };

  const created = unitsService.addUnit(newUnit);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(created));
}

module.exports = {
  getAllUnits,
  getUnitById,
  createUnit,
};
