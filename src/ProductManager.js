import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    getNewID = list =>{
        const count = list.length;
        return (count > 0) ? list[count - 1].id + 1 : 1;
    } 

    add = async ({title, description, price, thumbnail, code, stock}) => {
        const list = await this.get();
        const newID = this.getNewID(list);
        const exis = list.some(el => el.code == code);
        if (!exis) {
            const newProduct = {
                id: newID,
                title: title ?? "",
                description: description ?? "",
                price: price ?? 0.0,
                thumbnail: thumbnail ?? [],
                code: code ?? '',
                stock: stock ?? 0,
            };
            list.push(newProduct);
            await this.write(list);
            return newProduct;
        }
        return {error: `code: ${code} already exists`};
    }

    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, this.format).then(r => JSON.parse(r));
        }
        return [];
    }

    write = async list => {
        fs.promises.writeFile(this.path, JSON.stringify(list));
    }

    get = async () => {
        const list = await this.read();
        return list;
    }

    getbyId = async (id) => {
        const list = await this.get();
        return list.find((prod) => prod.id == id);
    }

    update = async (id, obj) => {
        obj.id = id;
        const list = await this.read();

        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list[idx] = obj;
        await this.write(list);
    }

    delete = async (id) => {
        const list = await this.get();
        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list.splice(idx, 1);
        await this.write(list);
        return list;
    }

}

export default ProductManager;

// const manager = new ProductManager();

// manager.add('Cactus', 'Cactus interior', 250, 'Cactus.jpg', '001', 5);
// manager.add('Suculenta', 'Suculenta de Jardin', 650, 'Suculenta.jpg', '002', 8);
// manager.add('Maceta', 'Maceta N° 12', 150, 'Maceta.jpg', '003', 3);
// manager.add('Maceta Grande', 'Maceta N° 18', 270, 'MacetaGrande.jpg', '004', 7);
// manager.add('Tierra Fertil', 'Tierra fertil para jardin', 1100, 'Tierra Fertil.jpg', '005', 12);
// manager.add('Tierra para interior', 'Tierra fertil para jardin de interior', 1640, 'Tierra para interior.jpg', '006', 8);
// manager.add('Guantes', 'Guantes para jardineria', 980, 'Guantes.jpg', '007', 9);
// manager.add('Tijeras', 'Tijeras para podar', 1300, 'Tijeras.jpg', '008', 8);
// manager.add('kit jardineria', 'Kit de jardineria 4 piezas', 7500, 'kit jardineria.jpg', '009', 5);
// manager.add('Fertilizante', 'Fertilizante 500gr', 2500, 'Fertilizante.jpg', '010', 10);

// const allProducts = manager.getProducts();
// console.log(allProducts);

// const product = manager.getById(2);
// console.log(product);

// const nonExistingProduct = manager.getById(15);

// const deleteProduct = manager.delete(12);

// const updatedData = manager.update(1, {"title":"Cactus2"})
