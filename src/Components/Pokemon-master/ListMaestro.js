import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import pokelogo from "../../Styles/Images/pokelogo.png";
import { deleteAsync, listarMaestrosAsync } from '../../Redux/actions/actionMaestroPokemon';
import EditMaestro from './EditMaestro';

const ListMaestro = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalEditar, setModalEditar] = useState(false)
    const [maestroEditar, setMaestroEditar] = useState([])

    //CONSUMIR LISTA DE MAESTRO DESDE LA STORE DE REDUX
    const { maestro } = useSelector(store => store.maestro);

    
    //VOLVER A LA PAGINA DE INICIO
    const backPage = () => {
        navigate("/");
    }

    //ELIMINAR MAESTRO
    const deleteMaestro = (mastertId) => {
        dispatch(deleteAsync(mastertId))
    }

    //EDITAR MAESTRO
    const editMaestro = (maestro) => {
        setModalEditar(true);
        setMaestroEditar(maestro);
    }

    //LISTAR MAESTROS CADA QUE RENDERICE LA PAGINA
    useEffect(() => {
        dispatch(listarMaestrosAsync())
    }, [dispatch]);
    return (
        <div>
            <div>
                <button onClick={() => backPage()}>Vover a la pagina de inicio</button>
                <Link to="/registrar-maestro-pokemon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    Registrate como maestro pokemon
                </Link>

                <div>
                    {maestro.length > 0
                        ? maestro?.map((maestro, index) => (
                            <div key={index}>
                                <img src={maestro.imagen} alt="imagen" width={200} />
                                <h1>{maestro.nombre}</h1>
                                <h2>{maestro.edad}</h2>
                                <h2>{maestro.pokemons}</h2>
                                <h2>{maestro.mvp}</h2>
                                <h2>{maestro.victorias}</h2>
                                <h2>{maestro.derrotas}</h2>

                                <div>
                                    <button onClick={() => editMaestro(maestro)}>Editar</button>
                                    <button onClick={() => deleteMaestro(maestro.masterId)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                        : <div>
                            <h1>
                                <img src={pokelogo} alt="logo" />
                                No hay maestros registrados.
                                Se el primero en formar parte de
                                esta gran comunidad.
                            </h1>
                        </div>
                    }
                </div>
            </div>
            <div style={{ width: "100%" }}>
                {modalEditar ? <EditMaestro maestro={maestroEditar} set={setModalEditar} /> : null}
            </div>
        </div>
    )
}

export default ListMaestro;