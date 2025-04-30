const soldiersRoutes = require('./soldiersRoutes');
const unitsRoutes = require('./unitsRoutes');

const endpoints = { ...soldiersRoutes, ...unitsRoutes };

module.exports = endpoints;
