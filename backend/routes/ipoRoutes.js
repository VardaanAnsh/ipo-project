const express = require('express');
const router = express.Router();
const {
  getAllIPOs,
  getIPOById,
  createIPO,
  updateIPO,
  deleteIPO
} = require('../controllers/ipoController');

router.get('/', getAllIPOs);
router.get('/:id', getIPOById);
router.post('/', createIPO);
router.put('/:id', updateIPO);
router.delete('/:id', deleteIPO);

module.exports = router;
