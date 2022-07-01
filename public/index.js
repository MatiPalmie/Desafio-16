const socket = io();

const lista = document.getElementById("listaProductos");

const productName = document.getElementById('nombre');
const productPrice = document.getElementById('precio');
const productImg = document.getElementById('foto');
const sendBtn = document.getElementById('sendBtn');


function render(list){
    const html = list.map((e) => {
        return `
        <ul>
                <li class="">${e.nombre}</li>
                <li class="">$ ${e.precio}</li>
                <img src="${e.foto}" alt="${e.nombre}">
                </ul>
                `
            }).join (" ");
            document.getElementById("listaProductos").innerHTML = html;
}
        socket.on('productList', list =>{
            render(list);
})


function newProduct(){
}
sendBtn.addEventListener("click",()=>{
    console.log(productName);
    const name = productName.value;
    const price = productPrice.value;
    const img = productImg.value;
    const product = {
        nombre:name,
        precio:price,
        foto:img
    }
    socket.emit('productoNuevo',product);

});
