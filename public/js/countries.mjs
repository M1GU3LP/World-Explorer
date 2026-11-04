import { obtenerPaisesApi, obtenerPaisApi } from "./api.mjs";

let paises = {};


export async function cargarPaises() {
    paises = await obtenerPaisesApi();
    return paises;
}


export function cargarPais(codigo) {
    return obtenerPaisApi(codigo);
}

export function obtenerPais(codigo) {
    return Object.hasOwn(paises, codigo) ? paises[codigo] : null;
}

export function obtenerTodosLosPaises() {
    return paises;
}
