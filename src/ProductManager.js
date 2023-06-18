import fs from 'fs';
import { title } from 'process';


class ProductManager {
  constructor() {
    this.path = 'productos.json';
    this.products = this.readDataFromFile();
    this.nextId = this.getNextId();
  }

  readDataFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data) && [];
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      return [];
    }
  }

  saveDataToFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log('Datos guardados en el archivo correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos en el archivo:', error);
    }
  }

  getNextId() {
    let maxId = 0;
    for (const product of this.products) {
      if (product.id > maxId) {
        maxId = product.id;
      }
    }
    return maxId + 1;
  }
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title && !description && !price && !thumbnail && !code && !stock) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
      const product = {
        id: this.nextId,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      }

      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        console.error("Ya existe un producto con el mismo código.");
        return;
      };
  
      this.products.push(product);
      this.nextId++;
      this.saveDataToFile();
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.error("Not Found");
      }
    }
    updateProduct(id, updatedData) {
      const product = this.getProductById(id);
      if (product) {
        Object.assign(product, updatedData);
        this.saveDataToFile();
      } else {
        console.error('Producto no encontrado.');
      }
    }

    deleteProduct(id) {
      const index = this.products.findIndex(product => product.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
        this.saveDataToFile();
      } else {
        console.error('Producto no encontrado.');
      }
    }


  }

  

const manager = new ProductManager();

manager.addProduct('Cactus', 'Cactus interior', 250, 'Cactus.jpg', '001', 5);
manager.addProduct('Suculenta', 'Suculenta de Jardin', 650, 'Suculenta.jpg', '002', 8);
manager.addProduct('Maceta', 'Maceta N° 12', 150, 'Maceta.jpg', '003', 3);
manager.addProduct('Maceta Grande', 'Maceta N° 18', 270, 'MacetaGrande.jpg', '004', 7);
manager.addProduct('Tierra Fertil', 'Tierra fertil para jardin', 1100, 'Tierra Fertil.jpg', '005', 12);
manager.addProduct('Tierra para interior', 'Tierra fertil para jardin de interior', 1640, 'Tierra para interior.jpg', '006', 8);
manager.addProduct('Guantes', 'Guantes para jardineria', 980, 'Guantes.jpg', '007', 9);
manager.addProduct('Tijeras', 'Tijeras para podar', 1300, 'Tijeras.jpg', '008', 8);
manager.addProduct('kit jardineria', 'Kit de jardineria 4 piezas', 7500, 'kit jardineria.jpg', '009', 5);
manager.addProduct('Fertilizante', 'Fertilizante 500gr', 2500, 'Fertilizante.jpg', '010', 10);

const allProducts = manager.getProducts();
console.log(allProducts);

const product = manager.getProductById(2);
console.log(product);

const nonExistingProduct = manager.getProductById(15);

const deleteProduct = manager.deleteProduct(12);

const updatedData = manager.updateProduct(1, {"title":"Cactus2"})
