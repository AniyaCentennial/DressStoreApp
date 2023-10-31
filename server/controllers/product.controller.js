
import Product from '../models/product.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';

class ProductController {
  async create(req, res) {
    console.log(req.body);
    const product = new Product(req.body);
    try {
      await product.save();
      return res.status(200).json({
        message: 'Product successfully created!'
      });
    } catch (err) {
      console.error("Error creating product:", err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  }

  async list(req, res) {
    try {
      console.log("Fetching products from database...");
      const products = await Product.find();
      console.log("Products from DB:", products);
      res.json(products);
    } catch (err) {
      console.error("Error listing products:", err);
      res.status(400).json({
        error: "Could not retrieve products"
      });
    }
  }

  async productByID(req, res, next, id) {
    try {
      let product = await Product.findById(id);
      if (!product)
        return res.status('404').json({
          error: 'Product not found'
        });
      req.product = product;
      next();
    } catch (err) {
      return res.status('500').json({
        error: 'Could not retrieve product'
      });
    }
  }

  read(req, res) {
    return res.json(req.product);
  }

  // async update(req, res) {
  //   try {
  //     let product = req.product;
  //     product = Object.assign(product, req.body);
  //     product.updated = Date.now();
  //     await product.save();
  //     res.json(product);
  //   } catch (err) {
  //     return res.status(400).json({
  //       error: errorHandler.getErrorMessage(err)
  //     });
  //   }
  // }
  
  async update(req, res) {
    try {
      console.log("Request body:", req.body);
      
      if (typeof req.body !== 'object' || req.body === null) {
        return res.status(400).json({
          error: "Invalid request body. Expected an object."
        });
      }
  
      let product = req.product;
      await Product.updateOne({ _id: product._id }, { $set: req.body });
      const updatedProduct = await Product.findById(product._id);
      res.json(updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({
        error: "Unknown server error",
        details: err.message || err
      });
    }
  }
  
  

  async remove(req, res) {
    try {
      let product = req.product;
      let deletedProduct = await product.remove();
      res.json(deletedProduct);
    } catch (err) {
      console.error("Error deleting product:", err);
      return res.status(400).json({
        error: "Unknown server error"
      });
    }
  }
  }

export default new ProductController();
