import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addMaestroAsync } from '../../Redux/actions/actionMaestroPokemon';
import { FileUpload } from '../../utils/FileUpload';
import { useNavigate } from 'react-router-dom';
import styles from "../../Styles/PokemonMaster/RegistroMaestro.module.scss";
import mew from "../../Styles/Images/mew.png";
import oak from "../../Styles/Images/oak.png";
import { motion } from 'framer-motion';

//DECLARACIONES INICIALES
let imagen;
let masterId;

//VALIDACIONES DE CADA INPUT
const SignupSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Este campo es obligatorio'),

    edad: Yup.number()
        .required('Este campo es obligatorio'),

    pokemons: Yup.string()
        .required('Este campo es obligatorio'),

    mvp: Yup.string()
        .required('Este campo es obligatorio'),

    victorias: Yup.number()
        .required('Este campo es obligatorio'),

    derrotas: Yup.number()
        .required('Este campo es obligatorio'),
});


const RegistroMaestro = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //FUNCION PARA GENERAR UN ID ALEATORIO
    const generarID = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    };


    //FUNCION PARA SUBIR LA IMAGEN A CLOUDINARY
    const imagenHandler = async (e) => {
        Swal.fire({
            icon: 'warning',
            title: 'Espere mientras carga la imagen',
            showConfirmButton: false,
        })
        const file = e.target.files[0]
        FileUpload(file)
            .then(resp => {
                imagen = resp;
                Swal.fire({
                    icon: 'success',
                    title: 'Imagen cargada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.warn(error)
            })
    }


    //FUNCION PARA AGREGAR UN MAESTRO NUEVO
    const agregarMaestroPokemon = (values) => {
        masterId = generarID();
        dispatch(addMaestroAsync(
            values.nombre,
            values.edad,
            values.pokemons,
            values.mvp,
            values.victorias,
            values.derrotas,
            imagen,
            masterId))
    }

    //VOLVER A LA PAGINA ANTERIOR
    const backPage = () => {
        navigate("/maestro-pokemon");
    }

    return (
        <div className={styles.registerMaster_container}>
            <motion.div
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.registerMaster_back}>
                <button onClick={() => backPage()}>
                    <i className="fa-solid fa-backward"></i>
                    Volver a la pagina anterior
                </button>
                <img src={mew} alt="mewtwo" />
            </motion.div>

            <div className={styles.registerMaster_form}>
                <motion.img
                    initial={{ x: -500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    src={oak}
                    alt="oak" />
                <Formik
                    id="formReset"
                    initialValues={{
                        nombre: "",
                        edad: "",
                        pokemons: "",
                        mvp: "",
                        victorias: "",
                        derrotas: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { resetForm }) => {

                        if (imagen === undefined) {
                            Swal.fire({
                                title: 'Debe cargar una imagen',
                                icon: 'warning'
                            })
                        } else {
                            agregarMaestroPokemon(values);
                            resetForm();
                            document.getElementById("imageReset").value = "";
                            imagen = undefined;
                            Swal.fire({
                                icon: 'success',
                                title: 'Maestro agregado correctamente',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form >
                            <motion.div
                                initial={{ x: 500, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1 }} className={styles.registerMaster_fields}>
                                <h1>Registrate como maestro pokemon</h1>

                                <label>Nombre</label>
                                <Field name="nombre" />
                                {errors.nombre && touched.nombre ? (
                                    <div className={styles.registerMaster_error}>
                                        {errors.nombre}
                                    </div>
                                ) : null}

                                <label>Edad</label>
                                <Field name="edad" type="number" />
                                {errors.edad && touched.edad ? (
                                    <div className={styles.registerMaster_error}>
                                        {errors.edad}
                                    </div>
                                ) : null}

                                <label># de pokemons en tu pokedex</label>
                                <Field name="pokemons" type="number" />
                                {errors.pokemons && touched.marca ? (
                                    <div className={styles.registerMaster_error}>
                                        {errors.marca}
                                    </div>
                                ) : null}

                                <label>Pokemon más valioso</label>
                                <Field name="mvp" type="text" />
                                {errors.mvp && touched.mvp ? (
                                    <div className={styles.registerMaster_error}>
                                        {errors.mvp}
                                    </div>
                                ) : null}

                                <label># de victorias</label>
                                <Field name="victorias" type="number" />
                                {errors.color && touched.color ? (
                                    <div className={styles.registerMaster_error}>
                                        {errors.color}
                                    </div>
                                ) : null}

                                <label># de derrotas</label>
                                <Field name="derrotas" type="number" />
                                {errors.estado && touched.estado ? (
                                    <div className={styles.registerMaster_error}>
                                        {errors.estado}
                                    </div>
                                ) : null}


                                <Field
                                    style={{ display: "none" }}
                                    id="imageReset"
                                    name="imagen"
                                    type="file"
                                    onChange={imagenHandler} />
                                <label
                                    className={styles.registerMaster_loadImage}
                                    htmlFor='imageReset'>
                                    <i className="fa-solid fa-upload"></i>
                                    Cargar imagen
                                </label>

                                <button
                                    type="submit">
                                    Agregar maestro pokemon
                                </button>
                            </motion.div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RegistroMaestro;