<template>

  <div class="juego-container">


<div class="ahorcado-wrap">
  <div class="ahorcado" :style="{ width: width + 'px', height: height + 'px' }">
    
   <img class="base" src="/imag/imagen.png" alt="base" /> 

     
<img v-show="erroresCometidos >= 1" class="piece p2" src="/imag/r1.PNG" alt="pieza 1" />
    <img v-show="erroresCometidos >= 2" class="piece p3" src="/imag/r2.PNG" alt="pieza 2" />
    
<img v-show="erroresCometidos >= 3" class="piece p4" src="/imag/r3.PNG" alt="pieza 3" />  
    
<img v-show="erroresCometidos >= 4" class="piece p5" src="/imag/r4.PNG" alt="pieza 4" />
    
 <img v-show="erroresCometidos >= 5" class="piece p6" src="/imag/r5.PNG" alt="pieza 5" />
   
<img v-show="erroresCometidos >= 6" class="piece p7" src="/imag/r6.PNG" alt="pieza 6" />
    
 <img v-show="erroresCometidos >= 7" class="piece p8" src="/imag/r7.PNG" alt="pieza 7" />
 
<img v-show="erroresCometidos >= 9" class="piece p10" src="/imag/r9.PNG" alt="pieza 9" />
    
<img v-show="erroresCometidos >= 10" class="piece p11" src="/imag/r10.PNG" alt="pieza 10" />    

<img v-show="erroresCometidos >= 10" class="piece p12" src="/imag/r11.PNG" alt="pieza 11" />

  </div>
</div>

    <!-- PALABRA -->
    <div class="palabra-container">
      <p class="palabra">
        <span
          v-for="(letra, i) in letrasEncontradas"
          :key="i"
          class="letra-casilla"
        >
          {{ letra }}
        </span>
      </p>
      <p class="mensaje">{{ mensaje }}</p>
    </div>
<div class="timer">
  ⏱️ {{ segundos }} s
</div>


    <!-- TECLADO -->
    <div class="teclado">
      <button
        v-for="(letra, i) in teclado"
        :key="i"
        @click="presionarLetra(letra)"
        :disabled="letrasUsadas.includes(letra) || juegoTerminado"
        :class="{
          correcta: letrasCorrectas.includes(letra),
          incorrecta: letrasIncorrectas.includes(letra),
          disabled: letrasUsadas.includes(letra)
        }"
      >
        {{ letra }}
      </button>
    </div>

    <!-- BOTONES -->
    <div class="botones-accion">
      <button @click="reiniciarJuego">🔄 Reiniciar</button>
      <button @click="$router.push('/inicio')">🏠 Volver</button>
    </div>

    <!-- REGLAS -->
    <!-- <div class="reglas-nivel">
      <h3>📋 Reglas</h3>
      <p>{{ reglasTexto }}</p>
    </div> -->

  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';



// TECLADO
const teclado = ref([
  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","o","p","q","r","s","t","u","v","w","x","y","z"
]);

const palabraAleatoria = ref("");
const letrasEncontradas = ref([]);
const letrasUsadas = ref([]);
const letrasCorrectas = ref([]);
const letrasIncorrectas = ref([]);
const intentosRestantes = ref(0);
const erroresCometidos = ref(0);
const juegoTerminado = ref(false);
const mensaje = ref("");

// Variables para mostrar información
const nivelActual = ref("");
const categoriaActual = ref("");

const width = 340;
const height = 420;
const maxErrores = 10;

onMounted(() => {
  iniciarJuego();
});

function iniciarJuego() {

  detenerTimer()

  // reiniciar tiempo
  segundos.value = 0

  // iniciar temporizador
  iniciarTimer()
  const nivel = localStorage.getItem("nivelSeleccionado");
  const categoria = localStorage.getItem("categoriaSeleccionada");
  const palabrasCategoria = localStorage.getItem("palabrasCategoria");

  // Guardar información actual para mostrar
  nivelActual.value = nivel || "";
  categoriaActual.value = categoria || "";

  // Reiniciar estado del juego
  letrasUsadas.value = [];
  letrasCorrectas.value = [];
  letrasIncorrectas.value = [];
  juegoTerminado.value = false;
  mensaje.value = "";
  erroresCometidos.value = 0;
  
  // Reiniciar imágenes del ahorcado (si las tienes)

  if (!palabrasCategoria) {
    console.warn("No hay palabras guardadas en localStorage");
    mensaje.value = "❌ No se encontraron palabras. Regresa a la selección.";
    return;
  }

  let palabras;
  try {
    palabras = JSON.parse(palabrasCategoria);
  } catch (e) {
    console.error("Error al convertir JSON de palabrasCategoria:", e);
    mensaje.value = "❌ Error al cargar las palabras. Intenta de nuevo.";
    return;
  }

  if (!Array.isArray(palabras) || palabras.length === 0) {
    console.warn("palabrasCategoria no contiene un array válido");
    mensaje.value = "❌ No hay palabras disponibles para esta categoría.";
    return;
  }

  // Elegir palabra aleatoria
  palabraAleatoria.value = palabras[Math.floor(Math.random() * palabras.length)];
  console.log("Categoría:", categoria);
  console.log("Nivel:", nivel);
  console.log("Palabra elegida:", palabraAleatoria.value);

  // Crear array de "_" con misma longitud
  letrasEncontradas.value = palabraAleatoria.value.split("").map(() => "_");

  // Definir intentos según nivel
  if (nivel === "facil") {
    intentosRestantes.value = 9;
  } else if (nivel === "medio") {
    intentosRestantes.value = 9;
  } else if (nivel === "experto") {
    intentosRestantes.value = 9;
  } else {
    // Valor por defecto si no hay nivel
    intentosRestantes.value = 10;
  }

  console.log("Intentos disponibles:", intentosRestantes.value);





}

// REGLAS DEL NIVEL
const reglasTexto = computed(() => {
  const nivel = localStorage.getItem("nivelSeleccionado") || nivelActual.value;
  const categoria = localStorage.getItem("categoriaSeleccionada") || categoriaActual.value;
  
  let texto = "";
  switch(nivel) {
    case "facil": 
      texto = "9 intentos - Palabras cortas y comunes";
      break;
    case "medio": 
      texto = "9 intentos - Palabras de dificultad media";
      break;
    case "experto": 
      texto = "9 intentos - Palabras largas y complejas";
      break;
    default: 
      texto = "Selecciona un nivel";
  }
  
  // Agregar categoría si está disponible
  if (categoria) {
    texto += ` | Categoría: ${categoria}`;
  }
  
  return texto;
});

// Mostrar información de la categoría actual
const infoCategoria = computed(() => {
  const categoria = localStorage.getItem("categoriaSeleccionada") || categoriaActual.value;
  return categoria ? `Categoría: ${categoria}` : "Sin categoría seleccionada";
});

function presionarLetra(letra) {
  if (juegoTerminado.value || letrasUsadas.value.includes(letra)) return;

  letrasUsadas.value.push(letra);

  // LETRA INCORRECTA
  if (!palabraAleatoria.value.toLowerCase().includes(letra.toLowerCase())) {
    letrasIncorrectas.value.push(letra);
    intentosRestantes.value--;
    erroresCometidos.value++;

    mensaje.value = `❌ Letra "${letra}" incorrecta. Te quedan ${intentosRestantes.value} intentos`;

    if (erroresCometidos.value >= maxErrores) {
      juegoTerminado.value = true;
 detenerTimer()
      mensaje.value = `💀 ¡Perdiste! La palabra era: "${palabraAleatoria.value}"`;

    }

    return;
  }

  // LETRA CORRECTA
  letrasCorrectas.value.push(letra);
  mensaje.value = `✅ ¡Correcto! Letra "${letra}" encontrada`;

  for (let i = 0; i < palabraAleatoria.value.length; i++) {
    if (palabraAleatoria.value[i].toLowerCase() === letra.toLowerCase()) {
      letrasEncontradas.value[i] = letra;
    }
  }

  if (!letrasEncontradas.value.includes("_")) {
    juegoTerminado.value = true;
detenerTimer()
    mensaje.value = `🎉 ¡Ganaste! ¡Felicidades!`;

  }
return;
}
// REINICIAR JUEGO (si necesitas esta función)
function reiniciarJuego() {
  letrasUsadas.value = [];
  letrasCorrectas.value = [];
  letrasIncorrectas.value = [];
  erroresCometidos.value = 0;
  juegoTerminado.value = false;
  mensaje.value = "";
  iniciarJuego(); 
  segundos.value = 0
  localStorage.removeItem("segundos")
  iniciarJuego()

// Vuelve a iniciar con nueva palabra
}


const segundos = ref(0)
let timer = null


function iniciarTimer() {
  if (timer !== null) return

  timer = setInterval(() => {
    segundos.value++
    localStorage.setItem("segundos", segundos.value)
  }, 1000)
}

function detenerTimer() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}


</script>


<style scoped>
.juego-container {
background-image: url("./imag/fondo.png");
background-size: contain;
background-position: center;
  min-height: 100vh;
  padding: 10px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}

/* CONTENEDOR DEL AHORCADO */
.ahorcado-wrap {
  position: relative;
  margin-bottom: 5px;
}

.ahorcado {
margin-top: -100px;
  position: relative;
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
}

/* la base (r1) ocupa todo el contenedor */
.ahorcado img.base {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

/* piezas superpuestas */
.ahorcado img.piece {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

/* Capas para las imágenes */
.ahorcado img.p2 { z-index: 1; }
.ahorcado img.p3 { z-index: 1; }
.ahorcado img.p4 { z-index: 1; }
.ahorcado img.p5 { z-index: 1; }
.ahorcado img.p6 { z-index: 1; }
.ahorcado img.p7 { z-index: 1; }
.ahorcado img.p8 { z-index: 1; }
.ahorcado img.p9 { z-index: 1; }
.ahorcado img.p10 { z-index: 1; }



.contador {
  font-size: 2.2rem;
  font-weight: 800;
  color: #FFD166;
}

.texto {
  font-size: 0.9rem;
  color: #a0a0d0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* PALABRA */
.palabra-container {
display: flex;
flex-direction: column;
  text-align: center;
margin-top: -100px;
}

.palabra {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-bottom: 0px;
  flex-wrap: wrap;
}

.letra-casilla {
  width: 60px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.15);
  border-bottom: 4px solid #FF6B6B;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
}

.mensaje {
  font-size: 1.4rem;
  min-height: 40px;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

/* TECLADO */
.teclado {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 12px;
  max-width: 600px;
  margin: 30px auto;
  padding: 25px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.teclado button {
  width: 50px;
  height: 50px;
  font-size: 1.4rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: linear-gradient(145deg, #2D3436, #1E272E);
  color: white;
  text-transform: uppercase;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.teclado button:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.teclado button:active:not(:disabled) {
  transform: translateY(-2px);
}

.teclado button.correcta {
  background: linear-gradient(145deg, #00b894, #00a085);
  color: white;
}

.teclado button.incorrecta {
  background: linear-gradient(145deg, #d63031, #c0392b);
  color: white;
}

.teclado button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* BOTONES DE ACCIÓN */
.botones-accion {
  display: flex;
  gap: 20px;
  margin: 30px 0;
}

.botones-accion button {
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-reiniciar {
  background: linear-gradient(145deg, #0984e3, #6c5ce7);
  color: white;
}

.btn-inicio {
  background: linear-gradient(145deg, #e17055, #d63031);
  color: white;
}

.botones-accion button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* REGLAS DEL NIVEL */
.reglas-nivel {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px 30px;
  border-radius: 15px;
  margin-top: 20px;
  text-align: center;
  backdrop-filter: blur(5px);
  border-left: 4px solid #4ECDC4;
}

.reglas-nivel h3 {
  margin: 0 0 10px 0;
  color: #FFD166;
}

.reglas-nivel p {
  margin: 0;
  color: #a0a0d0;
  font-size: 1rem;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .teclado {
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    padding: 20px;
  }
  
  .teclado button {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
  
  .letra-casilla {
    width: 45px;
    height: 55px;
    font-size: 2rem;
  }
  
  .info-juego {
    flex-direction: column;
    gap: 20px;
  }
  
  .botones-accion {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .teclado {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .teclado button {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
  
  .letra-casilla {
    width: 35px;
    height: 45px;
    font-size: 1.7rem;
    gap: 8px;
  }
  
  .info-juego {
    padding: 10px 20px;
  }
}
</style>