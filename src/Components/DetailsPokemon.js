import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/DetailsPokemon/DetailsPokemon.module.scss";

const DetailsPokemon = () => {

    const [detail, setDetail] = useState([]);
    const navigate = useNavigate();

    //VOLVER A LA PAGINA PRINCIPAL
    const backPage = () => {
        navigate("/home");
    }

    useEffect(() => {
        const detailPokemon = [JSON.parse(localStorage.getItem('detailPokemon'))];
        setDetail(detailPokemon);
    }, [])

    return (
        <div className={styles.detail_container}>

            <div className={styles.detail_back}>
                <button onClick={() => backPage()}>
                    <i className="fa-solid fa-backward"></i>
                    Volver a la pagina principal
                </button>
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
                                <h1>{pokemon.name}<span>N.º0{pokemon.id}</span></h1>
                            </div>

                            <div className={styles.detail_text}>
                                {/* tipos */}
                                <div>
                                    <h1>Tipo(s):</h1>
                                    <p className={type}>{pokemon.types[0].type.name}</p>
                                    <p className={type2}>{pokemon.types[1] ? pokemon.types[1].type.name : null}</p>
                                </div>

                                {/* medidas */}
                                <div>
                                    <h1>Medidas:</h1>
                                    <p>Altura: {(pokemon.height) / 10} m.</p>
                                    <p>Peso: {(pokemon.weight) / 10} kg.</p>
                                </div>

                                {/* experiencia de base */}
                                <div>
                                    <h1>Experiencia base:</h1>
                                    <p>{pokemon.base_experience}</p>
                                </div>

                                {/* mostar stats */}
                                <div>
                                    <h1>Stats:</h1>
                                    <p>{pokemon.stats[0].stat.name}: {pokemon.stats[0].base_stat}</p>
                                    <p>{pokemon.stats[1].stat.name}: {pokemon.stats[1].base_stat}</p>
                                    <p>{pokemon.stats[2].stat.name}: {pokemon.stats[2].base_stat}</p>
                                    <p>{pokemon.stats[3].stat.name}: {pokemon.stats[3].base_stat}</p>
                                    <p>{pokemon.stats[4].stat.name}: {pokemon.stats[4].base_stat}</p>
                                    <p>{pokemon.stats[5].stat.name}: {pokemon.stats[5].base_stat}</p>
                                </div>

                                {/* mostar habilidades */}
                                <div>
                                    <h1>Habilidades:</h1>
                                    <p>{pokemon.abilities[0].ability.name}</p>
                                    <p>{pokemon.abilities[1] ? pokemon.abilities[1].ability.name : null}</p>
                                </div>

                                {/* mostrar movimientos */}
                                <div>
                                    <h1>Principales movimientos:</h1>
                                    <p>{pokemon.moves[0].move.name}</p>
                                    <p>{pokemon.moves[1] ? pokemon.moves[1].move.name : null}</p>
                                    <p>{pokemon.moves[2] ? pokemon.moves[2].move.name : null}</p>
                                    <p>{pokemon.moves[3] ? pokemon.moves[3].move.name : null}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DetailsPokemon