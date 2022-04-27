import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DetailsPokemon from '../Components/DetailsPokemon';
import PokeCards from '../Components/PokeCards';
import SearchPokemon from '../Components/SearchPokemon';
import SideMenu from '../Components/SideMenu';

const AdminRoutes = () => {
    return (
        <div className='dash_container'>
            <div className='dash_menu'>
                <SideMenu />
            </div>
            <div className='dash_routes'>
                <Routes>
                    <Route path='/home' element={<PokeCards />} />
                    <Route path='*' element={<Navigate to='/home' />} />
                    <Route path='/search' element={<SearchPokemon />} />
                    <Route path='/detail/:name' element={<DetailsPokemon />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminRoutes;