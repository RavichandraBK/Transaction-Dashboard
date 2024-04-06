const express = require('express');
const router = express.Router();
const itemsData = require('../Controllers/products');
router.post('/',itemsData.searchProd);
router.post('/stats',itemsData.stats);
router.post('/bar-data',itemsData.barChartData);
router.post('/pie-data',itemsData.pieChartData);
router.post('/combined-data',itemsData.combinedData);
module.exports = router;