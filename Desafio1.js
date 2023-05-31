class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
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
  }

const manager = new ProductManager();

manager.addProduct('Cactus', 'Cactus interior', 250, 'Cactus.jpg', '001', 5);
manager.addProduct('Suculenta', 'Suculenta de Jardin', 650, 'Suculenta.jpg', '002', 8);
manager.addProduct('Maceta', 'Maceta N° 12', 150, 'Maceta.jpg', '003', 3);
manager.addProduct('Maceta Grande', 'Maceta N° 18', 270, 'MacetaGrande.jpg', '004', 7);

const allProducts = manager.getProducts();
console.log(allProducts);

const product = manager.getProductById(2);
console.log(product);

const nonExistingProduct = manager.getProductById(5);
