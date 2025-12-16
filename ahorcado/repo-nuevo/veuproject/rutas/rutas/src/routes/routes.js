import Inicio from "../views/inicio.vue"
import Categorias from "../views/categoria.vue"
import Nivel from "../views/nivel.vue"
import Play from "../views/play.vue"
import Puntos from "../views/puntos.vue"
// import Score from "../views/score.vue"
import { createRouter, createWebHashHistory } from "vue-router"



const routes = [
    {path:"/", component:Inicio},
    {path:"/categorias", component:Categorias},
    {path:"/nivel", component:Nivel},
    {path:"/play", component:Play},
{path:"/puntos", component:Puntos}
    // {path:"/score", component:Score},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
