let paises = {};

export async function cargarPaises() {
    try {
        const respuesta = await fetch("./data/countries.json");

        if (!respuesta.ok) {
            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );
        }

        paises = await respuesta.json();

        console.log("Países cargados correctamente");

        return paises;

    } catch (error) {
        console.error("Error cargando los países:", error);
        throw error;
    }
}

export function obtenerPais(codigo) {
    return paises[codigo] || null;
}

export function obtenerTodosLosPaises() {
    return paises;
}