let carrito = JSON.parse(localStorage.getItem("carritoMarina")) || [];

function agregarAlCarrito(id, nombre, precio, stock) {
    const inputCantidad = document.getElementById(`cantidad-${id}`);
    const cantidadDeseada = parseInt(inputCantidad.value);

    if (isNaN(cantidadDeseada) || cantidadDeseada <= 0) {
        alert("Comando inválido: Ingrese una cantidad válida de carteles.");
        return;
    }

    const productoExistente = carrito.find(item => item.id === id);
    
    const cantidadActualEnCarrito = productoExistente ? productoExistente.cantidad : 0;

    if (cantidadActualEnCarrito + cantidadDeseada > stock) {
        alert(`¡Alerta del Cuartel General! Solo quedan ${stock} carteles de ${nombre} en el depósito. Ya tienes ${cantidadActualEnCarrito} en tu carrito.`);
        return; 
    }

    if (productoExistente) {
        productoExistente.cantidad += cantidadDeseada;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: Number(precio),
            cantidad: cantidadDeseada,
            stock: stock
        });
    }

    localStorage.setItem("carritoMarina", JSON.stringify(carrito));
    actualizarContador();
    renderizarTarjetas();
    alert(`¡Has agregado ${cantidadDeseada} carteles de ${nombre} correctamente al carrito!`);
}

function actualizarContador() {
    const contadorElemento = document.getElementById("contador-carrito");
    
    if (contadorElemento) {
        const totalItems = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
        contadorElemento.innerText = totalItems;
    }
}

function renderizarCarrito() {
    const contenedorCarrito = document.getElementById("lista-carrito");
    const contenedorTotal = document.getElementById("total-carrito");

    if (!contenedorCarrito) return;

    contenedorCarrito.innerHTML = "";
    let sumaTotal = 0;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p style="text-align: center; font-size: 1.2rem; font-style: italic;">No hay carteles de recompensa en tu requisa actual.</p>`;
        contenedorTotal.innerText = "Total: $0";
        return;
    }
    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        sumaTotal += subtotal;
        contenedorCarrito.innerHTML += `
           <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding: 15px 0;">
                
                <div style="flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 1.2rem; color: var(--azul-marine);">${producto.nombre}</h4>
                    
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                        <button onclick="modificarCantidad('${producto.id}', -1)" style="padding: 2px 10px; font-weight: bold; cursor: pointer; border: 1px solid var(--azul-marine); background: white;">-</button>
                        <span style="font-size: 0.9rem;">Cantidad: <b>${producto.cantidad}</b></span>
                        <button onclick="modificarCantidad('${producto.id}', 1)" style="padding: 2px 10px; font-weight: bold; cursor: pointer; border: 1px solid var(--azul-marine); background: white;">+</button>
                    </div>
                    
                    <p style="margin: 5px 0 0 0; font-size: 0.9rem;">
                        Valor Unidad: $${producto.precio}
                    </p>
                </div>
                
                <div style="font-weight: bold; font-size: 1.2rem; margin-right: 20px;">
                    Subtotal: $${subtotal}
                </div>
                
                <button onclick="eliminarDelCarrito('${producto.id}')" style="background-color: var(--rojo-alerta); color: white; border: none; padding: 8px 12px; cursor: pointer; border-radius: 4px; font-weight: bold;">
                    Eliminar Todo
                </button>
                
            </div>
        `;
    });
    contenedorTotal.innerText = `Total: $${sumaTotal.toFixed(2)}`;
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem("carritoMarina", JSON.stringify(carrito));
    actualizarContador();
    renderizarCarrito();
    renderizarTarjetas();
}

function simularCompra() {
    if (carrito.length === 0) {
        alert("¡Alerta del Cuartel General! No hay carteles de recompensa en tu carrito actual para procesar la compra.");
        return;
    }
    alert("¡Solicitud enviada a Marineford! La compra se ha procesado correctamente.");
    carrito = [];
    localStorage.removeItem("carritoMarina");
    actualizarContador();
    renderizarCarrito();
    renderizarTarjetas();
}

function modificarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;

    if (cambio > 0 && (producto.cantidad + cambio) > producto.stock) {
        alert(`¡Alerta del Cuartel General! Solo quedan ${producto.stock} carteles disponibles de este objetivo.`);
        producto.cantidad = pirataEnCatalogo.stock; 
        return; 
    }

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    const pirataEnCatalogo = catalogoPiratas.find(p => p.id === id);
    
    localStorage.setItem("carritoMarina", JSON.stringify(carrito));
    actualizarContador();
    renderizarCarrito();
}
actualizarContador();
renderizarCarrito();
