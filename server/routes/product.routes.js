console.log("Server is starting...");

import express from 'express';
import productCtrl from '../controllers/product.controller.js';

const router = express.Router();

router.route('/product')
    .get(productCtrl.list)
    .post(productCtrl.create);
    //res.json({ message: 'GET request for /api/product' });

router.route('/product/:productId')
    .get(productCtrl.read)
    .put(productCtrl.update)
    .delete(productCtrl.remove);

router.param('productId', productCtrl.productByID);

router.put('/api/product/:productId', (req, res) => {
    console.log("Update request received");
    res.json({ message: "Update endpoint hit" });
  });
  
  router.param('productId', (req, res, next, id) => {
    console.log("Middleware for productId:", id);
    next();
  });
  


export default router;





