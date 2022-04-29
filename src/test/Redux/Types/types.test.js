import "@testing-library/jest-dom";
import { typesLogin, typesMaestroPokemon, typesRegister } from "../../../Redux/types/types";

describe("Verificar todos los types", () => {

    //VERIFICAR TYPES DEL LOGIN
    test("Verificar el type de login", () => {
        expect(typesLogin).toEqual({
            login: 'login',
            logout: 'logout'
        });
    })

    //VERIFICAR TYPES DEL REGISTER
    test("Verificar el type de register", () => {
        expect(typesRegister).toEqual({
            register: 'register'
        });
    })

    //VERIFICAR TYPES DEL CRUD DEL MAESTRO POKEMON
    test("Verificar el type de CRUD maestro pokemon", () => {
        expect(typesMaestroPokemon).toEqual({
            add: 'add',
            edit: 'edit',
            delete: 'delete',
            list: 'list'
        });
    })
})