//FUNCION PARA BUSCAR

import { typesPokemon } from "../types/types"

export const buscarPokemon = (query) => {
    return {
        type: typesPokemon.buscar,
        payload: query
    }
}