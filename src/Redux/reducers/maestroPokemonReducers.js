import { typesMaestroPokemon } from "../types/types"


//estado inicial
const initialState = {
    maestro: [],
}

export const maestroPokemonReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesMaestroPokemon.agregar:
            return {
                maestro: [action.payload]
            }

        case typesMaestroPokemon.list:
            return {
                maestro: [...action.payload],
            }

        case typesMaestroPokemon.delete:
            return {
                maestro: state.maestro.filter(maestro => maestro.productId !== action.payload)
            }

        case typesMaestroPokemon.edit:
            return {
                ...state,
            }

        default:
            return state;
    }
}   