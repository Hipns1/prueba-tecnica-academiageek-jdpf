import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addMaestroAsync, deleteAsync } from '../../../Redux/actions/actionMaestroPokemon';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
/* Una tienda simulada para probar los creadores de acción asincrónica 
y el middleware de Redux. El almacén simulado creará una serie de acciones 
enviadas que servirán como un registro de acciones para las pruebas. */


const initialState = {}

let store = mockStore(initialState);

describe("Pruebas con las acciones de productos", () => {
    /* before() se ejecuta una vez antes de todas las pruebas en una descripción */
    /* after() se ejecuta una vez después de todas las pruebas en una descripción */
    /* beforeEach() se ejecuta antes de cada prueba en una descripción */
    /*  afterEach() se ejecuta después de cada prueba en una descripción */

    beforeEach(() => {
        store = mockStore(initialState);
    })

    const nombre = "Prueba"
    const edad = "10"
    const pokemons = "20"
    const mvp = "Prueba"
    const victorias = "20"
    const derrotas = "20"
    const imagen = "Prueba.png"
    const masterId = "asdasdfaewvasdv"


    //TEST PARA AGREGAR UN PRODUCTO DE MANERA SINCRONICA
    test("Agregar productos", async () => {
        await store.dispatch(addMaestroAsync(
            nombre,
            edad,
            pokemons,
            mvp,
            victorias,
            derrotas,
            imagen,
            masterId
        ));
        const actions = store.getActions();
        console.log(actions)
    })
})