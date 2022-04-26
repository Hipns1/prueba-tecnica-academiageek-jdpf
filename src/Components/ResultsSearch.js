import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ResultSearch = () => {

    const [inputValue, setInputValue] = useState('');
    const [pokeArray, setPokeArray] = useState([]);

    //funcion para obtener la data
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


    //capturar input del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue(document.getElementById('inputSearch').value)
        if (inputValue === '') {
            getData();
        }
    }


    //funcion para filtrar los pokemons
    const filterPokemons = () => {
        return pokeArray.filter(item => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
    }

    //funcion para mostar el detalle
    const showDetail = (item) => {
        console.log(item)
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    id='inputSearch'
                    type="text"
                    placeholder="Buscar..."
                />
            </form>
            {
                filterPokemons().map((item, index) => {
                    return (
                        <div className="card" key={index}>
                            <h3>{item.name}</h3>
                            <img src={item.sprites.front_default} alt="pokemon" />
                            <button onClick={() => showDetail(item)}>Detalles</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ResultSearch