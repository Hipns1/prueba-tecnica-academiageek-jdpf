import { Navigate, Route, Routes } from 'react-router-dom';
import SideMenu from '../Components/SideMenu';
import PokeCards from '../Components/PokeCards';
import SearchPokemon from '../Components/SearchPokemon';
import DetailsPokemon from '../Components/DetailsPokemon';

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
				</Routes>
			</div>
		</div>
	)
}

export default DashboardRoutes
