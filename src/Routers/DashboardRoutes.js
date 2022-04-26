import { Navigate, Route, Routes } from 'react-router-dom';
import SideMenu from '../Components/SideMenu';
import PruebaAdmin from '../Components/PruebaAdmin';

const DashboardRoutes = () => {
	return (
		<div className='dash_container'>
			<div className='dash_menu'>
				<SideMenu />
			</div>
			<div className='dash_routes'>
				<Routes>
					<Route path='/home' element={<PruebaAdmin />} />
					<Route path='*' element={<Navigate to='/home' />} />
				</Routes>
			</div>
		</div>
	)
}

export default DashboardRoutes
