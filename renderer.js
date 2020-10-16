// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { json } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://myuser:123@192.168.1.19:3306/test');

sequelize
.authenticate()
.then(() => {
    console.log('Connection successfully made.');
})
.catch(err => {
    console.error('Error connecting to database', err);
});

const Product = sequelize.define('product', {
    name: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.FLOAT
    },
    cost: {
        type: Sequelize.FLOAT
    },
    price: {
        type: Sequelize.FLOAT
    },
    unit: {
        type: Sequelize.STRING
    }
});

const createBtn = document.getElementById('create');
createBtn.addEventListener('click', ()=>{
    Product.sync().then(() => {
        return Product.create({
            name: 'Product 002',
            quantity: 5,
            cost: 10,
            price: 10,
            unit: 'kg' 
        });
    }); 
});


const showBtn = document.getElementById('show');
showBtn.addEventListener('click', ()=>{
    Product.findAll().then(products => {
        let datas = products.map((product)=>{return product.dataValues});
        console.log(JSON.stringify(datas, null, 4));
    }); 
});


