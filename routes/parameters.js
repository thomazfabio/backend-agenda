var express = require('express');
var router = express.Router();
var parametersController = require('../controller/parametersController.js');

/* GET parameters listing. */
router.get('/', parametersController.getParameters); 
router.post('/', parametersController.setParameters);

module.exports = router;
