import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate }from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'



const Formulario = ({cliente,cargando}) => {

    const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
               .min(3, 'El nombre debe tener al menos 3 caracteres')
               .max(20, 'El nombre debe tener como maximo 20 caracteres')
               .required('El nombre es obligatorio'),
    empresa: Yup.string()
                .required("El nombre de empresa es obligatorio"),
    email:   Yup.string()         
                .email('El email no es valido')
                .required("El email es obligatorio"),
    telefono: Yup.number().typeError("Numero no valido")
                 .positive("Numero no valido")
                 .integer("Numero no valido")
                  
                
  })


  const handleSubmit = async (valores) => {
      try {
          let respuesta
          if (cliente.id) {
            // EDITANDO EL REGISTRO
        const url = `http://localhost:3000/clientes/${cliente.id}`
         respuesta = await fetch(url,{
          method: 'PUT',
          body: JSON.stringify(valores),
          headers : {
            'Content-Type': 'application/json'
          }
        })
       
          }else {
            // NUEVO REGISTRO
        const url = "http://localhost:3000/clientes"
         respuesta = await fetch(url,{
          method: 'POST',
          body: JSON.stringify(valores),
          headers : {
            'Content-Type': 'application/json'
          }
        })
       
          }
          
          await respuesta.json()
          
          navigate('/clientes')
      } catch (error) {
        console.log(error)
      }
  }

  return (
       cargando ? <Spinner/> :(
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center ">{cliente?.nombre ? 'Editar Cliente' : ' Agregar Cliente'}</h1>
        <Formik 
               initialValues={{
                  nombre: cliente?.nombre ?? '',
                  empresa: cliente?.empresa ?? '',
                  email: cliente?.email ?? '',
                  telefono: cliente?.telefono ?? '',
                  notas: cliente?.notas ?? '',     

               }}
               enableReinitialize={true}
               onSubmit={ async (values, {resetForm})=>{
                await handleSubmit(values)

                resetForm()
               }}
               validationSchema={nuevoClienteSchema}
        >
            {({errors, touched})=> {
              //console.log(data)
              return (
            
            <Form className="mt-10"
            >
                <div className="mb-4">
                <label className="text-gray-800"
                htmlFor="nombre">Nombre:</label>
              
                <Field
                     id="nombre"
                     type="text"
                     className="mt-2 w-full block p-3 bg-gray-50"
                     placeholder="Nombre del cliente"
                     name="nombre"
                 
                />
                {errors.nombre && touched.nombre ? ( 
                  <Alerta>{errors.nombre}</Alerta>
                ): null}

                </div>

                <div>
                <label className="text-gray-800"
                htmlFor="empresa">Empresa:</label>
              
                <Field
                     id="empresa"
                     type="text"
                     className="mt-2 w-full block p-3 bg-gray-50"
                     placeholder="Empresa del cliente"
                     name="empresa"
                 
                />
                {errors.empresa && touched.empresa ? ( 
                  <Alerta>{errors.empresa}</Alerta>
                ): null}

                </div>

                <div>
                <label className="text-gray-800"
                htmlFor="email">Email:</label>
              
                <Field
                     id="email"
                     type="email"
                     className="mt-2 w-full block p-3 bg-gray-50"
                     placeholder="Email del cliente"
                     name="email"
                 
                />
                {errors.email && touched.email ? ( 
                  <Alerta>{errors.email}</Alerta>
                ): null}

                <div>
                <label className="text-gray-800"
                htmlFor="telefono">Telefono:</label>
              
                <Field
                     id="telefono"
                     type="tel"
                     className="mt-2 w-full block p-3 bg-gray-50"
                     placeholder="Telefono del cliente"
                     name="telefono"
                    
                 
                />
                {errors.telefono && touched.telefono ? ( 
                  <Alerta>{errors.telefono}</Alerta>
                ): null}

                </div>

                <div>
                <label className="text-gray-800"
                htmlFor="notas">Notas:</label>
              
                <Field
                     as="textarea"
                     id="empresa"
                     type="text"
                     className="mt-2 w-full block p-3 bg-gray-50 h-35"
                     placeholder="Notas del cliente"
                     name="notas"
                 
                />

                </div>

                </div>

                <input 
                type="submit"
                value={cliente?.nombre ? 'Editar Cliente' : ' Agregar Cliente'}
                className="mt-5 w-full bg-blue-800 text-white p-3 uppercase font-bold text-lg" />
   
            </Form>
            )}}
        </Formik>


    </div>
    )
  )
}


Formulario.defaultProps={
  cliente:{},
  cargando:false
  
}

export default Formulario