import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addMaestroAsync } from '../../Redux/actions/actionMaestroPokemon';
import { FileUpload } from '../../utils/FileUpload';
import { useNavigate } from 'react-router-dom';


//declaraciones iniciales
let imagen;
let masterId;

//validaciones de cada input
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

    //generar un ID aleatorio
    const generarID = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    };


    //Función para subir la imagen a cloudinary y obtener la URL
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


    //funcion para agregar productos nuevos
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

    const navigate = useNavigate();
    //VOLVER A LA PAGINA ANTERIOR
    const backPage = () => {
        navigate("/maestro-pokemon");
    }

    return (
        <div>
            <div>
                <button onClick={() => backPage()}>Volver a la pagina anterior</button>
            </div>

            <div>
                <h1>Registrate como maestro pokemon</h1>
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
                                title: 'Producto agregado correctamente',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                
                            <label>Nombre</label>
                            <Field name="nombre" />
                            {errors.nombre && touched.nombre ? (
                                <div style={{ color: "red", fontSize: "13px" }}>
                                    {errors.nombre}
                                </div>
                            ) : null}
                
                            <label>Edad</label>
                            <Field name="edad" type="number" />
                            {errors.edad && touched.edad ? (
                                <div style={{ color: "red", fontSize: "13px" }}>
                                    {errors.edad}
                                </div>
                            ) : null}
                
                            <label># de pokemons en tu pokedex</label>
                            <Field name="pokemons" type="number" />
                            {errors.pokemons && touched.marca ? (
                                <div style={{ color: "red", fontSize: "13px" }}>
                                    {errors.marca}
                                </div>
                            ) : null}
                
                            <label>Pokemon mas valioso</label>
                            <Field name="mvp" type="text" />
                            {errors.mvp && touched.mvp ? (
                                <div style={{ color: "red", fontSize: "13px" }}>
                                    {errors.mvp}
                                </div>
                            ) : null}
                
                            <label># de victorias</label>
                            <Field name="victorias" type="number" />
                            {errors.color && touched.color ? (
                                <div style={{ color: "red", fontSize: "13px" }}>
                                    {errors.color}
                                </div>
                            ) : null}
                
                            <label># de derrotas</label>
                            <Field name="derrotas" type="number" />
                            {errors.estado && touched.estado ? (
                                <div style={{ color: "red", fontSize: "13px" }}>
                                    {errors.estado}
                                </div>
                            ) : null}
                
                
                            <Field
                                id="imageReset"
                                name="imagen"
                                type="file"
                                onChange={imagenHandler} />
                            <label
                                htmlFor='imageReset'>
                                <i className="fa-solid fa-upload"></i>
                                Cargar imagen
                            </label>
                
                            <button
                                type="submit">
                                Agregar maestro pokemon
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RegistroMaestro;