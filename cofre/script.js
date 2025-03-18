const operacionElement = document.getElementById('operacion');
const ruedaDecenas = document.getElementById('rueda-decenas');
const ruedaUnidades = document.getElementById('rueda-unidades');
const ruedaCentenas = document.getElementById('rueda-centenas');
const comprobarButton = document.getElementById('comprobar');
const siguienteButton = document.getElementById('siguiente');
const resultadoElement = document.getElementById('resultado');
const monedasElement = document.getElementById('monedas'); // Elemento para mostrar las monedas

let num1, num2, resultadoCorrecto;
let numeroSeleccionadoDecenas = 0;
let numeroSeleccionadoUnidades = 0;
let numeroSeleccionadoCentenas = 0;
let monedas = 0; // Contador de monedas

// Llenar las ruedas con números del 0 al 9
for (let i = 0; i < 10; i++) {
    const numero = document.createElement('div');
    numero.classList.add('numero');
    numero.textContent = i;
    ruedaDecenas.appendChild(numero);
    ruedaUnidades.appendChild(numero.cloneNode(true));
    ruedaCentenas.appendChild(numero.cloneNode(true));
}

function generarOperacion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    resultadoCorrecto = num1 * num2;
    operacionElement.textContent = `${num1} x ${num2} = ?`;
}

function actualizarRuleta() {
    const desplazamientoDecenas = numeroSeleccionadoDecenas * -100;
    const desplazamientoUnidades = numeroSeleccionadoUnidades * -100;
    const desplazamientoCentenas = numeroSeleccionadoCentenas * -100;
    ruedaDecenas.style.transform = `translateY(${desplazamientoDecenas}px)`;
    ruedaUnidades.style.transform = `translateY(${desplazamientoUnidades}px)`;
    ruedaCentenas.style.transform = `translateY(${desplazamientoCentenas}px)`;
}

ruedaDecenas.addEventListener('click', () => {
    numeroSeleccionadoDecenas++;
    if (numeroSeleccionadoDecenas > 9) {
        numeroSeleccionadoDecenas = 0;
    }
    actualizarRuleta();
});

ruedaUnidades.addEventListener('click', () => {
    numeroSeleccionadoUnidades++;
    if (numeroSeleccionadoUnidades > 9) {
        numeroSeleccionadoUnidades = 0;
    }
    actualizarRuleta();
});

ruedaCentenas.addEventListener('click', () => {
    numeroSeleccionadoCentenas++;
    if (numeroSeleccionadoCentenas > 9) {
        numeroSeleccionadoCentenas = 0;
    }
    actualizarRuleta();
});

comprobarButton.addEventListener('click', () => {
    const resultadoUsuario = numeroSeleccionadoCentenas * 100 + numeroSeleccionadoDecenas * 10 + numeroSeleccionadoUnidades;
    if (resultadoUsuario === resultadoCorrecto) {
        resultadoElement.innerHTML = '<img src="imagenes/cofre abierto.jpg" alt="Cofre abierto">';
        monedas++; // Incrementa las monedas
        monedasElement.textContent = `Monedas: ${monedas}`; // Actualiza el contador
    } else {
        resultadoElement.innerHTML = '<img src="imagenes/cofre cerrado.avif" alt="Cofre cerrado">';
        if ("vibrate" in navigator) {
            navigator.vibrate(500);
        }
    }
});

siguienteButton.addEventListener('click', () => {
    generarOperacion();
    numeroSeleccionadoCentenas = 0;
    numeroSeleccionadoDecenas = 0;
    numeroSeleccionadoUnidades = 0;
    actualizarRuleta();
    resultadoElement.innerHTML = '';
});

generarOperacion();
actualizarRuleta();