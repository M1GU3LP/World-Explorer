
const CLAVE_ALMACENAMIENTO = "world-explorer:favoritos";

function leerFavoritos() {
    try {
        const crudo = localStorage.getItem(CLAVE_ALMACENAMIENTO);
        const lista = crudo ? JSON.parse(crudo) : [];
        return Array.isArray(lista) ? lista : [];
    } catch (error) {
        console.error("Error leyendo favoritos de localStorage:", error);
        return [];
    }
}

function guardarFavoritos(lista) {
    try {
        localStorage.setItem(
            CLAVE_ALMACENAMIENTO,
            JSON.stringify(lista)
        );
    } catch (error) {
        console.error("Error guardando favoritos en localStorage:", error);
    }
}

export function esFavorito(codigo) {
    return leerFavoritos().includes(codigo);
}

export function alternarFavorito(codigo) {
    const favoritos = leerFavoritos();
    const indice = favoritos.indexOf(codigo);

    if (indice === -1) {
        favoritos.push(codigo);
    } else {
        favoritos.splice(indice, 1);
    }

    guardarFavoritos(favoritos);
    return favoritos;
}

export function obtenerFavoritos() {
    return leerFavoritos();
}
