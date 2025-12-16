<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
         <q-btn
    flat
    dense
    round
    icon="☰"
    @click="toggleLeftDrawer"
  />
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Menu de navegacion
        </q-toolbar-title>
        
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <!-- drawer content -->
       <!-- <button> <router-link to="/compras">Compras</router-link> </button><br>
       <button> <router-link to="/ventas">Ventas</router-link> </button><br>
       <button> <router-link to="/">Inventario</router-link> </button> -->
       <!-- <q-btn color="primary" label="Inicio" to="/inicio"/><br> -->
       <q-btn color="primary" label="Categorias" to="/categorias"/><br>
       <q-btn color="primary" label="Nivel" to="/nivel"/><br>
        <q-btn color="primary" label="Play" to="/play"/><br>
       <q-btn color="primary" label="Puntos" to="/puntos"/><br>

       
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>