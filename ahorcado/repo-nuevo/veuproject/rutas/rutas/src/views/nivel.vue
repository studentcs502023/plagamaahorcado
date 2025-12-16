<!-- <template>
    <div>

    <div class="title">
        <h1></h1>
        <p>{{ respuesta }}</p>
    </div>

    <div class="niveles"  >
        <div class="facil">
<button @click="seleccionarNivel('facil')">Fácil</button>
<button @click="seleccionarNivel('medio')">Medio</button>
<button @click="seleccionarNivel('experto')">Difícil</button>


        </div>
        <div class="medio"  >

        </div>
        <div class="dificil">

        </div>
    </div>

    </div>
</template> -->


<template>
  <div class="contenedor">

    <div class="encabezado">
      <h1>Selecciona el Nivel</h1>
      <p class="categoria">Categoría: {{ respuesta }}</p>
    </div>

 <div class="niveles">

  <!-- FÁCIL -->
  <div class="card" @click="seleccionarNivel('facil')">
    <div class="card-img mitad" :style="imgVar2"></div>

    <h2>Fácil</h2>
    <p>Palabras sencillas, tienes 14 intentos, si la palabra es correcta se oculta</p>
  </div>

  <!-- MEDIO -->
  <div class="card" @click="seleccionarNivel('medio')">
    <div class="card-img mitad" :style="imgVar1"></div>

    <h2>Medio</h2>
    <p>Un poco más difícil, tienes 10 intentos con una pista</p>
  </div>

  <!-- DIFÍCIL -->
  <div class="card" @click="seleccionarNivel('experto')">
    <div class="card-img mitad"  :style="imgVar"></div>

    <h2>Difícil</h2>
    <p>Palabras largas y complejas, tienes 9 intentos solo tienes una pista en el octavo intento</p>
  </div>

</div>


<div class="contenedor2">

    <!-- LOGIN -->
    <div v-if="!usuario">
      <input
        v-model="nombre"
        type="text"
        placeholder="Ingresa tu nombre"
      />
      <button @click="login">Entrar</button>
    </div>

    <!-- BIENVENIDA -->
    <div v-else>
      <h5>Bienvenido, {{ usuario }}</h5>
      <button @click="logout">Cerrar sesión</button>
    </div>

  </div>

<div class="buton">
     <q-btn class="glossy" rounnded color="deep-orange" 
     label="jugar ahora" to="/play"/>
</div>



  </div>
</template>

<style>
.contenedor {
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
background: linear-gradient(135deg, #1a8de0cb, #5598d3, #2f6091);
}

/* Encabezado */
.encabezado {
  text-align: center;
  margin-bottom: 40px;
}

.encabezado h1 {
  font-size: 3rem;
  margin: 0;
color: #9bffb0;
 text-shadow:
    0 0 5px rgba(0, 255, 110, 0.6),
    0 0 10px rgba(0, 255, 110, 0.4),
    0 0 18px rgba(0, 180, 90, 0.3);
}

.categoria {
  font-size: 1.4rem;
  color: #555;
}

/* Contenedor de las tarjetas */
.niveles {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-bottom: 40px;
}

/* TARJETAS */
.card {
  width: 260px;
  height: 350px;        /* ← altura fija para que 50% funcione perfecto */
background: linear-gradient(135deg, #1a8de0cb, #5598d3, #2f6091);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: transform 0.25s;
}

.card:hover {
  transform: scale(1.05);
}

/* Imagen como FONDO en la MITAD superior */
.card-img.mitad {
  height: 40%;
  background-image: var(--img);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

}

.card h2 {
  margin: 15px 0 8px 0;
  text-align: center;

  /* COLOR VERDE VAMPIRO */
  color: #9bffb0;

  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: 1px;

  /* EFECTO DE BRILLO NECROTICO */
  text-shadow:
    0 0 5px rgba(0, 255, 110, 0.6),
    0 0 10px rgba(0, 255, 110, 0.4),
    0 0 18px rgba(0, 180, 90, 0.3);
}

/* --- DESCRIPCIÓN TEMEROSA --- */
.card p {
  margin: 0 14px 16px;
  text-align: center;

  color: #caffdf;
  font-size: 1rem;
  line-height: 1.25;

  opacity: 0.9;

  /* LIGERA VIBRACIÓN DE SOMBRA VERDE */
  text-shadow:
    0 0 4px rgba(0, 255, 120, 0.5),
    0 0 10px rgba(0, 255, 120, 0.3);
  
  /* LETRA MÁS MISTERIOSA */
  letter-spacing: 0.4px;
}

/* Botón */
.buton {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>





<script setup>
  ;

import { onMounted, ref } from 'vue';
import Ndeath from './Ndeath.png'   // <-- aquí el bundler procesa la imagen
import Nespanto from  './Nespanto.png'  
import Nsusto from  './Nsusto.png'  
// usamos la variable de estilo CSS con la URL resuelta
const imgVar = { '--img': `url(${Ndeath})` }
const imgVar1 = { '--img': `url(${Nespanto})` }
const imgVar2 = { '--img': `url(${Nsusto})` }
// const respuesta= ref("")
// onMounted(() => {
//   const  data = localStorage.getItem('categoriaSeleccionada')
//  console.log("Categoría recibida:", data)
// respuesta.value = data
// })
// function guardarPalabrasPorCategoria(respuesta, nivelF) {
//   const categoria = respuesta.value;

//   // Buscar el objeto que tiene esa categoría como key
//   const encontrado = nivelF.find(obj => {
//     const key = Object.keys(obj)[0];
//     return key === categoria;
//   });

//   if (!encontrado) {
//     console.warn("Categoría no encontrada:", categoria);
//     return;
//   }

//   const palabras = encontrado[categoria];

//   // Guardar en LocalStorage
//   localStorage.setItem('palabrasCategoria', JSON.stringify(palabras));
//   console.log("PALABRAS GUARDADAS:", palabras);

//   return palabras; // opcional
// }

const nivelS = ref([]);


function seleccionarNivel(nivel) {
  // Guardar nivel
  localStorage.setItem("nivelSeleccionado", nivel);

  // Guardar intentos y pistas según nivel


  // Guardar lista de palabras según nivel
  if (nivel === "facil") nivelS.value = nivelF;
  else if (nivel === "medio") nivelS.value = nivelM;
  else if (nivel === "experto") nivelS.value = nivelE;

  // Guardar palabras específicas de la categoría
  guardarPalabrasPorCategoria();

  console.log("Reglas del nivel:", reglas);
  console.log("Nivel seleccionado:", nivel);
}


const respuesta = ref("");
onMounted(() => {

  const nivel = localStorage.getItem("nivelSeleccionado");

  if (!nivel) {
    console.warn("No hay nivel en localStorage");
    return;
  }

  console.log("Nivel recibido:", nivel);

  const data = localStorage.getItem("categoriaSeleccionada");
  respuesta.value = data;
});

function guardarPalabrasPorCategoria() {
  const categoria = respuesta.value;

  const encontrado = nivelS.value.find(obj => {
    const key = Object.keys(obj)[0];
    return key === categoria;
  });

  if (!encontrado) {
    console.warn("Categoría no encontrada:", categoria);
    return;
  }

  const palabras = encontrado[categoria];

  localStorage.setItem("palabrasCategoria", JSON.stringify(palabras));
  console.log("PALABRAS GUARDADAS:", palabras);
}

// function guardarPalabrasPorCategoria() {
//   const categoria = respuesta.value;

//   const encontrado = nivelS.value.find(obj => {
//     const key = Object.keys(obj)[0];
//     return key === categoria;
//   });

//   if (!encontrado) {
//     console.warn("Categoría no encontrada:", categoria);
//     return;
//   }

//   const palabras = encontrado[categoria];

//   localStorage.setItem("palabrasCategoria", JSON.stringify(palabras));
//   console.log("PALABRAS GUARDADAS:", palabras);
// }




// Nivel Fácil (ya lo tienes)
const nivelF = [
  { frutas: ["manzana", "pera", "sandía", "plátano", "uva"] },
  { animales: ["leon", "perro", "gato", "vaca", "burro"] },
  { paises: ["africa", "colombia", "francia", "paris", "suecia"] },
  { deportes: ["futbol", "basketball", "voleibol", "tenis", "natacion"] },
  { peliculas: ["titanic", "avatar", "inception", "matrix", "frozen"] },
  { ciencia: ["atomos", "gravedad", "energia", "fotosintesis", "celula"] }
  
];

// Nivel Medio (palabras un poco más largas o menos comunes)
const nivelM = [
  { frutas: ["kiwi", "mango", "maracuya", "cereza", "guayaba"] },
  { animales: ["jirafa", "hipopotamo", "canguro", "delfin", "tortuga"] },
  { paises: ["argentina", "uruguay", "australia", "dinamarca", "portugal"] },
  { deportes: ["esgrima", "badminton", "hockey", "triathlon", "escalada"] },
  { peliculas: ["interstellar", "gladiator", "casablanca", "amelie", "fargo"] },
  { ciencia: ["quimica", "biologia", "geologia", "astronomia", "botanica"] }
];

// Nivel Experto (palabras largas, complejas o técnicas)
const nivelE = [
  { frutas: ["lichi", "pitahaya", "physalis", "kumquat", "rambutan"] },
  { animales: ["ornitorrinco", "axolote", "pangolin", "narval", "cacatua"] },
  { paises: ["kazajistan", "liechtenstein", "macedonia", "azerbaiyán", "bhután"] },
  { deportes: ["pentatlon", "heptatlon", "curling", "escalada", "motocross"] },
  { peliculas: ["cienciadelasficciones", "elorigen", "hereditary", "memento", "psychonauts"] },
  { ciencia: ["microbiologia", "neurociencia", "electromagnetismo", "biotecnologia", "astrofisica"] }
];


const nombre = ref("")
const usuario = ref(null)

onMounted(() => {
  usuario.value = localStorage.getItem("usuario")
})

const login = () => {
  if (!nombre.value.trim()) return

  // usuario actual
  usuario.value = nombre.value
  localStorage.setItem("usuario", nombre.value)

  // historial
  const data = localStorage.getItem("usuarios")
  const usuarios = data ? JSON.parse(data) : []

  usuarios.push(nombre.value)

  localStorage.setItem("usuarios", JSON.stringify(usuarios))

  nombre.value = ""
}

const logout = () => {
  localStorage.removeItem("usuario")
  usuario.value = null
}
</script>