const API_URL = "https://6a545c958547b9f7111c21b5.mockapi.io/piratas"; 

const contenedorProductos = document.getElementById("productos-container");

function cargarInventario() {
    fetch(API_URL)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("Error al conectar con la base de datos del Cuartel General");
            }
            return respuesta.json(); 
        })
        .then((datos) => {
            renderizarTarjetas(datos);
        })
        .catch((error) => {
            console.error("Error de red:", error);
            contenedorProductos.innerHTML = `<p class="warning-text">Error de comunicación. No se pudieron cargar los expedientes.</p>`;
        });
}

function renderizarTarjetas(piratas) {
    contenedorProductos.innerHTML = ""; 
    
    piratas.forEach((pirata) => {
        
        
        const claseEstado = pirata.estado === "capturado" ? "capturado" : "";
        const selloCapturado = pirata.estado === "capturado" ? `<div class="status-stamp">CAPTURED</div>` : "";

        contenedorProductos.innerHTML += `
            <article class="card-wanted ${claseEstado}">
                ${selloCapturado}
                <div class="wanted-header">WANTED</div>
                <div class="wanted-sub">DEAD OR ALIVE</div>
                
                <div class="wanted-image">
                    <img src="${pirata.imagen}" alt="Foto de portada de ${pirata.nombre}">
                </div>

                <div class="wanted-info">
                    <h3 class="wanted-name">${pirata.nombre}</h3>
                    <p class="wanted-bounty">${pirata.recompensa}</p>
                    <p style="font-family: 'Special Elite', cursive; color: var(--azul-marine); margin-top: 5px;">
                        Valor Réplica: $${pirata.precio}
                    </p>
                </div>
                
                <div class="wanted-footer">MARINE</div>
                
                <button class="btn-enviar" style="margin-top: 15px; font-size: 1rem; padding: 10px;" 
                        onclick="agregarAlCarrito('${pirata.id}')">
                    Añadir al Carrito
                </button>
            </article>
        `;
    });
}


cargarInventario();


function agregarAlCarrito(idProducto) {
    console.log("Se solicitó el cartel con ID:", idProducto);
    alert("Iniciando solicitud del cartel...");
}