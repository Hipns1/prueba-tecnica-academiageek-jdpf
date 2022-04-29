import { Navigate, Route, Routes } from 'react-router-dom';
import SideMenu from '../Components/SideMenu';
import PokeCards from '../Components/PokeCards';
import SearchPokemon from '../Components/SearchPokemon';
import DetailsPokemon from '../Components/DetailsPokemon';
import RegistroMaestro from '../Components/Pokemon-master/RegistroMaestro';
import ListMaestro from '../Components/Pokemon-master/ListMaestro';

const DashboardRoutes = () => {
	return (
		<div className='dash_container'>
			<div className='dash_menu'>
				<SideMenu />
			</div>
			<div className='dash_routes'>
				<Routes>
					<Route path='/home/1' element={<PokeCards />} />
					<Route path='/home/:id' element={<PokeCards />} />
					<Route path='*' element={<Navigate to='/home/1' />} />
					<Route path='/search' element={<SearchPokemon />} />
					<Route path='/detail/:name' element={<DetailsPokemon />} />
					<Route path='/maestro-pokemon' element={<ListMaestro/>}></Route>
					<Route path='/registrar-maestro-pokemon' element={<RegistroMaestro/>}></Route>
				</Routes>
			</div>
		</div>
	)
}

export default DashboardRoutes
