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

      <!-- TARJETA FÁCIL -->
      <div class="card" @click="seleccionarNivel('facil')">
        <img src="https://i.gifer.com/7Im6.gif" alt="Fácil" class="gif" />
        <h2>Fácil</h2>
        <p>Palabras sencillas</p>
      </div>

      <!-- TARJETA MEDIO -->
      <div class="card" @click="seleccionarNivel('medio')">
        <img src="https://i.gifer.com/4Q2O.gif" alt="Medio" class="gif" />
        <h2>Medio</h2>
        <p>Un poco más difícil</p>
      </div>

      <!-- TARJETA DIFÍCIL -->
      <div class="card" @click="seleccionarNivel('experto')">
        <img src="https://i.gifer.com/3aW3.gif" alt="Difícil" class="gif" />
        <h2>Difícil</h2>
        <p>Palabras largas y complejas</p>
      </div>

    </div>

  </div>
</template>
<style >
/* Fondo general blanco */
.contenedor {
  background: #ffffff;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Encabezado */
.encabezado {
  text-align: center;
  margin-bottom: 40px;
}

.encabezado h1 {
  font-size: 3rem;
  margin: 0;
  color: #222;
}

.categoria {
  font-size: 1.4rem;
  color: #555;
}

/* Tarjetas de niveles */
.niveles {
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Cada tarjeta */
.card {
  background: white;
  width: 260px;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  border: 2px solid #eee;
  transition: 0.25s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  border-color: #d2d2d2;
}

/* GIFs */
.gif {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 10px;
}

/* Títulos de tarjetas */
.card h2 {
  font-size: 1.8rem;
  color: #222;
  margin-bottom: 5px;
}

/* Subtexto */
.card p {
  color: #666;
  font-size: 1rem;
}
</style>



<script setup>
import { onMounted, ref } from 'vue';

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
  localStorage.setItem("nivelSeleccionado", nivel);

  if (nivel === "facil") nivelS.value = nivelF;
  else if (nivel === "medio") nivelS.value = nivelM;
  else if (nivel === "experto") nivelS.value = nivelE;

  console.log("Nivel seleccionado:", nivelS.value);

  // ❌ NO LLAMAR guardarPalabrasPorCategoria() aquí
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



// Nivel Fácil (ya lo tienes)
const nivelF = [
  { frutas: ["manzana", "pera", "sandía", "plátano", "uva"] },
  { animales: ["leon", "perro", "gato", "vaca", "burro"] },
  { paises: ["africa", "colombia", "francia", "paris", "suecia"] },
  { deportes: ["futbol", "basketball", "voleibol", "tenis", "natacion"] },
  { peliculas: ["titanic", "avatar", "inception", "matrix", "frozen"] },
  { ciencias: ["atomos", "gravedad", "energia", "fotosintesis", "celula"] }
];

// Nivel Medio (palabras un poco más largas o menos comunes)
const nivelM = [
  { frutas: ["kiwi", "mango", "maracuya", "cereza", "guayaba"] },
  { animales: ["jirafa", "hipopotamo", "canguro", "delfin", "tortuga"] },
  { paises: ["argentina", "uruguay", "australia", "dinamarca", "portugal"] },
  { deportes: ["esgrima", "badminton", "hockey", "triathlon", "escalada"] },
  { peliculas: ["interstellar", "gladiator", "casablanca", "amelie", "fargo"] },
  { ciencias: ["quimica", "biologia", "geologia", "astronomia", "botanica"] }
];

// Nivel Experto (palabras largas, complejas o técnicas)
const nivelE = [
  { frutas: ["lichi", "pitahaya", "physalis", "kumquat", "rambutan"] },
  { animales: ["ornitorrinco", "axolote", "pangolin", "narval", "cacatua"] },
  { paises: ["kazajistan", "liechtenstein", "macedonia", "azerbaiyán", "bhután"] },
  { deportes: ["pentatlon", "heptatlon", "curling", "escalada", "motocross"] },
  { peliculas: ["cienciadelasficciones", "elorigen", "hereditary", "memento", "psychonauts"] },
  { ciencias: ["microbiologia", "neurociencia", "electromagnetismo", "biotecnologia", "astrofisica"] }
];


</script>



<!-- <template>
    <div class="color">

        <div class="center">
<div class="tittle" style="display: flex; align-items: center; gap: 20px;">
<div style="display: flex; align-items: center; gap: 20px;">
    <pre style="margin: 0; ">
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========
    </pre>

    <h1 style="margin: 0; ">AHORCADO</h1>

  
</div>

  


</div>



<div class="img">
    <img src="/public/iamage.png" alt="imagen">
</div>
<q-btn
  label="Play Now"
  to="/categorias"
  glossy
  color="purple"
/>


</div>


    </div>
</template>

<style>
.color{
    background: aliceblue; /* Gris muy oscuro con tono azulado */
    width: 100%;
    height: 87vh;
    overflow-y: hidden;
}

.center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     

}
.tittle{
    display: flex;
    flex-direction: column;
}

.img{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.img img{
    width: 500px;
    height: auto;
}

</style> -->
<template>
  <div class="inicio">

    <div class="contenido">
      <!-- Título + ASCII del ahorcado -->
      <div class="titulo">
        <pre class="ascii">
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========
        </pre>

        <h1>AHORCADO</h1>
      </div>

      <!-- Imagen (opcional) -->
      <div class="imagen">
        <img src="/public/iamage.png" alt="Imagen del juego">
      </div>

      <!-- Botón -->
      <q-btn
        label="Play Now"
        to="/categorias"
        glossy
        color="purple"
        class="boton"
      />
    </div>

  </div>
</template>

<style scoped>
/* Fondo con ambiente de misterio + textura */
.inicio {
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(10,10,10,0.7), rgba(10,10,10,0.7)),
              url("https://i.imgur.com/9N4eQhY.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
}

/* Contenedor central */
.contenido {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

/* ASCII del ahorcado */
.ascii {
  font-size: 16px;
  line-height: 18px;
  color: #ffdfdf;
  text-shadow: 0px 0px 5px #ff9a9a;
}

/* Título */
.titulo h1 {
  margin: 0;
  font-size: 3rem;
  letter-spacing: 3px;
  text-shadow: 0px 0px 10px rgba(255,255,255,0.6);
}

/* Imagen del personaje */
.imagen img {
  width: 320px;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(255,255,255,0.2);
}

/* Botón */
.boton {
  margin-top: 20px;
  font-size: 20px;
  padding: 10px 20px;
}
</style>

<script setup>

</script>


<!-- <template>
  <q-layout view="lHh Lpr lFf" class="bg-white">


    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >

          <q-btn color="primary" label="Inicio" to="/inicio"/><br>
       <q-btn color="primary" label="Categorias" to="/categorias"/><br>
       <q-btn color="primary" label="Nivel" to="/nivel"/><br>
        <q-btn color="primary" label="Animales" to="/animales"/><br>
       <q-btn color="primary" label="Score" to="/score"/><br>
      
    </q-drawer>

    <q-page-container>
      <router-view />
      <h1>holacocmo fsad</h1>

    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MyLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer
    }
  }
}
</script> -->



<template>
  <div>

    <!-- PALABRA EN FORMATO "_ _ _ _" -->
    <p class="palabra">
      <span v-for="(l, i) in letrasEncontradas" :key="i">
        {{ l }}
      </span>
    </p>

    <!-- TECLADO -->
    <div class="teclado">
      <button v-for="(letra, i) in teclado" :key="i" @click="presionarLetra(letra)">
        {{ letra }}
      </button>
    </div>

  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';

const teclado = ref([
  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","o","p","q","r","s","t","u","v","w","x","y","z"
]);
const respuesta = ref("");
const palabraAleatoria = ref("");
const letrasEncontradas = ref([]);
const keyfind = ref("");

onMounted(() => {
  const nivel = localStorage.getItem("nivelSeleccionado");
  const categoria = localStorage.getItem("categoriaSeleccionada");
  const palabrasCategoria = localStorage.getItem("palabrasCategoria");

  console.log("Nivel recibido:", nivel);
  console.log("Categoria recibida:", categoria);
  console.log("Palabras recibidas:", palabrasCategoria);

  if (!palabrasCategoria) {
    console.warn("No hay palabras guardadas");
    return;
  }

  const palabras = JSON.parse(palabrasCategoria);

  // Elegir palabra aleatoria:
  palabraAleatoria.value = palabras[Math.floor(Math.random() * palabras.length)];
console.log("esta es la palabra", palabraAleatoria.value)
  letrasEncontradas.value = palabraAleatoria.value.split("").map(() => "_");
});
function presionarLetra(letra) {
  keyfind.value = letra;

  // Revisar si esa letra está en la palabra
  for (let i = 0; i < palabraAleatoria.value.length; i++) {
    if (palabraAleatoria.value[i] === letra) {
      letrasEncontradas.value[i] = letra; // reemplaza el guion
    }
  }
}
</script>
