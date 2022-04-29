

import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/credentials";
import { typesMaestroPokemon } from "../types/types";

//AGREGAR
export const addMaestroSync = (maestro) => {
    return {
        type: typesMaestroPokemon.add,
        payload: maestro
    }
}
export const addMaestroAsync = (nombre, edad, pokemons, mvp, victorias, derrotas, imagen, masterId) => {
    return (dispatch) => {
        const newMaestro = {
            nombre,
            edad,
            pokemons,
            mvp,
            victorias,
            derrotas,
            imagen,
            masterId
        }
        addDoc(collection(db, "pokedex"), newMaestro)
            .then((resp) => {
                dispatch(addMaestroSync(newMaestro))
            })
            .catch((err) => { })
    }
}

//LECTURA
//Lectura de datos de firebase
export const listarMaestrosSync = (maestro) => {
    return {
        type: typesMaestroPokemon.list,
        payload: maestro
    }
}
export const listarMaestrosAsync = () => {
    return async (dispatch) => {
        const datos = await getDocs(collection(db, "pokedex"));
        const maestro = [];
        datos.forEach((doc) => {
            maestro.push({
                ...doc.data()
            })
        })
        dispatch(listarMaestrosSync(maestro))
    }
}



//DELETE
export const deleteSync = (mastertId) => {
    return {
        type: typesMaestroPokemon.delete,
        payload: mastertId
    }
}

export const deleteAsync = (masterId) => {
    return async (dispatch) => {
        const collecionTraer = collection(db, "pokedex");
        const q = query(collecionTraer, where("masterId", "==", masterId));
        const traerDatosQ = await getDocs(q);
        traerDatosQ.forEach((docu) => {
            deleteDoc(doc(db, "pokedex", docu.id))
        })
        dispatch(listarMaestrosAsync())
        dispatch(deleteSync(masterId))
    }
}

//EDITAR
export const editarAsync = (nombre, edad, pokemons, mvp, victorias, derrotas, imagenEdit, masterId) => {
    return async (dispatch) => {
        const editMaestro = {
            nombre,
            edad,
            pokemons,
            mvp,
            victorias,
            derrotas,
            imagen: imagenEdit,
            masterId
        }
        const colleccionTraer = collection(db, "pokedex");
        const q = query(colleccionTraer, where("masterId", "==", masterId));
        const traerDatosQ = await getDocs(q)
        let id
        traerDatosQ.forEach(async (docu) => {
            id = docu.id
        })
        const documenRef = doc(db, "pokedex", id);
        await updateDoc(documenRef, editMaestro)
            .then(resp => {
                dispatch(editarSync(editMaestro))
            })
            .catch((err) => console.log(err))
        dispatch(listarMaestrosAsync())
    }

}
export const editarSync = (maestro) => {
    return {
        type: typesMaestroPokemon.edit,
        payload: maestro
    }
}
