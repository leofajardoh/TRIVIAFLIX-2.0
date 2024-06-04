// Tomamos los elementos html
const txtPuntaje = document.querySelector("#puntos");
const nombre = document.querySelector("#nombre");
const nombreJugador = document.querySelector("#nombre-jugador");

nombre.innerHTML = localStorage.getItem("nombre");
nombreJugador.innerHTML = localStorage.getItem("nombre");

// Recupero el puntaje en caso que ya esté jugando
let puntajeTotal = 0;
if (!localStorage.getItem("puntaje-total")) {
    puntajeTotal = 0;
    txtPuntaje.innerHTML = puntajeTotal;
} else {
    puntajeTotal = parseInt(localStorage.getItem("puntaje-total"));
    txtPuntaje.innerHTML = puntajeTotal;
}

// Estructura para guardar las categorías ya jugadas
let categoriasJugadas = JSON.parse(localStorage.getItem("categorias-jugadas")) || [];

// Agregamos interactividad a las categorías
const categorias = document.querySelectorAll(".categoria");
categorias.forEach(categoria => {
    if (categoriasJugadas.includes(categoria.id)) {
        categoria.classList.add("desabilitada");
        categoria.classList.add("no-events");
    }

    categoria.addEventListener("click", () => {
        if (!categoria.classList.contains("desabilitada")) {
            localStorage.setItem("categoria-actual", categoria.id);
            categoriasJugadas.push(categoria.id);
            localStorage.setItem("categorias-jugadas", JSON.stringify(categoriasJugadas));
            categoria.classList.add("seleccionada");
            setTimeout(() => {
                location.href = "juego.html"; // Redirección a la página del juego
            }, 500); // Pequeña pausa para la animación
        }
    });
});

// Opcional: Agregar CSS para '.seleccionada' que anime brevemente la categoría seleccionada
