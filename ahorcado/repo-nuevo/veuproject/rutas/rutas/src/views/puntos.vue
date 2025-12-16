 <!-- <template>
  <div class="frankenstein-theme">
    
    <div class="users-container">
  
      <div class="users-list">
        <div 
          v-for="(u, i) in usuarios" 
          :key="i" 
          class="user-item"
          :class="{ 'user-item-new': i === usuarios.length - 1 }"
        >
          <span class="user-number">#{{ i + 1 }}</span>
          <span class="user-bolt">⚡</span>
          <span class="user-text">{{ u }}</span>

<h2>{{nivel  }}</h2>
        </div>
        
        <div v-if="usuarios.length === 0" class="empty-list">
          <p>📝 No hay criaturas registradas aún...</p>
          <p class="empty-hint">¡Trae tu primer sujeto de experimento!</p>
<p>⏱️ {{ segundos }} segundos</p>
        </div>
      </div>
      
      <div class="stats">
        <p>📊 Total de criaturas: {{ usuarios.length }}</p>
      </div>


    </div>

    <!-- Temporizador -->
    <!-- <div class="timer-container">
      <h2>⏱️ Temporizador </h2>
      <div class="timer"> 
        <span class="timer-value">{{ segundos }}</span>
        <span class="timer-unit">segundos</span>
      </div>

<div>
<p>{{ array }}</p>
</div>
     
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';



const nivel = ref(null);

onMounted(() => {
  nivel.value = localStorage.getItem("nivelSeleccionado");
});


const usuario = ref(null);
const usuarios = ref([]);

// Cargar usuarios desde localStorage
onMounted(() => {
  const data = localStorage.getItem('usuarios');
  usuarios.value = data ? JSON.parse(data) : [];
  usuario.value = localStorage.getItem('usuario');
});

const segundos = ref(0);

onMounted(() => {
  const guardado = localStorage.getItem("segundos");
  if (guardado !== null) {
    segundos.value = Number(guardado);
  }
});
</script> --> -->


<template>
  <div class="frankenstein-theme">
    
    <div class="users-container">
      <!-- Tabla de registros -->
      <div class="table-container">
        <h2>📋 Registros de Experimentos</h2>
        <table class="registros-table">
          <thead>
            <tr>
              <th>#</th>
              <th>👤 Criatura</th>
              <th>📊 Nivel</th>
              <th>⏱️ Tiempo</th>
              <th>🏆 Puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(registro, index) in registros" 
              :key="index"
              :class="{ 
                'last-record': index === registros.length - 1,
                'facil': registro.nivel === 'facil',
                'medio': registro.nivel === 'medio',
                'experto': registro.nivel === 'experto'
              }"
            >
              <td class="numero">{{ index + 1 }}</td>
              <td class="nombre">
                <span class="icon">🧪</span>
                {{ registro.nombre }}
              </td>
              <td class="nivel">
                <span class="nivel-badge" :class="registro.nivel">
                  {{ getNivelTexto(registro.nivel) }}
                </span>
              </td>
              <td class="tiempo">
                <span class="icon">⏱️</span>
                {{ registro.tiempo }}s
              </td>
              <td class="puntos">
                <span class="icon">⭐</span>
                {{ calcularPuntos(registro) }}
              </td>
            </tr>
            <tr v-if="registros.length === 0">
              <td colspan="5" class="empty-table">
                <div class="empty-message">
                  <span class="icon">🔬</span>
                  <p>No hay experimentos registrados aún...</p>
                  <p class="hint">¡Completa un juego para ver tu registro aquí!</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <span class="stat-icon">🧬</span>
          <div class="stat-info">
            <p class="stat-value">{{ registros.length }}</p>
            <p class="stat-label">Total Experimentos</p>
          </div>
        </div>
        
        <div class="stat-card">
          <span class="stat-icon">⚡</span>
          <div class="stat-info">
            <p class="stat-value">{{ tiempoPromedio }}s</p>
            <p class="stat-label">Tiempo Promedio</p>
          </div>
        </div>
        
        <div class="stat-card">
          <span class="stat-icon">👑</span>
          <div class="stat-info">
            <p class="stat-value">{{ getMejorPuntuacion() }}</p>
            <p class="stat-label">Mejor Puntuación</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Temporizador actual -->
    <div class="current-timer">
      <h2>⏱️ Temporizador Actual</h2>
      <div class="timer-display">
        <span class="timer-value">{{ segundos }}</span>
        <span class="timer-unit">segundos</span>
      </div>
      
      <div class="current-info">
        <div class="info-item">
          <span class="info-label">Criatura:</span>
          <span class="info-value">{{ usuario || 'No identificado' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Nivel:</span>
          <span class="info-value" :class="nivel">{{ getNivelTexto(nivel) }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const usuario = ref(null);
const nivel = ref(null);
const segundos = ref(0);
const registros = ref([]);

// Cargar datos iniciales
onMounted(() => {
  // Cargar datos del jugador actual
  usuario.value = localStorage.getItem('usuario');
  nivel.value = localStorage.getItem("nivelSeleccionado");
  
  // Cargar temporizador
  const guardado = localStorage.getItem("segundos");
  if (guardado !== null) {
    segundos.value = Number(guardado);
  }
  
  // Cargar registros existentes
  cargarRegistros();
  
  // Si hay datos actuales, agregar al registro
  if (usuario.value && nivel.value && segundos.value > 0) {
    agregarRegistro();
  }
});

// Función para cargar registros desde localStorage
const cargarRegistros = () => {
  const data = localStorage.getItem('registros');
  registros.value = data ? JSON.parse(data) : [];
};

// Función para agregar nuevo registro
const agregarRegistro = () => {
  const nuevoRegistro = {
    nombre: usuario.value,
    nivel: nivel.value,
    tiempo: segundos.value,
    fecha: new Date().toLocaleString()
  };
  
  registros.value.push(nuevoRegistro);
  
  // Guardar en localStorage
  localStorage.setItem('registros', JSON.stringify(registros.value));
  
  // Limpiar temporizador actual
  localStorage.removeItem("segundos");
  segundos.value = 0;
};

// Función para obtener texto del nivel
const getNivelTexto = (nivel) => {
  switch(nivel) {
    case 'facil': return 'Fácil';
    case 'medio': return 'Medio';
    case 'experto': return 'Experto';
    default: return 'Sin nivel';
  }
};

// Función para calcular puntos (puedes ajustar la fórmula)
const calcularPuntos = (registro) => {
  let puntosBase = 100;
  let multiplicador = 1;
  
  switch(registro.nivel) {
    case 'facil': multiplicador = 1; break;
    case 'medio': multiplicador = 1.5; break;
    case 'experto': multiplicador = 2; break;
  }
  
  // Menos tiempo = más puntos
  const puntosTiempo = Math.max(0, 300 - registro.tiempo) * 0.5;
  
  return Math.round((puntosBase + puntosTiempo) * multiplicador);
};

// Calcular tiempo promedio
const tiempoPromedio = computed(() => {
  if (registros.value.length === 0) return 0;
  const total = registros.value.reduce((sum, reg) => sum + reg.tiempo, 0);
  return Math.round(total / registros.value.length);
});

// Obtener mejor puntuación
const getMejorPuntuacion = () => {
  if (registros.value.length === 0) return 0;
  return Math.max(...registros.value.map(reg => calcularPuntos(reg)));
};
</script>

<style scoped>
.frankenstein-theme {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  padding: 20px;
  color: #e6e6e6;
  font-family: 'Courier New', monospace;
}

.users-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(30, 30, 46, 0.9);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 2px solid #4ECDC4;
}

.table-container h2 {
  color: #4ECDC4;
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
}

.registros-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  background: rgba(20, 20, 35, 0.8);
  border-radius: 10px;
  overflow: hidden;
}

.registros-table thead {
  background: linear-gradient(90deg, #4ECDC4, #2D7D7D);
}

.registros-table th {
  padding: 18px 15px;
  text-align: left;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.registros-table tbody tr {
  border-bottom: 1px solid rgba(78, 205, 196, 0.2);
  transition: all 0.3s ease;
}

.registros-table tbody tr:hover {
  background: rgba(78, 205, 196, 0.1);
  transform: translateX(5px);
}

.registros-table tbody tr.last-record {
  background: rgba(78, 205, 196, 0.15);
  border-left: 4px solid #4ECDC4;
  animation: highlight 2s ease-in-out;
}

@keyframes highlight {
  0% { background: rgba(78, 205, 196, 0.3); }
  100% { background: rgba(78, 205, 196, 0.15); }
}

.registros-table td {
  padding: 15px;
  font-size: 1rem;
}

.numero {
  color: #FFD166;
  font-weight: bold;
  font-size: 1.2rem;
}

.nombre {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.nombre .icon {
  color: #4ECDC4;
  font-size: 1.2rem;
}

.nivel-badge {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
}

.nivel-badge.facil {
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  border: 1px solid #2ecc71;
}

.nivel-badge.medio {
  background: rgba(241, 196, 15, 0.2);
  color: #f1c40f;
  border: 1px solid #f1c40f;
}

.nivel-badge.experto {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.tiempo, .puntos {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.tiempo .icon {
  color: #FF9F1C;
}

.puntos .icon {
  color: #FFD166;
}

.empty-table {
  text-align: center;
  padding: 40px !important;
}

.empty-message {
  color: #888;
}

.empty-message .icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  display: block;
}

.empty-message .hint {
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
}

/* Estadísticas */
.stats {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  background: rgba(20, 20, 35, 0.8);
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid rgba(78, 205, 196, 0.3);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: #4ECDC4;
  box-shadow: 0 5px 15px rgba(78, 205, 196, 0.3);
}

.stat-icon {
  font-size: 2rem;
  color: #4ECDC4;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin: 0;
}

.stat-label {
  font-size: 0.9rem;
  color: #aaa;
  margin: 5px 0 0 0;
}

/* Temporizador actual */
.current-timer {
  max-width: 600px;
  margin: 30px auto;
  background: rgba(30, 30, 46, 0.9);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  border: 2px solid #FF6B6B;
}

.current-timer h2 {
  color: #FF6B6B;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.timer-display {
  font-size: 3rem;
  font-weight: bold;
  color: #FFD166;
  margin: 20px 0;
  text-shadow: 0 0 10px rgba(255, 209, 102, 0.5);
}

.timer-unit {
  font-size: 1.2rem;
  color: #aaa;
  margin-left: 10px;
}

.current-info {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.info-item {
  background: rgba(20, 20, 35, 0.8);
  padding: 15px 25px;
  border-radius: 10px;
  border: 1px solid rgba(78, 205, 196, 0.3);
}

.info-label {
  display: block;
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.info-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.info-value.facil { color: #2ecc71; }
.info-value.medio { color: #f1c40f; }
.info-value.experto { color: #e74c3c; }

/* Responsive */
@media (max-width: 768px) {
  .registros-table {
    display: block;
    overflow-x: auto;
  }
  
  .stats {
    flex-direction: column;
  }
  
  .current-info {
    flex-direction: column;
    gap: 15px;
  }
  
  .registros-table th,
  .registros-table td {
    padding: 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .users-container {
    padding: 15px;
  }
  
  .timer-display {
    font-size: 2.5rem;
  }
}
</style>

<style scoped>
.frankenstein-theme {
  background: linear-gradient(135deg, #0a2f0a 0%, #1a5f1a 100%);
  min-height: 100vh;
  color: #e0f7e0;
  padding: 20px;
  font-family: 'Courier New', monospace;
  border: 8px solid #2d5a2d;
  border-image: repeating-linear-gradient(45deg, #4caf50, #2d5a2d 10px) 8;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(0, 40, 0, 0.6);
  border-radius: 10px;
  border: 2px solid #4caf50;
}

.header h1 {
  color: #a5d6a7;
  margin: 0;
  font-size: 2.5em;
  text-shadow: 0 0 10px #4caf50;
}

.subtitle {
  color: #c8e6c9;
  font-style: italic;
  margin-top: 5px;
}

.current-user {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.user-card {
  background: rgba(76, 175, 80, 0.2);
  border: 3px solid #4caf50;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  width: fit-content;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
}

.user-icon {
  font-size: 3em;
}

.user-label {
  color: #a5d6a7;
  margin: 0;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.user-name {
  color: #ffffff;
  margin: 5px 0 0 0;
  font-size: 1.8em;
  font-weight: bold;
}

.users-container {
  background: rgba(0, 30, 0, 0.7);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  border: 2px solid #388e3c;
}

.users-container h2 {
  color: #81c784;
  margin-top: 0;
  border-bottom: 2px dashed #4caf50;
  padding-bottom: 10px;
}

.users-list {
  margin: 20px 0;
}

.user-item {
  background: linear-gradient(90deg, rgba(76, 175, 80, 0.1), rgba(56, 142, 60, 0.1));
  border-left: 5px solid #4caf50;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

.user-item:hover {
  background: linear-gradient(90deg, rgba(76, 175, 80, 0.3), rgba(56, 142, 60, 0.3));
  transform: translateX(5px);
}

.user-item-new {
  animation: highlight 2s ease-in-out;
  border-left-color: #ffeb3b;
}

@keyframes highlight {
  0% { background-color: rgba(255, 235, 59, 0.3); }
  100% { background-color: rgba(76, 175, 80, 0.1); }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
  50% { box-shadow: 0 0 15px rgba(76, 175, 80, 0.8); }
}

.user-number {
  color: #ffeb3b;
  font-weight: bold;
  font-size: 1.2em;
}

.user-bolt {
  font-size: 1.5em;
  color: #ffeb3b;
}

.user-text {
  flex: 1;
  color: #ffffff;
  font-size: 1.1em;
  font-weight: bold;
}

.user-status {
  background: #1b5e20;
  color: #a5d6a7;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid #4caf50;
}

.empty-list {
  text-align: center;
  padding: 40px;
  color: #81c784;
  font-style: italic;
}

.empty-hint {
  color: #a5d6a7;
  margin-top: 10px;
  font-size: 0.9em;
}

.stats {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #2d5a2d;
  color: #a5d6a7;
  font-size: 1.1em;
}

.timer-container {
  background: rgba(0, 40, 0, 0.6);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  border: 2px solid #4caf50;
}

.timer-container h2 {
  color: #81c784;
  margin-top: 0;
}

.timer {
  font-size: 4em;
  color: #ffffff;
  font-weight: bold;
  text-shadow: 0 0 20px #4caf50;
  margin: 20px 0;
  font-family: 'Digital', monospace;
}

.timer-unit {
  font-size: 0.5em;
  color: #a5d6a7;
  margin-left: 10px;
}

.timer-hint {
  color: #c8e6c9;
  font-style: italic;
  margin-top: 10px;
  font-size: 0.9em;
}
</style>
 
 
 
 
 
 
 <!-- <template>

  <div>

  <p>Usuario actual: {{ usuario }}</p>

  <div>
    <p v-for="(u, i) in usuarios" :key="i">{{ u }}</p>
  </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const usuario = ref(null);
const usuarios = ref([]);

// Cargar usuarios desde localStorage
onMounted(() => {
  const data = localStorage.getItem('usuarios');
  usuarios.value = data ? JSON.parse(data) : [];
  usuario.value = localStorage.getItem('usuario');
});



const segundos = ref(0)

onMounted(() => {
  const guardado = localStorage.getItem("segundos")
  if (guardado !== null) {
    segundos.value = Number(guardado)
  }
})
</script>
 -->

