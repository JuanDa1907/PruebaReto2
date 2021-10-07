/*
 * @Autor: Juan David Beltran Piza
 * @Grupo: G12
 * @Grupo de trabajo: 09
 */

/*
 * ENDPOINT API AUDIENCE ORACLE CLOUD /AUDIENCE/
 */

const endpoint = "https://g2f3e42f83bf988-db202109261450.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience";
const etp = document.getElementById("info_auditorios");
const bMostrar = document.getElementById("bMostrar");
const bGuardar = document.getElementById("bGuardar");
const bActualizar = document.getElementById("bActualizar");
const bEliminar = document.getElementById("bEliminar");
/**/
const id_a = document.getElementById("id");
const owner_a = document.getElementById("owner");
const capacity_a = document.getElementById("capacity");
const cat_a = document.getElementById("category");
const nombre_a = document.getElementById("nombrea");

/* Capturar info de los campos input */
function capturarInfo() {
  const data = {
    id: id_a.value,
    owner: owner_a.value,
    capacity: capacity_a.value,
    category_id: cat_a.value,
    name: nombre_a.value,
  };

  return JSON.stringify(data);
}

/* Obtener los datos de la tabla audience */
function getProducto(productos) {
  let cadena = "";
  console.log(productos.length)
    if (productos.length == 0) {
        cadena = "No hay Registros"
    }
    else{
    productos.forEach((audience) => {
    cadena +="<p>ID:" +  audience.id + "</p>" +
              "<p>DUEÑO:" +  audience.owner + "</p>" +
              "<p>CAPACIDAD:" + audience.capacity + "</p>" +
              "<p>ID CATEGORIA:" + audience.category_id + "</p>" +
              "<p>NOMBRE:" + audience.name + "<p>";
  });
}
  console.log(etp);
  console.log(cadena);
  etp.innerHTML = cadena;
}

/* Verificar que ninguno de los campos input se encuentren vacios */
function validarCampo() {
  if (
    id_a.value == "" ||
    owner_a.value == "" ||
    capacity_a.value == "" ||
    cat_a.value == "" ||
    nombre_a.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}

/* Devolver una alerta con el resultado de la operacion POST */
function resultadosPost(status) {
  let mensaje = "";
  if (status == 201) {
    mensaje = "Auditorio Guardado Con exito!";
  } else if (status == 204) {
    mensaje = "Este registro ya existe";
  }
  alert(mensaje);
}

/* Validar que el campo ID no este vacio */
function validarCampoEliminar() {
  if (id_a.value == "") {
    return true;
  } else {
    return false;
  }
}

/* Capturar info del campo ID para la funcion DELETE */
function capturarId() {
  const data = {
    id: id_a.value
  };
  return JSON.stringify(data);
}

/* Devolver una alerta con el resultado de la operacion DELETE */
function resultadoEliminar(status) {
  if (status == 204) {
    alert("Registro Eliminado!");
  }
  else{
    alert("Error!")
  }
}

/* Limpiar los campos input para que el usuario pueda ingresar datos nuevamente */
function limpiarCampo() {
  id_a.value = "";
  owner_a.value = "";
  capacity_a.value = "";
  cat_a.value = "";
  nombre_a.value = "";
  id_a.focus();
}

/* Funcion para mostrar los datos en consola */
function mostrarProducto(audience) {
  console.log("***************************");
  audience.forEach((audience) => {
    console.log("ID TEATRO " + audience.id);
    console.log("NOMBRE PROPIETARIO " + audience.owner);
    console.log("CAPACIDAD " + audience.capacity);
    console.log("CATEGORY ID " + audience.category_id);
    console.log("NOMBRE " + audience.name);
    console.log("***************************");
  });
}

/*************** PETICIONES ***************/

/* Peticion get de la api de oracle cloud */
function peticionGet() {
  $.ajax({
    method: "GET",
    url: endpoint,
    success: function (data) {
      //console.log(data)
      getProducto(data.items);
      mostrarProducto(data.items);
    },
    error: function (error) {
      console.log("Error al Consumir Api Oracle Cloud ");
    },
  });
}

/* Funcion para peticion POST de la api Oracle Cloud */
function peticionPost() {  
  $.ajax({
    method: "POST",
    url: endpoint,
    data: capturarInfo(),
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadosPost(response.status, "Se ha grabado con exito!");
      limpiarCampo();
    },
  });
}

/* Funcion para peticion PUT de la api Oracle Cloud */
function peticionPut() {
  $.ajax({
    method: "PUT",
    url: endpoint,
    data: capturarInfo(),
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadosPost(response.status);
      limpiarCampo();
      peticionGet()
    },
  });
}

/* Funcion para peticion DELETE de la api Oracle Cloud */
function peticionDelete() {
  $.ajax({
    method: "DELETE",
    url: endpoint,
    data: capturarId(),
    dataType: 'json',
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminar(response.status);
      limpiarCampo();
      peticionGet()
    },
  });
}

/* Event Listeners para los Botones */

bMostrar.addEventListener("click", (e) => {
  e.preventDefault();
  peticionGet();
});

bGuardar.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampo()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionPost();
  }
});

bActualizar.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampo()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionPut();
  }
});

bEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoEliminar()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionDelete();
}
});

/********************************************
  ENDPOINT API AUDIENCE ORACLE CLOUD /CLIENT/
 ********************************************/

const endpointc = "https://g2f3e42f83bf988-db202109261450.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client";
const etpc = document.getElementById("info_clientes");
const bMostrarC = document.getElementById("mostrar_c");
const bGuardarC = document.getElementById("guardar_c");
const bActualizarC = document.getElementById("actualizar_c");
const bEliminarC = document.getElementById("eliminar_c");
/**/
const id_c = document.getElementById("id_client");
const name_c = document.getElementById("name_client");
const email_c = document.getElementById("email_client");
const age_c = document.getElementById("age_client");

/* Funcion para capturar los datos ingresados por el usuario */
function capturarInfoC() {
  const data = {
    id: id_c.value,
    name: name_c.value,
    email: email_c.value,
    age: age_c.value
  };
  return JSON.stringify(data);
}

/* Funcion para obtener los registros de la tabla MESSAGE */
function getProductoC(clientes) {

  let cadenac = ""
    console.log(clientes.length)
    if (clientes.length == 0) {
        cadenac = "Sin Registros"
    }
    else {
        clientes.forEach(client => {
            cadenac += "<p>Codigo Cliente:" + client.id + "</p>" +
                "<p>Nombre:" + client.name + "</p>" +
                "<p>Email:" + client.email + "</p>" +
                "<p>Edad:" + client.age + "</p>"
        }
        );
    }
    console.log(etpc)
    console.log(cadenac)
    etpc.innerHTML = cadenac
}

/* Funcion para validar que todos los campos no esten vacios */
function validarCampoC() {
  if ( id_c.value == "" || name_c.value == "" || email_c.value == "" ||  age_c.value == "" ) {
    return true;
  } else {
    return false;
  }
}

/* Funcion para devolver una alerta con el resultado de la peticion POST */
function resultadosPostC(status) {
  let mensajeC = "";
  if (status == 201) {
    mensajeC = "Guardado Con exito!";
  } else if (status == 204) {
    mensajeC = "Este registro ya existe";
  }
  else{
    mensajeC = "Este registro ya existe";
  }
  alert(mensajeC);
}

/* Funcion para validar que el campo ID no este vacia */
function validarCampoEliminarC() {
  if (id_c.value == "") {
    return true;
  } else {
    return false;
  }
}

/* Funcion para capturar el id del campo input de la peticion DELETE */
function capturarIdC() {
  const data = {
    id: id_c.value
  };

  return JSON.stringify(data);
}

/* Funcion para devolver una alerta con el resultado de la peticion DELETE */
function resultadoEliminarC(status) {
  if (status == 204) {
    alert("Registro Eliminado!");
  }
  else{
    alert("Error!")
  }
}

/* Funcion para limpiar los campos input */
function limpiarCampoC() {
  id_c.value = "";
  name_c.value = "";
  email_c.value = "";
  age_c.value = "";
  id_c.focus();
}

/* Funcion para mostrar los datos de clientes en consola */
function mostrarProductoC(cliente) {
  console.log("***************************");
  cliente.forEach((client) => {
    console.log("ID CLIENTE " + client.id);
    console.log("NOMBRE CLIENTE " + client.name);
    console.log("EMAIL " + client.email);
    console.log("EDAD " + client.age);
    console.log("***************************");
  });
}

/***************** PETICIONES *****************/

/* Peticion GET de la api de oracle cloud */
function peticionGetCliente() {
  $.ajax({
    method: "GET",
    url: endpointc,
    success: function (data) {
      //console.log(data)
      getProductoC(data.items);
      mostrarProductoC(data.items);
    },
    });
}

/* Peticion POST de la api de oracle cloud */
function peticionPostCliente() {
  $.ajax({
    method: "POST",
    url: endpointc,
    data: capturarInfoC(),
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadosPostC(response.status);
      limpiarCampoC();
    },
  });
}

/* Peticion PUT de la api de oracle cloud */
function peticionPutCliente() {
  $.ajax({
    method: "PUT",
    url: endpointc,
    data: capturarInfoC(),
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadosPostC(response.status);
      limpiarCampoC();
      peticionGetCliente();
    },
  });
}

/* Peticion DELETE de la api de oracle cloud */
function peticionDeleteCliente() {
  $.ajax({
    method: "DELETE",
    url: endpointc,
    data: capturarIdC(),
    dataType: 'json',
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminarC(response.status);
      limpiarCampoC();
      peticionGetCliente();
    },
  });
}

/* Event listeners para los botones CLIENT */

bMostrarC.addEventListener("click", (e) => {
  e.preventDefault();
  peticionGetCliente();
});

bGuardarC.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoC()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionPostCliente();
  }
});

bActualizarC.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoC()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionPutCliente();
  }
});

bEliminarC.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoEliminarC()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionDeleteCliente();
}
});

/*********************************************
  ENDPOINT API AUDIENCE ORACLE CLOUD /MESSAGE/
 **********************************************/

const endpointm = "https://g2f3e42f83bf988-db202109261450.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";
const etpm = document.getElementById("info_messages");
const bMostrarM = document.getElementById("mostrar_msg");
const bGuardarM = document.getElementById("guardar_msg");
const bActualizarM = document.getElementById("actualizar_msg");
const bEliminarM = document.getElementById("eliminar_msg");
/**/
const id_m = document.getElementById("id_msg");
const msg = document.getElementById("msg");


/* Capturar info de los campos input */
function capturarInfoM() {
  const datam = {
    id: id_m.value,
    messagetext: msg.value, 
  };

  return JSON.stringify(datam);
}

/* Obtener los datos de la tabla audience */

function getProductoM(message) {
  let cadenam = "";
  console.log(message.length)
    if (message.length == 0) {
        cadenam = "No hay Registros"
    }
    else {
      message.forEach(message => {
          cadenam +=  "<p>Codigo:" + message.id + "</p>" +
                      "<p>Mensaje:" + message.messagetext + "</p>"       
      }
      );
  }
  console.log(etpm);
  console.log(cadenam);
  etpm.innerHTML = cadenam;
}

/* Verificar que ninguno de los campos input se encuentren vacios */
function validarCampoM() {
  if (id_m.value == "" ||  msg.value == "" ) {
    return true;
  } else {
    return false;
  }
}

/* Devolver una alerta con el resultado de la operacion POST */
function resultadosPostM(status) {
  let mensajeM = "";
  if (status == 201) {
    mensajeM = "Mensaje Guardado Con exito!";
  } else if (status == 204) {
    mensajeM = "Este registro ya existe";
  }
  alert(mensajeM);
}

/* Validar que el campo ID no este vacio */
function validarCampoEliminarM() {
  if (id_m.value == "") {
    return true;
  } else {
    return false;
  }
}

/* Capturar info del campo ID para la funcion DELETE */
function capturarIdM() {
  const data_m = {
    id: id_m.value
  };
  return JSON.stringify(data_m);
}

/* Devolver una alerta con el resultado de la operacion DELETE */
function resultadoEliminarM(status) {
  if (status == 204) {
    alert("Mensaje Eliminado Correctamente!");
  }
  else{
    alert("Error!")
  }
}

/* Limpiar los campos input para que el usuario pueda ingresar datos nuevamente */
function limpiarCampoM() {
  id_m.value = "";
  msg.value = "";
  id_m.focus();
}

/* Funcion para mostrar los datos en consola */
function mostrarProductoM(message) {
  console.log("***************************");
  message.forEach((message) => {
    console.log("ID TEATRO " + message.id);
    console.log("NOMBRE PROPIETARIO " + message.messagetext);
    console.log("***************************");
  });
}

/*************** PETICIONES ***************/

/* Peticion GET de la api de oracle cloud */
function peticionGetMsg() {
  $.ajax({
    method: "GET",
    url: endpointm,
    success: function (data) {
      //console.log(data)
      getProductoM(data.items);
      mostrarProductoM(data.items);
    },
    });
}

/* Funcion para peticion POST de la api Oracle Cloud */
function peticionPostMsg() {  
  $.ajax({
    method: "POST",
    url: endpointm,
    data: capturarInfoM(),
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadosPostM(response.status, "Se ha grabado con exito!");
      limpiarCampoM();
    },
  });
}

/* Funcion para peticion PUT de la api Oracle Cloud */
function peticionPutMsg() {
  $.ajax({
    method: "PUT",
    url: endpointm,
    data: capturarInfoM(),
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadosPostM(response.status);
      limpiarCampoM();
      peticionGetMsg();
    },
  });
}

//* Funcion para peticion DELETE de la api Oracle Cloud */
function peticionDeleteMsg() {
  $.ajax({
    method: "DELETE",
    url: endpointm,
    data: capturarIdM(),
    dataType: 'json',
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminarM(response.status);
      limpiarCampoM();
      peticionGetMsg();
    },
  });
}

/* Event Listeners para los Botones */

bMostrarM.addEventListener("click", (e) => {
  e.preventDefault();
  peticionGetMsg();
});

bGuardarM.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoM()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionPostMsg();
  }
});

bActualizarM.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoM()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionPutMsg();
  }
});

bEliminarM.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoEliminarM()) {
    alert("Campo(s) vacios!!");
  } else {
    peticionDeleteMsg();
  } 
});

/* FIN DEL PROGRAMA */