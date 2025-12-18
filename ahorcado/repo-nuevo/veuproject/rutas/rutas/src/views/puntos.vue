<template>
  <div class="frankenstein-theme">
    <!-- Selector de nivel -->
    <div class="filter-container">
      <select v-model="nivelSeleccionado" class="nivel-filter">
        <option value="todos">Todos</option>
        <option value="facil">Fácil</option>
        <option value="medio">Medio</option>
        <option value="experto">Experto</option>
      </select>
    </div>

    <div class="users-container">
      <!-- Tabla de registros PRINCIPAL -->
      <div class="table-container">
        <h2>📋 Registros de Experimentos</h2>
        <table class="registros-table">
          <thead>
            <tr>
              <th>#</th>
              <th>👤 Criatura</th>
              <th>📊 Nivel</th>
              <th>⏱️ Tiempo</th>
            </tr>
          </thead>
          <tbody>
            <!-- USAR registrosFiltrados AQUÍ -->
            <tr 
              v-for="(registro, index) in registrosFiltrados" 
              :key="index"
              :class="{ 
                'last-record': index === registrosFiltrados.length - 1,
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
            </tr>
            <tr v-if="registrosFiltrados.length === 0">
              <td colspan="5" class="empty-table">
                <div class="empty-message">
                  <span class="icon">🔬</span>
                  <p v-if="nivelSeleccionado === 'todos'">
                    No hay experimentos registrados aún...
                  </p>
                  <p v-else>
                    No hay experimentos registrados para el nivel {{ getNivelTexto(nivelSeleccionado) }}...
                  </p>
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
            <!-- Usar registrosFiltrados.length -->
            <p class="stat-value">{{ registrosFiltrados.length }}</p>
            <p class="stat-label">Experimentos Filtrados</p>
          </div>
        </div>
        
        <div class="stat-card">
          <span class="stat-icon">⚡</span>
          <div class="stat-info">
            <!-- Usar tiempoPromedioFiltrado -->
            <p class="stat-value">{{ tiempoPromedioFiltrado }}s</p>
            <p class="stat-label">Tiempo Promedio</p>
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

    <!-- Tabla de prueba (opcional) -->
    <div class="tabla" v-if="false">
  <table>
    <thead>
      <tr>
        <th>Usuario</th>
        <th>Nivel</th>
        <th>Tiempo</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(registro, index) in registrosFiltrados"
        :key="index"
      >
        <td>{{ registro.nombre }}</td>
        <td>{{ registro.nivel }}</td>
        <td>{{ registro.tiempo }} s</td>
      </tr>
    </tbody>
  </table>
</div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const usuario = ref(null);
const nivel = ref(null);
const segundos = ref(0);
const registros = ref([]);
const nivelSeleccionado = ref('todos');

// Propiedad computada para filtrar registros
const registrosFiltrados = computed(() => {
  if (nivelSeleccionado.value === 'todos') {
    return registros.value;
  }
  return registros.value.filter(
    r => r.nivel === nivelSeleccionado.value
  );
});

// Tiempo promedio solo de los registros filtrados
const tiempoPromedioFiltrado = computed(() => {
  if (registrosFiltrados.value.length === 0) return 0;
  const total = registrosFiltrados.value.reduce((sum, reg) => sum + reg.tiempo, 0);
  return Math.round(total / registrosFiltrados.value.length);
});

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
    case 'todos': return 'Todos';
    default: return 'Sin nivel';
  }
};
</script>

<style scoped>
/* Estilos para el filtro */
.filter-container {
  max-width: 1200px;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: flex-end;
}

.nivel-filter {
  background: rgba(20, 20, 35, 0.8);
  color: #e6e6e6;
  border: 2px solid #4ECDC4;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.nivel-filter:hover {
  border-color: #2D7D7D;
  box-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
}

.nivel-filter:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(78, 205, 196, 0.5);
}

.nivel-filter option {
  background: #1a1a2e;
  color: #e6e6e6;
  padding: 10px;
}

/* El resto de tus estilos se mantienen igual */
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

/* ... mantén el resto de tus estilos exactamente como los tenías ... */

/* Tabla de prueba (opcional) */
.tabla {
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background: rgba(30, 30, 46, 0.7);
  border-radius: 10px;
}

.tabla table {
  width: 100%;
  border-collapse: collapse;
}

.tabla th {
  background: #4ECDC4;
  color: #1a1a2e;
  padding: 10px;
  text-align: left;
}

.tabla td {
  padding: 10px;
  border-bottom: 1px solid rgba(78, 205, 196, 0.3);
}

.tabla tr:hover {
  background: rgba(78, 205, 196, 0.1);
}
</style>
