let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const cardProductos = document.querySelector("#card-producto")
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

function cargarProductos(seleccionProdcutos) {
    cardProductos.innerHTML= "";
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${producto.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${producto.producto}</h5>
                <p class="card-text">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.producto}">Agregar</button>
        </div>
        `;

        cardProductos.append(div)

    });
    actualizarBotonesAgregar();

}


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado",
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "left",
        stopOnFocus: true, 
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.producto === idBoton);

    if (productosEnCarrito.some(producto => producto.producto === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.producto === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

    actualizarNumero();
}


function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}