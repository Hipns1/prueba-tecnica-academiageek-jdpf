import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import styles from "../Styles/PokeCard/PokeCard.module.scss";
import { Link } from 'react-router-dom';
import pokelogo from "../Styles/Images/pokelogo.png";

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

    //funcion para mostar el detalle
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
                    filterPokemons().map((item, index) => {
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
                                <button onClick={() => getEvolution(item)}>Este pokemon evolucionó de...</button>
                            </div>
                        )
                    })
                    :
                    <div className={styles.pokecard_notResults}>
                        <img src={pokelogo} alt="pokelogo"/>
                        <h1>Esta pagina te permite buscar tu pokemon favorito por nombre aproximado o incompleto.</h1>
                    </div>
                }
            </motion.div>
        </div >
    )
}

export default SearchPokemon;