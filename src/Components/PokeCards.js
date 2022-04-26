import axios from 'axios';
import React, { useEffect, useState } from 'react'


const PokeCards = () => {

    let [counterPage, setCounterPage] = useState(25);
    const [pokeArray, setPokeArray] = useState([]);


    //funcion para obtener la data
    const getData = async () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${counterPage}`)
            .then(resp => {
                for (let i = 0; i < resp.data.results.length; i++) {
                    axios.get(resp.data.results[i].url)
                        .then(result => {
                            setPokeArray(pokeArray => [...pokeArray, result.data])
                        })
                }
            })
    }

    //funcion para aincrementar el contador de paginas
    const counterAument = () => {
        setCounterPage(counterPage+0)
        getData();
    }

    //funcion para mostar el detalle
    const showDetail = (item) => {
        console.log(item)
    }
    



    useEffect(() => {
        getData();
    }, [])




    return (
        <div>
            {
                pokeArray.map((item, index) => {
                    return (
                        <div className="card" key={index}>
                            <h3>{item.name}</h3>
                            <img src={item.sprites.front_default} alt="pokemon" />
                            <button onClick={() => showDetail(item)}>Detalles</button>
                        </div>
                    )
                })
            }
            <div>
                <button onClick={() => counterAument()} >Cargar más...</button>
            </div>
        </div>
    )
}

export default PokeCards