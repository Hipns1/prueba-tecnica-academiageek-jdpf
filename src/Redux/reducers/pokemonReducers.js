import { typesPokemon } from "../types/types";

//estado inicial
const initialState = {
    buscar: "",
}


export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesPokemon.buscar:
            return {
                ...state,
                buscar: action.payload,
            }

        default:
            return state;
    }
}   