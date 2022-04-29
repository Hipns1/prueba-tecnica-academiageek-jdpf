import { typesMaestroPokemon } from "../types/types"


//estado inicial
const initialState = {
    maestro: [],
}

export const maestroPokemonReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesMaestroPokemon.add:
            return {
                maestro: [action.payload]
            }

        case typesMaestroPokemon.list:
            return {
                maestro: [...action.payload],
            }

        case typesMaestroPokemon.delete:
            return {
                maestro: state.maestro.filter(maestro => maestro.masterId !== action.payload)
            }

        case typesMaestroPokemon.edit:
            return {
                ...state,
            }

        default:
            return state;
    }
}   