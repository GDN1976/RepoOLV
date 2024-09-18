document.addEventListener('DOMContentLoaded', () => {
  // Listado stock disponible
  const productos = [
    { id: 1, nombre: "Aceite Cocinero girasol 900ml", precio: 1500, imagen: "assets/img/aceite.webp", stock: 10 },
    { id: 2, nombre: "Capeletinis Tridicci 500gr.", precio: 2900, imagen: "assets/img/capeletinis.png", stock: 5 },
    { id: 3, nombre: "Champignones Cumana 400gr", precio: 2800, imagen: "assets/img/champignones.jpg", stock: 8 },
    { id: 4, nombre: "Fideos Don Vicente 500gr.", precio: 2000, imagen: "assets/img/fideos.jpg", stock: 15 },
    { id: 5, nombre: "Hamburguesas Paty Clasicas x 320gr", precio: 4300, imagen: "assets/img/hamburguesas.jpg", stock: 10 },
    { id: 6, nombre: "Jabon Dove barra 90gr", precio: 1200, imagen: "assets/img/jabon.jpg", stock: 20 },
    { id: 7, nombre: "Pan Bimbo Artesano p/hamburguesas", precio: 2100, imagen: "assets/img/panhamburguesa.jpg", stock: 12 },
    { id: 8, nombre: "Queso untable La Paulina", precio: 2100, imagen: "assets/img/queso.jpg", stock: 10 },
    { id: 9, nombre: "Salchichas Paty Alemanas x12 un.", precio: 4500, imagen: "assets/img/salchichas.jpg", stock: 10 },
    { id: 10, nombre: "Shampoo Elvive 200ml", precio: 2499, imagen: "assets/img/shampoo.jpeg", stock: 10 },
    { id: 11, nombre: "Acondicionador Elvive 400ml", precio: 3699, imagen: "assets/img/acondicionador.jpg", stock: 10 },
    { id: 12, nombre: "Arroz Gallo Largo Fino x500gr.", precio: 1800, imagen: "assets/img/arroz.jpg", stock: 10 }
  ];

  // Definición de variables y botones
  const contenedorProductos = document.getElementById('lista-productos');
  const carrito = [];
  const totalCompra = document.getElementById('total-compra');
  const contenedorBoton = document.getElementById('contenedor-boton');
  const finalizarCompraBtn = document.createElement('button');
  finalizarCompraBtn.textContent = 'Finalizar compra';
  finalizarCompraBtn.id = 'finalizar-compra';
  contenedorBoton.appendChild(finalizarCompraBtn);

  // Renderizar productos
  productos.forEach(producto => {
    const productoHTML = `
      <div class="card">
        <img src="${producto.imagen}" class="card-img">
        <h5>${producto.nombre}</h5>
        <p>$<small class="precio">${producto.precio}</small></p>
        <p>Unidades en: <small class="stock" data-id="${producto.id}">${producto.stock}</small></p>
        <input type="number" class="cantidad" value="1" min="1" max="${producto.stock}" step="1">
        <a href="#" class="button agregar-carrito" data-id="${producto.id}">Agregar</a>
      </div>
    `;
    contenedorProductos.innerHTML += productoHTML;
  });

  // Proceso de compra
  contenedorProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar-carrito')) {
      e.preventDefault();
      const id = e.target.getAttribute('data-id');
      const cantidadInput = e.target.previousElementSibling;
      let cantidad = parseInt(cantidadInput.value, 10);

      const producto = productos.find(p => p.id == id);

      if (!producto) {
        alert('Producto no encontrado');
        return;
      }

      if (isNaN(cantidad) || cantidad <= 0 || cantidad % 1 !== 0) {
        // Mostrar error si la cantidad es inválida
        alert('Cantidad no válida. No se permiten números negativos ni decimales.');
        cantidadInput.value = '1'; // Restablecer el valor a 1
        return;
      }

      if (cantidad <= producto.stock) {
        producto.stock -= cantidad;
        cantidadInput.value = '1'; // Restablecer el valor a 1
        agregarAlCarrito(producto, cantidad);
        mostrarStock();
        actualizarTotal();
      } else {
        alert('Cantidad no disponible');
      }
    }
  });

  finalizarCompraBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
      alert('Compra exitosa! En breve nos pondremos en contacto con usted');
      carrito.length = 0;
      mostrarStock();
      actualizarTotal();
    } else {
      alert('El carrito está vacío');
    }
  });

  function agregarAlCarrito(producto, cantidad) {
    const itemCarrito = carrito.find(item => item.id === producto.id);
    if (itemCarrito) {
      itemCarrito.cantidad += cantidad;
    } else {
      carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });
    }
  }

  function mostrarStock() {
    productos.forEach(producto => {
      const stockElement = document.querySelector(`.stock[data-id="${producto.id}"]`);
      if (stockElement) {
        stockElement.textContent = producto.stock > 0 ? producto.stock : 'Sin stock';
      }
    });
  }

  function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0); //reduce acumula valores en un resultado
    totalCompra.textContent = `Total: $${total}`;
  }
});
