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
            cantidad: cantidadDeseada
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
