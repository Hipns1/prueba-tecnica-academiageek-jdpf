import { Navigate, Route, Routes } from 'react-router-dom';
import SideMenu from '../Components/SideMenu';
import PokeCards from '../Components/PokeCards';
import PruebaAdmin from '../Components/PruebaAdmin';
import SearchPokemon from '../Components/SearchPokemon';

const DashboardRoutes = () => {
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
					<Route path='/detail/:name' element={<PruebaAdmin />} />
				</Routes>
			</div>
		</div>
	)
}

export default DashboardRoutes
