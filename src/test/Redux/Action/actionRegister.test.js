import "@testing-library/jest-dom";
import { registerSync } from "../../../Redux/actions/actionRegister";
import { typesRegister } from "../../../Redux/types/types";


describe("Acciones de Register sincrono", () => {
    test("validar register sincronico", () => {
        const email = "jesudpf21@hotmail.com";
        const pass = "123456";
        const name = "Jesus";

        const loginAction = registerSync(email, pass, name);

        expect( loginAction ).toEqual({
            type: typesRegister.register,
            payload: {
                email,
                pass,
                name
            }
        });
    })
})