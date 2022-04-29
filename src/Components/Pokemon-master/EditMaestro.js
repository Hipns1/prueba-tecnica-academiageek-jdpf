import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { editarAsync } from '../../Redux/actions/actionMaestroPokemon';
import { FileUpload } from '../../utils/FileUpload';
import { useForm } from '../../utils/useForm';

let imagenEdit;

const EditMaestro = ({ maestro, set }) => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false)
        set(false)
    };

    const [values, handleInputChange] = useForm({
        nombre: maestro.nombre,
        edad: maestro.edad,
        pokemons: maestro.pokemons,
        mvp: maestro.mvp,
        victorias: maestro.victorias,
        derrotas: maestro.derrotas,
        imagen: maestro.imagen,
        masterId: maestro.masterId
    })
    
    const { nombre, edad, pokemons, mvp, victorias, derrotas, imagen, masterId } = values;


    //SUBMIT DEL FORMULARIO Y DISPATCH DE LOS DATOS
    const handleSubmit = (e) => {
        e.preventDefault()
        if (imagenEdit === undefined) {
            imagenEdit = imagen
        }
        dispatch(editarAsync(nombre, edad, pokemons, mvp, victorias, derrotas, imagenEdit, masterId))
        imagenEdit = undefined;
        Swal.fire({
            icon: 'success',
            title: 'Maestro editado correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        handleClose()
    }


    //FUNCION PARA SUBIR LA IMAGEN A CLOUDINARY
    const imagenHandler = async (e) => {
        Swal.fire({
            icon: 'warning',
            title: 'Espere mientras carga la imagen',
            showConfirmButton: false,
        })
        const file = e.target.files[0]
        FileUpload(file)
            .then(resp => {
                imagenEdit = resp;
                Swal.fire({
                    icon: 'success',
                    title: 'Imagen cargada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.warn(error)
            })
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Editar maestro pokemon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={() => handleSubmit()}>

                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={nombre}
                            onChange={handleInputChange} />

                        <label>Edad</label>
                        <input
                            type="number"
                            name="edad"
                            value={edad}
                            onChange={handleInputChange} />

                        <label># de pokemons</label>
                        <input
                            type="number"
                            name="pokemons"
                            value={pokemons}
                            onChange={handleInputChange} />

                        <label>Pokemon más valioso</label>
                        <input
                            type="text"
                            name="mvp"
                            value={mvp}
                            onChange={handleInputChange} />

                        <label># de victorias</label>
                        <input
                            type="text"
                            name="victorias"
                            value={victorias}
                            onChange={handleInputChange} />


                        <label># de derrotas</label>
                        <input
                            type="text"
                            name="derrotas"
                            value={derrotas}
                            onChange={handleInputChange} />


                        <img
                            src={imagen} alt=""
                            style={{ height: "200px", margin: "auto" }}
                        />
                        <input
                            type="file"
                            id="imgCargar"
                            name="imagen"
                            onChange={imagenHandler} />
                        <label
                            htmlFor="imgCargar">
                            <i className="fa-solid fa-upload"></i>
                            Cargar imagen
                        </label>

                        <button type="submit" onClick={handleSubmit}>
                            Guardar
                        </button>

                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditMaestro;