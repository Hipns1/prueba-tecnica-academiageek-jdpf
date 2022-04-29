import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import pokelogo from "../../Styles/Images/pokelogo.png";
import { deleteAsync, listarMaestrosAsync } from '../../Redux/actions/actionMaestroPokemon';
import EditMaestro from './EditMaestro';
import mew from "../../Styles/Images/mew.png";
import styles from "../../Styles/PokemonMaster/ListMaestro.module.scss";
import { motion } from "framer-motion";

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
        <div className={styles.listMaster_container}>
            <motion.div
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.listMaster_back}>
                <div>
                    <button onClick={() => backPage()}>
                        <i className="fa-solid fa-backward"></i>
                        Volver a la pagina anterior
                        <img src={mew} alt="mewtwo" />
                    </button>

                </div>
                <Link to="/registrar-maestro-pokemon">
                    <i className="fa-solid fa-plus"></i>
                    Registrar masestro pokemon
                </Link>
            </motion.div>

            <motion.div
                initial={{ x: 800, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className={styles.listMaster_card__container}>
                {maestro.length > 0
                    ? maestro?.map((maestro, index) => (
                        <div

                            key={index}
                            className={styles.listMaster_card}>
                            <div className={styles.listMaster_image}>
                                <img src={maestro.imagen} alt="imagen" />
                            </div>
                            <div className={styles.listMaster_text}>
                                <h1>{maestro.nombre}</h1>
                                <h2>Edad: <span>{maestro.edad}</span></h2>
                                <h2># de pokemons: <span>{maestro.pokemons}</span></h2>
                                <h2>Pokemon mas valioso: <span>{maestro.mvp}</span></h2>
                                <h2>Victorioas: <span>{maestro.victorias}</span></h2>
                                <h2>Derrotas: <span>{maestro.derrotas}</span></h2>
                            </div>

                            <div className={styles.listMaster_btns}>
                                <button onClick={() => editMaestro(maestro)}>Editar</button>
                                <button style={{backgroundColor: "#b60e0e"}}onClick={() => deleteMaestro(maestro.masterId)}>Eliminar</button>
                            </div>
                        </div>
                    ))
                    : <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className={styles.listMaster_vacio}>
                        <h1>
                            <img src={pokelogo} alt="logo" />
                            No hay maestros registrados.
                            Se el primero en formar parte de
                            esta gran comunidad.
                        </h1>
                    </motion.div>
                }
            </motion.div>
            <div style={{ width: "100%" }}>
                {modalEditar ? <EditMaestro maestro={maestroEditar} set={setModalEditar} /> : null}
            </div>
        </div>
    )
}

export default ListMaestro;