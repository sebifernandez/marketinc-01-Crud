//Constantes de apertura y cierre de ventana 
const abrirPanel = document.getElementById("btnNuevo");
const panelCerrar = document.getElementById("btnCerrar");
const principal = document.querySelector(".principal");
const ingresoNuevo = document.getElementById("ingresoNuevo");

const agregar = document.querySelector('#btnAgregar');
agregar.addEventListener('click', function() {
    agregarDatos();
})

// const submit = document.querySelector('#btnModificar');
// submit.addEventListener('click', function() {
//     updateRegistro();
// })


// Agregando clases muestra el div de 'ingreso nuevo' ocultando la pantalla principal 
abrirPanel.addEventListener("click", () => {
    principal.classList.add("ocultar");
    ingresoNuevo.classList.add("mostrar");
});

// Removiendo clases muestra la pantalla principal ocultando el div de 'ingreso nuevo'  
panelCerrar.addEventListener("click", () => {
    principal.classList.remove("ocultar");
    ingresoNuevo.classList.remove("mostrar");
});

// Función para validar los datos ingresados antes de agregarlos a la lista
function validarFormulario(){
    //Variables del formulario
    let producto = document.getElementById("productos").value;
    let cantidad = document.getElementById("txtCantidad").value;
    let lado = document.getElementById("txtLado").value;
    let posicion = document.getElementById("txtPosicion").value;

    if(producto == ""){
        swal("Error", "Debe seleccionar un producto", "error");
        return false;
    }

    if(cantidad == ""){
        swal("Error", "Debe ingresar una Cantidad", "error");
        return false;
    }else if(cantidad < 0){
        swal("Error", "Debe ingresar una Cantidad mayor o igual a 1", "error");
        return false;
    }

    if(lado == "" || posicion == ""){
        swal({
            title: "Cuidado: No ha ingresado todos los campos",
            text: "Algunos productos no lo requieren, de ser así puede continuar. Podrá modificarlo desde las opciones de así requerirlo",
            icon: "warning",
            //buttons: true,
            dangerMode: true,
        })
    }

    // if(posicion == ""){
    //     swal({
    //         title: "No ha ingresado Posición",
    //         text: "Algunos productos no lo requieren, de ser así puede continuar",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     })
    // }
    return true;
}

//Función para mostrar los datos
function mostrarDatos(){
    let listaProductos;
    if(localStorage.getItem("listaProductos") == null){
        listaProductos = [];
    }else{
        listaProductos = JSON.parse(localStorage.getItem("listaProductos"))
    }

    let html = "";

    listaProductos.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.producto + "</td>";
        html += "<td>" + element.cantidad + "</td>";
        html += "<td>" + element.lado + "</td>";
        html += "<td>" + element.posicion + "</td>";
        html += "<td>$500</td>";
        html += 
            '<td><button onclick="modificarRegistro(' + index + ')" class="btnModificar"></button><button onclick="borrarRegistro(' + index + ')" class="btnBorrar"></button></td>';
        html += "</tr>"
    });

    document.querySelector("#tablaCrud tbody").innerHTML = html;
}

// Carga todos los datos cuando se carga la página
document.onload = mostrarDatos();

// Función para agregar los datos
function agregarDatos(){
// Si el formulario fue validado
    if(validarFormulario() == true){
        let producto = document.getElementById("productos").value;
        let cantidad = document.getElementById("txtCantidad").value;
        let lado = document.getElementById("txtLado").value;
        let posicion = document.getElementById("txtPosicion").value;

        let listaProductos;
        if(localStorage.getItem("listaProductos") == null){
            listaProductos = [];
        }else{
            listaProductos = JSON.parse(localStorage.getItem("listaProductos"))//ver parentesis amarillo
        }

        listaProductos.push({
            producto : producto,
            cantidad : cantidad,
            lado : lado,
            posicion : posicion,
        });

        localStorage.setItem("listaProductos", JSON.stringify (listaProductos));
        mostrarDatos();
        document.getElementById("productos").value = "";
        document.getElementById("txtCantidad").value = "";
        document.getElementById("txtLado").value = "";
        document.getElementById("txtPosicion").value = "";
    }
}

// Función para borrar del local storage
function borrarRegistro(index){
    let listaProductos;
    if(localStorage.getItem("listaProductos") == null){
        listaProductos = [];
    }else{
        listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    }

    listaProductos.splice(index, 1);
    localStorage.setItem("listaProductos", JSON.stringify (listaProductos));
    mostrarDatos();
}

// Función para editar datos del Local Storage
function modificarRegistro(index){
    document.getElementById("btnAgregar").style.display = "none";
    document.getElementById("btnModificar").style.display = "block";
    principal.classList.add("ocultar");
    ingresoNuevo.classList.add("mostrar");

    let listaProductos;
    if(localStorage.getItem("listaProductos") == null){
        listaProductos = [];
    }else{
        listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    }

    document.getElementById("productos").value = listaProductos[index].producto;
    document.getElementById("txtCantidad").value = listaProductos[index].cantidad;
    document.getElementById("txtLado").value = listaProductos[index].lado;
    document.getElementById("txtPosicion").value = listaProductos[index].posicion;

    // function updateRegistro(){
    document.querySelector("#btnModificar").onclick = function(){
        if(validarFormulario() == true){
            listaProductos[index].producto = document.getElementById("productos").value;
            listaProductos[index].cantidad = document.getElementById("txtCantidad").value;
            listaProductos[index].lado = document.getElementById("txtLado").value;
            listaProductos[index].posicion = document.getElementById("txtPosicion").value;

            localStorage.setItem("listaProductos", JSON.stringify(listaProductos));

            mostrarDatos();

            principal.classList.remove("ocultar");
            ingresoNuevo.classList.remove("mostrar");
        }
    }
}
