import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../Styles/PokeCard/PokeCard.module.scss";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const PokeCards = () => {

    //VARIABLES PDE ESTADOS
    let [counterPage, setCounterPage] = useState(0);
    const [pokeArray, setPokeArray] = useState([]);
    let [counter, setCounter] = useState(1);

    //URLS DE LA POKEAPI
    const url_api = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=0`;

    //funcion para obtener la data para la carga principal
    const getData = async (url) => {
        axios.get(url)
            .then(resp => {
                for (let i = 0; i < resp.data.results.length; i++) {
                    setPokeArray([])
                    axios.get(resp.data.results[i].url)
                        .then(result => {
                            setPokeArray(pokeArray => [...pokeArray, result.data])
                        })
                }
            })
    }


    //FUNCION GENERAL DE PAGINACION
    const counterAll = (page, indicator) => {
        counterPage = page;
        setCounterPage(counterPage)
        setCounter(indicator)
        const url_pagination = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${counterPage}`;
        getData(url_pagination);
    }
    //FUNCION PARA INCREMENTAR LA PAGINA
    const counterAument = () => {
        counterAll(counterPage + 25, counter + 1);
    }

    //FUNCION PARA DECREMENTAR LA PAGINA
    const counterDecrement = () => {
        if (counter > 1) {
            counterAll(counterPage - 25, counter - 1);
        }
    }

    //FUNCION PARA MOSTAR EL DETALLE
    const showDetail = (item) => {
        console.log(item)
    }


    //FUNCION PARA OBTENER LA EVOLUCION ANTERIOR DEL POKEMON
    const getEvolution = (item) => {
        axios.get(item.species.url)
            .then(resp => {
                if (resp.data.evolves_from_species) {
                    axios.get(resp.data.evolves_from_species.url)
                        .then(result => {
                            Swal.fire({
                                icon: 'success',
                                text: 'Este pokemon ha evolucinado de...',
                                title: `${result.data.name}`,

                            })
                            console.log(result.data.name)
                        })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Este pokemon es el primero de su linea evolutiva',
                    })
                }
            })
    }

    //FUNCION PARA BUSCAR POKEMON
    const searchPokemon = (e) => {
        e.preventDefault();
        const search = document.getElementById('search').value;
        if (search === '') {
            getData(url_api);
        } else {
            const url_search = `https://pokeapi.co/api/v2/pokemon/${search}`;
            axios.get(url_search)
                .then(resp => {
                    console.log(resp)
                    setPokeArray([resp.data])
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        getData(url_api);
    }, [])


    return (
        <div className={styles.pokecard_container}>
            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                onSubmit={searchPokemon}>
                <input id="search" type="text" placeholder="Buscar Pokemon por nombre exacto..." />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </motion.form>

            <motion.div
                initial={{ x: 800, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className={styles.pokecard_cards__container}>
                {
                    pokeArray?.map((item, index) => {
                        let type = item.types[0].type.name;
                        let type2 = item.types[1] ? item.types[1].type.name : null;
                        return (


                            <div className={styles.pokecard_card} key={index}>
                                <div className={type + "class"}>
                                    <Link to={`/detail/${item.name}`} className={styles.link}>
                                        <div className={styles.pokecard_text}>
                                            <img src={item.sprites.front_default} alt="pokemon" />
                                            <h1>{item.name}</h1>
                                            <div className={styles.pokecard_types}>
                                                <p className={type}>{type}</p>
                                                {type2 ? <p className={type2}>{type2}</p> : null}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <motion.button
                                    animate={{ scale: [1, 1.05, 1, 1.05, 1, 1.05, 1] }}
                                    transition={{ duration: 4 }}
                                    onClick={() => getEvolution(item)}>
                                    <i class="fa-solid fa-computer-mouse"></i>
                                    &nbsp;<span>Este pokemon evolucionó de...</span>
                                </motion.button>
                            </div>
                        )
                    })
                }
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={styles.pokecard_paginate__btns}>
                <button
                    disabled={(counter <= 1) ? true : false}
                    onClick={() => counterDecrement()} >
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <h1>{counter}</h1>
                <button
                    onClick={() => counterAument()}>
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </motion.div>
        </div >
    )
}

export default PokeCards