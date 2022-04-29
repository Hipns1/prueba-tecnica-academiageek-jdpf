import React from 'react';
import styles from "../Styles/SideMenu/SideMenu.module.scss";
import pokeball from "../Styles/Images/pokeball.png";
import { getAuth } from 'firebase/auth';
import md5 from "md5";
import { Link } from 'react-router-dom';
import { logoutAsync } from '../Redux/actions/actionLogin';
import { useDispatch } from 'react-redux';

const SideMenu = () => {

    const dispatch = useDispatch();

    //OBTENER USUARIO ACTUAL
    const auth = getAuth()
    const user = auth.currentUser;

    //IMAGEN DE GRAVATAR
    const hash = md5(user.email);
    const gravatar = `https://www.gravatar.com/avatar/${hash}?d=identicon`;


    //FUNCION PARA CERRAR SESION
    const handleLogout = () => {
        dispatch(logoutAsync())
    }

    return (
        <div className={styles.sidemenu_container}>

            <div className={styles.sidemenu_body}>
                {/* Header */}
                <div className={styles.sidemenu_logo}>
                    <Link to="/home"><img src={pokeball} alt="logo" /></Link>
                </div>


                {/* Profile */}
                <div className={styles.sidemenu_profile}>
                    <img src={gravatar} alt="perfil" />
                    <h1>{user.email}</h1>
                </div>


                {/* Items */}
                <div className={styles.sidemenu_items}>
                    <Link to="/search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span>Busca tu pokemon favorito</span>
                    </Link>

                    {/* <Link to="/image-analyzer">
                        <i className="fa-solid fa-plus"></i>
                        <span>Agregar pokemon descubierto</span>
                    </Link> */}

                    <Link to="/maestro-pokemon">
                        <i className="fa-solid fa-address-book"></i>
                        <span>Resgistro maestro pokemon</span>
                    </Link>


                </div>

                {/* Footer */}
                <div className={styles.sidemenu_footer}>
                    <button onClick={() => handleLogout()}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <h1>Logout</h1>
                    </button>

                </div>
            </div>

        </div>
    )
}

export default SideMenu;