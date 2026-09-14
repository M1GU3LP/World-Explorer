import { obtenerPais } from "./countries.mjs";
import { esFavorito, obtenerFavoritos } from "./favorites.mjs";
import { crearBandera } from "./utils.mjs";

let codigoPaisActual = null;

export function mostrarInformacion(pais, codigo) {

    if (!pais) {
        mostrarMensaje("No se encontró información del país.");
        return;
    }

    codigoPaisActual = codigo || null;


    document.getElementById("country-name").textContent = pais.name;
    document.getElementById("official-name").textContent = pais.officialName;
    document.getElementById("capital").textContent = pais.capital;
    document.getElementById("population").textContent =
        pais.population.toLocaleString("es-CO");
    document.getElementById("region").textContent = pais.region;
    document.getElementById("languages").textContent = pais.languages.join(", ");
    document.getElementById("currency").textContent = pais.currency;

    const contenedorBandera = document.getElementById("flag");
    contenedorBandera.textContent = "";
    contenedorBandera.appendChild(crearBandera(pais, 80));

    actualizarBotonFavorito();
}

export function mostrarMensaje(mensaje) {
    const elemento = document.getElementById("country-name");

    if (elemento) {
        elemento.textContent = mensaje;
    }
}

export function limpiarInformacion() {
    codigoPaisActual = null;

    mostrarMensaje("Selecciona un país");

    for (const id of ["official-name", "capital", "population", "region", "languages", "currency"]) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = "";
        }
    }

    const contenedorBandera = document.getElementById("flag");
    if (contenedorBandera) {
        contenedorBandera.textContent = "";
    }

    actualizarBotonFavorito();
}


export function mostrarError(mensaje) {
    const contenedor = document.getElementById("error-banner");

    if (!contenedor) {
        return;
    }

    contenedor.textContent = mensaje;
    contenedor.hidden = false;
}

export function ocultarError() {
    const contenedor = document.getElementById("error-banner");

    if (contenedor) {
        contenedor.hidden = true;
    }
}



export function inicializarBotonFavorito(alAlternarFavorito) {
    const boton = document.getElementById("btn-favorito");

    if (!boton) {
        return;
    }

    boton.addEventListener("click", () => {
        if (!codigoPaisActual) {
            return;
        }

        alAlternarFavorito(codigoPaisActual);
        actualizarBotonFavorito();
    });
}

function actualizarBotonFavorito() {
    const boton = document.getElementById("btn-favorito");

    if (!boton) {
        return;
    }

    if (!codigoPaisActual) {
        boton.hidden = true;
        return;
    }

    boton.hidden = false;

    const favorito = esFavorito(codigoPaisActual);

    boton.setAttribute("aria-pressed", String(favorito));
    boton.textContent = favorito
        ? "★ En favoritos"
        : "☆ Agregar a favoritos";
}

// ============================================
// LISTA DE FAVORITOS (delegación de eventos)
// ============================================

export function inicializarListaFavoritos(alSeleccionarPais, alQuitarFavorito) {
    const lista = document.getElementById("lista-favoritos");
    const botonToggle = document.getElementById("toggle-favoritos");

    if (!lista || !botonToggle) {
        return;
    }

    lista.addEventListener("click", (evento) => {
        const botonQuitar = evento.target.closest("button[data-quitar]");
        if (botonQuitar) {
            alQuitarFavorito(botonQuitar.dataset.quitar);
            renderizarFavoritos(alSeleccionarPais, alQuitarFavorito);
            return;
        }

        const botonPais = evento.target.closest("button[data-codigo]");
        if (botonPais) {
            alSeleccionarPais(botonPais.dataset.codigo);
        }
    });

    botonToggle.addEventListener("click", () => {
        const expandido = botonToggle.getAttribute("aria-expanded") === "true";

        botonToggle.setAttribute("aria-expanded", String(!expandido));
        lista.hidden = expandido;
    });

    renderizarFavoritos(alSeleccionarPais, alQuitarFavorito);
}

export function renderizarFavoritos() {
    const lista = document.getElementById("lista-favoritos");
    const contador = document.getElementById("contador-favoritos");

    if (!lista) {
        return;
    }

    const codigos = obtenerFavoritos();

    if (contador) {
        contador.textContent = String(codigos.length);
    }

    lista.textContent = "";

    if (codigos.length === 0) {
        const vacio = document.createElement("li");
        vacio.className = "resultado-vacio";
        vacio.textContent = "Aún no tienes países favoritos.";
        lista.appendChild(vacio);
        return;
    }

    for (const codigo of codigos) {
        const pais = obtenerPais(codigo);
        if (!pais) {
            continue;
        }

        const item = document.createElement("li");
        item.className = "favorito-item";

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "resultado-item";
        boton.dataset.codigo = codigo;

        const nombre = document.createElement("span");
        nombre.textContent = pais.name;

        boton.appendChild(crearBandera(pais, 24));
        boton.appendChild(nombre);

        const botonQuitar = document.createElement("button");
        botonQuitar.type = "button";
        botonQuitar.className = "boton-quitar";
        botonQuitar.dataset.quitar = codigo;
        botonQuitar.setAttribute("aria-label", `Quitar ${pais.name} de favoritos`);
        botonQuitar.textContent = "✕";

        item.appendChild(boton);
        item.appendChild(botonQuitar);
        lista.appendChild(item);
    }
}
