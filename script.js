/*
 * @Autor: Juan David Beltran Piza
 * @Grupo: G12
 * @Grupo de trabajo: 09
 */

/*
 * ENDPOINT API AUDIENCE ORACLE CLOUD
 */

const endpoint =
  "https://g2f3e42f83bf988-db202109261450.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience";
const etp = document.getElementById("informacion");
const btnnuevo = document.getElementById("guardar");
const btnver = document.getElementById("ver");
const btnact = document.getElementById("actualizar");
const btndel = document.getElementById("eliminar");

/**
 * consumiento metodo get la Api de Cloud para visualizar en el cliente
 */

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

function getProducto(productos) {
  let cadena = "";

  productos.forEach((audience) => {
    cadena +=
      "<p>ID:" + audience.id + "</p>" +
      "<p>DUEÑO:" + audience.owner + "</p>" +
      "<p>CAPACIDAD:" + audience.capacity +"</p>" +
      "<p>ID CATEGORIA:" + audience.category_id + "</p>" +
      "<p>NOMBRE:" + audience.name + "<p>";
  });
  console.log(etp);
  console.log(cadena);
  etp.innerHTML = cadena;
}

/**
 *
 * funcion mostrar Producto
 */
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

/**funcion para peticion post */
function peticionPost() {
  const data = {
    id: "1",
    owner: "Natalie",
    capacity: 400,
    category_id: 5,
    name: "Teatro",
  };
  let datasend = JSON.stringify(data);

  $.ajax({
    method: "POST",
    url: endpoint,
    data: datasend,
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      console.log(response.status);
    },
    error: function (error) {},
  });
}
/**peticion put */

function peticionPut() {
  const data = {
    id: "2",
    owner: "Pedro",
    capacity: 1700,
    category_id: 2,
    name: "Teatro Grande",
  };
  let datasend = JSON.stringify(data);
  $.ajax({
    method: "PUT",
    url: endpoint,
    data: datasend,
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      console.log("Registro Actualizado con exito!");
    },
    error: function (error) {},
  });
}

/**funcion delete */
function peticionDelete() {
  const data = {
    id: "1",
  };
  let datasend = JSON.stringify(data);
  $.ajax({
    method: "DELETE",
    url: endpoint,
    data: datasend,
    dataType: "json",
    contentType: "application/json",
    complete: function (response) {
      console.log("Elimino Registro!!");
    },
    error: function (error) {},
  });
}

//peticionGet()

btnnuevo.addEventListener("click", (e) => {
  peticionPost();
});
btnact.addEventListener("click", (e) => {
  e.preventDefault();
  peticionPut();
});
btndel.addEventListener("click", (e) => {
  e.preventDefault();
  peticionDelete();
});

btnver.addEventListener("click", (e) => {
  e.preventDefault();
  peticionGet();
});
