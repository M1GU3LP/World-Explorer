const ES_ENTORNO_LOCAL = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const URL_BACKEND_PRODUCCION = "";

export const API_BASE_URL = ES_ENTORNO_LOCAL
    ? "http://localhost:3000"
    : URL_BACKEND_PRODUCCION;
