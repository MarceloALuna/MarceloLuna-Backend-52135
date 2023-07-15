import express from "express";
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import prodRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import __direname from './utils.js'

const app = express();
const httpServer = app.listen(8080);
const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine());
app.set('views', __direname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__direname + '/public'));
app.use((req,res, next) =>{
    req.io = io;
    next();
})

app.use('/api/products', prodRouter);
app.use('/api/cart', cartRouter);

const messages= []

io.on('connection', socket =>{
    console.log('new cliente connected');

    socket.on('post', data =>{
        prodRouter.post
        io.emit('logs', messages)
    })
    socket.on('delete', data =>{
        messages.push(data)
        io.emit('logs', messages)
    })
})