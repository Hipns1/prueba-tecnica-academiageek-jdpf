import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/DetailsPokemon/DetailsPokemon.module.scss";
import altura from "../Styles/Images/altura.png";
import peso from "../Styles/Images/peso.png";
import mew from "../Styles/Images/mew.png";
import poke from "../Styles/Images/pokeball.png";
import pokeGold from "../Styles/Images/pokeGold.png";
import RadarChartStats from './RadarChartStats';
import { motion } from 'framer-motion';
import ModalMoves from './ModalMoves';

const DetailsPokemon = () => {

    const [detail, setDetail] = useState([]);
    const [moves, setMoves] = useState([]);
    const [showMoves, setShowMoves] = useState(false)
    const navigate = useNavigate();

    //VOLVER A LA PAGINA PRINCIPAL
    const backPage = () => {
        navigate("/home");
    }

    //MOSTRAR TODOS LOS MOVIMIENTOS EN UN MODAL 
    const handleMoves = (moves) => {
        setMoves(moves);
        setShowMoves(true);
    }

    useEffect(() => {
        const detailPokemon = [JSON.parse(localStorage.getItem('detailPokemon'))];
        setDetail(detailPokemon);
    }, [])

    return (
        <motion.div
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className={styles.detail_container}>

            <div className={styles.detail_back}>
                <button onClick={() => backPage()}>
                    <i className="fa-solid fa-backward"></i>
                    Volver a la pagina principal
                </button>
                <img src={mew} alt="mewtwo" />
            </div>

            {
                detail?.map((pokemon, index) => {
                    let type = pokemon.types[0].type.name;
                    let type2 = pokemon.types[1] ? pokemon.types[1].type.name : null;
                    return (
                        <div className={styles.detail_card} key={index}>

                            <div className={styles.detail_image}>
                                <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                                <div className={styles.detail_sprites}>
                                    <img src={detail[0]?.sprites.front_default} alt="pokemon" />
                                    <img src={detail[0]?.sprites.back_default} alt="pokemon" />
                                </div>
                                <h1>{pokemon.name}<span>N.??0{pokemon.id}</span></h1>
                            </div>

                            <div className={styles.detail_text}>

                                {/* Experiencia base */}
                                <div className={styles.details_experiencia}>
                                    <h1>Experiencia base:</h1>
                                    <div>
                                        <p>EXP<span>{pokemon.base_experience}</span></p>
                                    </div>
                                </div>

                                {/* mostar stats */}
                                <div className={styles.detail_stats}>
                                    <h1>Estadisticas:</h1>
                                    <RadarChartStats pokemon={pokemon} />
                                </div>
                            </div>

                            <div className={styles.detail_abilities}>

                                {/* tipos */}
                                <div className={styles.details_tipo}>
                                    <h1>Tipo(s):</h1>
                                    <div>
                                        <p className={type}>{pokemon.types[0].type.name}</p>
                                        <p className={type2}>{pokemon.types[1] ? pokemon.types[1].type.name : null}</p>
                                    </div>
                                </div>

                                {/* medidas */}
                                <div className={styles.details_medidas}>
                                    <h1>Medidas:</h1>
                                    <p>
                                        <img src={altura} alt="altura" />
                                        Altura: {(pokemon.height) / 10} m.
                                    </p>
                                    <p>
                                        <img src={peso} alt="peso" />
                                        Peso: {(pokemon.weight) / 10} kg.
                                    </p>
                                </div>
                                {/* mostar habilidades */}
                                <div className={styles.details_habilidades}>
                                    <h1>Habilidades:</h1>
                                    <p>
                                        <img src={pokeGold} alt="pokegold" />
                                        {pokemon.abilities[0].ability.name}
                                    </p>
                                    <p>
                                        <img src={pokeGold} alt="pokegold" />
                                        {pokemon.abilities[1] ? pokemon.abilities[1].ability.name : null}
                                    </p>
                                </div>

                                {/* mostrar movimientos */}
                                <div className={styles.details_moves}>
                                    <h1>Principales movimientos:</h1>

                                    <p>
                                        <img src={poke} alt="poke" />
                                        {pokemon.moves[0].move.name}
                                    </p>
                                    <p>
                                        <img src={poke} alt="poke" />
                                        {pokemon.moves[1] ? pokemon.moves[1].move.name : null}
                                    </p>
                                    <p>
                                        <img src={poke} alt="poke" />
                                        {pokemon.moves[2] ? pokemon.moves[2].move.name : null}
                                    </p>
                                    <p>
                                        <img src={poke} alt="poke" />
                                        {pokemon.moves[3] ? pokemon.moves[3].move.name : null}
                                    </p>
                                    <button onClick={() => handleMoves(pokemon.moves)}>
                                        <i className="fa-solid fa-computer-mouse"></i>
                                        Mostrar todos los movimientos...
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div style={{ width: "100%" }}>

                {showMoves ? <ModalMoves moves={moves} set={setShowMoves} /> : null}
            </div>
        </motion.div>
    )
}

export default DetailsPokemon