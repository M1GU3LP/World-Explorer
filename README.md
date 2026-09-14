# World Explorer

Explorador interactivo de países: globo 3D, buscador con filtro por región,
panel de datos (capital, población, idiomas, moneda, bandera) y favoritos
guardados en el navegador.

## Cómo ejecutarlo

Como usa `fetch` sobre `data/countries.json`, no se puede abrir el
`index.html` con doble clic (bloqueo CORS de `file://`). Hay que servirlo
con un servidor local, por ejemplo:

```bash
npx serve .
# o
python -m http.server 8000
```

y abrir la URL que indique en el navegador.

## Estructura del proyecto

```
index.html          → vista única de la aplicación
css/styles.css       → estilos
data/countries.json  → dataset propio: 194 estados miembros de la ONU
                        + 7 territorios visibles en el globo (Groenlandia,
                        Taiwán, Palestina, etc.), 201 en total
js/
  main.mjs           → orquesta el arranque y conecta los demás módulos
  countries.mjs       → carga y consulta el dataset de países (fetch)
  globe.mjs           → crea el globo 3D y consume la API de geometrías
  search.mjs          → buscador + filtro por región (delegación de eventos)
  favorites.mjs        → favoritos en localStorage
  ui.mjs               → todo el pintado en el DOM (paneles, listas, botón favorito)
  utils.mjs            → helpers puros (normalizar texto, leer código ISO)

```


