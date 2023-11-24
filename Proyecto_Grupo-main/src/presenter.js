import ListaDeKatas from "./Lista_Katas.js";
import Kata from "./Kata.js";
import usuario from "./Usuario.js";
import curso from "./Curso.js";

let usuarioActual = null;

document.addEventListener("DOMContentLoaded", function() {
    const cont_katas = document.querySelector("#katas-disponibles");
    const lista_Katas = new ListaDeKatas();

    // Función para crear elementos HTML
    function createElement(tag, textContent) {
        const element = document.createElement(tag);
        if (textContent) {
            element.textContent = textContent;
        }
        return element;
    }

    const nombreInput = document.querySelector("#nombre-kata");
    const descripcionInput = document.querySelector("#descripcion-kata");
    const dificultadSelect = document.querySelector("#dificultad");
    const añadirButton = document.querySelector("form#form_añadir button[type='submit']");
    
    añadirButton.addEventListener("click", function(event) {
        event.preventDefault();
    
        const nombre = nombreInput.value;
        const descripcion = descripcionInput.value;
        const dificultad = dificultadSelect.value;
    
       
        if (nombre && descripcion && dificultad) {
            const nuevaKata = new Kata(nombre, descripcion, dificultad);
            lista_Katas.añadirkata(nuevaKata);
            nombreInput.value = "";
            descripcionInput.value = "";
    
            addKataToContainer(nuevaKata);
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
    // Función para agregar katas a la lista
    function addKataToContainer(kata) {
        const contenedorKata = createElement("div");
        contenedorKata.className = "contenedor-kata";
    
        contenedorKata.appendChild(createElement("h4", kata.getNombre()));
        contenedorKata.appendChild(createElement("p", kata.getDescripcion()));
        contenedorKata.appendChild(createElement("span", `Dificultad: ${kata.getDificultad()}`));
        // Eliminar una kata
        const btnEliminar = createElement("button", "Eliminar");
        btnEliminar.addEventListener("click", function () {
            if (confirm("¿Estás seguro de que deseas eliminar esta kata?")) {
                lista_Katas.eliminarKata(kata);
                cont_katas.removeChild(contenedorKata);
            }
        });
        contenedorKata.appendChild(btnEliminar);
        //Editar
        const btnEditar = createElement("button", "Editar");
        btnEditar.addEventListener("click", function () {
            showEditForm(kata, contenedorKata);
        });
    
        function showEditForm(kata, contenedorKata) {
            // Crear formulario de edición
            const editForm = document.createElement("form");
    
            // Input para editar el nombre
            const nombreInput = document.createElement("input");
            nombreInput.type = "text";
            nombreInput.value = kata.getNombre();
            editForm.appendChild(nombreInput);
    
            // Input para editar la descripción
            const descripcionInput = document.createElement("input");
            descripcionInput.type = "text";
            descripcionInput.value = kata.getDescripcion();
            editForm.appendChild(descripcionInput);
    
            // Select para editar la dificultad
            const dificultadSelect = document.createElement("select");
            const opcionesDificultad = ["Fácil", "Media", "Difícil"];
            opcionesDificultad.forEach(opcion => {
                const option = document.createElement("option");
                option.value = opcion;
                option.textContent = opcion;
                dificultadSelect.appendChild(option);
            });
            dificultadSelect.value = kata.getDificultad();
            editForm.appendChild(dificultadSelect);
    
            // Botón para confirmar la edición
            const btnConfirmar = createElement("button", "Confirmar");
            btnConfirmar.addEventListener("click", function () {
                // Obtener los nuevos valores
                const nuevoNombre = nombreInput.value;
                const nuevaDescripcion = descripcionInput.value;
                const nuevaDificultad = dificultadSelect.value;
    
                // Aplicar los cambios
                lista_Katas.editarKata(kata, nuevoNombre, nuevaDescripcion, nuevaDificultad);
    
                // Actualizar la vista de la kata
                updateKataView(contenedorKata, nuevoNombre, nuevaDescripcion, nuevaDificultad);
    
                // Eliminar el formulario y el botón de confirmar
                contenedorKata.removeChild(editForm);
                contenedorKata.removeChild(btnConfirmar);
            });
    
            // Agregar formulario de edición al contenedor
            contenedorKata.appendChild(editForm);
            contenedorKata.appendChild(btnConfirmar);
        }
    
        contenedorKata.appendChild(btnEditar);
        cont_katas.appendChild(contenedorKata);
    }
    //Actualiza la vista de katas
    function updateKataView(contenedorKata, nuevoNombre, nuevaDescripcion, nuevaDificultad) {
        const nombreElement = contenedorKata.querySelector("h4");
        const descripcionElement = contenedorKata.querySelector("p:nth-child(2)");
        const dificultadElement = contenedorKata.querySelector("span:nth-child(3)");
    
        nombreElement.textContent = nuevoNombre;
        descripcionElement.textContent = nuevaDescripcion;
        dificultadElement.textContent = `Dificultad: ${nuevaDificultad}`;
    }
    
    //Añadimos los katas y su informacion respectiva 
    lista_Katas.añadirkata("Kata - Calculadora String","Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica","Media");
    lista_Katas.añadirkata("Kata - Punto de venta kata","Cree una aplicación sencilla para escanear códigos de barras para vender productos.","Fácil");
    lista_Katas.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Difícil");
    const katas_disp = lista_Katas.devolver_ListaKatas();

    //Llenado dinamico del Kata
    katas_disp.forEach(addKataToContainer);

    const form = document.querySelector("#form_buscar");
    form.addEventListener("submit",(event) => {
        event.preventDefault();
        const busqueda = event.target.elements["busqueda"].value;
        const tipoBusqueda = event.target.elements["tipo_busqueda"].value;
        const busquedaDificultad = event.target.elements["dificultadBusqueda"].value;
    
        let katasFiltradas;
    
        if (tipoBusqueda === "nombre") {
            katasFiltradas = lista_Katas.buscar_Titulo(busqueda);
        } else if (tipoBusqueda === "descripcion") {
            katasFiltradas = lista_Katas.buscar_Descripcion(busqueda);
        } else if (tipoBusqueda === "dificultad") {
            if(busquedaDificultad === "facil"){ katasFiltradas = lista_Katas.buscar_Dificultad("Fácil"); }
            else if(busquedaDificultad === "media"){ katasFiltradas = lista_Katas.buscar_Dificultad("Media"); }
            else if(busquedaDificultad === "dificil"){ katasFiltradas = lista_Katas.buscar_Dificultad("Difícil"); }
        } else {
            katasFiltradas = [];
        }
    
        // Actualiza la lista solo con los resultados de la búsqueda
        cont_katas.innerHTML = "";
        katasFiltradas.forEach(addKataToContainer);
    });


    const mostrarFormularioBtn = document.getElementById("mostrar-formulario");
        const formulario = document.getElementById("form_añadir");

        mostrarFormularioBtn.addEventListener("click", () => {
            if (formulario.style.display === 'none' || formulario.style.display === '') {
                formulario.style.display = 'block';
            } else {
                formulario.style.display = 'none';
            }
        });

        const kataForm = document.querySelector("#form_añadir");
        kataForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombreKata = document.querySelector("#nombre-kata").value;
            const descripcionKata = document.querySelector("#descripcion-kata").value;
            const dificultadKata = document.querySelector("#dificultad").value;

            const nuevaKata = new Kata(nombreKata, descripcionKata, dificultadKata);
            lista_Katas.añadirkata(nuevaKata);
    
            // Actualiza la lista con la nueva Kata
            addKataToContainer(nuevaKata);
    
            // Limpia los campos de entrada
            document.querySelector("#nombre-kata").value = "";
            document.querySelector("#descripcion-kata").value = "";
            document.querySelector("#dificultad").value = "Fácil";

            // Oculta el formulario después de añadir la Kata
            formulario.style.display = 'none';
        });

        // Obtenemos la lista de usuarios guardados en localStorage (si existe)
        usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuariosReconstruidos = usuariosGuardados.map(usr => new usuario(usr.nombre, usr.contraseña, usr.tipo));

        // Recorremos los usuarios guardados y creamos instancias para cada uno
        for (const usuarioGuardado of usuariosReconstruidos) {
            nuevoUsuario = new usuario(usuarioGuardado.nombre, usuarioGuardado.contraseña, usuarioGuardado.tipo);
            nuevoUsuario.agregarUsuario();
        }
        mostrarUsuarios();


    //cursos creados
    cursosGuardados = JSON.parse(localStorage.getItem('cursos')) || [];
    cursosInstanciados = cursosGuardados.map(cursoGuardado => new curso(cursoGuardado.nombre, cursoGuardado.propietario));

     // Recorrer la lista de cursos y agregarlos al menú lateral
    cursosInstanciados.forEach(function (curso) {
        agregarCursoAlMenu(curso.nombre);
    });

});

//elementos registrar usuario
const registrarseButton = document.getElementById('botonRegistro');
const contRegistro = document.getElementById('overlay-Registro');
const guardarRegistro = document.getElementById('guardar-Reg');
const nombreRegistro = document.getElementById('nombreReg');
const tipoRegistro = document.getElementById('tipoReg');
const contraRegistro = document.getElementById('contraReg');
const confirmarContraseña = document.getElementById('confirmarContra');
const salirReg = document.getElementById('salir-Reg');
//elementos inicio de sesion
const inicioButton = document.getElementById('botonIniciarSesion');
const contInicio = document.getElementById('overlay-Inicio');
const inicioSesion = document.getElementById('Inicio-Sesion');
const nombreInicio = document.getElementById('nombreIn');
const contraseñaInicio = document.getElementById('contraIn');
const salirIn = document.getElementById('salir-In');
const cerrarSesion = document.getElementById('botonCerrarSesion');

const resultadosUsuario = document.getElementById('resultadosUs');
const divMostrarUsuarios = document.getElementById('mostrarUsuarios');


let usuariosGuardados;
let nuevoUsuario;
let usuariosReconstruidos;

registrarseButton.addEventListener('click', () => {
    contRegistro.style.display = 'flex';
});

salirReg.addEventListener('click', () => {
    contRegistro.style.display = 'none';
});

inicioButton.addEventListener('click', () => {
    contInicio.style.display = 'flex';
});

salirIn.addEventListener('click', () => {
    contInicio.style.display = 'none';
});

guardarRegistro.addEventListener('click', () => {
    const nombreUsNuevo = nombreRegistro.value.trim();
    const tipoUsNuevo = tipoRegistro.value.trim();
    const contraUsNuevo = contraRegistro.value.trim();
    const confirmarUsNuevo = confirmarContraseña.value.trim();
    if (nombreUsNuevo !== '' && contraUsNuevo !== '' && confirmarUsNuevo !== '' ) {
        if(contraUsNuevo == confirmarUsNuevo){
            // Creamos el nuevo usuario y lo agregamos
            nuevoUsuario = new usuario(nombreUsNuevo, contraUsNuevo, tipoUsNuevo);
            nuevoUsuario.agregarUsuario();
            usuariosReconstruidos.push(nuevoUsuario);

            // Mensaje de registro correcto
            contRegistro.style.display = 'none';
            resultadosUsuario.textContent ='El usuario con nombre '+nombreUsNuevo+' se registro';
            localStorage.setItem('usuarios', JSON.stringify(usuariosReconstruidos));
            setTimeout(() => {
                resultadosUsuario.textContent = '';
            }, 4000);
        }
        else{
            alert('Error al ingresar contraseña');
        }
    } else {
        alert('El nombre y/o contraseña registrada no puede estar vacío');
    }
});

inicioSesion.addEventListener('click', () => {
    const nombreIngresado = nombreInicio.value.trim();
    const contraIngresada = contraseñaInicio.value.trim();
    if (nombreIngresado !== '' && contraIngresada != '') {
        const usuarioEncontrado = usuariosReconstruidos.find(usuario => 
            nombreIngresado === usuario.nombre && contraIngresada === usuario.contraseña
        );
        if (usuarioEncontrado) {
            contInicio.style.display = 'none';
            resultadosUsuario.textContent = 'El usuario con nombre ' + nombreIngresado + ' se ingresó correctamente';
            usuarioActual = usuarioEncontrado;
            usuarioActual.__proto__ = usuario.prototype;
            setTimeout(() => {
                resultadosUsuario.textContent = '';
            }, 4000);
        }
               
    } else {
        alert('El nombre y/o contraseña para iniciar sesión no puede estar vacío');
    }
});

cerrarSesion.addEventListener('click', () => {
    usuarioActual = null;
    resultadosUsuario.textContent = 'Has cerrado sesión';
});

function mostrarUsuarios() {
    divMostrarUsuarios.innerHTML = '';
    let tipoUs;
    usuariosReconstruidos.forEach(usuario => {
        const usuarioDiv = document.createElement('div');
        if(usuario.tipo == undefined)
        {
            tipoUs = "Desconocido"
        }
        else
        {
            tipoUs = usuario.tipo
        }
        usuarioDiv.textContent = `Nombre: ${usuario.nombre}, Tipo: ${tipoUs}`;
        divMostrarUsuarios.appendChild(usuarioDiv);
    });
}

let cursosGuardados;
let cursosInstanciados;

//elementos crear curso
const BtCrearCurso = document.getElementById("btn_crearcurso");
const contCrearCurso = document.getElementById("overlay-Curso");
const btAceptCrear = document.getElementById("bt_AceptCurso");
const btCancelCrear = document.getElementById("bt_cancelCurso");
const nombreCurso = document.getElementById("nombreCurso");
const menuLateral = document.getElementById("menu-cursos");
const contInscribirse = document.getElementById("overlay-inscribirse");
const btAceptInscripcion = document.getElementById("bt_AceptInscripcion");
const btCancelInscripcion = document.getElementById("bt_cancelInscripcion");
const nombreCursoPopup = document.getElementById("cursoPopup");

BtCrearCurso.addEventListener('click', () => {
    contCrearCurso.style.display = 'flex';
});

btCancelCrear.addEventListener('click', () => {
    contCrearCurso.style.display = 'none';
    nombreCurso.value = "";
});

btAceptCrear.addEventListener('click', () =>{
    if (usuarioActual) {
        if(nombreCurso.value !== ''){
            const cursoNuevo = usuarioActual.crearCurso(nombreCurso.value.trim());
            cursosInstanciados.push(cursoNuevo);
            localStorage.setItem('cursos', JSON.stringify(cursosInstanciados));
            contCrearCurso.style.display = 'none';
            nombreCurso.value = "";
        }
        else{
            alert("Faltan datos para crear el curso");
        }
    } else {
        alert('No hay usuario logeado. Inicia sesión antes de crear un curso.');
    }   
});

function agregarCursoAlMenu(nombreCurso) {
    const nuevoCursoElemento = document.createElement('div');
    nuevoCursoElemento.textContent = nombreCurso;

    // Agregar un evento de clic para almacenar el nombre del curso seleccionado
    nuevoCursoElemento.addEventListener('click', function () {
        nombreCursoPopup.textContent = nombreCurso;
        contInscribirse.style.display = 'flex';
    });

    menuLateral.appendChild(nuevoCursoElemento);
}

function inscribir() {
    contInscribirse.style.display = 'none';
    const nombreCurso = nombreCursoPopup.textContent;
    let cursoEncontrado = encontrarCursoPorNombre(nombreCurso);
    if (cursoEncontrado && cursoEncontrado.inscribirAlumno(usuarioActual)) {
        console.log("Inscritos de " + cursoEncontrado.getNombre() + ": ", cursoEncontrado.getInscritos());
        alert("Te inscribiste a " + nombreCursoPopup.textContent);
        
    } else {
        alert("Debes estar logeado como Estudiante para inscribirte a un curso");
    }
    
}

function encontrarCursoPorNombre(nombreCurso) {
    const cursoEncontrado = cursosInstanciados.find(curso => curso.nombre === nombreCurso);
    return cursoEncontrado;
}

btAceptInscripcion.addEventListener('click', inscribir);

btCancelInscripcion.addEventListener('click', () => {
    contInscribirse.style.display = 'none';
});