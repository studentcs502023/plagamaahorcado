<template>
  <div class="inicio">
    <div class="contenido">
      <!-- Título -->
    

      <!-- Imagen -->


      <!-- Botón -->
      <div class="boton-container">
        <button class="boton-jugar" @click="$router.push('/categorias')">
          <span class="icono">▶</span>
          <span class="texto">JUGAR</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style >

.inicio{
background-image: url("./imgfondo.png");
background-size: contain;
background-position: center;
}

.inicio {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.contenido {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  max-width: 500px;
  width: 100%;
}

.titulo-principal {
  margin: 0;
  font-size: 4rem;
  letter-spacing: 3px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
}

.subtitulo {
  font-size: 1.2rem;
  color: #a0a0d0;
  margin-top: 10px;
}

.imagen-container {
  width: 300px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.imagen-juego {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.imagen-juego:hover {
  transform: scale(1.05);
}

.boton-jugar {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  padding: 16px 50px;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(106, 17, 203, 0.4);
}

.boton-jugar:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(106, 17, 203, 0.6);
}

.boton-jugar:active {
  transform: translateY(-1px);
}

.icono {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .titulo-principal {
    font-size: 3rem;
  }
  
  .imagen-container {
    width: 250px;
    height: 180px;
  }
  
  .boton-jugar {
    font-size: 1.1rem;
    padding: 14px 40px;
  }
}

@media (max-width: 480px) {
  .titulo-principal {
    font-size: 2.5rem;
  }
  
  .subtitulo {
    font-size: 1rem;
  }
  
  .imagen-container {
    width: 200px;
    height: 150px;
  }
  
  .contenido {
    gap: 30px;
  }
}
</style>

<script setup>
// Lógica mínima - solo navegación
import { useRouter } from 'vue-router';

const router = useRouter();
</script>