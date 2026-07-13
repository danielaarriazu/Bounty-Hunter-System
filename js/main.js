const API_URL = "https://6a545c958547b9f7111c21b5.mockapi.io/piratas"; 

let catalogoPiratas = [];

const contenedorProductos = document.getElementById("productos-container");

function cargarInventario() {
    if (!contenedorProductos) return;

    fetch(API_URL)
        .then((respuesta) => {
            if (!respuesta.ok) throw new Error("Error de servidor");
            return respuesta.json();
        })
        .then((datos) => {
            catalogoPiratas = datos; 
            renderizarTarjetas();   
        })
        .catch((error) => console.error(error));
}

function renderizarTarjetas() {
    contenedorProductos.innerHTML = ""; 
    
    catalogoPiratas.forEach((pirata) => {
        
        const productoEnCarrito = carrito.find(item => item.id === pirata.id);
        const cantidadYaGuardada = productoEnCarrito ? productoEnCarrito.cantidad : 0;

        const stockRestante = pirata.stock - cantidadYaGuardada;
        
        const sinStock = pirata.estado === "capturado" || stockRestante <= 0;
        
        const claseEstado = pirata.estado === "capturado" ? "capturado" : "";
        const selloCapturado = pirata.estado === "capturado" ? `<div class="status-stamp">CAPTURED</div>` : "";

        const inputDisabled = sinStock ? "disabled" : "";
        const buttonDisabled = sinStock ? "disabled" : "";
        const textoBoton = sinStock ? "SIN STOCK" : "Añadir";
        const estiloBoton = sinStock ? "background-color: #666; cursor: not-allowed;" : "";
        const colorStock = sinStock ? "red" : "green";

        contenedorProductos.innerHTML += `
            <article class="card-wanted ${claseEstado}">
                ${selloCapturado}
                <div class="wanted-header">WANTED</div>
                <div class="wanted-sub">DEAD OR ALIVE</div>
                
                <div class="wanted-image">
                    <a href="${pirata.enlace}" title="Ver expediente detallado">
                        <img src="${pirata.imagen}" alt="Foto de portada de ${pirata.nombre}" style="cursor: pointer; transition: transform 0.2s;">
                    </a>
                </div>

                <div class="wanted-info">
                    <h3 class="wanted-name">${pirata.nombre}</h3>
                    <a href="${pirata.enlace}" style="font-size: 0.8rem; color: var(--azul-marine); text-decoration: underline; margin-bottom: 5px; display: inline-block;">
                        Ver Expediente
                    </a>

                    <p class="wanted-bounty">${pirata.recompensa}</p>
                    <p style="font-family: 'Special Elite', cursive; color: var(--azul-marine); margin-top: 5px;">
                        Valor Réplica: $${pirata.precio}
                    </p>
                    <p style="font-size: 0.9rem; font-weight: bold; color: ${colorStock}; margin-top: 5px;">
                        Disponibles: ${sinStock ? 0 : stockRestante}
                    </p>
                </div>
                
                <div class="wanted-footer">MARINE</div>
                
                <div style="display: flex; gap: 10px; margin-top: 15px; justify-content: center; align-items: center;">
                    <input type="number" id="cantidad-${pirata.id}" value="1" min="1" max="${stockRestante}" ${inputDisabled}
                           style="width: 60px; padding: 8px; font-family: 'Roboto', sans-serif; border: 2px solid var(--azul-marine); border-radius: 4px; text-align: center; font-weight: bold;">
                    
                    <button class="btn-enviar" style="margin-top: 0; font-size: 1rem; padding: 10px; flex-grow: 1; ${estiloBoton}" 
                            ${buttonDisabled}
                            onclick="agregarAlCarrito('${pirata.id}', '${pirata.nombre}', ${pirata.precio}, ${pirata.stock})">
                        ${textoBoton}
                    </button>
                </div>
            </article>
        `;
    });
}

cargarInventario();


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

actualizarContador();

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
renderizarCarrito();
