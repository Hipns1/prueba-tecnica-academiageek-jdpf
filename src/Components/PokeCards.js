import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../Styles/PokeCard/PokeCard.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEvolution } from '../utils/getEvolve';
import Swal from 'sweetalert2';

const PokeCards = () => {

    //VARIABLES PDE ESTADOS
    let [counterPage, setCounterPage] = useState(0);
    const [pokeArray, setPokeArray] = useState([]);
    let [counter, setCounter] = useState(1);

    //URLS DE LA POKEAPI
    const url_api = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=0`;

    //FUNCION PARA OBTENER LA DATA
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

    const navigate = useNavigate();
    //FUNCION PARA INCREMENTAR LA PAGINA
    const counterAument = () => {
        counterAll(counterPage + 25, counter + 1);
        navigate(`/home/${counter + 1}`);
    }
    //FUNCION PARA DECREMENTAR LA PAGINA
    const counterDecrement = () => {
        if (counter > 1) {
            counterAll(counterPage - 25, counter - 1);
            navigate(`/home/${counter - 1}`);
        }
    }


    //FUNCION PARA MOSTAR EL DETALLE
    const showDetail = (detailPokemon) => {
        localStorage.setItem('detailPokemon', JSON.stringify(detailPokemon))
    }


    //FUNCION PARA BUSCAR POKEMON
    const searchPokemon = (e) => {
        e.preventDefault();
        const search = document.getElementById('search').value.toLocaleLowerCase();
        if (search === '') {
            getData(url_api);
        } else {
            const url_search = `https://pokeapi.co/api/v2/pokemon/${search}`;
            axios.get(url_search)
                .then(resp => {
                    setPokeArray([resp.data])
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Este pokemon no existe',
                        text: 'Intenta con el nombre exacto o uno que exista'
                    })
                })
        }
    }

    useEffect(() => {
        getData(url_api);
    }, [url_api])


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
                    pokeArray?.map((pokemon, index) => {
                        let type = pokemon.types[0].type.name;
                        let type2 = pokemon.types[1] ? pokemon.types[1].type.name : null;
                        return (
                            <div className={styles.pokecard_card} key={index}>
                                <div className={type + "class"}>
                                    <Link
                                        onClick={() => showDetail(pokemon)}
                                        to={`/detail/${pokemon.name}`}
                                        className={styles.link}>
                                        <div className={styles.pokecard_text}>
                                            <img src={pokemon.sprites.other.dream_world.front_default} alt="pokemon" />
                                            <h1>{pokemon.name}</h1>
                                            <h2>N.º0{pokemon.id}</h2>
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
                                    onClick={() => getEvolution(pokemon)}>
                                    <i className="fa-solid fa-computer-mouse"></i>
                                    &nbsp;<span>Click para revelar evolución...</span>
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