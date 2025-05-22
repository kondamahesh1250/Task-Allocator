const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.post('/add-agent', agentController.agentAdd);

router.get('/agent', agentController.getAgents);

router.delete('/delete-agent/:id', agentController.deleteAgent);

module.exports = router;
