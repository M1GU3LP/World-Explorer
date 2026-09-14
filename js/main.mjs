import {
    cargarPaises,
    obtenerPais
} from "./countries.mjs";

import {
    inicializarGlobo,
    resaltarPaisEnGlobo,
    quitarResaltadoEnGlobo
} from "./globe.mjs";

import {
    mostrarInformacion,
    mostrarMensaje,
    mostrarError,
    ocultarError,
    limpiarInformacion,
    inicializarBotonFavorito,
    inicializarListaFavoritos,
    renderizarFavoritos
} from "./ui.mjs";

import {
    inicializarBuscador
} from "./search.mjs";

import {
    alternarFavorito
} from "./favorites.mjs";


async function iniciarAplicacion() {

    try {

        console.log("Iniciando aplicación...");

        await cargarPaises();

        inicializarBuscador(seleccionarPais);
        inicializarBotonFavorito(alternarFavoritoDelPaisActual);
        inicializarListaFavoritos(seleccionarPais, quitarFavorito);

        const contenedorGlobo =
            document.getElementById("globeViz");

        if (!contenedorGlobo) {
            throw new Error(
                "No se encontró el contenedor del globo."
            );
        }

        try {

            await inicializarGlobo(
                contenedorGlobo,
                seleccionarPais,
                () => mostrarError(
                    "No se pudo cargar el globo 3D (falló la conexión a la API de mapas). " +
                    "Puedes seguir usando el buscador de países."
                ),
                deseleccionarPais
            );

        } catch (errorGlobo) {
            console.error("El globo 3D no se pudo iniciar:", errorGlobo);
        }

        console.log(
            "Aplicación iniciada correctamente"
        );

    } catch (error) {

        console.error(
            "No se pudo iniciar la aplicación:",
            error
        );

        mostrarMensaje(
            "No se pudo cargar la aplicación."
        );

        mostrarError(
            "Ocurrió un problema cargando los datos. Revisa tu conexión e intenta recargar la página."
        );
    }
}



let paisSeleccionadoActual = null;


function seleccionarPais(codigo) {

    if (codigo === paisSeleccionadoActual) {
        deseleccionarPais();
        return;
    }

    console.log(
        "Buscando información para:",
        codigo
    );

    const pais =
        obtenerPais(codigo);

    if (!pais) {

        console.warn(
            `No existe información para ${codigo}`
        );

        mostrarMensaje(
            "No existe información para este país."
        );

        return;
    }

    paisSeleccionadoActual = codigo;
    resaltarPaisEnGlobo(codigo);

    ocultarError();
    mostrarInformacion(pais, codigo);
}


function deseleccionarPais() {
    if (!paisSeleccionadoActual) {
        return;
    }

    paisSeleccionadoActual = null;
    quitarResaltadoEnGlobo();
    limpiarInformacion();
}


function alternarFavoritoDelPaisActual(codigo) {
    alternarFavorito(codigo);
    renderizarFavoritos();
}


function quitarFavorito(codigo) {
    alternarFavorito(codigo);
}


iniciarAplicacion();
