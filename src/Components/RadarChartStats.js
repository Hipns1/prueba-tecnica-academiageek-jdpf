import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const RadarChartStats = ({ pokemon }) => {
    //color para cada stat
    const type = pokemon.types[0].type.name;
    const data = {
        labels: [
            'HP: ' + pokemon.stats[0].base_stat,
            'Ataque: ' + pokemon.stats[1].base_stat,
            'Defensa: ' + pokemon.stats[2].base_stat,
            'Velocidad: ' + pokemon.stats[3].base_stat,
            'Ataque especial: ' + pokemon.stats[4].base_stat,
            'Defensa especial: ' + pokemon.stats[5].base_stat,
        ],
        datasets: [
            {
                label: 'Estadisticas',
                data: [
                    pokemon.stats[0].base_stat,
                    pokemon.stats[1].base_stat,
                    pokemon.stats[2].base_stat,
                    pokemon.stats[3].base_stat,
                    pokemon.stats[4].base_stat,
                    pokemon.stats[5].base_stat,
                ],
                backgroundColor: 'rgba(254, 212, 0, 0.4)',
                borderColor: '#108141',
                borderWidth: 1,
                pointBackgroundColor: '#108141',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#108141',
            }
        ]
    };

    const options = {
        scale: {
            ticks: {
                beginAtZero: false,
                max: 255,
                min: 1,
                stepSize: 255
            }
        },

    };

    return (
        <div>
            <Radar data={data} options={options} />
        </div>
    )
}

export default RadarChartStats