const path = require('path');

const express = require('express');

const fridgeController= require('../controllers/fridge');
//const rootDir = require('../util/path');
//const adminRoutes = require('./admin');

const router = express.Router();

router.get('/',fridgeController.getIndex);

router.get('/fridge',fridgeController.getFridge);

router.get('/viewitems',fridgeController.getItems);

router.get('/item/:productId',fridgeController.getItem); //: a parameter(value/info) put specific routes before dynamic routes

router.get('/add-item',fridgeController.getAddItem);

router.get('/addtofridge',fridgeController.addToFridge);

router.get('/edit-item/:productId',fridgeController.getEditItem);

router.post('/add-item',fridgeController.postAddItem); //to add item in allitems

router.post('/addtofridge',fridgeController.postFridge);

router.post('/edit-item',fridgeController.postEditItem);



module.exports = router;
