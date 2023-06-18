import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const productManager = new ProductManager(); 

app.get('/products', (req, res) => {
  const limit = req.query.limit;

  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, limit); 
  }

  res.json({ products });
});


app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  const product = productManager.getProductById(productId); 

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' }); 
  }
});

app.listen(8080)
