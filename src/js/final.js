const txtPuntaje = document.querySelector("#puntos");
const nombre = document.querySelector("#nombre");
const nombreJugador = document.querySelector("#nombre-jugador");
const puntajeFinal = document.querySelector("#puntaje-final");
const totalAcertadas = document.querySelector("#total-acertadas");
const totalNoAcertadas = document.querySelector("#total-no-acertadas");
const btnComenzar = document.querySelector("#btn-comenzar");
const btnDescuento = document.querySelector("#btn-descuento");
const displayCodigo = document.querySelector("#codigo-descuento");

nombre.textContent = localStorage.getItem("nombre");
nombreJugador.textContent = localStorage.getItem("nombre");
txtPuntaje.textContent = parseInt(localStorage.getItem("puntaje-total"));
puntajeFinal.textContent = parseInt(localStorage.getItem("puntaje-total")) + "% menos en tu factura de Netflix";

const correctas = parseInt(localStorage.getItem("puntaje-total")) / 1;
const incorrectas = 30 - correctas;
totalAcertadas.textContent = correctas;
totalNoAcertadas.textContent = incorrectas;

btnComenzar.addEventListener("click", () => {
    location.href = "index.html";
});

btnDescuento.addEventListener("click", () => {
    const codigo = generarCodigoDescuento(8);
    displayCodigo.textContent = "Tu código de descuento es: " + codigo;
    displayCodigo.style.display = "block";
});

function generarCodigoDescuento(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
