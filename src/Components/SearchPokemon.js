import axios from 'axios';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import styles from "../Styles/PokeCard/PokeCard.module.scss";
import { Link } from 'react-router-dom';
import pokelogo from "../Styles/Images/pokelogo.png";
import { getEvolution } from '../utils/getEvolve';

const SearchPokemon = () => {

    const [inputValue, setInputValue] = useState('');
    const [pokeArray, setPokeArray] = useState([]);


    //FUNCION PARA OBTENER LA DATA A FILTRAR 
    const getData = async () => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000")
            .then(resp => {
                for (let i = 0; i < resp.data.results.length; i++) {
                    axios.get(resp.data.results[i].url)
                        .then(result => {
                            setPokeArray(pokeArray => [...pokeArray, result.data])
                        })
                }
            })
    }

    //CAPTURAR EL VALOR DEL INPUT
    const searchPokemon = (e) => {
        e.preventDefault();
        setInputValue(document.getElementById('inputSearch').value)
        if (inputValue === '') {
            getData();
        }
    }


    //FUNCION PARA FILTRAR LOS POKEMON
    const filterPokemons = () => {
        return pokeArray.filter(item => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
    }

    //FUNCION PARA MOSTAR EL DETALLE
    const showDetail = (detailPokemon) => {
        localStorage.setItem('detailPokemon', JSON.stringify(detailPokemon))
    }

    return (
        <div className={styles.pokecard_container}>
            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                onSubmit={searchPokemon}>
                <input id="inputSearch" type="text" placeholder="Buscar Pokemon..." />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </motion.form>

            <motion.div
                initial={{ x: 800, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className={styles.pokecard_cards__container}>
                {filterPokemons().length > 0
                    ?
                    filterPokemons().map((pokemon, index) => {
                        let type = pokemon.types[0].type.name;
                        let type2 = pokemon.types[1] ? pokemon.types[1].type.name : null;
                        return (
                            <div className={styles.pokecard_card} key={index}>
                                <div className={type + "class"}>
                                    <Link 
                                    onClick={() => showDetail(pokemon)}
                                    to={`/detail/${pokemon.name}`} className={styles.link}>
                                        <div className={styles.pokecard_text}>
                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="pokemon" />
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
                    :
                    <div className={styles.pokecard_notResults}>
                        <img src={pokelogo} alt="pokelogo" />
                        <h1>Esta pagina te permite buscar tu pokemon
                            favorito por nombre aproximado o incompleto;
                            en una base de datos de todos los pokemones que
                            han existido.
                        </h1>
                    </div>
                }
            </motion.div>
        </div >
    )
}

export default SearchPokemon;