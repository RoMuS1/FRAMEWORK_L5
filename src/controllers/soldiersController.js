const soldiersService = require('../services/soldiersService');
const crypto = require('crypto');

function getAllSoldiers(req, res) {
  const soldiers = soldiersService.getAllSoldiers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(soldiers));
}

function getSoldierById(req, res) {
  const id = req.params.id;
  const soldier = soldiersService.getSoldierById(id);
  if (soldier) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(soldier));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Soldier not found' }));
  }
}

function createSoldier(req, res) {
  const newSoldier = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    name: req.body.name || 'Default Soldier',
    age: req.body.age || 25,
    active: req.body.active !== undefined ? req.body.active : true,
    rank: req.body.rank || 'Private',
    enlistmentDate: req.body.enlistmentDate || new Date().toLocaleString(),
    skills: req.body.skills || ['Basic Training']
  };

  const created = soldiersService.addSoldier(newSoldier);
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(created));
}

module.exports = {
  getAllSoldiers,
  getSoldierById,
  createSoldier,
};
