import {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'


const VerCliente = () => {

    const [cliente,setCliente] = useState({})
    const [cargando , setCargando] = useState(false)


    const { id } = useParams()
    useEffect(()=>{
        setCargando(!cargando)
      const obtenerClienteAPI = async () => {
        try {
             const url = `http://localhost:3000/clientes/${id}`
             const respuesta = await fetch(url)
             const resultado = await respuesta.json()
             setCliente(resultado)
        } catch (error) {
            console.log(error)
        }
        setTimeout(()=>{
            setCargando(false)    },600
            )
        
      }
       obtenerClienteAPI()
    }, [])

  return (
   
     Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
    <div>
         {cargando ? <Spinner/> :( 
            <>
        <h1 className="font-black text-4xl text-blue-900">Ver Cliente: {cliente.nombre}</h1>
        <p className="mt-3"> Informacion del cliente</p>

 

        {cliente.nombre && (<p className="text-2xl text-gray-700 mt-4">
            <span className=" uppercase font-bold">
            Nombre :</span> {cliente.nombre}
        </p>)}
        {cliente.email && (<p className="text-2xl text-gray-700 mt-4">
            <span className=" uppercase font-bold">
            Email :</span> {cliente.email}
        </p>)}
        {cliente.telefono && (<p className="text-2xl text-gray-700 mt-4">
            <span className=" uppercase font-bold">
            Telefono :</span> {cliente.telefono}
        </p>)}
        {cliente.empresa && (<p className="text-2xl text-gray-700 mt-4">
            <span className=" uppercase font-bold">
            Empresa :</span> {cliente.empresa}
        </p>)}
        {cliente.notas && (<p className="text-2xl text-gray-700 mt-4">
            <span className=" uppercase font-bold">
            Notas :</span> {cliente.notas}
        </p>)}
        </>
        )}
    </div>
    )
  )
}

export default VerCliente