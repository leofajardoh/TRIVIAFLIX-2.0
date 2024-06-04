//tomamos los elementos html
const txtPuntaje = document.querySelector("#puntos");
const nombre = document.querySelector("#nombre");

nombre.innerHTML = localStorage.getItem("nombre");
let numPreguntaActual = 0;
let preguntasCategoria = []; // Almacenar las preguntas cargadas

//Recupero el puntaje en caso que ya esté jugando
let puntajeTotal = 0;
if (!localStorage.getItem("puntaje-total")) {
    puntajeTotal = 0;
    txtPuntaje.innerHTML = puntajeTotal
} else {
    puntajeTotal = parseInt(localStorage.getItem("puntaje-total"));
    txtPuntaje.innerHTML = puntajeTotal;
}

// Cargar las preguntas del tema que eligió desde un archivo JSON
const categoriaActual = localStorage.getItem("categoria-actual");

fetch('data/preguntas.json')
    .then(response => response.json())
    .then(data => {
        preguntasCategoria = data.filter(pregunta => pregunta.categoria === categoriaActual);
        cargarSiguientePregunta(numPreguntaActual);
    })
    .catch(error => console.error('Error al cargar las preguntas:', error));

function cargarSiguientePregunta(num) {
    //tomo los elementos donde se cargaran los datos de la pregunta
    const numPregunta = document.querySelector("#num-pregunta");
    const txtPregunta = document.querySelector("#txt-pregunta");
    const opcionA = document.querySelector("#a");
    const opcionB = document.querySelector("#b");
    const opcionC = document.querySelector("#c");
    const opcionD = document.querySelector("#d");

    numPregunta.innerHTML = num + 1;
    txtPregunta.innerHTML = preguntasCategoria[num].titulo;
    opcionA.innerHTML = preguntasCategoria[num].opcionA;
    opcionB.innerHTML = preguntasCategoria[num].opcionB;
    opcionC.innerHTML = preguntasCategoria[num].opcionC;
    opcionD.innerHTML = preguntasCategoria[num].opcionD;

    // Agrego un eventlistener a cada boton de respuesta
    const botonesRespuesta = document.querySelectorAll(".opcion");
    // Quito los eventListen y las clases
    botonesRespuesta.forEach(opcion => {
        opcion.removeEventListener("click", () => {});
        opcion.classList.remove("correcta");
        opcion.classList.remove("incorrecta");
        opcion.classList.remove("no-events");
    });

    botonesRespuesta.forEach(opcion => {
        opcion.addEventListener("click", agregarEventListenerBoton);
    });

    txtPuntaje.classList.remove("efecto");
}

function agregarEventListenerBoton(e) {
    console.log(e.currentTarget.id);
    console.log(numPreguntaActual);
    console.log(preguntasCategoria[numPreguntaActual].correcta);
    //Controlo si la respuesta es correcta
    if (e.currentTarget.id === preguntasCategoria[numPreguntaActual].correcta) {
        e.currentTarget.classList.add("correcta");
        puntajeTotal = puntajeTotal + 1;
        txtPuntaje.innerHTML = puntajeTotal;
        localStorage.setItem("puntaje-total", puntajeTotal);
        txtPuntaje.classList.add("efecto");
    } else {
        e.currentTarget.classList.add("incorrecta");
        const correcta = document.querySelector("#" + preguntasCategoria[numPreguntaActual].correcta);
        correcta.classList.add("correcta");
    }
    //Agrego un eventlistener a cada boton de respuesta
    const botonesRespuesta = document.querySelectorAll(".opcion");
    //Quito los eventListen para que no pueda seguir haciendo clic
    console.log(botonesRespuesta)
    botonesRespuesta.forEach(opcion => {
        opcion.classList.add("no-events");
    });
}

const btnSiguiente = document.querySelector("#siguiente");
btnSiguiente.addEventListener("click", () => {
    numPreguntaActual++;
    if (numPreguntaActual <= 4) {
        cargarSiguientePregunta(numPreguntaActual);
    } else {
        const categoriasJugadasLS = JSON.parse(localStorage.getItem("categorias-jugadas"));

        console.log(categoriasJugadasLS.length);
        if (parseInt(categoriasJugadasLS.length) < 6) {
            location.href = "menu.html";
        } else {
            location.href = "final.html";
        }

    }

});
