const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const noPuedo = document.getElementById("noPuedo");
const siPuedo = document.getElementById("siPuedo");
const btnRegistrar = document.getElementById("btnRegistrar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tablaRegistros");
const contadorSi = document.getElementById("contadorSi");
const contadorNo = document.getElementById("contadorNo");

btnRegistrar.addEventListener("click", () => {

    const valorNombre = nombre.value.trim();
    const valorCorreo = correo.value.trim();

    // Validación principal
    if (valorNombre == "" || valorCorreo == "") {
        alert("Campo vacío, diligencie por favor");
        return;
    }

    // Validar que eligió una opción de asistencia
    let asistencia = "";
    if (noPuedo.checked) asistencia = "No";
    if (siPuedo.checked) asistencia = "Sí";

    if (asistencia === "") {
        alert("Campo vacío, diligencie por favor");
        return;
    }

    // VALIDACIÓN DE CORREO 
    const partes = valorCorreo.split("@");

    if (partes.length !== 2) {
        alert("Correo inválido");
        return;
    }

    const antes = partes[0];
    const despues = partes[1];

    const partesDominio = despues.split(".");

    if (
        antes.trim() === "" ||
        antes.includes(" ") ||
        despues.trim() === "" ||
        despues.includes(" ") ||
        partesDominio.length < 2 ||
        partesDominio[0].trim() === ""
    ) {
        alert("Correo inválido");
        return;
    }

    //Validar si el correo ya existe 
    const filas = tabla.getElementsByTagName("tr");
    for (let i = 1; i < filas.length; i++) { // i = 1 para saltarse encabezado
        const correoTabla = filas[i].cells[1].textContent;
        if (correoTabla.toLowerCase() === valorCorreo.toLowerCase()) {
            alert("Este correo ya está registrado");
            return;
        }
    }

    // Si pasó todas las validaciones
    alert("¡Registro exitoso!");

    // Crear nueva fila
    const nuevaFila = document.createElement("tr");

    nuevaFila.innerHTML = `
        <td>${valorNombre}</td>
        <td>${valorCorreo}</td>
        <td>${asistencia}</td>
    `;

    tabla.appendChild(nuevaFila);

    if (asistencia === "Sí") {
    contadorSi.textContent = Number(contadorSi.textContent) + 1;
} else {
    contadorNo.textContent = Number(contadorNo.textContent) + 1;
}
    // Limpiar inputs
    nombre.value = "";
    correo.value = "";
    noPuedo.checked = false;
    siPuedo.checked = false;
});
