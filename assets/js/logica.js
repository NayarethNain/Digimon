const URL_BASE = 'https://digimon-api.vercel.app'
const URL_DIGIMON = URL_BASE + '/api/digimon';
let contenido;
let carta;
let dataImagenes;
let dataNivel;



//Función tabla para mostrar todos los datos en una tabla

function tabla(datos) {
  contenido.innerHTML = "";

  for (let temp of datos) {
    contenido.innerHTML += `<tr>
 <th scope="row">${temp.name}</ th>
 <td><img src="${temp.img}" width="120" height="100"></td>
 <td>${temp.level}</td>
 </tr> `;
  }
}

//función tarjeta para llenar los datos de la tarjeta con un solo personaje

function tarjeta(data) {
  carta.innerHTML = "";

  for (let temp of data) {
    carta.innerHTML += `
        <div id="tarjSola" class="card mb-3 container" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${temp.img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">"NOMBRE: ${temp.name}"</h5>
        <p class="card-text">NIVEL: "${temp.level}"</p>
       </div>
    </div>
  </div>
</div>
`
  }
}

//función mostrar digimon para consumir los datos y mostrar "nivel"
function mostrarNivel() {
  let level = document.getElementById("contenido2");
  document.getElementById("tabla1").style.display = "none";
  document.getElementById("galeria").style.display = "none";
  document.getElementById("tabla_nivel").style.display = "block";

  level.innerHTML = "";
  for (let temp of dataNivel) {
    level.innerHTML += ` 
   
 <tr>
<td >${temp.name}</td>   
<td>${temp.level}</td>
</tr> `
  }
}


//función mostar imagenes
function mostrarImagenes() {
  let img = document.getElementById("galeria");
  document.getElementById("tabla1").style.display = "none";
  document.getElementById("carta").style.display = "none";
  document.getElementById("galeria").style.display = "block";
  


  img.innerHTML = "";
  for (let temp of dataImagenes) {
    img.innerHTML += ` 
       <div id="card" class="card">
      <img src="${temp.img}" class="card-img-top" alt=" imagen ${temp.name}">
      <div class="card-body">
        <h6 class="card-title">${temp.name}</h6>
        <p class="card-text">${temp.level}</p>
      </div>
    </div>
        
`
  }
}


//función captura dato para capturar el dato ingresado en el input y consumir ese personaje
function capturaDato() {
  let nombrePersonaje = document.getElementById("dato").value;
  nombrePersonaje = nombrePersonaje.toLowerCase();
  document.getElementById("tabla1").style.display = "none";
  document.getElementById("tabla_nivel").style.display = "none";
  document.getElementById("galeria").style.display = "block";

  fetch(URL_BASE + '/api/digimon/name/' + nombrePersonaje)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      tarjeta(datos);

    });
}



$(document).ready(function () {
  contenido = document.getElementById("contenido");
  carta = document.getElementById("carta");

  //Consumo API con Fetch
  fetch(URL_DIGIMON)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      tabla(datos);
      dataImagenes = datos;
      dataNivel = datos;
    });

})