const express = require ('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const {options} = require ('./options/mariaDB');
const knex = require ('knex')(options);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = 8080;

const productos = require ('./routes/productos');
const router = require('./routes/productos');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + 'index.html')
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let list =[];

const getAll = async ()=>{
    return list = await productos.productos.getAll();
}

getAll();

io.on('connection', channel => {
    
    channel.emit('productList',list);

    channel.on ('productoNuevo',function(product){
        productos.productos.save(product);

        getAll();
        channel.emit('productList',list);
});
});

// app.use('/api/',productos);

httpServer.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`);
});