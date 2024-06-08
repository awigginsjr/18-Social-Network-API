// import the required modules
const router = require('express').Router();

// import api routes module
const apiRoutes = require('./api');

// /api endpoint
router.use('/api', apiRoutes); // use the api routes
router.use((req, res) => { return res.send('Wrong route!!'); }); // default response for any other request that is not defined

module.exports = router; // export the router