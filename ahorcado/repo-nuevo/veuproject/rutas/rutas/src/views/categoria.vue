


 <!-- <template>
    <div>
        <div class="tittle">
<h1>Selecciona una categoria para competir</h1>
        </div>

        <div class="contenedor">

<div class="hijo1">
<div class="frutas">
    <img src="https://cdn.pixabay.com/photo/2016/10/30/18/01/apple-1783882_640.png" alt="">
    <h3>Frutas</h3>
</div>
<div class="animales">
    <img src="https://symbl-cdn.com/i/webp/fd/a1842713acac725db137779e71373e.webp" alt="">
    <h3>Animales</h3>
</div>
<div class="paises">
    <img src="https://e1.pngegg.com/pngimages/244/611/png-clipart-emojis-planet-earth-illustration-thumbnail.png" alt="">
    <h3>Paises</h3>
</div>
</div>

<div class="hijo2">
<div class="deportes">
    <img src="https://img.pikbest.com/origin/10/12/62/99YpIkbEsTB2V.jpg!w700wp" alt="">
    <h3>Deportes</h3>
</div>
<div class="peliculas">
    <img src="https://images.emojiterra.com/openmoji/v13.1/512px/1f3ac.png" alt="">
        <h3>Peliculas</h3>
</div>
<div class="ciencia">
    <img src="https://em-content.zobj.net/source/whatsapp/238/telescope_1f52d.png" alt="">
    <h3>Ciencia</h3>
</div>

</div>

        </div>
    </div>
</template>






<script setup>
const eleccion = ref()

</script>


<style>


.contenedor{
    display: grid;
    grid-template-rows: repeat(2, 1fr);

}

.hijo1{
    display: flex;
    flex-direction: row;
     gap: 40px;
}
.hijo2{
    display: flex;
    flex-direction: row;
    gap: 40px;
}

.frutas img{
width: 60px;
height: auto;
}

</style> -->


<template>
  <div class="categorias-container">
    <div class="titulo">
      <h1>Selecciona una categoría para competir</h1>
      <p>Elige tu tema favorito y demuestra tus conocimientos</p>
    </div>

    <div class="categorias-grid">

      <!-- FRUTAS -->
      <div
        class="categoria-card"
        @click="() => { seleccionarCategoria('frutas'); $router.push('/nivel'); }"
      >
        <div class="categoria-imagen frutas-bg">
          <img src="https://cdn.pixabay.com/photo/2016/10/30/18/01/apple-1783882_640.png" alt="Frutas">
        </div>
        <div class="categoria-info">
          <h3>Frutas</h3>
          <p>¿Conoces todas las frutas?</p>
        </div>
      </div>

      <!-- ANIMALES -->
      <div
        class="categoria-card"
        @click="() => { seleccionarCategoria('animales'); $router.push('/nivel'); }"
      >
        <div class="categoria-imagen animales-bg">
          <img src="https://symbl-cdn.com/i/webp/fd/a1842713acac725db137779e71373e.webp" alt="Animales">
        </div>
        <div class="categoria-info">
          <h3>Animales</h3>
          <p>El reino animal te espera</p>
        </div>
      </div>

      <!-- PAISES -->
      <div
        class="categoria-card"
        @click="() => { seleccionarCategoria('paises'); $router.push('/nivel'); }"
      >
        <div class="categoria-imagen paises-bg">
          <img src="https://e1.pngegg.com/pngimages/244/611/png-clipart-emojis-planet-earth-illustration-thumbnail.png" alt="Países">
        </div>
        <div class="categoria-info">
          <h3>Países</h3>
          <p>Viaja por el mundo</p>
        </div>
      </div>

      <!-- DEPORTES -->
      <div
        class="categoria-card"
        @click="() => { seleccionarCategoria('deportes'); $router.push('/nivel'); }"
      >
        <div class="categoria-imagen deportes-bg">
          <img src="https://img.pikbest.com/origin/10/12/62/99YpIkbEsTB2V.jpg!w700wp" alt="Deportes">
        </div>
        <div class="categoria-info">
          <h3>Deportes</h3>
          <p>Demuestra tu conocimiento deportivo</p>
        </div>
      </div>

      <!-- PELICULAS -->
      <div
        class="categoria-card"
        @click="() => { seleccionarCategoria('peliculas'); $router.push('/nivel'); }"
      >
        <div class="categoria-imagen peliculas-bg">
          <img src="https://images.emojiterra.com/openmoji/v13.1/512px/1f3ac.png" alt="Películas">
        </div>
        <div class="categoria-info">
          <h3>Películas</h3>
          <p>El mundo del cine</p>
        </div>
      </div>

      <!-- CIENCIA -->
      <div
        class="categoria-card"
        @click="() => { seleccionarCategoria('ciencia'); $router.push('/nivel'); }"
      >
        <div class="categoria-imagen ciencia-bg">
          <img src="https://em-content.zobj.net/source/whatsapp/238/telescope_1f52d.png" alt="Ciencia">
        </div>
        <div class="categoria-info">
          <h3>Ciencia</h3>
          <p>Explora el conocimiento científico</p>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
function seleccionarCategoria(categoria) {
  localStorage.setItem
('categoriaSeleccionada', categoria)
console.log("guardado en el local storage")
}

</script>

<style >
.categorias-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: 'Segoe UI', 'Arial', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.titulo {
    text-align: center;
    margin-bottom: 60px;
    animation: slideDown 0.8s ease-out;
}

.titulo h1 {
    color: white;
    font-size: 3rem;
    margin-bottom: 15px;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    background: linear-gradient(45deg, #FFD700, #FF8C00, #FF1493);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 800;
    letter-spacing: 1px;
}

.titulo p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.3rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.categorias-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    animation: fadeIn 1s ease-out 0.3s both;
}

.categoria-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    position: relative;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.categoria-card:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.35);
    z-index: 10;
}

.categoria-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.8s ease;
}

.categoria-card:hover::before {
    transform: translateX(100%);
}

.categoria-imagen {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.categoria-imagen::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
}

.categoria-imagen::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 5px;
    background: rgba(255,255,255,0.6);
    filter: blur(10px);
    border-radius: 50%;
    z-index: 1;
}

.categoria-imagen img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    z-index: 2;
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.4));
    transition: all 0.5s ease;
}

.categoria-card:hover .categoria-imagen img {
    transform: scale(1.2) rotate(5deg);
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6));
}

/* Fondos animados para cada categoría */
.frutas-bg {
    background: linear-gradient(45deg, #FF416C, #FF4B2B, #FF9966);
    background-size: 300% 300%;
    animation: gradientShift 3s ease infinite;
}

.animales-bg {
    background: linear-gradient(45deg, #36D1DC, #5B86E5, #667eea);
    background-size: 300% 300%;
    animation: gradientShift 3s ease infinite 0.2s;
}

.paises-bg {
    background: linear-gradient(45deg, #FFD200, #F7971E, #FFD700);
    background-size: 300% 300%;
    animation: gradientShift 3s ease infinite 0.4s;
}

.deportes-bg {
    background: linear-gradient(45deg, #00b09b, #96c93d, #00D2FF);
    background-size: 300% 300%;
    animation: gradientShift 3s ease infinite 0.6s;
}

.peliculas-bg {
    background: linear-gradient(45deg, #8A2387, #F27121, #E94057);
    background-size: 300% 300%;
    animation: gradientShift 3s ease infinite 0.8s;
}

.ciencia-bg {
    background: linear-gradient(45deg, #4A00E0, #8E2DE2, #00B4DB);
    background-size: 300% 300%;
    animation: gradientShift 3s ease infinite 1s;
}

.categoria-info {
    padding: 25px;
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
    position: relative;
    z-index: 2;
}

.categoria-info h3 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    position: relative;
    display: inline-block;
}

.categoria-info h3::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #667eea, transparent);
    border-radius: 2px;
}

.categoria-info p {
    margin: 0;
    color: #666;
    font-size: 1rem;
    font-weight: 500;
}

/* Animaciones */
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Efectos decorativos flotantes */
.categorias-container::before {
    content: '';
    position: fixed;
    top: 10%;
    left: 5%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    z-index: 1;
    pointer-events: none;
}

.categorias-container::after {
    content: '';
    position: fixed;
    bottom: 10%;
    right: 5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
    z-index: 1;
    pointer-events: none;
}

/* Responsive */
@media (max-width: 1024px) {
    .categorias-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 25px;
    }
    
    .titulo h1 {
        font-size: 2.5rem;
    }
    
    .categoria-imagen {
        height: 180px;
    }
}

@media (max-width: 768px) {
    .categorias-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }
    
    .titulo h1 {
        font-size: 2rem;
    }
    
    .titulo p {
        font-size: 1.1rem;
    }
    
    .categoria-imagen {
        height: 160px;
    }
    
    .categoria-imagen img {
        width: 80px;
        height: 80px;
    }
    
    .categoria-info h3 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .categorias-grid {
        grid-template-columns: 1fr;
        max-width: 320px;
        margin: 0 auto;
    }
    
    .titulo h1 {
        font-size: 1.8rem;
    }
    
    .categorias-container {
        padding: 30px 15px;
    }
    
    .categoria-imagen {
        height: 150px;
    }
}
</style>